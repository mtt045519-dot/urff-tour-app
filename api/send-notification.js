import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';
import { getFirestore } from 'firebase-admin/firestore';

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const { title, message, targetUid } = req.body;
    const db = getFirestore();
    let tokens = [];
    if (targetUid && targetUid !== 'ALL') {
      const doc = await db.collection('fcmTokens').doc(targetUid).get();
      if (doc.exists) tokens.push(doc.data().token);
    } else {
      const snap = await db.collection('fcmTokens').get();
      snap.forEach(d => tokens.push(d.data().token));
    }
    if (tokens.length === 0) return res.status(200).json({ sent: 0 });
    const messaging = getMessaging();
    const response = await messaging.sendEachForMulticast({
      tokens,
      notification: { title, body: message },
    });
    res.status(200).json({ sent: response.successCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
