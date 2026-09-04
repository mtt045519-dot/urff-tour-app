import React, { useState, useEffect, useRef } from 'react';
import {
  Trophy, Flame, ShoppingBag, User, Headphones, ChevronRight, X, ArrowLeft,
  Wallet, Plus, Minus, CheckCircle, Share2, History, Settings, Globe, Moon, Sun,
  Gamepad2, Shield, AlertCircle, Copy, Check, Lock, Send, Bot, Power, Trash2, Edit3, Image as ImageIcon, CheckCircle2, XCircle, Bell, Home, Users, Crosshair, MapPin, Clock, Upload, Camera, Save, Search, Ban
} from 'lucide-react';
import { db } from './firebase';
import { collection, doc, getDocs, setDoc, updateDoc, increment, deleteDoc } from 'firebase/firestore';

const PAYMENT_NUMBER = '01704814095';
const ADMIN_PASSWORD = 'ttaammjjiidd';
const LOGO_URL = 'data:image/jpeg;base64,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';
export default function App() {
  // Navigation & Auth States
  const [activeTab, setActiveTab] = useState('login');
  const tourFileInputRef = useRef(null);
  const categoryFileInputRef = useRef(null);
  const shopFileInputRef = useRef(null);
  const shopExtraFileInputRefs = [useRef(null), useRef(null), useRef(null)];
  const [productImageIndex, setProductImageIndex] = useState(0);
  const bannerFileInputRef = useRef(null);
  const logoFileInputRef = useRef(null);
  const paymentIconFileInputRef = useRef(null);
  const profileFileInputRef = useRef(null);

  // Auth Form Inputs
  const [regUsername, setRegUsername] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regGmail, setRegGmail] = useState('');

  const [loginNumber, setLoginNumber] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // User & Wallet Data
  const [user, setUser] = useState({
    name: 'URTamjid',
    number: '01704814095',
    email: 'urtamjid5@gmail.com',
    uid: 'GMHF84',
    avatar: '',
    depositBalance: 300.00,
    winningBalance: 200.00,
    totalDeposited: 300.00,
    totalWithdrawn: 0.00,
  });

  const [userNotifications, _setUserNotifications] = useState([
    { id: 'not_' + Date.now(), title: 'Welcome to UR FF Tour!', message: 'Registration successful. Enjoy tournaments and win prizes.', time: 'Today', targetUid: 'GMHF84' }
  ]);
  const setUserNotifications = (updater) => {
    _setUserNotifications(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      const prevIds = new Set(prev.map(n => n.id));
      next.filter(n => !prevIds.has(n.id)).forEach(n => {
        setDoc(doc(db, 'notifications', String(n.id)), n).catch(e => console.error(e));
      });
      return next;
    });
  };
  useEffect(() => {
    getDocs(collection(db, 'notifications')).then(snap => {
      if (!snap.empty) _setUserNotifications(snap.docs.map(d => d.data()));
    }).catch(e => console.error(e));
  }, []);
  const [showNotifications, setShowNotifications] = useState(false);

  const [registeredUsers, setRegisteredUsers] = useState([
    { number: '01704814095', password: 'password123', name: 'URTamjid', email: 'urtamjid5@gmail.com', uid: 'GMHF84', depositBalance: 300.00, winningBalance: 200.00, totalDeposited: 300.00, totalWithdrawn: 0.00 }
  ]);

  // Load all registered users from Firestore when the app starts
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'users'));
        if (!snapshot.empty) {
          const usersFromDb = snapshot.docs.map(d => d.data());
          setRegisteredUsers(usersFromDb);
        }
      } catch (err) {
        console.error('Failed to load users from Firestore:', err);
      }
    };
    loadUsers();
  }, []);

  const getUserBalance = (uid) => {
    if (uid === user.uid) return { depositBalance: user.depositBalance, winningBalance: user.winningBalance, totalDeposited: user.totalDeposited || 0 };
    const found = registeredUsers.find(u => u.uid === uid);
    return found
      ? { depositBalance: found.depositBalance || 0, winningBalance: found.winningBalance || 0, totalDeposited: found.totalDeposited || 0 }
      : { depositBalance: 0, winningBalance: 0, totalDeposited: 0 };
  };

  // Applies a balance change to ANY user by UID — updates the live session if it's the
  // currently logged-in user, and always updates the registeredUsers "database" so the
  // change is there next time that account logs in (fixes: only the active account got paid).
  const applyBalanceChange = (uid, { deposit = 0, winning = 0, totalDeposited = 0, totalWithdrawn = 0 } = {}) => {
    if (uid === user.uid) {
      const newDeposit = user.depositBalance + deposit;
      const newWinning = user.winningBalance + winning;
      const newTotalDep = (user.totalDeposited || 0) + totalDeposited;
      const newTotalWithdrawn = (user.totalWithdrawn || 0) + totalWithdrawn;
      setUser(prev => ({ ...prev, depositBalance: newDeposit, winningBalance: newWinning, totalDeposited: newTotalDep, totalWithdrawn: newTotalWithdrawn }));
      setRegisteredUsers(prev => prev.map(u => u.uid === uid ? { ...u, depositBalance: newDeposit, winningBalance: newWinning, totalDeposited: newTotalDep, totalWithdrawn: newTotalWithdrawn } : u));
    } else {
      setRegisteredUsers(prev => prev.map(u => u.uid === uid ? {
        ...u,
        depositBalance: (u.depositBalance || 0) + deposit,
        winningBalance: (u.winningBalance || 0) + winning,
        totalDeposited: (u.totalDeposited || 0) + totalDeposited,
        totalWithdrawn: (u.totalWithdrawn || 0) + totalWithdrawn,
      } : u));
    }
    updateDoc(doc(db, 'users', uid), {
      depositBalance: increment(deposit),
      winningBalance: increment(winning),
      totalDeposited: increment(totalDeposited),
      totalWithdrawn: increment(totalWithdrawn),
    }).catch(err => console.error('Failed to sync balance:', err));
  };

  // UI States
  const [darkMode, setDarkMode] = useState(true);
  const [showBanner, setShowBanner] = useState(true);
  const [banners, _setBanners] = useState([
    { image: '', title: 'Win Big in Free Fire Tournaments!', subtitle: 'Join now & compete with the best' },
    { image: '', title: '', subtitle: '' },
    { image: '', title: '', subtitle: '' },
  ]);
  const setBanners = (updater) => {
    _setBanners(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      setDoc(doc(db, 'appData', 'banners'), { list: next }).catch(e => showToast('Save error: ' + e.message));
      return next;
    });
  };
  useEffect(() => {
    getDocs(collection(db, 'appData')).then(snap => {
      const bannersDoc = snap.docs.find(d => d.id === 'banners');
      if (bannersDoc) _setBanners(bannersDoc.data().list);
    }).catch(e => console.error(e));
  }, []);
  const [bannerCarouselIndex, setBannerCarouselIndex] = useState(0);
  const [logoUrl, setLogoUrl] = useState(LOGO_URL);
  const [appSettings, setAppSettings] = useState({
    paymentNumber: PAYMENT_NUMBER,
    contactNumber: '01704814095',
    telegramLink: '',
    withdrawRules: 'প্রতিদিন সর্বোচ্চ ২ বার Withdraw করা যাবে।\nএকবারে সর্বোচ্চ ৫০০ টাকা Withdraw করা যাবে।\nWithdraw Request দেওয়ার পর ধৈর্য ধরে অপেক্ষা করুন।\nপ্রতিদিনের Withdraw Proof আমাদের অফিসিয়াল Telegram Channel-এ প্রকাশ করা হয়।\nMinimum withdrawal: ৳100.',
  });
  const [paymentMethodsConfig, setPaymentMethodsConfig] = useState([
    { name: 'bKash', enabled: true, icon: '', color: 'bg-[#E2136E]', abbr: 'bK' },
    { name: 'Nagad', enabled: true, icon: '', color: 'bg-gradient-to-tr from-orange-600 to-red-600', abbr: 'Ng' },
    { name: 'Rocket', enabled: true, icon: '', color: 'bg-[#8C3494]', abbr: 'Rk' },
  ]);
  const [iconUploadTarget, setIconUploadTarget] = useState(null);
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [checkedInToday, setCheckedInToday] = useState(false);
  const [checkInStreak, setCheckInStreak] = useState(3);
  const [checkInBonusDays, setCheckInBonusDays] = useState(0); // lifetime bonus days used (max 4)
  const CHECKIN_DAILY_REWARD = 2;
  const CHECKIN_BONUS_LIMIT = 4;
  const [toastMessage, setToastMessage] = useState(null);

  // Modals & Forms
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinTeamEntries, setJoinTeamEntries] = useState([{ ign: '', uid: '' }]);
  const getModeCount = (mode) => (mode === 'DUO' ? 2 : mode === 'SQUAD' ? 4 : 1);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [matchDetailView, setMatchDetailView] = useState(null);
  const [selectedCategoryView, setSelectedCategoryView] = useState(null);
  const [showTotalPrizeInfo, setShowTotalPrizeInfo] = useState(false);
  const [showRulesInfo, setShowRulesInfo] = useState(false);
  const [showParticipantsInfo, setShowParticipantsInfo] = useState(false);
  const [showAllResultsInfo, setShowAllResultsInfo] = useState(false);

  // Wallet Actions
  const [walletAction, setWalletAction] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('bKash');
  const [amountInput, setAmountInput] = useState('');
  const [trxIdInput, setTrxIdInput] = useState('');
  const [withdrawAccountInput, setWithdrawAccountInput] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  // Shop Checkout
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [shopViewTab, setShopViewTab] = useState('diamonds');
  const [ffUidInput, setFfUidInput] = useState('');
  const [deliveryName, setDeliveryName] = useState('');
  const [deliveryPhone, setDeliveryPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [orderNote, setOrderNote] = useState('');
  const [shopDeliveryMethod, setShopDeliveryMethod] = useState('COD');
  const [selectedSize, setSelectedSize] = useState('');
  const COD_ADVANCE_CHARGE = 150;
  const [showMyOrders, setShowMyOrders] = useState(false);
  const [showBalanceShare, setShowBalanceShare] = useState(false);
  const [shareTargetUid, setShareTargetUid] = useState('');
  const [shareAmount, setShareAmount] = useState('');
  const [showInviteFriends, setShowInviteFriends] = useState(false);
  const [showAppDeveloper, setShowAppDeveloper] = useState(false);
  const [showAskProblem, setShowAskProblem] = useState(false);
   const [supportChats, _setSupportChats] = useState({});
  const setSupportChats = (updater) => {
    _setSupportChats(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      Object.keys(next).forEach(uid => {
        setDoc(doc(db, 'supportChats', uid), next[uid]).catch(e => console.error(e));
      });
      return next;
    });
  };
  useEffect(() => {
    getDocs(collection(db, 'supportChats')).then(snap => {
      if (!snap.empty) {
        const obj = {};
        snap.docs.forEach(d => { obj[d.id] = d.data(); });
        _setSupportChats(obj);
      }
    }).catch(e => console.error(e));
  }, []);
  const [supportChatInput, setSupportChatInput] = useState('');
  const [supportChatLoading, setSupportChatLoading] = useState(false);
  const [adminSupportSelectedUid, setAdminSupportSelectedUid] = useState(null);
  const [adminSupportInput, setAdminSupportInput] = useState('');
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [isRecordingVoiceAdmin, setIsRecordingVoiceAdmin] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const speechRecognitionRef = useRef(null);
  const userChatImageInputRef = useRef(null);
  const adminChatImageInputRef = useRef(null);
  const [shopSearchQuery, setShopSearchQuery] = useState('');
  const [adminShopSearchQuery, setAdminShopSearchQuery] = useState('');
  const [adminPlayerSearchQuery, setAdminPlayerSearchQuery] = useState('');
  const [expandedPlayerUid, setExpandedPlayerUid] = useState(null);
  const [adminBanReason, setAdminBanReason] = useState('');
  const [regReferralCode, setRegReferralCode] = useState('');
  const BALANCE_SHARE_FEE = 5;
  const INVITE_BONUS = 5;

  // Admin Panel State
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminTab, setAdminTab] = useState('tournaments');
  const [expandedMatchId, setExpandedMatchId] = useState(null);

  // Tournament Form (Admin)
  const [editingTourId, setEditingTourId] = useState(null);
  const [newTourTitle, setNewTourTitle] = useState('');
  const [newTourPrize, setNewTourPrize] = useState('');
  const [newTourFee, setNewTourFee] = useState('');
  const [newTourPerKill, setNewTourPerKill] = useState('');
  const [newTourPrizeTable, setNewTourPrizeTable] = useState([
    { label: 'Winner', amount: '' },
    { label: '2nd Position', amount: '' },
    { label: '3rd Position', amount: '' },
  ]);
  const [newTourTotalSlots, setNewTourTotalSlots] = useState('48');
  const [newTourRoomId, setNewTourRoomId] = useState('');
  const [newTourPass, setNewTourPass] = useState('');
  const [newTourImage, setNewTourImage] = useState('');
  const [newTourRules, setNewTourRules] = useState('');
  const [newTourTime, setNewTourTime] = useState('');
  const [newTourCategoryId, setNewTourCategoryId] = useState('cat_br');
  const [newTourMode, setNewTourMode] = useState('SOLO');

  // Category Form (Admin)
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryImage, setNewCategoryImage] = useState('');

  // Shop Item Form (Admin)
  const [editingShopId, setEditingShopId] = useState(null);
  const [newShopTitle, setNewShopTitle] = useState('');
  const [newShopPrice, setNewShopPrice] = useState('');
  const [newShopImage, setNewShopImage] = useState('');
  const [newShopExtraImages, setNewShopExtraImages] = useState(['', '', '']); // up to 3 more (4 total with newShopImage)
  const [newShopType, setNewShopType] = useState('diamond');
  const [newShopOldPrice, setNewShopOldPrice] = useState('');
  const [newShopDiscount, setNewShopDiscount] = useState('');
  const [newShopSizes, setNewShopSizes] = useState('');
  const [newShopDescription, setNewShopDescription] = useState('');
  const [newShopPackageItems, setNewShopPackageItems] = useState('');
  const [newShopFeatures, setNewShopFeatures] = useState('');
  const [newShopCourier, setNewShopCourier] = useState('PATHAO COURIER');

  // Banner Form (Admin)
  const [editingBannerSlot, setEditingBannerSlot] = useState(0);
  const [bannerTitleInput, setBannerTitleInput] = useState('');
  const [bannerSubtitleInput, setBannerSubtitleInput] = useState('');
  const [bannerImageInput, setBannerImageInput] = useState('');

  // Logo Form (Admin)
  const [logoInput, setLogoInput] = useState('');

  // App Settings Form (Admin) — contact/payment number, Telegram link
  const [paymentNumberInput, setPaymentNumberInput] = useState('');
  const [contactNumberInput, setContactNumberInput] = useState('');
  const [telegramLinkInput, setTelegramLinkInput] = useState('');
  const [withdrawRulesInput, setWithdrawRulesInput] = useState('');

  // Profile Settings (every user, for their own account)
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const [profileNameInput, setProfileNameInput] = useState('');
  const [profileAvatarInput, setProfileAvatarInput] = useState('');
  const [profilePhoneInput, setProfilePhoneInput] = useState('');
  const [profileFfUidInput, setProfileFfUidInput] = useState('');

  // Rejection Modal State
  const [rejectModalData, setRejectModalData] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');

  // Admin Notification broadcast
  const [notifTitle, setNotifTitle] = useState('');
  const [notifMessage, setNotifMessage] = useState('');
  const [notifTargetUid, setNotifTargetUid] = useState('');
  const [notifBroadcastMode, setNotifBroadcastMode] = useState('all'); // 'all' | 'specific'

  // Admin Queues
  const [pendingDeposits, setPendingDeposits] = useState([
    { id: 'dep_1', uid: 'GMHF84', name: 'URTamjid', amount: 200, method: 'bKash', trxId: '9N876XVC' }
  ]);
  
  const [pendingWithdrawals, setPendingWithdrawals] = useState([]);

  const [pendingShopOrders, _setPendingShopOrders] = useState([
    { id: 'ord_1', uid: 'GMHF84', name: 'URTamjid', number: '01704814095', type: 'diamond', itemTitle: '200 Free Fire Like', price: 20, ffUid: '87654321', deliveryName: '', deliveryPhone: '', deliveryAddress: '', deliveryMethod: '', deductedDeposit: 20, deductedWinning: 0, depositBalance: 300, winningBalance: 200, totalDeposited: 300, status: 'pending', rejectReason: '' }
  ]);
  const setPendingShopOrders = (updater) => {
    _setPendingShopOrders(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      next.forEach(o => setDoc(doc(db, 'shopOrders', String(o.id)), o).catch(e => console.error(e)));
      return next;
    });
  };
  useEffect(() => {
    getDocs(collection(db, 'shopOrders')).then(snap => {
      if (!snap.empty) _setPendingShopOrders(snap.docs.map(d => d.data()));
    }).catch(e => console.error(e));
  }, []);
  useEffect(() => {
    const loadPending = async () => {
      try {
        const depSnap = await getDocs(collection(db, 'pendingDeposits'));
        if (!depSnap.empty) setPendingDeposits(depSnap.docs.map(d => d.data()));
        const witSnap = await getDocs(collection(db, 'pendingWithdrawals'));
        if (!witSnap.empty) setPendingWithdrawals(witSnap.docs.map(d => d.data()));
      } catch (err) {
        console.error('Failed to load pending requests:', err);
      }
    };
    loadPending();
  }, []);


  // Match Participants & Results State
  const [matchParticipants, _setMatchParticipants] = useState({});
  const setMatchParticipants = (updater) => {
    _setMatchParticipants(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      Object.keys(next).forEach(matchId => {
        setDoc(doc(db, 'matchParticipants', matchId), { list: next[matchId] }).catch(e => console.error(e));
      });
      return next;
    });
  };
  useEffect(() => {
    getDocs(collection(db, 'matchParticipants')).then(snap => {
      if (!snap.empty) {
        const obj = {};
        snap.docs.forEach(d => { obj[d.id] = d.data().list; });
        _setMatchParticipants(obj);
      }
    }).catch(e => console.error(e));
  }, []);
  const isJoinedByMe = (matchId) => (matchParticipants[matchId] || []).some(p => p.accountUid === user.uid);
  const [matchResultsModal, setMatchResultsModal] = useState(null);
  const [winnerEntries, setWinnerEntries] = useState([
    { name: 'URTamjid', accountUid: 'GMHF84', rank: '1', prize: '200', points: '15' }
  ]);
  // Structured, queryable results history: { [matchId]: { title, category, declaredAt, winners: [{name, accountUid, rank, prize, points}] } }
    const [matchResultsHistory, _setMatchResultsHistory] = useState({});
  const setMatchResultsHistory = (updater) => {
    _setMatchResultsHistory(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      Object.keys(next).forEach(matchId => {
        setDoc(doc(db, 'matchResults', matchId), next[matchId]).catch(e => console.error(e));
      });
      return next;
    });
  };
  useEffect(() => {
    getDocs(collection(db, 'matchResults')).then(snap => {
      if (!snap.empty) {
        const obj = {};
        snap.docs.forEach(d => { obj[d.id] = d.data(); });
        _setMatchResultsHistory(obj);
      }
    }).catch(e => console.error(e));
  }, []);
  const [showAllResults, setShowAllResults] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboardPeriod, setLeaderboardPeriod] = useState('monthly'); // weekly | monthly | alltime
  const [leaderboardMetric, setLeaderboardMetric] = useState('wins'); // wins | earnings | withdrawn
  const leaderboardBase = [
    { name: 'Roni Datta', avatar: '', wins: 83, earnings: 5836, withdrawn: 4200, kills: 0, matches: 167 },
    { name: 'Shihabboss', avatar: '', wins: 60, earnings: 3265, withdrawn: 2500, kills: 0, matches: 73 },
    { name: 'Redowan', avatar: '', wins: 58, earnings: 3080, withdrawn: 2200, kills: 1, matches: 72 },
    { name: 'SUNSHINE', avatar: '', wins: 45, earnings: 4350, withdrawn: 3000, kills: 0, matches: 126 },
    { name: 'Rahul 1M', avatar: '', wins: 48, earnings: 3290, withdrawn: 1800, kills: 0, matches: 65 },
    { name: 'B10-N!TROi', avatar: '', wins: 36, earnings: 2076, withdrawn: 1200, kills: 1, matches: 55 },
    { name: 'AJOYKARAR', avatar: '', wins: 29, earnings: 1730, withdrawn: 900, kills: 9, matches: 42 },
    { name: 'utshox', avatar: '', wins: 28, earnings: 2110, withdrawn: 1500, kills: 0, matches: 66 },
    { name: 'CSK LEADEE', avatar: '', wins: 26, earnings: 1672, withdrawn: 800, kills: 2, matches: 46 },
    { name: 'Nur007', avatar: '', wins: 4, earnings: 2641, withdrawn: 2000, kills: 10, matches: 102 },
    { name: 'Arman', avatar: '', wins: 1, earnings: 2578, withdrawn: 1900, kills: 3, matches: 95 },
    { name: 'DXZisan', avatar: '', wins: 0, earnings: 2320, withdrawn: 1600, kills: 0, matches: 77 },
    // Filler entries so the leaderboard shows a full Top 50 list, like a real active community.
    ...Array.from({ length: 38 }, (_, i) => {
      const n = i + 13;
      const decay = Math.max(1, 24 - Math.floor(i * 0.55));
      return {
        name: `Player${n}`,
        avatar: '',
        wins: decay,
        earnings: decay * 45 + (n % 7) * 12,
        withdrawn: decay * 30 + (n % 5) * 10,
        kills: n % 11,
        matches: decay * 2 + (n % 9),
      };
    }),
  ];
  const getLeaderboardData = () => {
    const mult = leaderboardPeriod === 'weekly' ? 0.35 : leaderboardPeriod === 'alltime' ? 1.8 : 1;
    return leaderboardBase
      .map(p => ({
        ...p,
        wins: Math.round(p.wins * mult),
        earnings: Math.round(p.earnings * mult),
        withdrawn: Math.round(p.withdrawn * mult),
        matches: Math.round(p.matches * mult),
      }))
      .sort((a, b) => b[leaderboardMetric] - a[leaderboardMetric])
      .slice(0, 50);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const copyToClipboard = (text, label) => {
    if (!text) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(String(text))
        .then(() => showToast(`${label} copy hoyeche!`))
        .catch(() => showToast('Copy kora jayni, please manually copy korun'));
    } else {
      showToast('Copy kora jayni, please manually copy korun');
    }
  };

  const activeBanners = banners.filter(b => (b.image && b.image.trim()) || (b.title && b.title.trim()));

  // Auto-rotate the home banners one after another every 4 seconds when there's more than one.
  useEffect(() => {
    if (activeTab !== 'home' || activeBanners.length <= 1) return;
    const interval = setInterval(() => {
      setBannerCarouselIndex(prev => (prev + 1) % activeBanners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [activeTab, activeBanners.length]);

  // If admin disables the currently-selected payment method, fall back to the first enabled one.
  useEffect(() => {
    if (!walletAction) return;
    const enabledMethods = paymentMethodsConfig.filter(m => m.enabled);
    if (enabledMethods.length && !enabledMethods.find(m => m.name === paymentMethod)) {
      setPaymentMethod(enabledMethods[0].name);
    }
  }, [walletAction, paymentMethodsConfig]);

  // Lock background scroll whenever any full-screen modal/sheet is open. Without this,
  // on some mobile/embedded viewers the page behind a "fixed" overlay can still scroll,
  // which drags the modal's own header out of view and makes it look like there's no
  // way to scroll the modal content or back out of it.
  const anyModalOpen = showNotifications || showCheckInModal || showJoinModal || showHistory ||
    showMyOrders || showBalanceShare || showInviteFriends || showAppDeveloper || showProfileSettings ||
    showAllResults || showLeaderboard || showAskProblem || !!walletAction || !!selectedProduct || !!rejectModalData ||
    !!matchResultsModal;
  useEffect(() => {
    if (anyModalOpen) {
      const prevOverflow = document.body.style.overflow;
      const prevPosition = document.body.style.position;
      const prevWidth = document.body.style.width;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      return () => {
        document.body.style.overflow = prevOverflow;
        document.body.style.position = prevPosition;
        document.body.style.width = prevWidth;
      };
    }
  }, [anyModalOpen]);

  // Reset the product image gallery to the first photo whenever a different product is opened.
  useEffect(() => {
    setProductImageIndex(0);
  }, [selectedProduct]);

  // Collapse the Rules/Participants/Results sections back down whenever a different match is opened.
  useEffect(() => {
    setShowRulesInfo(false);
    setShowParticipantsInfo(false);
    setShowAllResultsInfo(false);
    setShowTotalPrizeInfo(false);
  }, [matchDetailView]);

  // Mock Tournaments
  const [matchCategories, setMatchCategories] = useState([
    { id: 'cat_br', name: 'BR Match', image: '' },
    { id: 'cat_brsurvival', name: 'BR Survival', image: '' },
    { id: 'cat_clashsquad', name: 'Clash Squad', image: '' },
    { id: 'cat_lonewolf', name: 'Lone Wolf', image: '' },
    { id: 'cat_losttowin', name: 'Lost to Win', image: '' },
    { id: 'cat_cs', name: 'CS 1v1 / 2v2', image: '' },
  ]);
    const setMatchCategoriesSynced = (updater) => {
    setMatchCategories(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      setDoc(doc(db, 'appData', 'matchCategories'), { list: next }).catch(e => showToast('Save error: ' + e.message));
      return next;
    });
  };
  useEffect(() => {
    getDocs(collection(db, 'appData')).then(snap => {
      const catDoc = snap.docs.find(d => d.id === 'matchCategories');
      if (catDoc) setMatchCategories(catDoc.data().list);
    }).catch(e => console.error(e));
  }, []);
  const [automatedTemplates, setAutomatedTemplates] = useState([]);

  const [tournaments, setTournaments] = useState([
    {
      id: 'm1',
      category: 'BR Match',
      categoryId: 'cat_br',
      title: 'DUO | CLASSIC',
      time: '2026-08-09 11:30 AM',
      prizePool: 450,
      perKill: 6,
      entryFee: 10,
      map: 'BERMUDA',
      mode: 'DUO',
      status: 'live',
      started: true,
      slotsFilled: 12,
      totalSlots: 48,
      image: '🔥',
      rules: 'No hacking, no teaming, standard classic rules apply.',
      roomInfo: { id: '#59E4C', pass: '8839' },
      prizeTable: [
        { label: 'Winner', amount: 50 },
        { label: '2nd Position', amount: 40 },
        { label: '3rd Position', amount: 30 },
        { label: '4th Position', amount: 20 },
        { label: '5th Position', amount: 10 },
      ]
    },
    {
      id: 'm2',
      category: 'BR Match',
      categoryId: 'cat_br',
      title: 'SOLO | CLASSIC',
      time: '2026-08-09 12:00 PM',
      prizePool: 450,
      perKill: 10,
      entryFee: 10,
      map: 'BERMUDA',
      mode: 'SOLO',
      status: 'upcoming',
      started: false,
      slotsFilled: 0,
      totalSlots: 48,
      image: '⚡',
      rules: 'Solo match rules. Emulators allowed.',
      roomInfo: { id: '', pass: '' },
      prizeTable: [
        { label: 'Winner', amount: 50 },
        { label: '2nd Position', amount: 40 },
        { label: '3rd Position', amount: 30 },
        { label: '4th Position', amount: 20 },
        { label: '5th Position', amount: 10 },
      ]
    },
    {
      id: 'm3',
      category: 'Clash Squad',
      categoryId: 'cat_clashsquad',
      title: 'SQUAD | CLASH SQUAD',
      time: '2026-08-09 08:00 PM',
      prizePool: 300,
      perKill: 5,
      entryFee: 15,
      map: 'PURGATORY',
      mode: 'SQUAD',
      status: 'upcoming',
      started: false,
      slotsFilled: 4,
      totalSlots: 12,
      image: '🎯',
      rules: 'Best of 7 rounds. No emulator.',
      roomInfo: { id: '', pass: '' },
      prizeTable: [
        { label: 'Winner', amount: 100 },
        { label: '2nd Position', amount: 60 },
      ]
    }
  ]);
  
  useEffect(() => {
    const loadTournaments = async () => {
      try {
        const snap = await getDocs(collection(db, 'tournaments'));
        if (!snap.empty) setTournaments(snap.docs.map(d => d.data()));
      } catch (err) {
        console.error('Failed to load tournaments:', err);
      }
    };
    loadTournaments();
  }, []);
 
  // Auto-generate today's matches from any "Command to Automated" templates. Runs on load
  // and then rechecks periodically, so it also catches the day rolling over while the app
  // stays open. Note: this only fires while the app is actually open — it's a client-only
  // simulation, not a real background/server cron job.
  useEffect(() => {
    const generateDueMatches = () => {
      const todayStr = new Date().toDateString();
      setAutomatedTemplates(prevTemplates => {
        const dueTemplates = prevTemplates.filter(tpl => tpl.lastGeneratedDate !== todayStr);
        if (dueTemplates.length === 0) return prevTemplates;

        const newMatches = dueTemplates.map(tpl => ({
          id: 'm_auto_' + Date.now() + Math.random().toString(36).slice(2),
          category: tpl.category,
          categoryId: tpl.categoryId,
          title: tpl.title,
          time: `${new Date().toLocaleDateString('en-CA')} ${tpl.timeLabel}`,
          prizePool: tpl.prizePool,
          perKill: tpl.perKill,
          entryFee: tpl.entryFee,
          map: tpl.map || 'BERMUDA',
          mode: tpl.mode,
          status: 'upcoming',
          started: false,
          slotsFilled: 0,
          totalSlots: tpl.totalSlots,
          image: tpl.image,
          rules: tpl.rules,
          roomInfo: { id: '', pass: '' },
          prizeTable: tpl.prizeTable || [],
        }));

        setTournaments(prevTournaments => [...newMatches, ...prevTournaments]);
        return prevTemplates.map(tpl => dueTemplates.find(d => d.id === tpl.id) ? { ...tpl, lastGeneratedDate: todayStr } : tpl);
      });
    };

    generateDueMatches();
    const interval = setInterval(generateDueMatches, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const [shopItems, setShopItems] = useState([
    { id: 'd1', title: '200 Free Fire Like', type: 'like', price: 20, oldPrice: 50, discount: '-60%', image: '🔥' },
    { id: 'd2', title: '25 Diamond', type: 'diamond', price: 28, oldPrice: 40, discount: '-30%', image: '💎' },
    { id: 'd3', title: '100 Diamond', type: 'diamond', price: 105, oldPrice: 130, discount: '-19%', image: '💎' },
    { id: 'd4', title: 'Weekly Membership', type: 'membership', price: 145, oldPrice: 160, discount: '-9%', image: '🎟️' },
    {
      id: 'p1',
      title: '⌚ মোবাইল ঘড়ি + ব্লুটুথ হেডফোন',
      type: 'product',
      price: 1280,
      oldPrice: 2780,
      discount: '-54%',
      image: '⌚',
      sizes: [],
      courier: 'PATHAO COURIER',
      description: '⌚ S2000 Pro Max Smart Watch 7-in-2 Edition একটি প্রিমিয়াম স্মার্টওয়াচ কম্বো, যা স্টাইল, ফিটনেস এবং দৈনন্দিন ব্যবহারের জন্য দারুণ একটি পছন্দ। নারী ও পুরুষ উভয়ের জন্য উপযোগী এই স্মার্টওয়াচে রয়েছে ৭টি স্টাইলিশ স্ট্র্যাপ, প্রোটেকশন কেস এবং TWS Earbuds!',
      packageItems: [
        'S2000 Pro Max Smart Watch',
        '৭টি পরিবর্তনযোগ্য স্ট্র্যাপ',
        'প্রোটেকশন কেস',
        'TWS Wireless Earbuds',
        'ম্যাগনেটিক চার্জিং কেবল'
      ],
      features: [
        'বড় ও উজ্জ্বল স্ক্যয়ার ডিসপ্লে',
        'Bluetooth Calling সাপোর্ট',
        'হার্ট রেট মনিটর',
        'ব্লাড প্রেসার মনিটর',
        'SpO2 (Blood Oxygen) মনিটর',
        'একাধিক Sports Mode',
        'দীর্ঘস্থায়ী ব্যাটারি ব্যাকআপ',
        'Android ও iPhone উভয়ের সাথে ব্যবহারযোগ্য'
      ]
    },
  ]);
  const setShopItemsSynced = (updater) => {
    setShopItems(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      next.forEach(item => setDoc(doc(db, 'shopItems', String(item.id)), item).catch(e => showToast('Save error: ' + e.message)));
      return next;
    });
  };
  useEffect(() => {
    getDocs(collection(db, 'shopItems')).then(snap => {
      if (!snap.empty) setShopItems(snap.docs.map(d => d.data()));
    }).catch(e => console.error(e));
  }, []);

  const handleRegister = () => {
    if (!regUsername || !regNumber || !regPassword || !regGmail) {
      showToast('Shob field puron korun');
      return;
    }
    const accountsWithNumber = registeredUsers.filter(u => u.number === regNumber);
    if (accountsWithNumber.length >= 3) {
      showToast('Ei number diye maximum 3 ti account khola jabe!');
      return;
    }
    // No two accounts anywhere may share the same password — this also guarantees the
    // (max 3) accounts under one phone number never end up with matching passwords.
    if (registeredUsers.some(u => u.password === regPassword)) {
      showToast('Ei password already onno ekta account e use hoyeche. Onno password din.');
      return;
    }

    const newUserObj = {
      number: regNumber,
      password: regPassword,
      name: regUsername,
      email: regGmail,
      uid: 'GM' + Math.floor(1000 + Math.random() * 9000),
      avatar: '',
      depositBalance: 0.00,
      winningBalance: 5.00,
      totalDeposited: 0.00,
      totalWithdrawn: 0.00
    };

    setRegisteredUsers([...registeredUsers, newUserObj]);
    setDoc(doc(db, 'users', newUserObj.uid), newUserObj).catch(err => console.error('Failed to save user:', err));
    setUser({
      name: regUsername,
      number: regNumber,
      email: regGmail,
      uid: newUserObj.uid,
      avatar: '',
      depositBalance: 0.00,
      winningBalance: 5.00,
      totalDeposited: 0.00,
      totalWithdrawn: 0.00
    });

    const refCode = regReferralCode.trim();
    if (refCode && refCode !== newUserObj.uid) {
      const referrer = registeredUsers.find(u => u.uid === refCode);
      if (referrer) {
        setRegisteredUsers(prev => prev.map(u => u.uid === refCode ? { ...u, winningBalance: (u.winningBalance || 0) + INVITE_BONUS } : u));
        setUserNotifications(prev => [{ id: 'not_' + Date.now(), title: 'Invite Bonus! 🎉', message: `${regUsername} apnar referral code diye register korechen. Apni ৳${INVITE_BONUS} bonus peyechen.`, time: 'Just now', targetUid: refCode }, ...prev]);
      }
    }
    setRegReferralCode('');

    showToast('Registration successful! Apnar account e ৳5 bonus jog kora hoyeche.');
    setActiveTab('home');
  };

  const handleLogin = () => {
    const found = registeredUsers.find(u => u.number === loginNumber && u.password === loginPassword);
    if (found) {
      const now = Date.now();
      if (found.banUntil === 'permanent' || (typeof found.banUntil === 'number' && found.banUntil > now)) {
        const untilText = found.banUntil === 'permanent'
          ? 'permanently'
          : `until ${new Date(found.banUntil).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true })}`;
        showToast(`Apnar account ${untilText} ban kora hoyeche.${found.banReason ? ' Karon: ' + found.banReason : ''}`);
        return;
      }
      setUser({
        name: found.name,
        number: found.number,
        email: found.email,
        uid: found.uid,
        avatar: found.avatar || '',
        depositBalance: found.depositBalance || 0,
        winningBalance: found.winningBalance || 0,
        totalDeposited: found.totalDeposited || 0,
        totalWithdrawn: found.totalWithdrawn || 0
      });
      showToast('Login successful!');
      setActiveTab('home');
    } else {
      showToast('Bhul number ba password!');
    }
  };

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    setLoginNumber('');
    setLoginPassword('');
    setActiveTab('login');
    showToast('Logout successful!');
  };

  // Force-logout immediately if the currently logged-in account gets banned mid-session.
  useEffect(() => {
    if (activeTab === 'login' || activeTab === 'register') return;
    const me = registeredUsers.find(u => u.uid === user.uid);
    if (!me) return;
    const now = Date.now();
    if (me.banUntil === 'permanent' || (typeof me.banUntil === 'number' && me.banUntil > now)) {
      showToast('Apnar account ban kora hoyeche. Logout kora hocche.');
      setActiveTab('login');
      setLoginNumber('');
      setLoginPassword('');
    }
  }, [registeredUsers, user.uid, activeTab]);

  const handleCheckIn = () => {
    if (checkedInToday) {
      showToast('Ajke apni already check-in korechen!');
      return;
    }
    const bonusAvailable = checkInBonusDays < CHECKIN_BONUS_LIMIT;
    if (bonusAvailable) {
      const reward = CHECKIN_DAILY_REWARD;
      applyBalanceChange(user.uid, { winning: reward });
      setCheckInBonusDays(prev => prev + 1);
      showToast(`+৳${reward} check-in bonus পেয়েছেন!`);
    } else {
      showToast(`Apni maximum ${CHECKIN_BONUS_LIMIT} diner check-in bonus peye gechen. Ar bonus paben na.`);
    }
    setCheckedInToday(true);
    setCheckInStreak(prev => prev + 1);
    setShowCheckInModal(false);
  };

  const handleJoinMatch = () => {
    const playerCount = getModeCount(selectedMatch.mode);
    const entries = joinTeamEntries.slice(0, playerCount);
    const incomplete = entries.some(p => !p.ign.trim() || !p.uid.trim());
    if (incomplete || entries.length < playerCount) {
      showToast(`Sob ${playerCount} jon player-er Free Fire IGN ebong UID din`);
      return;
    }
    if (isJoinedByMe(selectedMatch.id)) {
      showToast('Apni already ei match e join korechen!');
      setShowJoinModal(false);
      return;
    }

    if (selectedMatch.slotsFilled + playerCount > selectedMatch.totalSlots) {
      showToast('Ei match er jonno protto slot nei!');
      setShowJoinModal(false);
      return;
    }

    if (selectedMatch.started) {
      showToast('Ei match already start hoye geche, ekhon join kora jabe na!');
      setShowJoinModal(false);
      return;
    }

    const totalFee = selectedMatch.entryFee * playerCount;
    const totalWallet = user.depositBalance + user.winningBalance;
    if (totalWallet < totalFee) {
      showToast('Oporjapto balance!');
      return;
    }

    let remaining = totalFee;
    let deductDeposit = 0;
    let deductWinning = 0;

    if (user.depositBalance >= remaining) {
      deductDeposit = remaining;
    } else {
      deductDeposit = user.depositBalance;
      deductWinning = remaining - user.depositBalance;
    }

    applyBalanceChange(user.uid, { deposit: -deductDeposit, winning: -deductWinning });

    setTournaments(tournaments.map(m => m.id === selectedMatch.id ? { ...m, slotsFilled: m.slotsFilled + playerCount } : m));
    updateDoc(doc(db, 'tournaments', selectedMatch.id), { slotsFilled: increment(playerCount) }).catch(e => console.error(e));

    const pList = matchParticipants[selectedMatch.id] || [];
    setMatchParticipants({
      ...matchParticipants,
      [selectedMatch.id]: [
        ...pList,
        {
          accountName: user.name,
          accountUid: user.uid,
          number: user.number,
          mode: selectedMatch.mode,
          entryFeePaid: totalFee,
          players: entries,
          joinedAt: new Date().toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true }),
          joinedAtMs: Date.now()
        }
      ]
    });

    setShowJoinModal(false);
    setJoinTeamEntries([{ ign: '', uid: '' }]);
    showToast('Match e sofolbhabe join korechen!');
  };

  const handleAddMoneySubmit = () => {
    const amt = parseFloat(amountInput);
    if (!amt || amt <= 0 || !trxIdInput) {
      showToast('Sothik poriman ebong TrxID din');
      return;
    }
    setPendingDeposits([{ id: 'dep_' + Date.now(), uid: user.uid, name: user.name, amount: amt, method: paymentMethod, trxId: trxIdInput }, ...pendingDeposits]);
    setDoc(doc(db, 'pendingDeposits', 'dep_' + Date.now()), { id: 'dep_' + Date.now(), uid: user.uid, name: user.name, amount: amt, method: paymentMethod, trxId: trxIdInput }).catch(e => console.error(e));
    setWalletAction(null);
    setAmountInput('');
    setTrxIdInput('');
    showToast('Deposit request admin er kache pathano hoyeche!');
  };

  const handleWithdrawSubmit = () => {
    const amt = parseFloat(amountInput);
    const totalBalance = user.depositBalance + user.winningBalance;
    if (!amt || amt < 100) {
      showToast('Sorbonimne 100 taka withdraw request dewa jabe');
      return;
    }
    if (totalBalance < amt) {
      showToast('Apnar total balance e eto taka nei!');
      return;
    }
    if (!withdrawAccountInput.trim()) {
      showToast('Apnar account number din');
      return;
    }

       const witId = 'wit_' + Date.now();
    const witObj = { id: witId, uid: user.uid, name: user.name, number: user.number, amount: amt, method: paymentMethod, account: withdrawAccountInput, depositBalance: user.depositBalance, winningBalance: user.winningBalance, totalDeposited: user.totalDeposited || 0 };
    setPendingWithdrawals([witObj, ...pendingWithdrawals]);
    setDoc(doc(db, 'pendingWithdrawals', witId), witObj).catch(e => console.error(e));
    setWalletAction(null);
    setAmountInput('');
    setWithdrawAccountInput('');
    showToast('Withdraw request admin er kache pathano hoyeche!');
  };

  const handleShopOrderSubmit = () => {
    const isDiamond = selectedProduct.type !== 'product';
    const hasSizes = !isDiamond && selectedProduct.sizes && selectedProduct.sizes.length > 0;
    const qty = isDiamond ? 1 : Math.max(1, orderQuantity);
    const subtotal = selectedProduct.price * qty;
    if (isDiamond && !ffUidInput.trim()) {
      showToast('Free Fire UID din');
      return;
    }
    if (!isDiamond && (!deliveryName.trim() || !deliveryPhone.trim() || !deliveryAddress.trim())) {
      showToast('Naam, number ebong address din');
      return;
    }
    if (hasSizes && !selectedSize) {
      showToast('Size select korun');
      return;
    }

    // For physical products via Cash on Delivery, only the ৳150 delivery charge is
    // charged now (as an advance/booking fee) — the item price itself is paid in cash
    // when it reaches the customer. Online-paid products and diamond top-ups are
    // charged the full subtotal (price × quantity) right away.
    const isCOD = !isDiamond && shopDeliveryMethod === 'COD';
    const chargeAmount = isCOD ? COD_ADVANCE_CHARGE : subtotal;
    const codDue = isCOD ? subtotal : 0;

    const totalWallet = user.depositBalance + user.winningBalance;
    if (totalWallet < chargeAmount) {
      showToast(isCOD ? `Delivery charge ৳${COD_ADVANCE_CHARGE} er jonno oporjapto balance!` : 'Oporjapto balance!');
      return;
    }

    let remaining = chargeAmount;
    let deductDeposit = 0;
    let deductWinning = 0;
    if (user.depositBalance >= remaining) {
      deductDeposit = remaining;
    } else {
      deductDeposit = user.depositBalance;
      deductWinning = remaining - user.depositBalance;
    }
    // Money is deducted right away when the order is placed; if admin rejects it later, it's refunded.
    applyBalanceChange(user.uid, { deposit: -deductDeposit, winning: -deductWinning });

    setPendingShopOrders([{
      id: 'ord_' + Date.now(),
      uid: user.uid,
      name: user.name,
      number: user.number,
      type: isDiamond ? 'diamond' : 'product',
      itemTitle: selectedProduct.title,
      price: selectedProduct.price,
      quantity: qty,
      subtotal: subtotal,
      selectedSize: hasSizes ? selectedSize : '',
      orderNote: isDiamond ? '' : orderNote,
      ffUid: isDiamond ? ffUidInput : '',
      deliveryName: isDiamond ? '' : deliveryName,
      deliveryPhone: isDiamond ? '' : deliveryPhone,
      deliveryAddress: isDiamond ? '' : deliveryAddress,
      deliveryMethod: isDiamond ? '' : shopDeliveryMethod,
      chargedAmount: chargeAmount,
      codDue: codDue,
      deductedDeposit: deductDeposit,
      deductedWinning: deductWinning,
      depositBalance: user.depositBalance,
      winningBalance: user.winningBalance,
      totalDeposited: user.totalDeposited || 0,
      status: 'pending',
      rejectReason: '',
    }, ...pendingShopOrders]);
    showToast(isCOD ? `Delivery charge ৳${COD_ADVANCE_CHARGE} deduct hoyeche. Baki ৳${subtotal} cash e dite hobe.` : 'Order admin er kache pathano hoyeche! Apnar balance theke taka kata hoyeche.');
    setSelectedProduct(null);
    setActiveTab('shop');
    setFfUidInput('');
    setDeliveryName('');
    setDeliveryPhone('');
    setDeliveryAddress('');
    setSelectedSize('');
    setOrderQuantity(1);
    setOrderNote('');
  };

    const compressImage = (file, maxWidth = 500, quality = 0.6) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const scale = Math.min(1, maxWidth / img.width);
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = reject;
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
   const handleTourImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    compressImage(file).then(setNewTourImage);
  };

  const handleShopImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setNewShopImage(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleShopExtraImageUpload = (slotIdx, e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setNewShopExtraImages(prev => {
        const arr = [...prev];
        arr[slotIdx] = ev.target.result;
        return arr;
      });
    };
    reader.readAsDataURL(file);
  };

  const handleBannerImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setBannerImageInput(ev.target.result);
    reader.readAsDataURL(file);
  };

  const loadBannerFormFromSlot = (slotIdx) => {
    const b = banners[slotIdx] || { image: '', title: '', subtitle: '' };
    setEditingBannerSlot(slotIdx);
    setBannerTitleInput(b.title);
    setBannerSubtitleInput(b.subtitle);
    setBannerImageInput(b.image);
  };

  const handleSaveBanner = () => {
    if (!bannerTitleInput.trim() && !bannerImageInput) {
      showToast('Banner title ba image din');
      return;
    }
    setBanners(prev => prev.map((b, i) => i === editingBannerSlot ? { image: bannerImageInput, title: bannerTitleInput, subtitle: bannerSubtitleInput } : b));
    setShowBanner(true);
    showToast(`Banner ${editingBannerSlot + 1} update kora hoyeche!`);
  };

  const handleClearBannerSlot = () => {
    setBanners(prev => prev.map((b, i) => i === editingBannerSlot ? { image: '', title: '', subtitle: '' } : b));
    setBannerTitleInput('');
    setBannerSubtitleInput('');
    setBannerImageInput('');
    showToast(`Banner ${editingBannerSlot + 1} clear kora hoyeche!`);
  };

  const handleLogoImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setLogoInput(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSaveLogo = () => {
    if (!logoInput) {
      showToast('Notun logo image select korun');
      return;
    }
    setLogoUrl(logoInput);
    showToast('App logo update kora hoyeche!');
  };

  const loadAppSettingsForm = () => {
    setPaymentNumberInput(appSettings.paymentNumber);
    setContactNumberInput(appSettings.contactNumber);
    setTelegramLinkInput(appSettings.telegramLink);
    setWithdrawRulesInput(appSettings.withdrawRules);
  };

  const handleSaveAppSettings = () => {
    if (!paymentNumberInput.trim() || !contactNumberInput.trim()) {
      showToast('Payment number ebong contact number din');
      return;
    }
    setAppSettings({
      paymentNumber: paymentNumberInput.trim(),
      contactNumber: contactNumberInput.trim(),
      telegramLink: telegramLinkInput.trim(),
      withdrawRules: withdrawRulesInput,
    });
    showToast('App settings update kora hoyeche!');
  };

  const togglePaymentMethodEnabled = (name) => {
    const enabledCount = paymentMethodsConfig.filter(m => m.enabled).length;
    const target = paymentMethodsConfig.find(m => m.name === name);
    if (target && target.enabled && enabledCount <= 1) {
      showToast('Kompokkho ekta payment method enabled thakte hobe');
      return;
    }
    setPaymentMethodsConfig(prev => prev.map(m => m.name === name ? { ...m, enabled: !m.enabled } : m));
  };

  const handlePaymentIconUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file || !iconUploadTarget) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPaymentMethodsConfig(prev => prev.map(m => m.name === iconUploadTarget ? { ...m, icon: ev.target.result } : m));
    };
    reader.readAsDataURL(file);
  };

  const openProfileSettings = () => {
    setProfileNameInput(user.name);
    setProfileAvatarInput(user.avatar || '');
    setProfilePhoneInput(user.number || '');
    setProfileFfUidInput(user.ffUid || '');
    setShowProfileSettings(true);
  };

  const handleProfileAvatarUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setProfileAvatarInput(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = () => {
    if (!profileNameInput.trim()) {
      showToast('Naam din');
      return;
    }
    if (!profilePhoneInput.trim()) {
      showToast('Phone number din');
      return;
    }
    const patch = {
      name: profileNameInput.trim(),
      avatar: profileAvatarInput,
      number: profilePhoneInput.trim(),
      ffUid: profileFfUidInput.trim()
    };
    setUser(prev => ({ ...prev, ...patch }));
    setRegisteredUsers(prev => prev.map(u => u.uid === user.uid ? { ...u, ...patch } : u));
        updateDoc(doc(db, 'users', user.uid), patch).catch(e => console.error(e));
    setShowProfileSettings(false);
    showToast('Profile update kora hoyeche!');
  };

  const resetTourForm = () => {
    setEditingTourId(null);
    setNewTourTitle('');
    setNewTourPrize('');
    setNewTourFee('');
    setNewTourPerKill('');
    setNewTourTotalSlots('48');
    setNewTourRoomId('');
    setNewTourPass('');
    setNewTourImage('');
    setNewTourRules('');
    setNewTourTime('');
    setNewTourCategoryId('cat_br');
    setNewTourMode('SOLO');
    setNewTourPrizeTable([
      { label: 'Winner', amount: '' },
      { label: '2nd Position', amount: '' },
      { label: '3rd Position', amount: '' },
    ]);
  };

  const handleCategoryImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setNewCategoryImage(ev.target.result);
    reader.readAsDataURL(file);
  };

  const resetCategoryForm = () => {
    setEditingCategoryId(null);
    setNewCategoryName('');
    setNewCategoryImage('');
  };

  const handleSaveCategory = () => {
    if (!newCategoryName.trim()) {
      showToast('Category name din');
      return;
    }
    if (editingCategoryId) {
      setMatchCategoriesSynced(prev => prev.map(c => c.id === editingCategoryId ? { ...c, name: newCategoryName.trim(), image: newCategoryImage || c.image } : c));
      showToast('Category update kora hoyeche!');
    } else {
      setMatchCategoriesSynced(prev => [...prev, { id: 'cat_' + Date.now(), name: newCategoryName.trim(), image: newCategoryImage }]);
      showToast('Notun category add kora hoyeche!');
    }
    resetCategoryForm();
  };

  const handleEditCategory = (c) => {
    setEditingCategoryId(c.id);
    setNewCategoryName(c.name);
    setNewCategoryImage(c.image);
  };

  const handleDeleteCategory = (id) => {
    if (tournaments.some(t => t.categoryId === id)) {
      showToast('Ei category te tournament ache — age segulo shorao ba onno category te dao');
      return;
    }
    setMatchCategoriesSynced(prev => prev.filter(c => c.id !== id));
    showToast('Category remove kora hoyeche!');
  };

  const handleSaveTournament = () => {
    if (!newTourTitle || !newTourPrize || !newTourFee) {
      showToast('Shob field puron korun');
      return;
    }
    const slotsNum = parseInt(newTourTotalSlots) || 48;
    const formattedTime = newTourTime
      ? new Date(newTourTime).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true }).replace(',', '')
      : null;
    const catObj = matchCategories.find(c => c.id === newTourCategoryId);
    const catName = catObj ? catObj.name : 'BR Match';
    const cleanPrizeTable = newTourPrizeTable
      .filter(row => row.label.trim() && row.amount !== '')
      .map(row => ({ label: row.label.trim(), amount: parseFloat(row.amount) || 0 }));

    if (editingTourId) {
      setTournaments(tournaments.map(m => m.id === editingTourId ? {
        ...m,
        title: newTourTitle,
        time: formattedTime || m.time,
        prizePool: parseFloat(newTourPrize),
        entryFee: parseFloat(newTourFee),
        perKill: newTourPerKill.trim() === '' ? 10 : parseFloat(newTourPerKill),
        totalSlots: slotsNum,
        rules: newTourRules || m.rules,
        roomInfo: { id: newTourRoomId || m.roomInfo.id, pass: newTourPass || m.roomInfo.pass },
        image: newTourImage || m.image,
        categoryId: newTourCategoryId,
        category: catName,
        mode: newTourMode,
        prizeTable: cleanPrizeTable
      } : m));
      const updatedT = tournaments.find(m => m.id === editingTourId);
      setDoc(doc(db, 'tournaments', editingTourId), { ...updatedT, title: newTourTitle, prizePool: parseFloat(newTourPrize), entryFee: parseFloat(newTourFee) }).catch(e => console.error(e));
      showToast('Tournament updated!');
    } else {
      const newT = {
        id: 'm_' + Date.now(),
        category: catName,
        categoryId: newTourCategoryId,
        title: newTourTitle,
        time: formattedTime || 'TBA',
        prizePool: parseFloat(newTourPrize),
        perKill: newTourPerKill.trim() === '' ? 10 : parseFloat(newTourPerKill),
        entryFee: parseFloat(newTourFee),
        map: 'BERMUDA',
        mode: newTourMode,
        status: 'upcoming',
        started: false,
        slotsFilled: 0,
        totalSlots: slotsNum,
        image: newTourImage || '🏆',
        rules: newTourRules || 'Standard tournament rules apply.',
        roomInfo: { id: newTourRoomId || '', pass: newTourPass || '' },
        prizeTable: cleanPrizeTable
      };
      setTournaments([newT, ...tournaments]);
            setDoc(doc(db, 'tournaments', newT.id), newT).catch(e => console.error(e));
      showToast('Tournament added!');
    }

    resetTourForm();
  };

  const handleEditTournament = (t) => {
    setEditingTourId(t.id);
    setNewTourTitle(t.title);
    setNewTourPrize(String(t.prizePool));
    setNewTourFee(String(t.entryFee));
    setNewTourPerKill(String(t.perKill));
    setNewTourTotalSlots(String(t.totalSlots));
    setNewTourRoomId(t.roomInfo.id);
    setNewTourPass(t.roomInfo.pass);
    setNewTourImage(t.image);
    setNewTourRules(t.rules);
    setNewTourTime('');
    setNewTourCategoryId(t.categoryId || 'cat_br');
    setNewTourMode(t.mode || 'SOLO');
    setNewTourPrizeTable(
      t.prizeTable && t.prizeTable.length > 0
        ? t.prizeTable.map(row => ({ label: row.label, amount: String(row.amount) }))
        : [{ label: 'Winner', amount: '' }, { label: '2nd Position', amount: '' }, { label: '3rd Position', amount: '' }]
    );
  };

  const handleToggleMatchStarted = (id) => {
    const updated = tournaments.map(m => m.id === id ? { ...m, started: !m.started, status: !m.started ? 'live' : m.status } : m);
    setTournaments(updated);
    const changedT = updated.find(m => m.id === id);
    setDoc(doc(db, 'tournaments', id), changedT).catch(e => console.error(e));
    showToast('Match status update kora hoyeche!');
};

  const handleDeleteTournament = (id) => {
    setTournaments(tournaments.filter(t => t.id !== id));
    deleteDoc(doc(db, 'tournaments', id)).catch(e => console.error(e));
    showToast('Tournament remove kora hoyeche!');
  };

  // ---------- Command to Automated: repeat a tournament every day at the same time ----------
  const handleAutomateDaily = (mt) => {
    if (automatedTemplates.some(tpl => tpl.sourceTitle === mt.title && tpl.timeLabel === (mt.time || '').split(' ').slice(-2).join(' '))) {
      showToast('Ei match already daily automation e ache!');
      return;
    }
    // Keep just the time-of-day (e.g. "11:30 AM") from the full "YYYY-MM-DD HH:MM AM" string.
    const parts = (mt.time || '').trim().split(' ');
    const timeLabel = parts.length >= 2 ? parts.slice(-2).join(' ') : (mt.time || 'TBA');
    const template = {
      id: 'tpl_' + Date.now(),
      sourceTitle: mt.title,
      title: mt.title,
      category: mt.category,
      categoryId: mt.categoryId,
      mode: mt.mode,
      entryFee: mt.entryFee,
      perKill: mt.perKill,
      prizePool: mt.prizePool,
      prizeTable: mt.prizeTable || [],
      totalSlots: mt.totalSlots,
      map: mt.map,
      image: mt.image,
      rules: mt.rules,
      timeLabel,
      lastGeneratedDate: new Date().toDateString(), // today's real one already exists, so start counting from tomorrow
    };
    setAutomatedTemplates(prev => [...prev, template]);
    showToast(`"${mt.title}" ekhon protidin ${timeLabel}-e automatic add hobe!`);
  };

  const handleRemoveTemplate = (templateId) => {
    setAutomatedTemplates(prev => prev.filter(tpl => tpl.id !== templateId));
    showToast('Daily automation theke sriye deya hoyeche.');
  };

  const resetShopForm = () => {
    setEditingShopId(null);
    setNewShopTitle('');
    setNewShopPrice('');
    setNewShopOldPrice('');
    setNewShopDiscount('');
    setNewShopType('diamond');
    setNewShopSizes('');
    setNewShopImage('');
    setNewShopExtraImages(['', '', '']);
    setNewShopDescription('');
    setNewShopPackageItems('');
    setNewShopFeatures('');
    setNewShopCourier('PATHAO COURIER');
  };

  const handleSaveShopItem = () => {
    if (!newShopTitle || !newShopPrice) {
      showToast('Shob field puron korun');
      return;
    }
    const sizesArr = newShopSizes.split(',').map(s => s.trim()).filter(Boolean);
    const packageArr = newShopPackageItems.split('\n').map(s => s.trim()).filter(Boolean);
    const featuresArr = newShopFeatures.split('\n').map(s => s.trim()).filter(Boolean);
    const imagesArr = [newShopImage, ...newShopExtraImages].filter(Boolean);
    if (editingShopId) {
     setShopItemsSynced(shopItems.map(i => i.id === editingShopId ? {
        ...i,
        title: newShopTitle,
        price: parseFloat(newShopPrice),
        oldPrice: newShopOldPrice ? parseFloat(newShopOldPrice) : i.oldPrice,
        discount: newShopDiscount || i.discount,
        type: newShopType,
        sizes: sizesArr,
        image: newShopImage || i.image,
        images: imagesArr.length > 0 ? imagesArr : (i.images || []),
        description: newShopDescription,
        packageItems: packageArr,
        features: featuresArr,
        courier: newShopCourier
      } : i));
      showToast('Shop item updated!');
    } else {
      setShopItemsSynced([{
        id: 'd_' + Date.now(),
        title: newShopTitle,
        type: newShopType,
        price: parseFloat(newShopPrice),
        oldPrice: newShopOldPrice ? parseFloat(newShopOldPrice) : parseFloat(newShopPrice) + 50,
        discount: newShopDiscount || '-20%',
        sizes: sizesArr,
        image: newShopImage || '💎',
        images: imagesArr,
        description: newShopDescription,
        packageItems: packageArr,
        features: featuresArr,
        courier: newShopCourier
      }, ...shopItems]);
      showToast('Shop item added!');
    }
    resetShopForm();
  };

  const handleEditShopItem = (i) => {
    setEditingShopId(i.id);
    setNewShopTitle(i.title);
    setNewShopPrice(String(i.price));
    setNewShopOldPrice(i.oldPrice ? String(i.oldPrice) : '');
    setNewShopDiscount(i.discount || '');
    setNewShopType(i.type || 'diamond');
    setNewShopSizes((i.sizes || []).join(', '));
    setNewShopImage(i.image);
    const existingImages = i.images || [];
    setNewShopExtraImages([existingImages[1] || '', existingImages[2] || '', existingImages[3] || '']);
    setNewShopDescription(i.description || '');
    setNewShopPackageItems((i.packageItems || []).join('\n'));
    setNewShopFeatures((i.features || []).join('\n'));
    setNewShopCourier(i.courier || 'PATHAO COURIER');
  };

  const handleDeleteShopItem = (id) => {
   setShopItemsSynced(shopItems.filter(i => i.id !== id));
    showToast('Shop item remove kora hoyeche!');
  };

  const handleApproveDeposit = (dep) => {
    applyBalanceChange(dep.uid, { deposit: dep.amount, totalDeposited: dep.amount });
    setPendingDeposits(pendingDeposits.filter(d => d.id !== dep.id));
    deleteDoc(doc(db, 'pendingDeposits', dep.id)).catch(e => console.error(e));
    setUserNotifications(prev => [{ id: 'not_' + Date.now(), title: 'Deposit Approved', message: `Apnar ${dep.amount} Taka deposit request approve hoyeche.`, time: 'Just now', targetUid: dep.uid }, ...prev]);
    showToast('Deposit approve kora hoyeche!');
  };

  const handleApproveWithdrawal = (wit) => {
    const bal = getUserBalance(wit.uid);
    let remaining = wit.amount;
    let deductWinning = 0;
    let deductDeposit = 0;
    if (bal.winningBalance >= remaining) {
      deductWinning = remaining;
    } else {
      deductWinning = bal.winningBalance;
      deductDeposit = remaining - bal.winningBalance;
    }
    applyBalanceChange(wit.uid, { winning: -deductWinning, deposit: -deductDeposit, totalWithdrawn: wit.amount });
    setPendingWithdrawals(pendingWithdrawals.filter(w => w.id !== wit.id));
    deleteDoc(doc(db, 'pendingWithdrawals', wit.id)).catch(e => console.error(e));
    setUserNotifications(prev => [{ id: 'not_' + Date.now(), title: 'Withdraw Approved', message: `Apnar ${wit.amount} Taka withdraw request approve hoyeche.`, time: 'Just now', targetUid: wit.uid }, ...prev]);
    showToast('Withdraw approve kora hoyeche!');
  };

  const handleApproveShopOrder = (ord) => {
    // Money was already deducted when the order was placed — approving just changes status.
    const nextStatus = ord.type === 'product' ? 'accepted' : 'delivered';
    setPendingShopOrders(prev => prev.map(o => o.id === ord.id ? { ...o, status: nextStatus } : o));
    setUserNotifications(prev => [{
      id: 'not_' + Date.now(),
      title: nextStatus === 'delivered' ? 'Order Delivered' : 'Order Accepted',
      message: nextStatus === 'delivered'
        ? `Apnar "${ord.itemTitle}" order successfully deliver kora hoyeche.`
        : `Apnar "${ord.itemTitle}" order accept kora hoyeche. Shiggroi delivery hobe.`,
      time: 'Just now',
      targetUid: ord.uid
    }, ...prev]);
    showToast('Order approve kora hoyeche!');
  };

  const handleMarkDelivered = (ord) => {
    setPendingShopOrders(prev => prev.map(o => o.id === ord.id ? { ...o, status: 'delivered' } : o));
    setUserNotifications(prev => [{ id: 'not_' + Date.now(), title: 'Order Delivered', message: `Apnar "${ord.itemTitle}" order deliver hoye geche.`, time: 'Just now', targetUid: ord.uid }, ...prev]);
    showToast('Delivered mark kora hoyeche!');
  };

  // Builds a snapshot of THIS user's own real data (balance, their own orders, their own
  // joined matches/results) so the assistant can answer specific questions accurately —
  // scoped to only this account, never other users' data or platform-wide business info.
  const buildUserContextBrief = (uid) => {
    const target = registeredUsers.find(u => u.uid === uid) || (uid === user.uid ? user : null);
    if (!target) return 'No account data available for this user.';
    const myOrders = pendingShopOrders.filter(o => o.uid === uid);
    const myJoinedMatches = tournaments.filter(mt => (matchParticipants[mt.id] || []).some(p => p.accountUid === uid));
    const lines = [];
    lines.push(`Name: ${target.name}, UID: ${target.uid}`);
    lines.push(`Deposit Balance: ৳${target.depositBalance ?? 0}, Winning Balance: ৳${target.winningBalance ?? 0}, Total Deposited: ৳${target.totalDeposited ?? 0}, Total Withdrawn: ৳${target.totalWithdrawn ?? 0}`);
    if (myOrders.length > 0) {
      lines.push('Recent orders:');
      myOrders.slice(0, 8).forEach(o => {
        lines.push(`- ${o.itemTitle} (৳${o.price}) — status: ${o.status}${o.rejectReason ? `, reject reason: ${o.rejectReason}` : ''}`);
      });
    } else {
      lines.push('No orders placed yet.');
    }
    if (myJoinedMatches.length > 0) {
      lines.push('Joined matches:');
      myJoinedMatches.slice(0, 8).forEach(mt => {
        const hist = matchResultsHistory[mt.id];
        const myResult = hist ? hist.winners.find(w => (w.accountUid || '').trim() === uid) : null;
        lines.push(`- ${mt.title} (${mt.time}) — status: ${mt.status}${mt.started ? ' [started]' : ''}${myResult ? `, result: rank #${myResult.rank}, ${myResult.points} points, prize ৳${myResult.prize}` : ', result: not declared yet'}`);
      });
    } else {
      lines.push('Has not joined any matches yet.');
    }
    return lines.join('\n');
  };

  // ---------- AI Support Assistant ("Ask Your Problem") ----------
  // System prompt = the user's role/tone/constraints brief + live app facts (payment
  // methods, rules, contact info) + this specific user's own account snapshot.
  const buildSupportSystemPrompt = (uid) => {
    const methods = paymentMethodsConfig.filter(m => m.enabled).map(m => m.name).join(', ');
    return `Role: You are the core AI Assistant and Customer Support Agent for "UR FF TOUR", a Bangladeshi Free Fire tournament app. Your job is to assist users 24/7, answer their queries, and handle conversations when the human admin is offline.

Core Responsibilities:
1. User Problem Solving: When a user enters the "Ask Your Problem" section, listen carefully to their issues regarding the app or related topics and provide accurate, helpful, and friendly solutions.
2. Comprehensive Knowledge: You possess complete knowledge about all features, details, and rules of this application (given below), AND the specific account details of the user you're currently talking to (also given below). Always guide users based on the app's actual functionalities and their real order/match history.
3. Tone and Behavior: Be polite, professional, empathetic, and patient. Speak in the user's preferred language (support Bengali and English naturally) — match whichever language the user writes in.
4. Admin Escalation: If a user's problem is too complex, requires human intervention, or if the user explicitly asks to talk to a human admin, politely inform them: "I am noting down your concern. Our admin will review this and get back to you soon." (say this in the user's language).
5. Autonomy: Act reliably in the absence of the human admin, ensuring no user feels ignored.

Constraints:
- Never provide false or misleading information about the app.
- If you do not know a specific internal detail, admit it gracefully and suggest contacting the admin.
- Keep your answers clear, concise, and structured (use bullet points if necessary).
- Never invent balances, transaction statuses, order/withdrawal decisions, or match results — use only the real account snapshot given below; for anything not in that snapshot, say the admin will check personally.
- Only discuss THIS user's own orders, matches, wallet, and general app functionality. Never discuss other users' accounts, the admin's personal information, or the platform's internal business/financial data (revenue, other users' balances, admin decisions not related to this user).
- If the user sends a voice message that could not be transcribed, or an image, acknowledge it and ask a clarifying question if the content isn't clear enough to act on.

App facts you can rely on when answering:
- Users join Free Fire tournaments (Solo/Duo/Squad) by paying an entry fee from their wallet (Deposit Balance + Winning Balance). Duo costs 2x entry fee, Squad costs 4x.
- Deposit money via: ${methods || 'bKash/Nagad'} to the number shown on the Add Money screen.
- Withdrawals: minimum ৳100, requested from Wallet > Withdraw using the user's total balance; admin approves manually.
- Shop has two sections: Diamond Top-up (Free Fire UID top-ups) and Products (physical items — Cash on Delivery charges a ৳150 advance now and the rest on delivery, or pay the full amount online via wallet).
- New accounts get a ৳30 signup bonus. Referral code (a friend's UID) earns the referrer ৳5.
- Users can see joined matches in "My Match" and overall winners in "UR FF ALL MATCH RESULTS". Joined matches disappear from "My Match" 24 hours after the match time or 24 hours after results are declared, whichever is later.
- Balance Share lets a user send wallet balance to another user's UID for a ৳5 fee.
- Support contact number: ${appSettings.contactNumber || 'not set'}. Telegram: ${appSettings.telegramLink || 'not set'}.

This user's own account snapshot (only ever discuss this account with this user, never anyone else's):
${buildUserContextBrief(uid)}`;
  };

  const fetchAiSupportReply = async (uid, conversation) => {
    try {
      // Build proper multi-modal content: images go in as real image blocks (Claude can see
      // them), voice messages use their transcript when available.
      const apiMessages = conversation
        .filter(m => m.sender === 'user' || m.sender === 'ai') // the API only sees user/assistant turns
        .map(m => {
          const role = m.sender === 'user' ? 'user' : 'assistant';
          if (m.type === 'image' && m.imageUrl) {
            const match = m.imageUrl.match(/^data:(image\/[a-zA-Z]+);base64,(.*)$/);
            if (match) {
              const content = [{ type: 'image', source: { type: 'base64', media_type: match[1], data: match[2] } }];
              if (m.text) content.push({ type: 'text', text: m.text });
              return { role, content };
            }
          }
          if (m.type === 'voice') {
            return { role, content: m.transcript ? m.transcript : '[User sent a voice message that could not be transcribed.]' };
          }
          return { role, content: m.text || '' };
        });

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 400,
          system: buildSupportSystemPrompt(uid),
          messages: apiMessages
        })
      });
      const data = await response.json();
      const textBlock = (data.content || []).find(b => b.type === 'text');
      const replyText = textBlock ? textBlock.text : 'Dukkhito, ekhon uttor dite parlam na. Admin shiggroi reply korbe.';
      setSupportChats(prev => {
        const thread = prev[uid] || { messages: [], aiEnabled: true };
        return {
          ...prev,
          [uid]: { ...thread, messages: [...thread.messages, { sender: 'ai', text: replyText, time: 'Just now' }] }
        };
      });
    } catch (err) {
      setSupportChats(prev => {
        const thread = prev[uid] || { messages: [], aiEnabled: true };
        return {
          ...prev,
          [uid]: { ...thread, messages: [...thread.messages, { sender: 'ai', text: 'Ekhon assistant e shomossha hocche. Admin ke sরাসরি contact korun ba pore try korun.', time: 'Just now' }] }
        };
      });
    }
  };

  const handleSendSupportMessage = () => {
    const text = supportChatInput.trim();
    if (!text) return;
    const uid = user.uid;
    const existing = supportChats[uid] || { messages: [], aiEnabled: true };
    const updatedMessages = [...existing.messages, { sender: 'user', text, time: 'Just now' }];
    setSupportChats(prev => ({ ...prev, [uid]: { ...existing, messages: updatedMessages } }));
    setSupportChatInput('');
    if (existing.aiEnabled !== false) {
      setSupportChatLoading(true);
      fetchAiSupportReply(uid, updatedMessages).finally(() => setSupportChatLoading(false));
    }
  };

  // Shared appenders for image/voice messages from either side of a support chat.
  const appendUserChatMessage = (uid, message, triggerAi) => {
    const existing = supportChats[uid] || { messages: [], aiEnabled: true };
    const updatedMessages = [...existing.messages, message];
    setSupportChats(prev => ({ ...prev, [uid]: { ...existing, messages: updatedMessages } }));
    if (triggerAi && existing.aiEnabled !== false) {
      setSupportChatLoading(true);
      fetchAiSupportReply(uid, updatedMessages).finally(() => setSupportChatLoading(false));
    }
  };

  const handleUserChatImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      appendUserChatMessage(user.uid, { sender: 'user', type: 'image', imageUrl: ev.target.result, text: '', time: 'Just now' }, true);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleAdminChatImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file || !adminSupportSelectedUid) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const uid = adminSupportSelectedUid;
      const existing = supportChats[uid] || { messages: [], aiEnabled: true };
      setSupportChats(prev => ({
        ...prev,
        [uid]: { ...existing, messages: [...existing.messages, { sender: 'admin', type: 'image', imageUrl: ev.target.result, text: '', time: 'Just now' }] }
      }));
      setUserNotifications(prev => [{ id: 'not_' + Date.now(), title: 'Admin Replied', message: 'Apnar "Ask Your Problem" chat e admin ekta chobi pathiyeche.', time: 'Just now', targetUid: uid }, ...prev]);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Voice recording via the browser's MediaRecorder API (works without any backend).
  // We also try the Web Speech API for a live transcript so the AI assistant can
  // understand what was said — if that's unavailable, playback still works for humans,
  // and the AI is told the voice note couldn't be transcribed.
  const startVoiceRecording = async (forAdmin) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      audioChunksRef.current = [];
      let liveTranscript = '';

      const SpeechRecognitionApi = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognitionApi) {
        const recognition = new SpeechRecognitionApi();
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.onresult = (event) => {
          for (let i = event.resultIndex; i < event.results.length; i++) {
            liveTranscript += event.results[i][0].transcript + ' ';
          }
        };
        recognition.start();
        speechRecognitionRef.current = recognition;
      } else {
        speechRecognitionRef.current = null;
      }

      recorder.ondataavailable = (e) => { if (e.data.size > 0) audioChunksRef.current.push(e.data); };
      recorder.onstop = () => {
        stream.getTracks().forEach(tr => tr.stop());
        if (speechRecognitionRef.current) {
          try { speechRecognitionRef.current.stop(); } catch (e) {}
        }
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(blob);
        const transcript = liveTranscript.trim();
        const message = { sender: forAdmin ? 'admin' : 'user', type: 'voice', audioUrl, transcript, text: transcript, time: 'Just now' };
        if (forAdmin && adminSupportSelectedUid) {
          const uid = adminSupportSelectedUid;
          const existing = supportChats[uid] || { messages: [], aiEnabled: true };
          setSupportChats(prev => ({ ...prev, [uid]: { ...existing, messages: [...existing.messages, message] } }));
          setUserNotifications(prev => [{ id: 'not_' + Date.now(), title: 'Admin Replied', message: 'Apnar "Ask Your Problem" chat e admin ekta voice message pathiyeche.', time: 'Just now', targetUid: uid }, ...prev]);
        } else if (!forAdmin) {
          appendUserChatMessage(user.uid, message, true);
        }
      };
      mediaRecorderRef.current = recorder;
      recorder.start();
      if (forAdmin) setIsRecordingVoiceAdmin(true); else setIsRecordingVoice(true);
    } catch (err) {
      showToast('Microphone access pawa jayni. Browser permission check korun.');
    }
  };

  const stopVoiceRecording = (forAdmin) => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (forAdmin) setIsRecordingVoiceAdmin(false); else setIsRecordingVoice(false);
  };

  const handleAdminSendSupportMessage = () => {
    const text = adminSupportInput.trim();
    if (!text || !adminSupportSelectedUid) return;
    const uid = adminSupportSelectedUid;
    const existing = supportChats[uid] || { messages: [], aiEnabled: true };
    setSupportChats(prev => ({
      ...prev,
      [uid]: { ...existing, messages: [...existing.messages, { sender: 'admin', text, time: 'Just now' }] }
    }));
    setUserNotifications(prev => [{ id: 'not_' + Date.now(), title: 'Admin Replied', message: 'Apnar "Ask Your Problem" chat e admin reply diyeche.', time: 'Just now', targetUid: uid }, ...prev]);
    setAdminSupportInput('');
  };

  const toggleAiForThread = (uid) => {
    setSupportChats(prev => {
      const thread = prev[uid] || { messages: [], aiEnabled: true };
      return { ...prev, [uid]: { ...thread, aiEnabled: !(thread.aiEnabled !== false) } };
    });
  };

  // ---------- Admin: Player Database & Ban Controls ----------
  const handleBanUser = (uid, durationDays) => {
    const banUntil = durationDays === 'permanent' ? 'permanent' : Date.now() + durationDays * 24 * 60 * 60 * 1000;
    setRegisteredUsers(prev => prev.map(u => u.uid === uid ? { ...u, banUntil, banReason: adminBanReason.trim() || 'Rules violation' } : u));
    setUserNotifications(prev => [{
      id: 'not_' + Date.now(),
      title: 'Account Banned',
      message: durationDays === 'permanent'
        ? `Apnar account permanently ban kora hoyeche.${adminBanReason.trim() ? ' Karon: ' + adminBanReason.trim() : ''}`
        : `Apnar account ${durationDays} diner jonno ban kora hoyeche.${adminBanReason.trim() ? ' Karon: ' + adminBanReason.trim() : ''}`,
      time: 'Just now',
      targetUid: uid
    }, ...prev]);
    setAdminBanReason('');
    showToast('User ban kora hoyeche!');
  };

  const handleUnbanUser = (uid) => {
    setRegisteredUsers(prev => prev.map(u => u.uid === uid ? { ...u, banUntil: null, banReason: '' } : u));
    setUserNotifications(prev => [{ id: 'not_' + Date.now(), title: 'Account Unbanned', message: 'Apnar account abar active kora hoyeche.', time: 'Just now', targetUid: uid }, ...prev]);
    showToast('User unban kora hoyeche!');
  };

  const handleBalanceShare = () => {
    const amt = parseFloat(shareAmount);
    const targetUid = shareTargetUid.trim();
    if (!targetUid || !amt || amt <= 0) {
      showToast('Target UID ebong sothik amount din');
      return;
    }
    if (targetUid === user.uid) {
      showToast('Nijer UID te balance pathano jabe na!');
      return;
    }
    const target = registeredUsers.find(u => u.uid === targetUid);
    if (!target) {
      showToast('Ei UID diye kono account paoa jayni');
      return;
    }
    const totalCost = amt + BALANCE_SHARE_FEE;
    const totalWallet = user.depositBalance + user.winningBalance;
    if (totalWallet < totalCost) {
      showToast(`Oporjapto balance! (৳${amt} + ৳${BALANCE_SHARE_FEE} fee = ৳${totalCost} lagbe)`);
      return;
    }
    let remaining = totalCost;
    let deductDeposit = 0;
    let deductWinning = 0;
    if (user.depositBalance >= remaining) {
      deductDeposit = remaining;
    } else {
      deductDeposit = user.depositBalance;
      deductWinning = remaining - user.depositBalance;
    }
    applyBalanceChange(user.uid, { deposit: -deductDeposit, winning: -deductWinning });
    applyBalanceChange(targetUid, { deposit: amt });
    setUserNotifications(prev => [{ id: 'not_' + Date.now(), title: 'Balance Peyechen! 🎁', message: `${user.name} (${user.uid}) apnake ৳${amt} pathiyeche.`, time: 'Just now', targetUid: targetUid }, ...prev]);
    setShowBalanceShare(false);
    setShareTargetUid('');
    setShareAmount('');
    showToast(`৳${amt} shafolvabe pathano hoyeche!`);
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      showToast('Reject korar karon likhun');
      return;
    }
    const { type, item } = rejectModalData;
    if (type === 'deposit') setPendingDeposits(pendingDeposits.filter(d => d.id !== item.id));
    if (type === 'withdrawal') setPendingWithdrawals(pendingWithdrawals.filter(w => w.id !== item.id));
    if (type === 'deposit') deleteDoc(doc(db, 'pendingDeposits', item.id)).catch(e => console.error(e));
if (type === 'withdrawal') deleteDoc(doc(db, 'pendingWithdrawals', item.id)).catch(e => console.error(e));
    if (type === 'order') {
      // Refund exactly what was deducted at order time, and keep the order visible with a rejected status.
      applyBalanceChange(item.uid, { deposit: item.deductedDeposit || 0, winning: item.deductedWinning || 0 });
      setPendingShopOrders(prev => prev.map(o => o.id === item.id ? { ...o, status: 'rejected', rejectReason: rejectionReason } : o));
    }

    setUserNotifications(prev => [{ id: 'not_' + Date.now(), title: 'Request Rejected', message: `Karon: ${rejectionReason}`, time: 'Just now', targetUid: item.uid }, ...prev]);
    setRejectModalData(null);
    setRejectionReason('');
    showToast('Reject kora hoyeche!');
  };

  const handleSendNotification = () => {
    if (!notifTitle.trim() || !notifMessage.trim()) {
      showToast('Title ebong message din');
      return;
    }
    setUserNotifications(prev => [{ id: 'not_' + Date.now(), title: notifTitle, message: notifMessage, time: 'Just now', targetUid: notifTargetUid.trim() || 'ALL' }, ...prev]);
    setNotifTitle('');
    setNotifMessage('');
    setNotifTargetUid('');
    showToast('Notification pathano hoyeche!');
  };

  const handleDeclareResults = () => {
    if (!matchResultsModal) return;
    // Credit EVERY winner's own account by UID — not just whoever is currently logged in.
    // Aggregate the current session's total first so multiple rows for the same live
    // account don't overwrite each other (registeredUsers updates use functional form,
    // so other accounts always accumulate correctly even with repeated UIDs).
    let myTotal = 0;
    winnerEntries.forEach(w => {
      const prize = parseFloat(w.prize) || 0;
      const uid = (w.accountUid || '').trim();
      if (!uid || prize <= 0) return;
      if (uid === user.uid) {
        myTotal += prize;
      } else {
        applyBalanceChange(uid, { winning: prize });
      }
    });
    if (myTotal > 0) {
      applyBalanceChange(user.uid, { winning: myTotal });
    }
    setTournaments(tournaments.map(m => m.id === matchResultsModal.id ? { ...m, status: 'completed' } : m));
    setDoc(doc(db, 'tournaments', matchResultsModal.id), { ...matchResultsModal, status: 'completed' }).catch(e => console.error(e));
    setMatchResultsHistory(prev => ({
      ...prev,
      [matchResultsModal.id]: {
        title: matchResultsModal.title,
        category: matchResultsModal.category,
        declaredAt: new Date().toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true }),
        declaredAtMs: Date.now(),
        declaredAtISO: new Date().toISOString(),
        winners: winnerEntries.filter(w => (w.accountUid || '').trim()).map(w => ({ ...w }))
      }
    }));
    winnerEntries.forEach(w => {
      setUserNotifications(prev => [{ id: 'not_' + Date.now() + Math.random(), title: 'Congratulations! 🏆', message: `Apni "${matchResultsModal.title}" match e Rank #${w.rank} hoyechen. Prize: ${w.prize} Taka.`, time: 'Just now', targetUid: w.accountUid }, ...prev]);
    });
    setMatchResultsModal(null);
    setWinnerEntries([{ name: '', accountUid: '', rank: '', prize: '', points: '' }]);
    showToast('Result declare kora hoyeche!');
  };

  // Notifications auto-expire 1 week after they were created (id embeds the creation
  // timestamp), so old ones quietly drop off and don't pile up forever.
  const NOTIFICATION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
  const myNotifications = userNotifications.filter(n => {
    if (n.targetUid !== user.uid && n.targetUid !== 'ALL') return false;
    const createdAt = parseInt((n.id || '').replace('not_', ''), 10);
    if (!createdAt || isNaN(createdAt)) return true;
    return (Date.now() - createdAt) < NOTIFICATION_MAX_AGE_MS;
  });

  const t = darkMode
    ? { bg: 'bg-slate-950', card: 'bg-slate-900', border: 'border-slate-800', text: 'text-slate-100', sub: 'text-slate-400', input: 'bg-slate-950 border-slate-800' }
    : { bg: 'bg-slate-50', card: 'bg-white', border: 'border-slate-200', text: 'text-slate-900', sub: 'text-slate-500', input: 'bg-slate-50 border-slate-200' };

  const isImageUrl = (val) => typeof val === 'string' && (val.startsWith('data:image') || val.startsWith('http'));

  // ---------- AUTH SCREENS ----------
  if (activeTab === 'login' || activeTab === 'register') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 font-sans select-none">
        {toastMessage && (
          <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 bg-indigo-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-2 animate-bounce">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium text-sm">{toastMessage}</span>
          </div>
        )}

        <div className="w-full max-w-sm p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-5">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl overflow-hidden mx-auto shadow-xl border border-slate-800">
              <img src={logoUrl} alt="URFF E-SPORTS" className="w-full h-full object-cover" />
            </div>
            <h2 className="font-black text-xl bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">UR FF TOUR</h2>
            <p className="text-xs text-slate-400">Bangladesh Free Fire Tournament Platform</p>
          </div>

          {activeTab === 'login' ? (
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-400">Phone Number</label>
                <input
                  type="text"
                  value={loginNumber}
                  onChange={(e) => setLoginNumber(e.target.value)}
                  placeholder="017XXXXXXXX"
                  className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl text-xs text-white mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400">Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl text-xs text-white mt-1"
                />
              </div>

              <button
                onClick={handleLogin}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg"
              >
                LOGIN
              </button>

              <p className="text-center text-xs text-slate-400 pt-2">
                Don't have an account? <span onClick={() => setActiveTab('register')} className="text-indigo-400 font-bold cursor-pointer underline">Register</span>
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400">Username</label>
                <input
                  type="text"
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                  placeholder="Your Name"
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-xs text-white mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400">Phone Number (Max 3 accounts)</label>
                <input
                  type="text"
                  value={regNumber}
                  onChange={(e) => setRegNumber(e.target.value)}
                  placeholder="017XXXXXXXX"
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-xs text-white mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400">Password</label>
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-xs text-white mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400">Gmail Name</label>
                <input
                  type="email"
                  value={regGmail}
                  onChange={(e) => setRegGmail(e.target.value)}
                  placeholder="yourname@gmail.com"
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-xs text-white mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400">Referral Code (Optional)</label>
                <input
                  type="text"
                  value={regReferralCode}
                  onChange={(e) => setRegReferralCode(e.target.value)}
                  placeholder="Friend-er UID (jodi thake)"
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-xs text-white mt-1"
                />
              </div>

              <button
                onClick={handleRegister}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg mt-2"
              >
                REGISTER
              </button>

              <p className="text-center text-xs text-slate-400 pt-2">
                Already have an account? <span onClick={() => setActiveTab('login')} className="text-indigo-400 font-bold cursor-pointer underline">Login</span>
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ---------- SHARED PIECES (no inputs — safe as nested helpers) ----------
  const Toast = toastMessage && (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 bg-indigo-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-2 animate-bounce max-w-[90%]">
      <AlertCircle className="w-5 h-5 flex-shrink-0" />
      <span className="font-medium text-sm">{toastMessage}</span>
    </div>
  );

  const StatusBadge = ({ status, full, started }) => {
    if (full) {
      return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-slate-600/40 text-slate-300 border-slate-500/50">FULL</span>;
    }
    const map = {
      live: { label: started ? 'MATCH STARTED' : 'LIVE', cls: 'bg-red-500/20 text-red-400 border-red-500/40' },
      upcoming: { label: 'UPCOMING', cls: 'bg-amber-500/20 text-amber-400 border-amber-500/40' },
      completed: { label: 'COMPLETED', cls: 'bg-slate-500/20 text-slate-400 border-slate-500/40' },
    };
    const s = map[status] || map.upcoming;
    return <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${s.cls}`}>{s.label}</span>;
  };

  const IconBox = ({ value, size = 'w-12 h-12', textSize = 'text-2xl' }) => (
    <div className={`${size} rounded-xl bg-gradient-to-tr from-indigo-600/20 to-violet-500/20 flex items-center justify-center ${textSize} border border-indigo-500/20 overflow-hidden flex-shrink-0`}>
      {isImageUrl(value) ? <img src={value} alt="" className="w-full h-full object-cover" /> : (value || '🏆')}
    </div>
  );

  const renderPaymentMethodSelector = () => {
    const enabledMethods = paymentMethodsConfig.filter(m => m.enabled);
    return (
      <div className="space-y-2">
        {enabledMethods.map(pm => (
          <button
            key={pm.name}
            type="button"
            onClick={() => setPaymentMethod(pm.name)}
            className={`w-full flex items-center space-x-3 p-2.5 rounded-xl border ${paymentMethod === pm.name ? 'border-indigo-500 bg-indigo-500/10' : `${t.input}`}`}
          >
            <div className={`w-8 h-8 rounded-full ${pm.icon ? '' : pm.color} flex items-center justify-center text-white text-[10px] font-black flex-shrink-0 overflow-hidden`}>
              {pm.icon ? <img src={pm.icon} alt="" className="w-full h-full object-cover" /> : pm.abbr}
            </div>
            <span className="text-xs font-bold flex-1 text-left">{pm.name}</span>
            {paymentMethod === pm.name && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
          </button>
        ))}
      </div>
    );
  };

  const TournamentCard = ({ mt }) => (
    <div
      onClick={() => { setMatchDetailView(mt); setShowTotalPrizeInfo(false); }}
      className={`${t.card} border ${t.border} rounded-2xl p-4 space-y-3 cursor-pointer hover:border-indigo-500/50 transition-colors`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <IconBox value={mt.image} />
          <div>
            <p className={`text-[10px] ${t.sub} font-semibold`}>{mt.category}</p>
            <h3 className="font-bold text-sm">{mt.title}</h3>
          </div>
        </div>
        <StatusBadge status={mt.status} full={mt.slotsFilled >= mt.totalSlots} started={mt.started} />
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div className={`${darkMode ? 'bg-slate-950' : 'bg-slate-100'} rounded-lg py-2`}>
          <p className="text-[10px] text-slate-500">Prize Pool</p>
          <p className="text-xs font-bold text-emerald-400">৳{mt.prizePool}</p>
        </div>
        <div className={`${darkMode ? 'bg-slate-950' : 'bg-slate-100'} rounded-lg py-2`}>
          <p className="text-[10px] text-slate-500">Per Kill</p>
          <p className="text-xs font-bold text-cyan-400">৳{mt.perKill}</p>
        </div>
        <div className={`${darkMode ? 'bg-slate-950' : 'bg-slate-100'} rounded-lg py-2`}>
          <p className="text-[10px] text-slate-500">Entry Fee</p>
          <p className="text-xs font-bold text-indigo-400">৳{mt.entryFee}</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px]">
        <div className="flex items-center space-x-1 text-slate-400">
          <Clock className="w-3 h-3" />
          <span>{mt.time}</span>
        </div>
        <div className="flex items-center space-x-1 text-slate-400">
          <Users className="w-3 h-3" />
          <span>{mt.slotsFilled}/{mt.totalSlots}</span>
        </div>
      </div>

      <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-violet-500"
          style={{ width: `${Math.min(100, (mt.slotsFilled / mt.totalSlots) * 100)}%` }}
        />
      </div>

      {isJoinedByMe(mt.id) && (
        <div className="flex items-center justify-center space-x-1 text-emerald-400 text-xs font-semibold bg-emerald-500/10 rounded-lg py-1.5">
          <CheckCircle className="w-3.5 h-3.5" />
          <span>Joined</span>
        </div>
      )}
    </div>
  );

  // ---------- MATCH DETAIL VIEW ----------
  if (matchDetailView) {
    const mt = tournaments.find(m => m.id === matchDetailView.id) || matchDetailView;
    const isJoined = isJoinedByMe(mt.id);
    return (
      <div className={`min-h-screen ${t.bg} ${t.text} font-sans pb-24 select-none`}>
        {Toast}
        <header className={`sticky top-0 z-40 px-4 py-3 flex items-center space-x-3 border-b ${t.border} ${darkMode ? 'bg-slate-900/90' : 'bg-white/90'} backdrop-blur-md`}>
          <button onClick={() => setMatchDetailView(null)} className="p-1"><ArrowLeft className="w-5 h-5" /></button>
          <h1 className="font-bold text-sm">Match Details</h1>
        </header>

        <div className="p-4 space-y-4">
          <div className={`${t.card} border ${t.border} rounded-2xl p-5 text-center space-y-2`}>
            <div className="mx-auto"><IconBox value={mt.image} size="w-16 h-16" textSize="text-3xl" /></div>
            <h2 className="font-black text-lg">{mt.title}</h2>
            <div className="flex justify-center"><StatusBadge status={mt.status} /></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className={`${t.card} border ${t.border} rounded-xl p-3 flex items-center space-x-2`}>
              <Trophy className="w-4 h-4 text-emerald-400" />
              <div><p className="text-[10px] text-slate-500">Prize Pool</p><p className="text-sm font-bold">৳{mt.prizePool}</p></div>
            </div>
            <div className={`${t.card} border ${t.border} rounded-xl p-3 flex items-center space-x-2`}>
              <Crosshair className="w-4 h-4 text-cyan-400" />
              <div><p className="text-[10px] text-slate-500">Per Kill</p><p className="text-sm font-bold">৳{mt.perKill}</p></div>
            </div>
            <div className={`${t.card} border ${t.border} rounded-xl p-3 flex items-center space-x-2`}>
              <MapPin className="w-4 h-4 text-violet-400" />
              <div><p className="text-[10px] text-slate-500">Map</p><p className="text-sm font-bold">{mt.map}</p></div>
            </div>
            <div className={`${t.card} border ${t.border} rounded-xl p-3 flex items-center space-x-2`}>
              <Users className="w-4 h-4 text-amber-400" />
              <div><p className="text-[10px] text-slate-500">Mode</p><p className="text-sm font-bold">{mt.mode}</p></div>
            </div>
          </div>

          <div className={`${t.card} border ${t.border} rounded-xl p-4 space-y-1`}>
            <p className="text-xs font-bold text-slate-400">Match Time</p>
            <p className="text-sm font-semibold">{mt.time}</p>
          </div>

          <div className={`${t.card} border ${t.border} rounded-xl p-4 space-y-1`}>
            <p className="text-xs font-bold text-slate-400">Slots</p>
            <p className="text-sm font-semibold">{mt.slotsFilled} / {mt.totalSlots} filled</p>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden mt-1">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500" style={{ width: `${Math.min(100, (mt.slotsFilled / mt.totalSlots) * 100)}%` }} />
            </div>
          </div>

          {isJoined && mt.roomInfo.id && (
            <div className={`${t.card} border border-indigo-500/40 rounded-xl p-4 space-y-2`}>
              <p className="text-xs font-bold text-indigo-400 flex items-center space-x-1"><Lock className="w-3.5 h-3.5" /><span>Room Info</span></p>
              <button onClick={() => copyToClipboard(mt.roomInfo.id, 'Room ID')} className="w-full flex items-center justify-between text-sm">
                <span className="text-slate-400">Room ID</span>
                <span className="flex items-center space-x-1.5"><span className="font-mono font-bold">{mt.roomInfo.id}</span><Copy className="w-3.5 h-3.5 text-slate-400" /></span>
              </button>
              <button onClick={() => copyToClipboard(mt.roomInfo.pass, 'Password')} className="w-full flex items-center justify-between text-sm">
                <span className="text-slate-400">Password</span>
                <span className="flex items-center space-x-1.5"><span className="font-mono font-bold">{mt.roomInfo.pass}</span><Copy className="w-3.5 h-3.5 text-slate-400" /></span>
              </button>
            </div>
          )}

          {(() => {
            const hist = matchResultsHistory[mt.id];
            if (!hist) return null;
            const myEntry = hist.winners.find(w => (w.accountUid || '').trim() === user.uid);
            return (
              <>
                {myEntry && (
                  <div className={`${t.card} border border-emerald-500/40 rounded-xl p-4 space-y-2`}>
                    <p className="text-xs font-bold text-emerald-400 flex items-center space-x-1"><Trophy className="w-3.5 h-3.5" /><span>Apnar Result</span></p>
                    <div className={`${darkMode ? 'bg-slate-950' : 'bg-slate-100'} rounded-lg p-3 grid grid-cols-3 gap-1 text-center`}>
                      <div><p className="text-[9px] text-slate-500">Rank</p><p className="text-sm font-bold text-amber-400">#{myEntry.rank}</p></div>
                      <div><p className="text-[9px] text-slate-500">Points</p><p className="text-sm font-bold text-cyan-400">{myEntry.points}</p></div>
                      <div><p className="text-[9px] text-slate-500">Prize</p><p className="text-sm font-bold text-emerald-400">৳{myEntry.prize}</p></div>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setShowAllResultsInfo(prev => !prev)}
                  className="w-full flex items-center justify-between rounded-xl bg-amber-500/10 border border-amber-500/30 p-3.5"
                >
                  <span className="text-xs font-bold text-amber-400 flex items-center space-x-1.5"><Trophy className="w-4 h-4" /><span>Shobar Result Dekhun</span></span>
                  <ChevronRight className={`w-4 h-4 text-amber-400 transition-transform ${showAllResultsInfo ? 'rotate-90' : ''}`} />
                </button>
                {showAllResultsInfo && (
                  <div className={`${t.card} border ${t.border} rounded-xl p-4 -mt-2 space-y-2`}>
                    {hist.winners.map((w, idx) => (
                      <div key={idx} className={`flex items-center justify-between text-xs p-2 rounded-lg ${(w.accountUid || '').trim() === user.uid ? 'bg-emerald-500/10 border border-emerald-500/30' : ''}`}>
                        <span className="flex items-center space-x-2 min-w-0">
                          <span className="font-bold text-amber-400 flex-shrink-0">#{w.rank}</span>
                          <span className="truncate">{w.name} <span className="text-slate-500 font-mono">({w.accountUid})</span></span>
                        </span>
                        <span className="flex-shrink-0 text-slate-400">{w.points} pts • <span className="text-emerald-400 font-bold">৳{w.prize}</span></span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            );
          })()}

          <button
            onClick={() => setShowParticipantsInfo(prev => !prev)}
            className="w-full flex items-center justify-between rounded-xl bg-cyan-500/10 border border-cyan-500/30 p-3.5"
          >
            <span className="text-xs font-bold text-cyan-400 flex items-center space-x-1.5"><Users className="w-4 h-4" /><span>Ke Ke Join Korche</span></span>
            <span className="flex items-center space-x-1.5">
              <span className="text-xs font-bold text-cyan-400">{(matchParticipants[mt.id] || []).length}</span>
              <ChevronRight className={`w-4 h-4 text-cyan-400 transition-transform ${showParticipantsInfo ? 'rotate-90' : ''}`} />
            </span>
          </button>
          {showParticipantsInfo && (
            <div className={`${t.card} border ${t.border} rounded-xl p-4 -mt-2 space-y-3`}>
              {(matchParticipants[mt.id] || []).length === 0 ? (
                <p className="text-xs text-slate-500 text-center">Ekhono kew join kore ni.</p>
              ) : (
                (matchParticipants[mt.id] || []).map((p, idx) => (
                  <div key={idx} className={`${darkMode ? 'bg-slate-950' : 'bg-slate-100'} rounded-lg p-2.5 space-y-1`}>
                    <p className="text-[11px] font-bold">{p.accountName} <span className="text-slate-500 font-mono font-normal">({p.accountUid})</span></p>
                    {(p.players || []).map((pl, pIdx) => (
                      <div key={pIdx} className="flex items-center justify-between text-[10px] text-slate-400">
                        <span>{pl.ign}</span>
                        <span className="font-mono">{pl.uid}</span>
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>
          )}

          <button
            onClick={() => setShowRulesInfo(prev => !prev)}
            className={`w-full flex items-center justify-between rounded-xl ${t.card} border ${t.border} p-3.5`}
          >
            <span className="text-xs font-bold text-slate-400 flex items-center space-x-1.5"><Lock className="w-4 h-4" /><span>Rules</span></span>
            <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${showRulesInfo ? 'rotate-90' : ''}`} />
          </button>
          {showRulesInfo && (
            <div className={`${t.card} border ${t.border} rounded-xl p-4 -mt-2 space-y-2`}>
              <p className="text-xs leading-relaxed text-slate-400">{mt.rules}</p>
              <button onClick={() => setShowRulesInfo(false)} className={`w-full py-2 ${t.input} border rounded-lg text-xs font-bold flex items-center justify-center space-x-1.5`}>
                <ArrowLeft className="w-3.5 h-3.5" /><span>Back</span>
              </button>
            </div>
          )}

          <button
            onClick={() => setShowTotalPrizeInfo(prev => !prev)}
            className="w-full flex items-center justify-between rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-3.5"
          >
            <span className="text-xs font-bold text-emerald-400 flex items-center space-x-1.5"><Trophy className="w-4 h-4" /><span>Total Prize</span></span>
            <span className="flex items-center space-x-1.5">
              <span className="text-base font-black text-emerald-400">৳{mt.prizePool}</span>
              <ChevronRight className={`w-4 h-4 text-emerald-400 transition-transform ${showTotalPrizeInfo ? 'rotate-90' : ''}`} />
            </span>
          </button>
          {showTotalPrizeInfo && (
            <div className={`${t.card} border ${t.border} rounded-xl p-4 -mt-2 space-y-2`}>
              {mt.prizeTable && mt.prizeTable.length > 0 ? (
                <>
                  {mt.prizeTable.map((row, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span className="flex items-center space-x-2">
                        <span>{idx === 0 ? '👑' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : '🎖️'}</span>
                        <span className="text-slate-300">{row.label}</span>
                      </span>
                      <span className="font-bold text-amber-400">{row.amount} Taka</span>
                    </div>
                  ))}
                  <div className={`h-px ${darkMode ? 'bg-slate-800' : 'bg-slate-200'} my-1`} />
                </>
              ) : null}
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center space-x-2"><span>🔥</span><span className="text-slate-300">Per Kill</span></span>
                <span className="font-bold text-cyan-400">{mt.perKill} Taka</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center space-x-2"><span>🏆</span><span className="text-slate-300">Total Prize Pool</span></span>
                <span className="font-bold text-emerald-400">{mt.prizePool} Taka</span>
              </div>
            </div>
          )}

          {!isJoined ? (
            <button
              onClick={() => { setSelectedMatch(mt); setJoinTeamEntries(Array.from({ length: getModeCount(mt.mode) }, () => ({ ign: '', uid: '' }))); setShowJoinModal(true); }}
              disabled={mt.slotsFilled >= mt.totalSlots || mt.started}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-xl text-sm font-bold shadow-lg"
            >
              {mt.started ? 'MATCH ALREADY STARTED' : (mt.slotsFilled >= mt.totalSlots ? 'SLOTS FULL' : `JOIN NOW — ৳${mt.entryFee}`)}
            </button>
          ) : (
            <div className="w-full py-3.5 bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 rounded-xl text-sm font-bold text-center flex items-center justify-center space-x-2">
              <CheckCircle className="w-4 h-4" /><span>You've Joined This Match</span>
            </div>
          )}
        </div>

        {showJoinModal && (() => {
          const playerCount = getModeCount(selectedMatch?.mode);
          const totalFee = (selectedMatch?.entryFee || 0) * playerCount;
          return (
            <div className="fixed inset-0 z-50 bg-black/70 flex items-end sm:items-center justify-center p-4" onClick={() => setShowJoinModal(false)}>
              <div className={`${t.card} w-full max-w-sm rounded-2xl border ${t.border} max-h-[85vh] flex flex-col overflow-hidden`} onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between p-5 pb-3 flex-shrink-0">
                  <button onClick={() => setShowJoinModal(false)} className="flex items-center space-x-1 text-slate-400"><ArrowLeft className="w-4 h-4" /><span className="text-xs">Back</span></button>
                  <h3 className="font-bold text-sm">Join Match — {selectedMatch?.mode}</h3>
                  <button onClick={() => setShowJoinModal(false)}><X className="w-5 h-5 text-slate-400" /></button>
                </div>
                <div className="px-5 pb-5 overflow-y-auto overscroll-contain space-y-4" style={{ WebkitOverflowScrolling: 'touch' }}>
                  <p className="text-[11px] text-slate-500">
                    {playerCount === 1 && 'Ei match Solo — apnar IGN o UID din.'}
                    {playerCount === 2 && 'Ei match Duo — apni ebong apnar teammate, duijoner IGN o UID din. Duijoner entry fee kata hobe.'}
                    {playerCount === 4 && 'Ei match Squad — apni shoho total 4 joner IGN o UID din. Charjoner entry fee kata hobe.'}
                  </p>
                  {joinTeamEntries.slice(0, playerCount).map((entry, idx) => (
                    <div key={idx} className={`${darkMode ? 'bg-slate-950' : 'bg-slate-100'} rounded-xl p-3 space-y-2`}>
                      <p className="text-[10px] font-bold text-indigo-400">Player {idx + 1}{idx === 0 ? ' (Apni)' : ''}</p>
                      <div>
                        <label className="text-xs text-slate-400">Free Fire IGN</label>
                        <input
                          value={entry.ign}
                          onChange={(e) => {
                            const arr = [...joinTeamEntries];
                            arr[idx] = { ...arr[idx], ign: e.target.value };
                            setJoinTeamEntries(arr);
                          }}
                          placeholder="In-game name"
                          className={`w-full ${t.input} border p-2.5 rounded-xl text-xs mt-1`}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400">Free Fire UID</label>
                        <input
                          value={entry.uid}
                          onChange={(e) => {
                            const arr = [...joinTeamEntries];
                            arr[idx] = { ...arr[idx], uid: e.target.value };
                            setJoinTeamEntries(arr);
                          }}
                          placeholder="123456789"
                          className={`w-full ${t.input} border p-2.5 rounded-xl text-xs mt-1`}
                        />
                      </div>
                    </div>
                  ))}
                  <div className={`${darkMode ? 'bg-slate-950' : 'bg-slate-100'} rounded-xl p-3 text-xs flex items-center justify-between`}>
                    <span className="text-slate-400">Total Entry Fee ({playerCount} jon)</span>
                    <span className="font-bold text-indigo-400">৳{totalFee}</span>
                  </div>
                  <button onClick={handleJoinMatch} className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold">CONFIRM & JOIN — ৳{totalFee}</button>
                  <button
                    onClick={() => { setShowJoinModal(false); setJoinTeamEntries([{ ign: '', uid: '' }]); setActiveTab('home'); setMatchDetailView(null); }}
                    className={`w-full py-3 ${t.input} border rounded-xl text-xs font-bold`}
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    );
  }

  // ---------- CATEGORY DETAIL VIEW ----------
  if (selectedCategoryView) {
    const cat = matchCategories.find(c => c.id === selectedCategoryView);
    const catMatches = tournaments.filter(mt => mt.categoryId === selectedCategoryView);
    return (
      <div className={`min-h-screen ${t.bg} ${t.text} font-sans pb-24 select-none`}>
        {Toast}
        <header className={`sticky top-0 z-40 px-4 py-3 flex items-center space-x-3 border-b ${t.border} ${darkMode ? 'bg-slate-900/90' : 'bg-white/90'} backdrop-blur-md`}>
          <button onClick={() => setSelectedCategoryView(null)} className="p-1"><ArrowLeft className="w-5 h-5" /></button>
          <h1 className="font-bold text-sm">{cat ? cat.name : 'Matches'}</h1>
        </header>
        <div className="p-4 space-y-3">
          {catMatches.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-10">Ei category te ekhono kono match nei.</p>
          ) : (
            catMatches.map(mt => <TournamentCard key={mt.id} mt={mt} />)
          )}
        </div>
      </div>
    );
  }

  // ---------- ADMIN PANEL (inlined directly — not a separate component — to keep inputs focused while typing) ----------
  if (activeTab === 'admin') {
    if (!isAdminAuthenticated) {
      return (
        <div className={`min-h-screen ${t.bg} ${t.text} font-sans flex items-center justify-center p-4 select-none`}>
          {Toast}
          <div className={`${t.card} w-full max-w-sm rounded-3xl p-6 border ${t.border} space-y-5`}>
            <button onClick={() => setActiveTab('profile')} className="flex items-center space-x-1 text-xs text-slate-400"><ArrowLeft className="w-4 h-4" /><span>Back</span></button>
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-gradient-to-tr from-red-600 to-orange-500 rounded-2xl flex items-center justify-center mx-auto"><Shield className="w-7 h-7 text-white" /></div>
              <h2 className="font-black text-lg">Admin Access</h2>
              <p className="text-xs text-slate-400">Enter admin password to continue</p>
            </div>
            <input
              type="password"
              value={adminPasswordInput}
              onChange={(e) => setAdminPasswordInput(e.target.value)}
              placeholder="Admin password"
              className={`w-full ${t.input} border p-3 rounded-xl text-xs`}
            />
            <button
              onClick={() => {
                if (adminPasswordInput === ADMIN_PASSWORD) {
                  setIsAdminAuthenticated(true);
                  setAdminPasswordInput('');
                  showToast('Admin panel e swagotom!');
                } else {
                  showToast('Bhul password!');
                }
              }}
              className="w-full py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold"
            >
              UNLOCK ADMIN PANEL
            </button>
          </div>
        </div>
      );
    }

    const tabs = [
      { id: 'tournaments', label: 'Tournaments', icon: Gamepad2 },
      { id: 'players', label: 'Players', icon: Users },
      { id: 'playerdb', label: 'Player DB', icon: Shield },
      { id: 'automation', label: 'Automation', icon: Bot },
      { id: 'shop', label: 'Shop', icon: ShoppingBag },
      { id: 'banner', label: 'Banner', icon: ImageIcon },
      { id: 'deposits', label: 'Deposits', icon: Plus },
      { id: 'withdrawals', label: 'Withdraws', icon: Minus },
      { id: 'orders', label: 'Orders', icon: ShoppingBag },
      { id: 'results', label: 'Results', icon: Trophy },
      { id: 'notify', label: 'Notify', icon: Bell },
      { id: 'support', label: 'Support', icon: Bot },
      { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
      <div className={`min-h-screen ${t.bg} ${t.text} font-sans pb-6 select-none`}>
        {Toast}
        <header className={`sticky top-0 z-40 px-4 py-3 flex items-center justify-between border-b ${t.border} ${darkMode ? 'bg-slate-900/90' : 'bg-white/90'} backdrop-blur-md`}>
          <div className="flex items-center space-x-2">
            <button onClick={() => setActiveTab('profile')} className="p-1"><ArrowLeft className="w-5 h-5" /></button>
            <h1 className="font-bold text-sm flex items-center space-x-1.5"><Shield className="w-4 h-4 text-red-400" /><span>Admin Panel</span></h1>
          </div>
          <button onClick={() => setIsAdminAuthenticated(false)} className="text-xs text-red-400 font-semibold flex items-center space-x-1"><Power className="w-3.5 h-3.5" /><span>Exit</span></button>
        </header>

        <div className="flex overflow-x-auto space-x-2 px-4 py-3 no-scrollbar">
          {tabs.map(tb => (
            <button
              key={tb.id}
              onClick={() => { setAdminTab(tb.id); if (tb.id === 'banner') { loadBannerFormFromSlot(editingBannerSlot); setLogoInput(logoUrl); } if (tb.id === 'settings') loadAppSettingsForm(); }}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap border ${adminTab === tb.id ? 'bg-indigo-600 border-indigo-600 text-white' : `${t.card} ${t.border} ${t.sub}`}`}
            >
              <tb.icon className="w-3.5 h-3.5" /><span>{tb.label}</span>
            </button>
          ))}
        </div>

        <div className="p-4 space-y-4">
          {adminTab === 'tournaments' && (
            <>
              <div className={`${t.card} border ${t.border} rounded-2xl p-4 space-y-3`}>
                <p className="text-xs font-bold">{editingTourId ? 'Edit Tournament' : 'Add New Tournament'}</p>

                <div className="flex items-center space-x-3">
                  <IconBox value={newTourImage} size="w-16 h-16" textSize="text-3xl" />
                  <button
                    type="button"
                    onClick={() => tourFileInputRef.current && tourFileInputRef.current.click()}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 ${t.input} border border-dashed rounded-xl text-xs font-bold cursor-pointer`}
                  >
                    <Upload className="w-4 h-4 text-indigo-400" />
                    <span>Gallery theke Image Dao</span>
                  </button>
                  <input
                    ref={tourFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleTourImageUpload}
                    style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}
                  />
                </div>

                <input value={newTourTitle} onChange={(e) => setNewTourTitle(e.target.value)} placeholder="Title (e.g. SOLO | CLASSIC)" className={`w-full ${t.input} border p-2.5 rounded-xl text-xs`} />

                <div>
                  <label className="text-[10px] text-slate-500">Match Category</label>
                  <select value={newTourCategoryId} onChange={(e) => setNewTourCategoryId(e.target.value)} className={`w-full ${t.input} border p-2.5 rounded-xl text-xs mt-1`}>
                    {matchCategories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-slate-500">Match Mode</label>
                  <div className="flex space-x-2 mt-1">
                    {['SOLO', 'DUO', 'SQUAD'].map(m => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setNewTourMode(m)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold border ${newTourMode === m ? 'bg-indigo-600 border-indigo-600 text-white' : `${t.input} ${t.sub}`}`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-500">Match Date & Time</label>
                  <input type="datetime-local" value={newTourTime} onChange={(e) => setNewTourTime(e.target.value)} className={`w-full ${t.input} border p-2.5 rounded-xl text-xs mt-1`} />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input value={newTourPrize} onChange={(e) => setNewTourPrize(e.target.value)} placeholder="Prize Pool (headline total)" type="number" className={`w-full ${t.input} border p-2.5 rounded-xl text-xs`} />
                  <input value={newTourFee} onChange={(e) => setNewTourFee(e.target.value)} placeholder="Entry Fee (per player)" type="number" className={`w-full ${t.input} border p-2.5 rounded-xl text-xs`} />
                  <input value={newTourPerKill} onChange={(e) => setNewTourPerKill(e.target.value)} placeholder="Per Kill (e.g. 0, 10, 16)" type="number" className={`w-full ${t.input} border p-2.5 rounded-xl text-xs`} />
                  <input value={newTourTotalSlots} onChange={(e) => setNewTourTotalSlots(e.target.value)} placeholder="Total Slots" type="number" className={`w-full ${t.input} border p-2.5 rounded-xl text-xs`} />
                  <input value={newTourRoomId} onChange={(e) => setNewTourRoomId(e.target.value)} placeholder="Room ID" className={`w-full ${t.input} border p-2.5 rounded-xl text-xs`} />
                  <input value={newTourPass} onChange={(e) => setNewTourPass(e.target.value)} placeholder="Room Pass" className={`w-full ${t.input} border p-2.5 rounded-xl text-xs`} />
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-slate-500">Rank-wise Prize Table (Winner, 2nd, 3rd...)</p>
                  {newTourPrizeTable.map((row, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <input
                        value={row.label}
                        onChange={(e) => { const arr = [...newTourPrizeTable]; arr[idx] = { ...arr[idx], label: e.target.value }; setNewTourPrizeTable(arr); }}
                        placeholder="e.g. Winner"
                        className={`flex-1 ${t.input} border p-2 rounded-lg text-xs`}
                      />
                      <input
                        value={row.amount}
                        onChange={(e) => { const arr = [...newTourPrizeTable]; arr[idx] = { ...arr[idx], amount: e.target.value }; setNewTourPrizeTable(arr); }}
                        placeholder="Taka"
                        type="number"
                        className={`w-24 ${t.input} border p-2 rounded-lg text-xs`}
                      />
                      <button onClick={() => setNewTourPrizeTable(newTourPrizeTable.filter((_, i) => i !== idx))} className="p-2 bg-red-500/10 rounded-lg flex-shrink-0"><Trash2 className="w-3.5 h-3.5 text-red-400" /></button>
                    </div>
                  ))}
                  <button onClick={() => setNewTourPrizeTable([...newTourPrizeTable, { label: '', amount: '' }])} className={`w-full py-2 ${t.input} border rounded-xl text-xs font-bold`}>+ Add Rank</button>
                </div>

                <textarea value={newTourRules} onChange={(e) => setNewTourRules(e.target.value)} placeholder="Rules" rows={2} className={`w-full ${t.input} border p-2.5 rounded-xl text-xs`} />
                <div className="flex space-x-2">
                  <button onClick={handleSaveTournament} className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold">{editingTourId ? 'UPDATE' : 'ADD TOURNAMENT'}</button>
                  {editingTourId && <button onClick={resetTourForm} className={`px-4 py-2.5 ${t.input} border rounded-xl text-xs font-bold`}>Cancel</button>}
                </div>
              </div>

              <div className={`${t.card} border ${t.border} rounded-2xl p-4 space-y-3`}>
                <p className="text-xs font-bold flex items-center space-x-1.5"><Gamepad2 className="w-4 h-4 text-indigo-400" /><span>{editingCategoryId ? 'Edit Category' : 'Add Match Category'}</span></p>
                <div className="flex items-center space-x-3">
                  <IconBox value={newCategoryImage} size="w-14 h-14" textSize="text-2xl" />
                  <button
                    type="button"
                    onClick={() => categoryFileInputRef.current && categoryFileInputRef.current.click()}
                    className={`flex-1 flex items-center justify-center space-x-2 py-2.5 ${t.input} border border-dashed rounded-xl text-xs font-bold cursor-pointer`}
                  >
                    <Upload className="w-4 h-4 text-indigo-400" />
                    <span>Gallery theke Image Dao</span>
                  </button>
                  <input
                    ref={categoryFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleCategoryImageUpload}
                    style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}
                  />
                </div>
                <input value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} placeholder="Category Name (e.g. Lone Wolf)" className={`w-full ${t.input} border p-2.5 rounded-xl text-xs`} />
                <div className="flex space-x-2">
                  <button onClick={handleSaveCategory} className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold">{editingCategoryId ? 'UPDATE CATEGORY' : 'ADD CATEGORY'}</button>
                  {editingCategoryId && <button onClick={resetCategoryForm} className={`px-4 py-2.5 ${t.input} border rounded-xl text-xs font-bold`}>Cancel</button>}
                </div>
                <div className="space-y-2 pt-1">
                  {matchCategories.map(c => (
                    <div key={c.id} className={`${darkMode ? 'bg-slate-950' : 'bg-slate-100'} rounded-xl p-2.5 flex items-center justify-between`}>
                      <div className="flex items-center space-x-2">
                        <IconBox value={c.image} size="w-8 h-8" textSize="text-sm" />
                        <p className="text-xs font-bold">{c.name}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button onClick={() => handleEditCategory(c)} className="p-1.5 bg-indigo-500/10 rounded-lg"><Edit3 className="w-3.5 h-3.5 text-indigo-400" /></button>
                        <button onClick={() => handleDeleteCategory(c.id)} className="p-1.5 bg-red-500/10 rounded-lg"><Trash2 className="w-3.5 h-3.5 text-red-400" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                {tournaments.map(mt => (
                  <div key={mt.id} className={`${t.card} border ${t.border} rounded-xl p-3 space-y-2`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <IconBox value={mt.image} size="w-9 h-9" textSize="text-lg" />
                        <div>
                          <p className="text-xs font-bold">{mt.title}</p>
                          <p className="text-[10px] text-slate-500">{mt.category} • {mt.mode} • ৳{mt.entryFee} entry • {mt.slotsFilled}/{mt.totalSlots} • {mt.time}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button onClick={() => handleEditTournament(mt)} className="p-1.5 bg-indigo-500/10 rounded-lg"><Edit3 className="w-3.5 h-3.5 text-indigo-400" /></button>
                        <button onClick={() => handleDeleteTournament(mt.id)} className="p-1.5 bg-red-500/10 rounded-lg"><Trash2 className="w-3.5 h-3.5 text-red-400" /></button>
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggleMatchStarted(mt.id)}
                      className={`w-full py-2 rounded-lg text-[11px] font-bold flex items-center justify-center space-x-1.5 ${mt.started ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : `${t.input} border ${t.sub}`}`}
                    >
                      <Flame className="w-3.5 h-3.5" /><span>{mt.started ? 'Match Started ✓ (tap to unset)' : 'Mark Match Started'}</span>
                    </button>
                    <button
                      onClick={() => handleAutomateDaily(mt)}
                      className="w-full py-2 rounded-lg text-[11px] font-bold flex items-center justify-center space-x-1.5 bg-violet-500/10 text-violet-400 border border-violet-500/30"
                    >
                      <Bot className="w-3.5 h-3.5" /><span>Automate Daily (repeat every day at this time)</span>
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {adminTab === 'players' && (
            <div className="space-y-2">
              <p className="text-xs font-bold flex items-center space-x-1.5"><Users className="w-4 h-4 text-indigo-400" /><span>Match Wise Joined Players</span></p>
              {tournaments.map(mt => {
                const list = matchParticipants[mt.id] || [];
                const isOpen = expandedMatchId === mt.id;
                return (
                  <div key={mt.id} className={`${t.card} border ${t.border} rounded-xl overflow-hidden`}>
                    <button
                      onClick={() => setExpandedMatchId(isOpen ? null : mt.id)}
                      className="w-full flex items-center justify-between p-3"
                    >
                      <div className="flex items-center space-x-2">
                        <IconBox value={mt.image} size="w-9 h-9" textSize="text-lg" />
                        <div className="text-left">
                          <p className="text-xs font-bold">{mt.title}</p>
                          <p className="text-[10px] text-slate-500">{list.length} entr{list.length !== 1 ? 'ies' : 'y'} • {list.reduce((sum, p) => sum + (p.players ? p.players.length : 1), 0)} players joined</p>
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className={`border-t ${t.border} divide-y ${t.border}`}>
                        {list.length === 0 ? (
                          <p className="text-[11px] text-slate-500 text-center py-4">Ekhono kew join kore ni.</p>
                        ) : (
                          list.map((p, idx) => (
                            <div key={idx} className={`p-3 space-y-1.5 text-[11px] ${darkMode ? 'bg-slate-950/50' : 'bg-slate-50'}`}>
                              <div className="grid grid-cols-2 gap-y-1.5 gap-x-2">
                                <div><p className="text-slate-500">Account Name</p><p className="font-semibold">{p.accountName}</p></div>
                                <div><p className="text-slate-500">Account UID</p><p className="font-mono font-semibold text-indigo-400">{p.accountUid}</p></div>
                                <div><p className="text-slate-500">Mode</p><p className="font-semibold">{p.mode || 'SOLO'}</p></div>
                                <div><p className="text-slate-500">Phone Number</p><p className="font-semibold">{p.number}</p></div>
                              </div>
                              <div className="pt-1 space-y-1">
                                {(p.players || []).map((pl, pIdx) => (
                                  <div key={pIdx} className={`${darkMode ? 'bg-slate-900' : 'bg-white'} rounded-lg px-2 py-1.5 flex items-center justify-between`}>
                                    <span className="text-slate-500">P{pIdx + 1}: {pl.ign}</span>
                                    <span className="font-mono font-semibold text-cyan-400">{pl.uid}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {adminTab === 'playerdb' && (() => {
            const allPlayers = registeredUsers.filter(u =>
              u.name.toLowerCase().includes(adminPlayerSearchQuery.trim().toLowerCase()) ||
              u.uid.toLowerCase().includes(adminPlayerSearchQuery.trim().toLowerCase()) ||
              u.number.includes(adminPlayerSearchQuery.trim())
            );
            return (
              <div className="space-y-3">
                <p className="text-xs font-bold flex items-center space-x-1.5"><Shield className="w-4 h-4 text-indigo-400" /><span>All Registered Players ({registeredUsers.length})</span></p>
                <div className={`${t.input} border rounded-xl flex items-center px-3`}>
                  <Search className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  <input
                    value={adminPlayerSearchQuery}
                    onChange={(e) => setAdminPlayerSearchQuery(e.target.value)}
                    placeholder="Naam, UID, ba number diye khujun..."
                    className="flex-1 bg-transparent p-2.5 text-xs outline-none"
                  />
                  {adminPlayerSearchQuery && (
                    <button onClick={() => setAdminPlayerSearchQuery('')}><X className="w-3.5 h-3.5 text-slate-500" /></button>
                  )}
                </div>

                {allPlayers.length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-8">Kono player paoa jayni.</p>
                ) : (
                  allPlayers.map(p => {
                    const isOpen = expandedPlayerUid === p.uid;
                    const now = Date.now();
                    const isBanned = p.banUntil === 'permanent' || (typeof p.banUntil === 'number' && p.banUntil > now);
                    const myOrders = pendingShopOrders.filter(o => o.uid === p.uid);
                    const totalBalance = (p.depositBalance || 0) + (p.winningBalance || 0);
                    return (
                      <div key={p.uid} className={`${t.card} border ${t.border} rounded-xl overflow-hidden`}>
                        <button onClick={() => setExpandedPlayerUid(isOpen ? null : p.uid)} className="w-full flex items-center justify-between p-3">
                          <div className="flex items-center space-x-2 min-w-0">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center font-black text-white text-xs overflow-hidden flex-shrink-0">
                              {p.avatar ? <img src={p.avatar} alt="" className="w-full h-full object-cover" /> : p.name.charAt(0)}
                            </div>
                            <div className="text-left min-w-0">
                              <p className="text-xs font-bold truncate">{p.name} <span className="text-slate-500 font-mono font-normal">({p.uid})</span></p>
                              <p className="text-[10px] text-slate-500">৳{totalBalance.toFixed(2)} total {isBanned && <span className="text-red-400 font-bold ml-1">BANNED</span>}</p>
                            </div>
                          </div>
                          <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform flex-shrink-0 ${isOpen ? 'rotate-90' : ''}`} />
                        </button>
                        {isOpen && (
                          <div className={`border-t ${t.border} p-3 space-y-3`}>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div><p className="text-[9px] text-slate-500">Phone Number</p><p className="font-semibold">{p.number}</p></div>
                              <div><p className="text-[9px] text-slate-500">Email</p><p className="font-semibold truncate">{p.email}</p></div>
                              <div><p className="text-[9px] text-slate-500">Deposit Balance</p><p className="font-bold text-indigo-400">৳{p.depositBalance ?? 0}</p></div>
                              <div><p className="text-[9px] text-slate-500">Winning Balance</p><p className="font-bold text-emerald-400">৳{p.winningBalance ?? 0}</p></div>
                              <div><p className="text-[9px] text-slate-500">Total Deposited</p><p className="font-bold text-cyan-400">৳{p.totalDeposited ?? 0}</p></div>
                              <div><p className="text-[9px] text-slate-500">Total Withdrawn</p><p className="font-bold text-amber-400">৳{p.totalWithdrawn ?? 0}</p></div>
                            </div>

                            <div>
                              <p className="text-[10px] font-bold text-slate-500 mb-1">Orders ({myOrders.length})</p>
                              {myOrders.length === 0 ? (
                                <p className="text-[11px] text-slate-500">Kono order nei.</p>
                              ) : (
                                <div className="space-y-1">
                                  {myOrders.map(o => (
                                    <div key={o.id} className={`${darkMode ? 'bg-slate-950' : 'bg-slate-100'} rounded-lg px-2 py-1.5 flex items-center justify-between text-[11px]`}>
                                      <span className="truncate">{o.itemTitle}</span>
                                      <span className="font-bold flex-shrink-0 ml-2">৳{o.price} • {o.status}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            <div className="space-y-2">
                              <p className="text-[10px] font-bold text-slate-500">Ban Controls</p>
                              {isBanned && (
                                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-2 text-[11px] text-red-400">
                                  Currently banned {p.banUntil === 'permanent' ? 'permanently' : `until ${new Date(p.banUntil).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true })}`}
                                  {p.banReason ? ` — ${p.banReason}` : ''}
                                </div>
                              )}
                              {!isBanned && (
                                <input
                                  value={adminBanReason}
                                  onChange={(e) => setAdminBanReason(e.target.value)}
                                  placeholder="Ban korar karon (optional)"
                                  className={`w-full ${t.input} border p-2 rounded-lg text-xs`}
                                />
                              )}
                              <div className="flex flex-wrap gap-2">
                                {isBanned ? (
                                  <button onClick={() => handleUnbanUser(p.uid)} className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center justify-center space-x-1"><CheckCircle2 className="w-3.5 h-3.5" /><span>Unban</span></button>
                                ) : (
                                  <>
                                    <button onClick={() => handleBanUser(p.uid, 1)} className="flex-1 min-w-[70px] py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg text-[11px] font-bold">1 Day</button>
                                    <button onClick={() => handleBanUser(p.uid, 2)} className="flex-1 min-w-[70px] py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg text-[11px] font-bold">2 Days</button>
                                    <button onClick={() => handleBanUser(p.uid, 30)} className="flex-1 min-w-[70px] py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg text-[11px] font-bold">1 Month</button>
                                    <button onClick={() => handleBanUser(p.uid, 'permanent')} className="flex-1 min-w-[70px] py-2 bg-red-600 text-white rounded-lg text-[11px] font-bold flex items-center justify-center space-x-1"><Ban className="w-3 h-3" /><span>Permanent</span></button>
                                  </>
                                )}
                              </div>
                              <button
                                onClick={() => { setAdminTab('support'); setAdminSupportSelectedUid(p.uid); }}
                                className={`w-full py-2 ${t.input} border rounded-lg text-xs font-bold flex items-center justify-center space-x-1.5`}
                              >
                                <Bot className="w-3.5 h-3.5 text-indigo-400" /><span>Message This User</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            );
          })()}

          {adminTab === 'automation' && (
            <div className="space-y-3">
              <div className={`${t.card} border ${t.border} rounded-2xl p-4 space-y-2`}>
                <p className="text-xs font-bold flex items-center space-x-1.5"><Bot className="w-4 h-4 text-violet-400" /><span>Command to Automated</span></p>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Tournaments tab-e giye kono match-er "Automate Daily" button-e chapun — sei match-tar title, category, mode, entry fee, prize, room-fillable slot ইত্যাদি save hoye jabe ekhane, ar protidin sei-i shomoy-e (time) notun kore fresh slot niye automatic add hoye jabe — apnake protidin abar likhte hobe na.
                  <br /><br />
                  Kono template edit korte chaile: age eta remove korun, tarpor notun tournament banan (jekhane changes gula thakbe), tarpor abar "Automate Daily" chapun — porer din theke notun version onujayi cholbe.
                  <br /><br />
                  <span className="text-amber-400">Note:</span> Ei automation app open thakle (ba refresh korle) kaj kore — এটা browser-এর ভিতরে চলে, real server cron na, tai app টানা বন্ধ থাকলে সেই সময়ে auto-add hobe na, kintu porerbar app khule dile miss howa din-er match-o generate hoye jabe.
                </p>
              </div>

              {automatedTemplates.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-8">Ekhono kono match daily automation-e nei.</p>
              ) : (
                <div className="space-y-2">
                  {automatedTemplates.map(tpl => (
                    <div key={tpl.id} className={`${t.card} border ${t.border} rounded-xl p-3 flex items-center justify-between`}>
                      <div className="flex items-center space-x-2 min-w-0">
                        <IconBox value={tpl.image} size="w-9 h-9" textSize="text-lg" />
                        <div className="min-w-0">
                          <p className="text-xs font-bold truncate">{tpl.title}</p>
                          <p className="text-[10px] text-slate-500">{tpl.category} • {tpl.mode} • Protidin {tpl.timeLabel}-e</p>
                        </div>
                      </div>
                      <button onClick={() => handleRemoveTemplate(tpl.id)} className="p-1.5 bg-red-500/10 rounded-lg flex-shrink-0"><Trash2 className="w-3.5 h-3.5 text-red-400" /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {adminTab === 'shop' && (
            <>
              <div className={`${t.card} border ${t.border} rounded-2xl p-4 space-y-3`}>
                <p className="text-xs font-bold">{editingShopId ? 'Edit Item' : 'Add Shop Item'}</p>

                <div className="flex items-center space-x-3">
                  <IconBox value={newShopImage} size="w-16 h-16" textSize="text-3xl" />
                  <button
                    type="button"
                    onClick={() => shopFileInputRef.current && shopFileInputRef.current.click()}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 ${t.input} border border-dashed rounded-xl text-xs font-bold cursor-pointer`}
                  >
                    <Upload className="w-4 h-4 text-indigo-400" />
                    <span>Gallery theke Image Dao (Photo 1)</span>
                  </button>
                  <input
                    ref={shopFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleShopImageUpload}
                    style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}
                  />
                </div>

                {newShopType === 'product' && (
                  <div>
                    <p className="text-[10px] text-slate-500 mb-1.5">Aro 3ti Photo (total 4ti, buyer swipe kore dekhbe)</p>
                    <div className="flex space-x-2">
                      {[0, 1, 2].map(slotIdx => (
                        <div key={slotIdx} className="flex-1">
                          <button
                            type="button"
                            onClick={() => shopExtraFileInputRefs[slotIdx].current && shopExtraFileInputRefs[slotIdx].current.click()}
                            className={`w-full aspect-square rounded-xl ${t.input} border border-dashed flex flex-col items-center justify-center overflow-hidden`}
                          >
                            {newShopExtraImages[slotIdx] ? (
                              <img src={newShopExtraImages[slotIdx]} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <>
                                <Upload className="w-4 h-4 text-indigo-400" />
                                <span className="text-[9px] text-slate-500 mt-1">Photo {slotIdx + 2}</span>
                              </>
                            )}
                          </button>
                          <input
                            ref={shopExtraFileInputRefs[slotIdx]}
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleShopExtraImageUpload(slotIdx, e)}
                            style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex space-x-2">
                  {[{ v: 'diamond', label: '💎 Diamonds Tab' }, { v: 'product', label: '📦 Products Tab' }].map(opt => (
                    <button
                      key={opt.v}
                      onClick={() => setNewShopType(opt.v)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border ${newShopType === opt.v ? 'bg-indigo-600 border-indigo-600 text-white' : `${t.input} ${t.sub}`}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                <input value={newShopTitle} onChange={(e) => setNewShopTitle(e.target.value)} placeholder="Item Title" className={`w-full ${t.input} border p-2.5 rounded-xl text-xs`} />
                <div className="grid grid-cols-3 gap-2">
                  <input value={newShopPrice} onChange={(e) => setNewShopPrice(e.target.value)} placeholder="Price" type="number" className={`w-full ${t.input} border p-2.5 rounded-xl text-xs`} />
                  <input value={newShopOldPrice} onChange={(e) => setNewShopOldPrice(e.target.value)} placeholder="Old Price" type="number" className={`w-full ${t.input} border p-2.5 rounded-xl text-xs`} />
                  <input value={newShopDiscount} onChange={(e) => setNewShopDiscount(e.target.value)} placeholder="-30%" className={`w-full ${t.input} border p-2.5 rounded-xl text-xs`} />
                </div>
                {newShopType === 'product' && (
                  <>
                    <div>
                      <label className="text-[10px] text-slate-500">Available Sizes (comma diye separate korun, khali rakhle size option thakbe na)</label>
                      <input value={newShopSizes} onChange={(e) => setNewShopSizes(e.target.value)} placeholder="e.g. S, M, L, XL" className={`w-full ${t.input} border p-2.5 rounded-xl text-xs mt-1`} />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500">Courier Name (checkout page-e dekhabe)</label>
                      <input value={newShopCourier} onChange={(e) => setNewShopCourier(e.target.value)} placeholder="e.g. PATHAO COURIER" className={`w-full ${t.input} border p-2.5 rounded-xl text-xs mt-1`} />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500">Product Description (buyer checkout page-e ei text dekhabe)</label>
                      <textarea value={newShopDescription} onChange={(e) => setNewShopDescription(e.target.value)} placeholder="Product-er full description likhun..." rows={4} className={`w-full ${t.input} border p-2.5 rounded-xl text-xs mt-1`} />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500">প্যাকেজে যা থাকছে — ek line-e ekta item likhun</label>
                      <textarea value={newShopPackageItems} onChange={(e) => setNewShopPackageItems(e.target.value)} placeholder={'S2000 Pro Max Smart Watch\n7ti poriborton jogyo strap\nProtection case\nTWS Wireless Earbuds'} rows={4} className={`w-full ${t.input} border p-2.5 rounded-xl text-xs mt-1`} />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500">প্রধান বৈশিষ্ট্য (Key Features) — ek line-e ekta feature likhun</label>
                      <textarea value={newShopFeatures} onChange={(e) => setNewShopFeatures(e.target.value)} placeholder={'Boro o ujjol display\nBluetooth Calling support\nHeart Rate Monitor'} rows={4} className={`w-full ${t.input} border p-2.5 rounded-xl text-xs mt-1`} />
                    </div>
                  </>
                )}
                <div className="flex space-x-2">
                  <button onClick={handleSaveShopItem} className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold">{editingShopId ? 'UPDATE' : 'ADD ITEM'}</button>
                  {editingShopId && <button onClick={resetShopForm} className={`px-4 py-2.5 ${t.input} border rounded-xl text-xs font-bold`}>Cancel</button>}
                </div>
              </div>
              <div className={`${t.input} border rounded-xl flex items-center px-3`}>
                <Search className="w-4 h-4 text-slate-500 flex-shrink-0" />
                <input
                  value={adminShopSearchQuery}
                  onChange={(e) => setAdminShopSearchQuery(e.target.value)}
                  placeholder="Purono product khujun (naam diye)..."
                  className="flex-1 bg-transparent p-2.5 text-xs outline-none"
                />
                {adminShopSearchQuery && (
                  <button onClick={() => setAdminShopSearchQuery('')}><X className="w-3.5 h-3.5 text-slate-500" /></button>
                )}
              </div>
              <div className="space-y-2">
                {shopItems
                  .filter(i => i.title.toLowerCase().includes(adminShopSearchQuery.trim().toLowerCase()))
                  .map(i => (
                  <div key={i.id} className={`${t.card} border ${t.border} rounded-xl p-3 flex items-center justify-between`}>
                    <div className="flex items-center space-x-2">
                      <IconBox value={i.image} size="w-9 h-9" textSize="text-lg" />
                      <div><p className="text-xs font-bold">{i.title}</p><p className="text-[10px] text-slate-500">৳{i.price} • {i.type === 'diamond' ? 'Diamonds' : 'Products'}</p></div>
                    </div>
                    <div className="flex space-x-2">
                      <button onClick={() => handleEditShopItem(i)} className="p-1.5 bg-indigo-500/10 rounded-lg"><Edit3 className="w-3.5 h-3.5 text-indigo-400" /></button>
                      <button onClick={() => handleDeleteShopItem(i.id)} className="p-1.5 bg-red-500/10 rounded-lg"><Trash2 className="w-3.5 h-3.5 text-red-400" /></button>
                    </div>
                  </div>
                ))}
                {shopItems.filter(i => i.title.toLowerCase().includes(adminShopSearchQuery.trim().toLowerCase())).length === 0 && (
                  <p className="text-xs text-slate-500 text-center py-6">Ei naam e kono product paoa jayni.</p>
                )}
              </div>
            </>
          )}

          {adminTab === 'banner' && (
            <div className="space-y-4">
              {/* App Logo Section */}
              <div className={`${t.card} border ${t.border} rounded-2xl p-4 space-y-3`}>
                <p className="text-xs font-bold flex items-center space-x-1.5"><ImageIcon className="w-4 h-4 text-indigo-400" /><span>App Logo</span></p>
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-700 flex-shrink-0">
                    <img src={logoInput || logoUrl} alt="Logo preview" className="w-full h-full object-cover" />
                  </div>
                  <button
                    type="button"
                    onClick={() => logoFileInputRef.current && logoFileInputRef.current.click()}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 ${t.input} border border-dashed rounded-xl text-xs font-bold cursor-pointer`}
                  >
                    <Upload className="w-4 h-4 text-indigo-400" />
                    <span>Gallery theke Logo Dao</span>
                  </button>
                  <input
                    ref={logoFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoImageUpload}
                    style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}
                  />
                </div>
                <button onClick={handleSaveLogo} className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold">SAVE LOGO</button>
              </div>

              {/* Banner Carousel Section */}
              <div className={`${t.card} border ${t.border} rounded-2xl p-4 space-y-3`}>
                <p className="text-xs font-bold flex items-center space-x-1.5"><ImageIcon className="w-4 h-4 text-indigo-400" /><span>Home Banners (max 3, one-by-one carousel)</span></p>

                <div className="flex space-x-2">
                  {[0, 1, 2].map(idx => (
                    <button
                      key={idx}
                      onClick={() => loadBannerFormFromSlot(idx)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border ${editingBannerSlot === idx ? 'bg-indigo-600 border-indigo-600 text-white' : `${t.input} ${t.sub}`}`}
                    >
                      Banner {idx + 1}{banners[idx] && (banners[idx].image || banners[idx].title) ? '' : ' (khali)'}
                    </button>
                  ))}
                </div>

                <div className="rounded-2xl overflow-hidden relative bg-gradient-to-r from-indigo-600 to-violet-600 p-5">
                  {bannerImageInput && (
                    <img src={bannerImageInput} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  )}
                  <div className="relative">
                    <p className="text-white font-black text-base leading-tight drop-shadow">{bannerTitleInput || 'Banner Title'}</p>
                    <p className="text-indigo-100 text-xs mt-1 drop-shadow">{bannerSubtitleInput || 'Banner subtitle text'}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => bannerFileInputRef.current && bannerFileInputRef.current.click()}
                  className={`w-full flex items-center justify-center space-x-2 py-3 ${t.input} border border-dashed rounded-xl text-xs font-bold cursor-pointer`}
                >
                  <Upload className="w-4 h-4 text-indigo-400" />
                  <span>Gallery theke Banner Image Dao</span>
                </button>
                <input
                  ref={bannerFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleBannerImageUpload}
                  style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}
                />
                {bannerImageInput && (
                  <button onClick={() => setBannerImageInput('')} className="text-[10px] text-red-400 font-semibold">Remove image (gradient background use hobe)</button>
                )}

                <div>
                  <label className="text-[10px] text-slate-500">Banner Title</label>
                  <input value={bannerTitleInput} onChange={(e) => setBannerTitleInput(e.target.value)} placeholder="e.g. Win Big in Free Fire Tournaments!" className={`w-full ${t.input} border p-2.5 rounded-xl text-xs mt-1`} />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500">Banner Subtitle</label>
                  <textarea value={bannerSubtitleInput} onChange={(e) => setBannerSubtitleInput(e.target.value)} placeholder="e.g. Join now & compete with the best" rows={2} className={`w-full ${t.input} border p-2.5 rounded-xl text-xs mt-1`} />
                </div>

                <div className="flex space-x-2">
                  <button onClick={handleSaveBanner} className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold">SAVE BANNER {editingBannerSlot + 1}</button>
                  <button onClick={handleClearBannerSlot} className={`px-4 py-2.5 ${t.input} border rounded-xl text-xs font-bold`}>Clear</button>
                </div>
              </div>
            </div>
          )}

          {adminTab === 'deposits' && (
            <div className="space-y-2">
              {pendingDeposits.length === 0 && <p className="text-xs text-slate-500 text-center py-8">Kono pending deposit nei.</p>}
              {pendingDeposits.map(d => (
                <div key={d.id} className={`${t.card} border ${t.border} rounded-xl p-3 space-y-2`}>
                  <div className="flex justify-between text-xs"><span className="font-bold">{d.name} ({d.uid})</span><span className="font-bold text-emerald-400">৳{d.amount}</span></div>
                  <p className="text-[11px] text-slate-500">{d.method} • TrxID: {d.trxId}</p>
                  <div className="flex space-x-2">
                    <button onClick={() => handleApproveDeposit(d)} className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center justify-center space-x-1"><CheckCircle2 className="w-3.5 h-3.5" /><span>Approve</span></button>
                    <button onClick={() => setRejectModalData({ type: 'deposit', item: d })} className="flex-1 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold flex items-center justify-center space-x-1"><XCircle className="w-3.5 h-3.5" /><span>Reject</span></button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {adminTab === 'withdrawals' && (
            <div className="space-y-2">
              {pendingWithdrawals.length === 0 && <p className="text-xs text-slate-500 text-center py-8">Kono pending withdraw nei.</p>}
              {pendingWithdrawals.map(w => (
                <div key={w.id} className={`${t.card} border ${t.border} rounded-xl p-3 space-y-2`}>
                  <div className="flex justify-between text-xs"><span className="font-bold">{w.name} ({w.uid})</span><span className="font-bold text-red-400">৳{w.amount}</span></div>
                  <p className="text-[11px] text-slate-500">{w.method} • A/C: {w.account} • Ph: {w.number}</p>
                  <div className={`${darkMode ? 'bg-slate-950' : 'bg-slate-100'} rounded-lg p-2 grid grid-cols-4 gap-1 text-center`}>
                    <div><p className="text-[9px] text-slate-500">Deposit Bal</p><p className="text-xs font-bold text-indigo-400">৳{w.depositBalance ?? 0}</p></div>
                    <div><p className="text-[9px] text-slate-500">Winning Bal</p><p className="text-xs font-bold text-emerald-400">৳{w.winningBalance ?? 0}</p></div>
                    <div><p className="text-[9px] text-slate-500">Total Deposited</p><p className="text-xs font-bold text-cyan-400">৳{w.totalDeposited ?? 0}</p></div>
                    <div><p className="text-[9px] text-slate-500">Total Balance</p><p className="text-xs font-bold text-amber-400">৳{((w.depositBalance ?? 0) + (w.winningBalance ?? 0)).toFixed(2)}</p></div>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => handleApproveWithdrawal(w)} className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center justify-center space-x-1"><CheckCircle2 className="w-3.5 h-3.5" /><span>Approve</span></button>
                    <button onClick={() => setRejectModalData({ type: 'withdrawal', item: w })} className="flex-1 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold flex items-center justify-center space-x-1"><XCircle className="w-3.5 h-3.5" /><span>Reject</span></button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {adminTab === 'orders' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-400">Pending — Action Needed</p>
                {pendingShopOrders.filter(o => o.status === 'pending').length === 0 && <p className="text-xs text-slate-500 text-center py-6">Kono pending order nei.</p>}
                {pendingShopOrders.filter(o => o.status === 'pending').map(o => (
                  <div key={o.id} className={`${t.card} border ${t.border} rounded-xl p-3 space-y-2`}>
                    <div className="flex justify-between text-xs"><span className="font-bold">{o.name} ({o.uid})</span><span className="font-bold text-indigo-400">৳{o.chargedAmount ?? o.price} charged</span></div>
                    {o.type === 'product' ? (
                      <p className="text-[11px] text-slate-500">
                        {o.itemTitle}{o.quantity > 1 ? ` x${o.quantity}` : ''}{o.selectedSize ? ` • Size: ${o.selectedSize}` : ''} • {o.deliveryMethod} • {o.deliveryName}, {o.deliveryPhone}<br />
                        Address: {o.deliveryAddress}
                        {o.orderNote && <><br />Note: {o.orderNote}</>}
                        {o.deliveryMethod === 'COD' && <><br /><span className="text-amber-400 font-semibold">Product price ৳{o.price} cash e nite hobe delivery-r shomoy (advance ৳{o.chargedAmount} already deduct kora hoyeche).</span></>}
                      </p>
                    ) : (
                      <p className="text-[11px] text-slate-500">{o.itemTitle} • FF UID: {o.ffUid}{o.number ? ` • Ph: ${o.number}` : ''}</p>
                    )}
                    <div className={`${darkMode ? 'bg-slate-950' : 'bg-slate-100'} rounded-lg p-2 grid grid-cols-4 gap-1 text-center`}>
                      <div><p className="text-[9px] text-slate-500">Deposit Bal</p><p className="text-xs font-bold text-indigo-400">৳{o.depositBalance ?? 0}</p></div>
                      <div><p className="text-[9px] text-slate-500">Winning Bal</p><p className="text-xs font-bold text-emerald-400">৳{o.winningBalance ?? 0}</p></div>
                      <div><p className="text-[9px] text-slate-500">Total Deposited</p><p className="text-xs font-bold text-cyan-400">৳{o.totalDeposited ?? 0}</p></div>
                      <div><p className="text-[9px] text-slate-500">Total Balance</p><p className="text-xs font-bold text-amber-400">৳{((o.depositBalance ?? 0) + (o.winningBalance ?? 0)).toFixed(2)}</p></div>
                    </div>
                    <div className="flex space-x-2">
                      <button onClick={() => handleApproveShopOrder(o)} className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center justify-center space-x-1"><CheckCircle2 className="w-3.5 h-3.5" /><span>{o.type === 'product' ? 'Accept' : 'Deliver'}</span></button>
                      <button onClick={() => setRejectModalData({ type: 'order', item: o })} className="flex-1 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold flex items-center justify-center space-x-1"><XCircle className="w-3.5 h-3.5" /><span>Reject (Refund)</span></button>
                    </div>
                  </div>
                ))}
              </div>

              {pendingShopOrders.filter(o => o.status === 'accepted').length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-400">Accepted — Waiting Delivery</p>
                  {pendingShopOrders.filter(o => o.status === 'accepted').map(o => (
                    <div key={o.id} className={`${t.card} border ${t.border} rounded-xl p-3 space-y-2`}>
                      <div className="flex justify-between text-xs"><span className="font-bold">{o.name} ({o.uid})</span><span className="font-bold text-indigo-400">৳{o.price}</span></div>
                      <p className="text-[11px] text-slate-500">
                        {o.itemTitle}{o.quantity > 1 ? ` x${o.quantity}` : ''}{o.selectedSize ? ` • Size: ${o.selectedSize}` : ''} • {o.deliveryMethod} • {o.deliveryName}, {o.deliveryPhone}<br />
                        Address: {o.deliveryAddress}
                        {o.orderNote && <><br />Note: {o.orderNote}</>}
                        {o.deliveryMethod === 'COD' && <><br /><span className="text-amber-400 font-semibold">Cash on delivery collect korte hobe: ৳{o.price}</span></>}
                      </p>
                      <button onClick={() => handleMarkDelivered(o)} className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center justify-center space-x-1"><CheckCircle2 className="w-3.5 h-3.5" /><span>Mark Delivered</span></button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {adminTab === 'results' && (
            <div className="space-y-2">
              {tournaments.filter(m => m.status !== 'completed').map(mt => (
                <div key={mt.id} className={`${t.card} border ${t.border} rounded-xl p-3 flex items-center justify-between`}>
                  <div className="flex items-center space-x-2">
                    <IconBox value={mt.image} size="w-9 h-9" textSize="text-lg" />
                    <div><p className="text-xs font-bold">{mt.title}</p><p className="text-[10px] text-slate-500">{matchParticipants[mt.id]?.length || 0} participants</p></div>
                  </div>
                  <button onClick={() => setMatchResultsModal(mt)} className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold">Declare Result</button>
                </div>
              ))}
            </div>
          )}

          {adminTab === 'notify' && (
            <div className={`${t.card} border ${t.border} rounded-2xl p-4 space-y-3`}>
              <p className="text-xs font-bold flex items-center space-x-1.5"><Bell className="w-4 h-4 text-indigo-400" /><span>Send Notification</span></p>
              <div className="flex space-x-2">
                <button
                  onClick={() => { setNotifBroadcastMode('all'); setNotifTargetUid(''); }}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border ${notifBroadcastMode === 'all' ? 'bg-indigo-600 border-indigo-600 text-white' : `${t.input} ${t.sub}`}`}
                >
                  🌐 All Users
                </button>
                <button
                  onClick={() => setNotifBroadcastMode('specific')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border ${notifBroadcastMode === 'specific' ? 'bg-indigo-600 border-indigo-600 text-white' : `${t.input} ${t.sub}`}`}
                >
                  👤 Specific User
                </button>
              </div>
              {notifBroadcastMode === 'specific' && (
                <input value={notifTargetUid} onChange={(e) => setNotifTargetUid(e.target.value)} placeholder="Target UID (e.g. GMHF84)" className={`w-full ${t.input} border p-2.5 rounded-xl text-xs`} />
              )}
              <input value={notifTitle} onChange={(e) => setNotifTitle(e.target.value)} placeholder="Title" className={`w-full ${t.input} border p-2.5 rounded-xl text-xs`} />
              <textarea value={notifMessage} onChange={(e) => setNotifMessage(e.target.value)} placeholder="Message" rows={3} className={`w-full ${t.input} border p-2.5 rounded-xl text-xs`} />
              <button onClick={handleSendNotification} className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5"><Send className="w-3.5 h-3.5" /><span>SEND</span></button>
            </div>
          )}

          {adminTab === 'support' && (() => {
            const uidsWithChats = Object.keys(supportChats).filter(uid => (supportChats[uid].messages || []).length > 0);
            const selectedThread = adminSupportSelectedUid ? (supportChats[adminSupportSelectedUid] || { messages: [], aiEnabled: true }) : null;
            const selectedUserInfo = adminSupportSelectedUid ? registeredUsers.find(u => u.uid === adminSupportSelectedUid) : null;
            return (
              <div className="space-y-3">
                {!adminSupportSelectedUid ? (
                  <>
                    <p className="text-xs font-bold flex items-center space-x-1.5"><Bot className="w-4 h-4 text-indigo-400" /><span>Ask Your Problem — User Chats</span></p>
                    {uidsWithChats.length === 0 ? (
                      <p className="text-xs text-slate-500 text-center py-8">Ekhono kono user question koreni.</p>
                    ) : (
                      uidsWithChats.map(uid => {
                        const info = registeredUsers.find(u => u.uid === uid);
                        const thread = supportChats[uid];
                        const lastMsg = thread.messages[thread.messages.length - 1];
                        return (
                          <button key={uid} onClick={() => setAdminSupportSelectedUid(uid)} className={`w-full text-left ${t.card} border ${t.border} rounded-xl p-3 flex items-center justify-between`}>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-bold">{info ? info.name : uid} <span className="text-slate-500 font-mono font-normal">({uid})</span></p>
                              <p className="text-[11px] text-slate-500 truncate">{lastMsg ? `${lastMsg.sender === 'user' ? '' : (lastMsg.sender === 'admin' ? 'Apni: ' : 'AI: ')}${lastMsg.text}` : ''}</p>
                            </div>
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border flex-shrink-0 ml-2 ${thread.aiEnabled !== false ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40' : 'bg-slate-600/30 text-slate-400 border-slate-500/40'}`}>
                              {thread.aiEnabled !== false ? 'AI ON' : 'AI OFF'}
                            </span>
                          </button>
                        );
                      })
                    )}
                  </>
                ) : (
                  <div className={`${t.card} border ${t.border} rounded-2xl flex flex-col`} style={{ height: '65vh' }}>
                    <div className="flex items-center justify-between p-3 border-b border-slate-800/50 flex-shrink-0">
                      <button onClick={() => setAdminSupportSelectedUid(null)} className="flex items-center space-x-1.5 text-xs font-bold">
                        <ArrowLeft className="w-4 h-4" /><span>{selectedUserInfo ? selectedUserInfo.name : adminSupportSelectedUid}</span>
                      </button>
                      <button
                        onClick={() => toggleAiForThread(adminSupportSelectedUid)}
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${(selectedThread.aiEnabled !== false) ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40' : 'bg-slate-600/30 text-slate-400 border-slate-500/40'}`}
                      >
                        AI Auto-Reply: {(selectedThread.aiEnabled !== false) ? 'ON' : 'OFF'}
                      </button>
                    </div>
                    <div className="flex-1 overflow-y-auto overscroll-contain p-3 space-y-2" style={{ WebkitOverflowScrolling: 'touch' }}>
                      {selectedThread.messages.map((m, idx) => (
                        <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-start' : 'justify-end'}`}>
                          <div className={`max-w-[80%] rounded-xl px-3 py-2 text-xs ${
                            m.sender === 'user' ? `${darkMode ? 'bg-slate-800' : 'bg-slate-200'} ${t.text}` :
                            m.sender === 'admin' ? 'bg-emerald-600 text-white' : 'bg-indigo-600/70 text-white'
                          }`}>
                            {m.sender !== 'user' && <p className="text-[9px] font-bold opacity-70 mb-0.5">{m.sender === 'admin' ? 'Apni' : 'AI Assistant'}</p>}
                            {m.type === 'image' && m.imageUrl && (
                              <img src={m.imageUrl} alt="" className="rounded-lg max-w-full mb-1" />
                            )}
                            {m.type === 'voice' && m.audioUrl && (
                              <audio controls src={m.audioUrl} className="max-w-full mb-1" style={{ height: 32 }} />
                            )}
                            {m.text && <p className="whitespace-pre-line">{m.text}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 pt-2 flex-shrink-0 flex items-center space-x-2 border-t border-slate-800/50">
                      <button
                        type="button"
                        onClick={() => adminChatImageInputRef.current && adminChatImageInputRef.current.click()}
                        className={`w-10 h-10 flex-shrink-0 ${t.input} border rounded-xl flex items-center justify-center`}
                      >
                        <ImageIcon className="w-4 h-4 text-indigo-400" />
                      </button>
                      <input
                        ref={adminChatImageInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleAdminChatImageUpload}
                        style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}
                      />
                      <button
                        type="button"
                        onClick={() => isRecordingVoiceAdmin ? stopVoiceRecording(true) : startVoiceRecording(true)}
                        className={`w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center border ${isRecordingVoiceAdmin ? 'bg-red-600 border-red-600 animate-pulse' : t.input}`}
                      >
                        <Bot className={`w-4 h-4 ${isRecordingVoiceAdmin ? 'text-white' : 'text-indigo-400'}`} />
                      </button>
                      <input
                        value={adminSupportInput}
                        onChange={(e) => setAdminSupportInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleAdminSendSupportMessage(); }}
                        placeholder={isRecordingVoiceAdmin ? 'Recording...' : 'Reply likhun...'}
                        className={`flex-1 ${t.input} border p-2.5 rounded-xl text-xs`}
                      />
                      <button onClick={handleAdminSendSupportMessage} className="w-10 h-10 flex-shrink-0 bg-emerald-600 hover:bg-emerald-500 rounded-xl flex items-center justify-center">
                        <Send className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

          {adminTab === 'settings' && (
            <>
            <div className={`${t.card} border ${t.border} rounded-2xl p-4 space-y-3`}>
              <p className="text-xs font-bold flex items-center space-x-1.5"><Settings className="w-4 h-4 text-indigo-400" /><span>Contact & Payment Settings</span></p>

              <div>
                <label className="text-[10px] text-slate-500">bKash / Nagad Number (users money pathabe ekhane)</label>
                <input value={paymentNumberInput} onChange={(e) => setPaymentNumberInput(e.target.value)} placeholder="01XXXXXXXXX" className={`w-full ${t.input} border p-2.5 rounded-xl text-xs mt-1`} />
              </div>
              <div>
                <label className="text-[10px] text-slate-500">Support Contact Number</label>
                <input value={contactNumberInput} onChange={(e) => setContactNumberInput(e.target.value)} placeholder="01XXXXXXXXX" className={`w-full ${t.input} border p-2.5 rounded-xl text-xs mt-1`} />
              </div>
              <div>
                <label className="text-[10px] text-slate-500">Telegram Channel / Group Link</label>
                <input value={telegramLinkInput} onChange={(e) => setTelegramLinkInput(e.target.value)} placeholder="https://t.me/yourchannel" className={`w-full ${t.input} border p-2.5 rounded-xl text-xs mt-1`} />
              </div>
              <div>
                <label className="text-[10px] text-slate-500">Withdraw Page Rules/Notes (users ei text dekhbe)</label>
                <textarea value={withdrawRulesInput} onChange={(e) => setWithdrawRulesInput(e.target.value)} rows={5} placeholder="Ekek line-e ekek rule likhun" className={`w-full ${t.input} border p-2.5 rounded-xl text-xs mt-1`} />
              </div>

              <button onClick={handleSaveAppSettings} className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold">SAVE SETTINGS</button>
            </div>

            <div className={`${t.card} border ${t.border} rounded-2xl p-4 space-y-3 mt-4`}>
              <p className="text-xs font-bold flex items-center space-x-1.5"><Wallet className="w-4 h-4 text-indigo-400" /><span>Payment Methods (bKash / Nagad / Rocket)</span></p>
              <p className="text-[10px] text-slate-500">Prottekta method on/off korte paren ebong nijer icon upload korte paren. Kompokkho ekta on thakte hobe.</p>

              {paymentMethodsConfig.map(pm => (
                <div key={pm.name} className={`${darkMode ? 'bg-slate-950' : 'bg-slate-100'} rounded-xl p-3 flex items-center space-x-3`}>
                  <div className={`w-10 h-10 rounded-full ${pm.icon ? '' : pm.color} flex items-center justify-center text-white text-xs font-black flex-shrink-0 overflow-hidden`}>
                    {pm.icon ? <img src={pm.icon} alt="" className="w-full h-full object-cover" /> : pm.abbr}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold">{pm.name}</p>
                    <button
                      type="button"
                      onClick={() => { setIconUploadTarget(pm.name); paymentIconFileInputRef.current && paymentIconFileInputRef.current.click(); }}
                      className="text-[10px] text-indigo-400 font-semibold"
                    >
                      Gallery theke icon dao
                    </button>
                  </div>
                  <button
                    onClick={() => togglePaymentMethodEnabled(pm.name)}
                    className={`w-11 h-6 rounded-full relative transition-colors flex-shrink-0 ${pm.enabled ? 'bg-emerald-500' : 'bg-slate-600'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${pm.enabled ? 'right-0.5' : 'left-0.5'}`} />
                  </button>
                </div>
              ))}
              <input
                ref={paymentIconFileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePaymentIconUpload}
                style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}
              />
            </div>
            </>
          )}
        </div>

        {rejectModalData && (
          <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => { setRejectModalData(null); setRejectionReason(''); }}>
            <div className={`${t.card} w-full max-w-sm rounded-2xl p-5 space-y-3 border ${t.border}`} onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm">Reject Request</h3>
                <button onClick={() => { setRejectModalData(null); setRejectionReason(''); }}><X className="w-5 h-5 text-slate-400" /></button>
              </div>
              <textarea value={rejectionReason} onChange={(e) => setRejectionReason(e.target.value)} placeholder="Karon likhun..." rows={3} className={`w-full ${t.input} border p-2.5 rounded-xl text-xs`} />
              <button onClick={handleReject} className="w-full py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold">CONFIRM REJECT</button>
            </div>
          </div>
        )}

        {matchResultsModal && (
          <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => setMatchResultsModal(null)}>
            <div className={`${t.card} w-full max-w-sm rounded-2xl p-5 space-y-3 border ${t.border} max-h-[85vh] overflow-y-auto overscroll-contain`} style={{ WebkitOverflowScrolling: 'touch' }} onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm">Declare Results — {matchResultsModal.title}</h3>
                <button onClick={() => setMatchResultsModal(null)}><X className="w-5 h-5 text-slate-400" /></button>
              </div>
              {winnerEntries.map((w, idx) => (
                <div key={idx} className={`${darkMode ? 'bg-slate-950' : 'bg-slate-100'} rounded-xl p-3 space-y-2`}>
                  <div className="grid grid-cols-2 gap-2">
                    <input value={w.name} onChange={(e) => { const arr = [...winnerEntries]; arr[idx].name = e.target.value; setWinnerEntries(arr); }} placeholder="Name" className={`w-full ${t.input} border p-2 rounded-lg text-xs`} />
                    <input value={w.accountUid} onChange={(e) => { const arr = [...winnerEntries]; arr[idx].accountUid = e.target.value; setWinnerEntries(arr); }} placeholder="Account UID" className={`w-full ${t.input} border p-2 rounded-lg text-xs`} />
                    <input value={w.rank} onChange={(e) => { const arr = [...winnerEntries]; arr[idx].rank = e.target.value; setWinnerEntries(arr); }} placeholder="Rank" type="number" className={`w-full ${t.input} border p-2 rounded-lg text-xs`} />
                    <input value={w.points} onChange={(e) => { const arr = [...winnerEntries]; arr[idx].points = e.target.value; setWinnerEntries(arr); }} placeholder="Kill Points" type="number" className={`w-full ${t.input} border p-2 rounded-lg text-xs`} />
                    <input value={w.prize} onChange={(e) => { const arr = [...winnerEntries]; arr[idx].prize = e.target.value; setWinnerEntries(arr); }} placeholder="Prize (৳)" type="number" className={`w-full ${t.input} border p-2 rounded-lg text-xs col-span-2`} />
                  </div>
                  {winnerEntries.length > 1 && (
                    <button onClick={() => setWinnerEntries(winnerEntries.filter((_, i) => i !== idx))} className="text-[10px] text-red-400 font-semibold">Remove entry</button>
                  )}
                </div>
              ))}
              <button onClick={() => setWinnerEntries([...winnerEntries, { name: '', accountUid: '', rank: '', prize: '', points: '' }])} className={`w-full py-2 ${t.input} border rounded-xl text-xs font-bold`}>+ Add Winner</button>
              <button onClick={handleDeclareResults} className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold">DECLARE & NOTIFY</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ---------- MAIN LAYOUT ----------
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'mymatch', label: 'My Match', icon: Gamepad2 },
    { id: 'shop', label: 'Shop', icon: ShoppingBag },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className={`min-h-screen ${t.bg} ${t.text} font-sans pb-20 select-none`}>
      {Toast}

      <header className={`sticky top-0 z-40 px-4 py-3 flex items-center justify-between border-b ${t.border} ${darkMode ? 'bg-slate-900/90' : 'bg-white/90'} backdrop-blur-md`}>
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-xl overflow-hidden shadow-lg shadow-indigo-500/30 border border-slate-800">
            <img src={logoUrl} alt="URFF E-SPORTS" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="font-bold text-base bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">UR FF TOUR</h1>
            <p className="text-xs text-slate-400">Hi, {user.name}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={() => setShowNotifications(true)} className="relative p-1.5">
            <Bell className="w-5 h-5 text-slate-400" />
            {myNotifications.length > 0 && <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />}
          </button>
          <button onClick={() => setActiveTab('wallet')} className={`${t.card} border ${t.border} rounded-full px-3 py-1.5 flex items-center space-x-1`}>
            <Wallet className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs font-bold">৳{(user.depositBalance + user.winningBalance).toFixed(0)}</span>
          </button>
        </div>
      </header>

      {activeTab === 'home' && (
        <div className="p-4 space-y-5">
          {showBanner && activeBanners.length > 0 && (() => {
            const currentBanner = activeBanners[bannerCarouselIndex % activeBanners.length];
            return (
              <div className="relative rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-5 overflow-hidden">
                {currentBanner.image && (
                  <img src={currentBanner.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
                )}
                <div className={currentBanner.image ? 'absolute inset-0 bg-black/30' : ''} />
                <button onClick={() => setShowBanner(false)} className="absolute top-2 right-2 text-white/70 z-10"><X className="w-4 h-4" /></button>
                {currentBanner.title && <p className="relative text-white font-black text-lg leading-tight drop-shadow">{currentBanner.title}</p>}
                {currentBanner.subtitle && <p className="relative text-indigo-100 text-xs mt-1 drop-shadow">{currentBanner.subtitle}</p>}
                {activeBanners.length > 1 && (
                  <div className="relative flex items-center space-x-1.5 mt-3">
                    {activeBanners.map((_, idx) => (
                      <span key={idx} className={`h-1.5 rounded-full transition-all ${idx === (bannerCarouselIndex % activeBanners.length) ? 'w-5 bg-white' : 'w-1.5 bg-white/40'}`} />
                    ))}
                  </div>
                )}
              </div>
            );
          })()}

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => { if (!checkedInToday) setShowCheckInModal(true); }}
              className={`${t.card} border ${t.border} rounded-2xl p-4 flex flex-col items-center space-y-1 ${checkedInToday ? 'opacity-60' : ''}`}
            >
              <Flame className="w-6 h-6 text-amber-400" />
              <span className="text-xs font-bold">{checkedInToday ? 'Checked In' : 'Daily Check-in'}</span>
              <span className="text-[10px] text-slate-500">Streak: {checkInStreak} days</span>
            </button>
            <button onClick={() => setActiveTab('shop')} className={`${t.card} border ${t.border} rounded-2xl p-4 flex flex-col items-center space-y-1`}>
              <ShoppingBag className="w-6 h-6 text-cyan-400" />
              <span className="text-xs font-bold">FF Shop</span>
              <span className="text-[10px] text-slate-500">Diamonds & Likes</span>
            </button>
          </div>

          <button onClick={() => setShowLeaderboard(true)} className="w-full rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/10 border border-amber-500/30 p-4 flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span className="text-left">
                <span className="block text-xs font-bold text-amber-400">Leaderboard</span>
                <span className="block text-[10px] text-slate-500">Top players ranked — Weekly / Monthly / All Time</span>
              </span>
            </span>
            <ChevronRight className="w-4 h-4 text-amber-400" />
          </button>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-sm flex items-center space-x-1.5"><Gamepad2 className="w-4 h-4 text-indigo-400" /><span>Match Categories</span></h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {matchCategories.map(cat => {
                const count = tournaments.filter(t => t.categoryId === cat.id).length;
                return (
                  <div
                    key={cat.id}
                    onClick={() => setSelectedCategoryView(cat.id)}
                    className="relative rounded-2xl overflow-hidden cursor-pointer h-32 border border-slate-800"
                  >
                    {cat.image ? (
                      <img src={cat.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 to-violet-800" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white font-black text-sm leading-tight drop-shadow">{cat.name}</p>
                      <p className="text-[10px] text-amber-300 font-semibold mt-0.5">{count} matches found</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'wallet' && (
        <div className="p-4 space-y-5">
          <div className="rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 p-5 space-y-3">
            <p className="text-indigo-100 text-xs">Total Balance</p>
            <p className="text-white font-black text-3xl">৳{(user.depositBalance + user.winningBalance).toFixed(2)}</p>
            <div className="flex space-x-3 pt-1">
              <div className="flex-1 bg-white/10 rounded-xl p-2.5">
                <p className="text-[10px] text-indigo-100">Deposit Balance</p>
                <p className="text-sm font-bold text-white">৳{user.depositBalance.toFixed(2)}</p>
              </div>
              <div className="flex-1 bg-white/10 rounded-xl p-2.5">
                <p className="text-[10px] text-indigo-100">Winning Balance</p>
                <p className="text-sm font-bold text-white">৳{user.winningBalance.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => { setWalletAction('add'); setPaymentMethod('bKash'); }} className="py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5">
              <Plus className="w-4 h-4" /><span>Add Money</span>
            </button>
            <button onClick={() => { setWalletAction('withdraw'); setPaymentMethod('bKash'); }} className={`py-3.5 ${t.card} border ${t.border} rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5`}>
              <Minus className="w-4 h-4" /><span>Withdraw</span>
            </button>
          </div>

          <button onClick={() => setShowHistory(true)} className={`w-full py-3 ${t.card} border ${t.border} rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5`}>
            <History className="w-4 h-4" /><span>Transaction History</span>
          </button>
        </div>
      )}

      {activeTab === 'shop' && (
        <div className="p-4 space-y-4">
          <div className={`${t.card} border ${t.border} rounded-2xl p-3 flex items-center justify-between`}>
            <span className="flex items-center space-x-1.5 text-xs font-bold"><Wallet className="w-3.5 h-3.5 text-emerald-400" /><span>Balance:</span></span>
            <span className="text-sm font-black text-emerald-400">৳{(user.depositBalance + user.winningBalance).toFixed(2)}</span>
          </div>

          <div className={`${t.card} border ${t.border} rounded-2xl p-1 flex space-x-1`}>
            <button
              onClick={() => setShopViewTab('diamonds')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 ${shopViewTab === 'diamonds' ? 'bg-indigo-600 text-white' : t.sub}`}
            >
              <span>💎</span><span>DIAMONDS</span>
            </button>
            <button
              onClick={() => setShopViewTab('products')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 ${shopViewTab === 'products' ? 'bg-indigo-600 text-white' : t.sub}`}
            >
              <ShoppingBag className="w-3.5 h-3.5" /><span>PRODUCTS</span>
            </button>
          </div>

          <div className={`${t.input} border rounded-xl flex items-center px-3`}>
            <Search className="w-4 h-4 text-slate-500 flex-shrink-0" />
            <input
              value={shopSearchQuery}
              onChange={(e) => setShopSearchQuery(e.target.value)}
              placeholder="Product khujun..."
              className="flex-1 bg-transparent p-2.5 text-xs outline-none"
            />
            {shopSearchQuery && (
              <button onClick={() => setShopSearchQuery('')}><X className="w-3.5 h-3.5 text-slate-500" /></button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {shopItems
              .filter(item => shopViewTab === 'diamonds' ? item.type !== 'product' : item.type === 'product')
              .filter(item => item.title.toLowerCase().includes(shopSearchQuery.trim().toLowerCase()))
              .map(item => (
              <div key={item.id} onClick={() => setSelectedProduct(item)} className={`${t.card} border ${t.border} rounded-2xl overflow-hidden cursor-pointer relative`}>
                {item.discount && <span className="absolute top-2 left-2 z-10 text-[10px] font-bold text-white bg-orange-500 px-2 py-0.5 rounded-md">{item.discount}</span>}
                <div className="w-full aspect-square bg-gradient-to-tr from-indigo-600/20 to-violet-500/20 flex items-center justify-center text-5xl overflow-hidden">
                  {isImageUrl(item.image) ? <img src={item.image} alt="" className="w-full h-full object-cover" /> : item.image}
                </div>
                <div className="p-3 space-y-1.5">
                  <p className="text-xs font-bold leading-tight">{item.title}</p>
                  <div className="flex items-center space-x-2">
                    {item.oldPrice && <span className="text-[10px] text-slate-500 line-through">৳{item.oldPrice}</span>}
                    <span className="text-sm font-black text-indigo-400">৳{item.price}</span>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); setSelectedProduct(item); }} className="w-full py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl text-[11px] font-bold flex items-center justify-center space-x-1">
                    <ShoppingBag className="w-3 h-3" /><span>BUY NOW</span>
                  </button>
                </div>
              </div>
            ))}
            {shopItems
              .filter(item => shopViewTab === 'diamonds' ? item.type !== 'product' : item.type === 'product')
              .filter(item => item.title.toLowerCase().includes(shopSearchQuery.trim().toLowerCase()))
              .length === 0 && (
              <p className="col-span-2 text-xs text-slate-500 text-center py-8">{shopSearchQuery ? 'Ei naam e kono item paoa jayni.' : 'Ekhono kono item nei.'}</p>
            )}
          </div>
        </div>
      )}

      {activeTab === 'mymatch' && (() => {
        const DAY_MS = 24 * 60 * 60 * 1000;
        const isMatchVisibleInMyMatches = (mt) => {
          const participant = (matchParticipants[mt.id] || []).find(p => p.accountUid === user.uid);
          if (!participant) return false;
          const joinedAtMs = participant.joinedAtMs || 0;
          const hist = matchResultsHistory[mt.id];
          const declaredAtMs = hist ? hist.declaredAtMs : null;
          const joinWindowOk = joinedAtMs ? (Date.now() - joinedAtMs) < DAY_MS : true;
          const resultWindowOk = declaredAtMs ? (Date.now() - declaredAtMs) < DAY_MS : false;
          return joinWindowOk || resultWindowOk;
        };
        const myMatches = tournaments.filter(mt => isJoinedByMe(mt.id) && isMatchVisibleInMyMatches(mt));
        const myResultsList = myMatches
          .map(mt => {
            const hist = matchResultsHistory[mt.id];
            const myEntry = hist ? hist.winners.find(w => (w.accountUid || '').trim() === user.uid) : null;
            return { mt, myEntry };
          });
        const totalJoined = myMatches.length;
        const totalPoints = myResultsList.reduce((sum, r) => sum + (r.myEntry ? (parseFloat(r.myEntry.points) || 0) : 0), 0);
        const totalWinnings = myResultsList.reduce((sum, r) => sum + (r.myEntry ? (parseFloat(r.myEntry.prize) || 0) : 0), 0);

        return (
          <div className="p-4 space-y-4">
            <h2 className="font-bold text-sm flex items-center space-x-1.5"><Gamepad2 className="w-4 h-4 text-indigo-400" /><span>My Matches</span></h2>

            <div className="grid grid-cols-3 gap-2">
              <div className={`${t.card} border ${t.border} rounded-xl p-3 text-center`}>
                <p className="text-[10px] text-slate-500">Total Joined</p>
                <p className="text-sm font-black text-indigo-400">{totalJoined}</p>
              </div>
              <div className={`${t.card} border ${t.border} rounded-xl p-3 text-center`}>
                <p className="text-[10px] text-slate-500">Total Points</p>
                <p className="text-sm font-black text-cyan-400">{totalPoints}</p>
              </div>
              <div className={`${t.card} border ${t.border} rounded-xl p-3 text-center`}>
                <p className="text-[10px] text-slate-500">Total Winnings</p>
                <p className="text-sm font-black text-emerald-400">৳{totalWinnings}</p>
              </div>
            </div>

            <button
              onClick={() => setShowAllResults(true)}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5"
            >
              <Trophy className="w-4 h-4" /><span>UR FF ALL MATCH RESULTS</span>
            </button>

            <div className="space-y-3">
              {myMatches.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-10">Apni ekhono kono match e join koren ni.</p>
              ) : (
                myResultsList.map(({ mt, myEntry }) => (
                  <div key={mt.id} onClick={() => { setMatchDetailView(mt); setShowTotalPrizeInfo(false); }} className={`${t.card} border ${t.border} rounded-2xl p-4 space-y-2 cursor-pointer`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <IconBox value={mt.image} size="w-10 h-10" textSize="text-xl" />
                        <div>
                          <p className="text-xs font-bold">{mt.title}</p>
                          <p className="text-[10px] text-slate-500">{mt.category} • {mt.time}</p>
                        </div>
                      </div>
                      <StatusBadge status={mt.status} />
                    </div>
                    {myEntry ? (
                      <div className={`${darkMode ? 'bg-slate-950' : 'bg-slate-100'} rounded-lg p-2 grid grid-cols-3 gap-1 text-center`}>
                        <div><p className="text-[9px] text-slate-500">Rank</p><p className="text-xs font-bold text-amber-400">#{myEntry.rank}</p></div>
                        <div><p className="text-[9px] text-slate-500">Points</p><p className="text-xs font-bold text-cyan-400">{myEntry.points}</p></div>
                        <div><p className="text-[9px] text-slate-500">Prize</p><p className="text-xs font-bold text-emerald-400">৳{myEntry.prize}</p></div>
                      </div>
                    ) : (
                      <p className="text-[10px] text-slate-500">{mt.status === 'completed' ? 'Result soon...' : 'Result pending — match ekhono choltese'}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })()}

      {activeTab === 'profile' && (
        <div className="p-4 space-y-4">
          <div className={`${t.card} border ${t.border} rounded-2xl p-5 flex items-center space-x-4`}>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center font-black text-white text-2xl overflow-hidden flex-shrink-0">
              {user.avatar ? <img src={user.avatar} alt="" className="w-full h-full object-cover" /> : user.name.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm">{user.name}</p>
              <p className="text-xs text-slate-400">{user.number}</p>
              <p className="text-[10px] text-indigo-400 font-mono mt-0.5">UID: {user.uid}</p>
            </div>
            <button onClick={openProfileSettings} className={`p-2 ${t.input} border rounded-xl`}>
              <Edit3 className="w-4 h-4 text-indigo-400" />
            </button>
          </div>

          <div className={`${t.card} border ${t.border} rounded-2xl divide-y ${t.border}`}>
            <button onClick={openProfileSettings} className="w-full flex items-center justify-between p-4 text-xs font-semibold">
              <span className="flex items-center space-x-2"><User className="w-4 h-4 text-slate-400" /><span>Edit Profile (Name & Photo)</span></span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
            <button onClick={() => setShowMyOrders(true)} className="w-full flex items-center justify-between p-4 text-xs font-semibold">
              <span className="flex items-center space-x-2"><ShoppingBag className="w-4 h-4 text-slate-400" /><span>My Orders</span></span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
            <button onClick={() => setShowBalanceShare(true)} className="w-full flex items-center justify-between p-4 text-xs font-semibold">
              <span className="flex items-center space-x-2"><Send className="w-4 h-4 text-slate-400" /><span>Balance Share</span></span>
              <span className="text-[10px] text-slate-500">৳{BALANCE_SHARE_FEE} fee</span>
            </button>
            <button onClick={() => setDarkMode(!darkMode)} className="w-full flex items-center justify-between p-4 text-xs font-semibold">
              <span className="flex items-center space-x-2">{darkMode ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-400" />}<span>Dark Mode</span></span>
              <div className={`w-9 h-5 rounded-full ${darkMode ? 'bg-indigo-600' : 'bg-slate-300'} relative transition-colors`}>
                <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${darkMode ? 'right-0.5' : 'left-0.5'}`} />
              </div>
            </button>
            <button onClick={() => setShowHistory(true)} className="w-full flex items-center justify-between p-4 text-xs font-semibold">
              <span className="flex items-center space-x-2"><History className="w-4 h-4 text-slate-400" /><span>Transaction History</span></span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
            <button onClick={() => showToast(`Support: ${appSettings.contactNumber}`)} className="w-full flex items-center justify-between p-4 text-xs font-semibold">
              <span className="flex items-center space-x-2"><Headphones className="w-4 h-4 text-slate-400" /><span>Support</span></span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
            {appSettings.telegramLink && (
              <a href={appSettings.telegramLink} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-between p-4 text-xs font-semibold">
                <span className="flex items-center space-x-2"><Send className="w-4 h-4 text-sky-400" /><span>Join Our Telegram</span></span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </a>
            )}
            <button onClick={() => setShowInviteFriends(true)} className="w-full flex items-center justify-between p-4 text-xs font-semibold">
              <span className="flex items-center space-x-2"><Share2 className="w-4 h-4 text-slate-400" /><span>Invite Friends</span></span>
              <span className="text-[10px] text-emerald-400">Earn ৳{INVITE_BONUS}</span>
            </button>
            <button onClick={() => setShowAskProblem(true)} className="w-full flex items-center justify-between p-4 text-xs font-semibold">
              <span className="flex items-center space-x-2"><Bot className="w-4 h-4 text-indigo-400" /><span>Ask Your Problem</span></span>
              <span className="text-[10px] text-indigo-400">AI + Admin</span>
            </button>
            <button onClick={() => setShowAppDeveloper(true)} className="w-full flex items-center justify-between p-4 text-xs font-semibold">
              <span className="flex items-center space-x-2"><Bot className="w-4 h-4 text-slate-400" /><span>App Developer</span></span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
            <button onClick={() => setActiveTab('admin')} className="w-full flex items-center justify-between p-4 text-xs font-semibold">
              <span className="flex items-center space-x-2"><Shield className="w-4 h-4 text-slate-400" /><span>Admin Panel</span></span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
          </div>

          <button onClick={handleLogout} className="w-full py-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5">
            <Power className="w-4 h-4" /><span>Logout</span>
          </button>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className={`fixed bottom-0 left-0 right-0 z-40 ${darkMode ? 'bg-slate-900/95' : 'bg-white/95'} border-t ${t.border} backdrop-blur-md flex items-center justify-around py-2`}>
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center space-y-1 px-4 py-1.5 rounded-xl transition-colors ${activeTab === item.id ? 'text-indigo-400' : 'text-slate-500'}`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-semibold">{item.label}</span>
          </button>
        ))}
      </nav>

      {showLeaderboard && (() => {
        const rankedList = getLeaderboardData();
        const metricLabel = leaderboardMetric === 'wins' ? 'W' : leaderboardMetric === 'earnings' ? 'Earnings' : 'Withdrawn';
        const metricValue = (p) => leaderboardMetric === 'wins' ? `${p.wins}W` : `৳${p[leaderboardMetric]}`;
        return (
          <div className="fixed inset-0 z-50 bg-black/70 flex items-end sm:items-center justify-center p-4" onClick={() => setShowLeaderboard(false)}>
            <div className={`${t.card} w-full max-w-sm rounded-2xl border ${t.border} max-h-[90vh] flex flex-col overflow-hidden`} onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-5 pb-3 flex-shrink-0">
                <div className="flex items-center space-x-2">
                  <button onClick={() => setShowLeaderboard(false)} className="p-1"><ArrowLeft className="w-5 h-5 text-slate-400" /></button>
                  <div>
                    <h3 className="font-black text-base">LEADERBOARD</h3>
                    <p className="text-[10px] text-slate-500">Top players ranked</p>
                  </div>
                </div>
                <button onClick={() => setShowLeaderboard(false)}><X className="w-5 h-5 text-slate-400" /></button>
              </div>

              <div className="px-5 space-y-3 flex-shrink-0">
                <div className={`${darkMode ? 'bg-slate-950' : 'bg-slate-100'} rounded-xl p-1 flex`}>
                  {[['weekly', 'Weekly'], ['monthly', 'Monthly'], ['alltime', 'All Time']].map(([val, label]) => (
                    <button
                      key={val}
                      onClick={() => setLeaderboardPeriod(val)}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold ${leaderboardPeriod === val ? `${t.card} ${t.text}` : 'text-slate-500'}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <div className="flex space-x-2">
                  {[['wins', '🏆 WINS'], ['earnings', '📈 EARNINGS'], ['withdrawn', '💸 WITHDRAWN']].map(([val, label]) => (
                    <button
                      key={val}
                      onClick={() => setLeaderboardMetric(val)}
                      className={`flex-1 py-2 rounded-xl text-[11px] font-bold border ${leaderboardMetric === val ? 'bg-indigo-600 border-indigo-600 text-white' : `${t.input} ${t.sub}`}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 overflow-y-auto overscroll-contain" style={{ WebkitOverflowScrolling: 'touch' }}>
                {/* Podium for #1-3 */}
                <div className="grid grid-cols-3 gap-2 mb-4 items-end">
                  {[rankedList[1], rankedList[0], rankedList[2]].map((p, podiumIdx) => {
                    if (!p) return <div key={podiumIdx} />;
                    const rank = podiumIdx === 1 ? 1 : podiumIdx === 0 ? 2 : 3;
                    const ringColor = rank === 1 ? 'border-amber-400' : rank === 2 ? 'border-violet-400' : 'border-cyan-400';
                    const textColor = rank === 1 ? 'text-amber-400' : rank === 2 ? 'text-violet-400' : 'text-cyan-400';
                    return (
                      <div key={podiumIdx} className={`${t.card} border ${ringColor} rounded-2xl p-3 text-center relative ${rank === 1 ? 'pt-6' : ''}`}>
                        {rank === 1 && <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-lg">👑</span>}
                        <span className={`absolute top-1.5 right-1.5 w-5 h-5 rounded-full ${t.card} border ${ringColor} flex items-center justify-center text-[9px] font-bold ${textColor}`}>#{rank}</span>
                        <div className={`w-12 h-12 rounded-full ${darkMode ? 'bg-slate-800' : 'bg-slate-200'} border-2 ${ringColor} mx-auto flex items-center justify-center font-black text-sm overflow-hidden`}>
                          {p.avatar ? <img src={p.avatar} alt="" className="w-full h-full object-cover" /> : p.name.charAt(0)}
                        </div>
                        <p className="text-[11px] font-bold mt-1.5 truncate">{p.name}</p>
                        <p className={`text-sm font-black ${textColor}`}>{metricValue(p)}</p>
                        <p className="text-[9px] text-slate-500">{p.kills}K • {p.matches}M</p>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-2">
                  {rankedList.slice(3).map((p, idx) => (
                    <div key={idx} className={`${t.card} border ${t.border} rounded-xl p-3 flex items-center space-x-3`}>
                      <span className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400 flex-shrink-0">#{idx + 4}</span>
                      <div className={`w-8 h-8 rounded-full ${darkMode ? 'bg-slate-800' : 'bg-slate-200'} flex items-center justify-center font-bold text-xs flex-shrink-0 overflow-hidden`}>
                        {p.avatar ? <img src={p.avatar} alt="" className="w-full h-full object-cover" /> : p.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold truncate">{p.name}</p>
                        <p className="text-[10px] text-slate-500">{p.kills} kills • {p.matches} matches</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs font-black text-indigo-400">{metricValue(p)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-600 text-center mt-3">Demo leaderboard data — bastob player stats jog hole ei list update hobe.</p>
                <button
                  onClick={() => { setShowLeaderboard(false); setActiveTab('home'); }}
                  className={`w-full py-3 mt-3 ${t.input} border rounded-xl text-xs font-bold`}
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {showAllResults && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-end sm:items-center justify-center p-4" onClick={() => setShowAllResults(false)}>
          <div className={`${t.card} w-full max-w-sm rounded-2xl border ${t.border} max-h-[85vh] flex flex-col overflow-hidden`} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 pb-3 flex-shrink-0">
              <h3 className="font-bold text-sm flex items-center space-x-1.5"><Trophy className="w-4 h-4 text-amber-400" /><span>UR FF ALL MATCH RESULTS</span></h3>
              <button onClick={() => setShowAllResults(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <div className="px-5 pb-5 overflow-y-auto overscroll-contain space-y-3" style={{ WebkitOverflowScrolling: 'touch' }}>
              {Object.keys(matchResultsHistory).length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-6">Ekhono kono match er result declare kora hoyni.</p>
              ) : (
                Object.entries(matchResultsHistory)
                  .sort((a, b) => (b[0] > a[0] ? 1 : -1))
                  .map(([matchId, res]) => (
                    <div key={matchId} className={`${darkMode ? 'bg-slate-950' : 'bg-slate-100'} rounded-xl p-3 space-y-2`}>
                      <div>
                        <p className="text-xs font-bold">{res.title}</p>
                        <p className="text-[10px] text-slate-500">{res.category} • {res.declaredAt}</p>
                      </div>
                      <div className="space-y-1.5">
                        {res.winners.map((w, idx) => (
                          <div key={idx} className="flex items-center justify-between text-[11px]">
                            <span className="font-semibold">#{w.rank} {w.name} <span className="text-slate-500 font-mono">({w.accountUid})</span></span>
                            <span className="text-slate-400">{w.points} pts • <span className="text-emerald-400 font-bold">৳{w.prize}</span></span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      )}

      {showMyOrders && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-end sm:items-center justify-center p-4" onClick={() => setShowMyOrders(false)}>
          <div className={`${t.card} w-full max-w-sm rounded-2xl border ${t.border} max-h-[85vh] flex flex-col overflow-hidden`} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 pb-3 flex-shrink-0">
              <h3 className="font-bold text-sm">My Orders</h3>
              <button onClick={() => setShowMyOrders(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <div className="px-5 pb-5 overflow-y-auto overscroll-contain space-y-2" style={{ WebkitOverflowScrolling: 'touch' }}>
              {pendingShopOrders.filter(o => o.uid === user.uid).length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-6">Apni ekhono kono order koren ni.</p>
              ) : (
                pendingShopOrders.filter(o => o.uid === user.uid).map(o => {
                  const statusStyle = {
                    pending: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
                    accepted: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40',
                    delivered: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
                    rejected: 'bg-red-500/20 text-red-400 border-red-500/40',
                  }[o.status] || 'bg-slate-500/20 text-slate-400 border-slate-500/40';
                  return (
                    <div key={o.id} className={`${darkMode ? 'bg-slate-950' : 'bg-slate-100'} rounded-xl p-3 space-y-1.5`}>
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold">{o.itemTitle}</p>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusStyle}`}>{o.status.toUpperCase()}</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        ৳{o.price}{o.quantity > 1 ? ` x${o.quantity}` : ''}{o.selectedSize ? ` • Size: ${o.selectedSize}` : ''} {o.type === 'product' ? `• ${o.deliveryMethod}` : `• FF UID: ${o.ffUid}`}
                      </p>
                      {o.type === 'product' && o.deliveryMethod === 'COD' && o.status !== 'rejected' && (
                        <p className="text-[10px] text-amber-400">Advance ৳{o.chargedAmount ?? COD_ADVANCE_CHARGE} deducted • ৳{o.codDue || o.price} due on delivery (cash)</p>
                      )}
                      {o.status === 'rejected' && o.rejectReason && (
                        <p className="text-[10px] text-red-400">Reject reason: {o.rejectReason}</p>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {showBalanceShare && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-end sm:items-center justify-center p-4" onClick={() => setShowBalanceShare(false)}>
          <div className={`${t.card} w-full max-w-sm rounded-2xl p-5 space-y-4 border ${t.border}`} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm">Balance Share</h3>
              <button onClick={() => setShowBalanceShare(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <p className="text-[11px] text-slate-500">Bondhur UID diye tার account e sরাসরি balance pathan. Prottek transfer e ৳{BALANCE_SHARE_FEE} fee lagbe.</p>
            <div className={`${darkMode ? 'bg-slate-950' : 'bg-slate-100'} rounded-xl p-3 text-xs flex items-center justify-between`}>
              <span className="text-slate-400">Apnar Total Balance</span>
              <span className="font-bold text-emerald-400">৳{(user.depositBalance + user.winningBalance).toFixed(2)}</span>
            </div>
            <div>
              <label className="text-xs text-slate-400">Friend-er UID</label>
              <input value={shareTargetUid} onChange={(e) => setShareTargetUid(e.target.value)} placeholder="e.g. GMHF84" className={`w-full ${t.input} border p-2.5 rounded-xl text-xs mt-1`} />
            </div>
            <div>
              <label className="text-xs text-slate-400">Amount (Taka)</label>
              <input type="number" value={shareAmount} onChange={(e) => setShareAmount(e.target.value)} placeholder="e.g. 50" className={`w-full ${t.input} border p-2.5 rounded-xl text-xs mt-1`} />
            </div>
            {shareAmount && !isNaN(parseFloat(shareAmount)) && (
              <div className={`${darkMode ? 'bg-slate-950' : 'bg-slate-100'} rounded-xl p-3 text-xs flex items-center justify-between`}>
                <span className="text-slate-400">Total Kata Hobe (amount + fee)</span>
                <span className="font-bold text-amber-400">৳{(parseFloat(shareAmount) + BALANCE_SHARE_FEE).toFixed(2)}</span>
              </div>
            )}
            <button onClick={handleBalanceShare} className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold">SEND BALANCE</button>
          </div>
        </div>
      )}

      {showInviteFriends && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-end sm:items-center justify-center p-4" onClick={() => setShowInviteFriends(false)}>
          <div className={`${t.card} w-full max-w-sm rounded-2xl p-5 space-y-4 border ${t.border}`} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm">Invite Friends</h3>
              <button onClick={() => setShowInviteFriends(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <div className="rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 p-5 text-center space-y-1">
              <p className="text-emerald-100 text-xs">Apnar Referral Code</p>
              <p className="text-white font-black text-2xl font-mono tracking-wider">{user.uid}</p>
            </div>
            <p className="text-[11px] text-slate-500 text-center">Apnar friend registration korar somoy ei code "Referral Code" field e dile, apni ৳{INVITE_BONUS} bonus paben — prottekbar!</p>
            <button onClick={() => copyToClipboard(user.uid, 'Referral code')} className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5">
              <Copy className="w-3.5 h-3.5" /><span>COPY REFERRAL CODE</span>
            </button>
          </div>
        </div>
      )}

      {showAppDeveloper && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-end sm:items-center justify-center p-4" onClick={() => setShowAppDeveloper(false)}>
          <div className={`${t.card} w-full max-w-sm rounded-2xl p-5 space-y-4 border ${t.border}`} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm">App Developer</h3>
              <button onClick={() => setShowAppDeveloper(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <div className="flex flex-col items-center space-y-2 py-2">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-800">
                <img src={logoUrl} alt="" className="w-full h-full object-cover" />
              </div>
              <p className="font-bold text-sm">UR FF TOUR</p>
              <p className="text-[11px] text-slate-500">Bangladesh Free Fire Tournament Platform</p>
            </div>
            <div className={`${darkMode ? 'bg-slate-950' : 'bg-slate-100'} rounded-xl p-3 space-y-1 text-xs`}>
              <div className="flex justify-between"><span className="text-slate-500">Support Contact</span><span className="font-semibold">{appSettings.contactNumber}</span></div>
              {appSettings.telegramLink && (
                <div className="flex justify-between"><span className="text-slate-500">Telegram</span><a href={appSettings.telegramLink} target="_blank" rel="noopener noreferrer" className="font-semibold text-indigo-400 underline">Join Channel</a></div>
              )}
            </div>
            <p className="text-[10px] text-slate-600 text-center">Developed & maintained via Admin Panel.</p>
          </div>
        </div>
      )}

      {showAskProblem && (() => {
        const thread = supportChats[user.uid] || { messages: [], aiEnabled: true };
        return (
          <div className="fixed inset-0 z-50 bg-black/70 flex items-end sm:items-center justify-center p-4" onClick={() => setShowAskProblem(false)}>
            <div className={`${t.card} w-full max-w-sm rounded-2xl border ${t.border} max-h-[85vh] flex flex-col overflow-hidden`} onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-5 pb-3 flex-shrink-0">
                <div className="flex items-center space-x-2">
                  <button onClick={() => setShowAskProblem(false)} className="p-1"><ArrowLeft className="w-5 h-5 text-slate-400" /></button>
                  <div>
                    <h3 className="font-bold text-sm">Ask Your Problem</h3>
                    <p className="text-[10px] text-slate-500">AI shohai + admin ekhane reply dey</p>
                  </div>
                </div>
                <button onClick={() => setShowAskProblem(false)}><X className="w-5 h-5 text-slate-400" /></button>
              </div>

              <div className="px-5 pb-3 overflow-y-auto overscroll-contain flex-1 space-y-2" style={{ WebkitOverflowScrolling: 'touch' }}>
                {thread.messages.length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-6">Apnar proshno ba shomossha ekhane likhun, chobi pathan, ba voice message rekord korun — AI shohai shathe shathe uttor debe, ba admin nijei reply korben.</p>
                ) : (
                  thread.messages.map((m, idx) => (
                    <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] rounded-xl px-3 py-2 text-xs ${
                        m.sender === 'user' ? 'bg-indigo-600 text-white' :
                        m.sender === 'admin' ? 'bg-emerald-600 text-white' :
                        `${darkMode ? 'bg-slate-800' : 'bg-slate-200'} ${t.text}`
                      }`}>
                        {m.sender !== 'user' && <p className="text-[9px] font-bold opacity-70 mb-0.5">{m.sender === 'admin' ? 'Admin' : 'AI Assistant'}</p>}
                        {m.type === 'image' && m.imageUrl && (
                          <img src={m.imageUrl} alt="" className="rounded-lg max-w-full mb-1" />
                        )}
                        {m.type === 'voice' && m.audioUrl && (
                          <audio controls src={m.audioUrl} className="max-w-full mb-1" style={{ height: 32 }} />
                        )}
                        {m.text && <p className="whitespace-pre-line">{m.text}</p>}
                      </div>
                    </div>
                  ))
                )}
                {supportChatLoading && (
                  <div className="flex justify-start">
                    <div className={`rounded-xl px-3 py-2 text-xs ${darkMode ? 'bg-slate-800' : 'bg-slate-200'}`}>
                      <p className="text-[9px] font-bold opacity-70 mb-0.5">AI Assistant</p>
                      <p className="text-slate-400">Typing...</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 pt-2 flex-shrink-0 flex items-center space-x-2 border-t border-slate-800/50">
                <button
                  type="button"
                  onClick={() => userChatImageInputRef.current && userChatImageInputRef.current.click()}
                  className={`w-10 h-10 flex-shrink-0 ${t.input} border rounded-xl flex items-center justify-center`}
                >
                  <ImageIcon className="w-4 h-4 text-indigo-400" />
                </button>
                <input
                  ref={userChatImageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleUserChatImageUpload}
                  style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}
                />
                <button
                  type="button"
                  onClick={() => isRecordingVoice ? stopVoiceRecording(false) : startVoiceRecording(false)}
                  className={`w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center border ${isRecordingVoice ? 'bg-red-600 border-red-600 animate-pulse' : t.input}`}
                >
                  <Bot className={`w-4 h-4 ${isRecordingVoice ? 'text-white' : 'text-indigo-400'}`} />
                </button>
                <input
                  value={supportChatInput}
                  onChange={(e) => setSupportChatInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSendSupportMessage(); }}
                  placeholder={isRecordingVoice ? 'Recording...' : 'Apnar proshno likhun...'}
                  className={`flex-1 ${t.input} border p-2.5 rounded-xl text-xs`}
                />
                <button onClick={handleSendSupportMessage} className="w-10 h-10 flex-shrink-0 bg-indigo-600 hover:bg-indigo-500 rounded-xl flex items-center justify-center">
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {showProfileSettings && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-end sm:items-center justify-center p-4" onClick={() => setShowProfileSettings(false)}>
          <div className={`${t.card} w-full max-w-sm rounded-2xl border ${t.border} max-h-[90vh] flex flex-col overflow-hidden`} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center space-x-3 p-5 pb-3 flex-shrink-0">
              <button onClick={() => setShowProfileSettings(false)} className={`p-2 ${t.input} border rounded-full`}><ArrowLeft className="w-4 h-4 text-slate-400" /></button>
              <h3 className="font-bold text-base">Edit Profile</h3>
            </div>

            <div className="px-5 pb-5 overflow-y-auto overscroll-contain space-y-4" style={{ WebkitOverflowScrolling: 'touch' }}>
              <div className="flex flex-col items-center space-y-3 pt-2">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center font-black text-white text-3xl overflow-hidden border-2 border-indigo-500/40">
                    {profileAvatarInput ? <img src={profileAvatarInput} alt="" className="w-full h-full object-cover" /> : (profileNameInput.charAt(0) || '?')}
                  </div>
                  <button
                    type="button"
                    onClick={() => profileFileInputRef.current && profileFileInputRef.current.click()}
                    className="absolute bottom-0 right-0 w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center border-2 border-slate-900"
                  >
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                  <input
                    ref={profileFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleProfileAvatarUpload}
                    style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}
                  />
                </div>
                {profileAvatarInput && (
                  <button onClick={() => setProfileAvatarInput('')} className="text-[10px] text-red-400 font-semibold">Remove photo</button>
                )}
              </div>

              <div>
                <label className="text-[10px] text-slate-500 flex items-center space-x-1.5"><User className="w-3.5 h-3.5" /><span>USERNAME</span></label>
                <input value={profileNameInput} onChange={(e) => setProfileNameInput(e.target.value)} placeholder="Your Name" className={`w-full ${t.input} border p-2.5 rounded-xl text-xs mt-1.5`} />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 flex items-center space-x-1.5"><Headphones className="w-3.5 h-3.5" /><span>PHONE NUMBER</span></label>
                <input value={profilePhoneInput} onChange={(e) => setProfilePhoneInput(e.target.value)} placeholder="01XXXXXXXXX" className={`w-full ${t.input} border p-2.5 rounded-xl text-xs mt-1.5`} />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 flex items-center space-x-1.5"><Gamepad2 className="w-3.5 h-3.5" /><span>FREE FIRE UID</span></label>
                <input value={profileFfUidInput} onChange={(e) => setProfileFfUidInput(e.target.value)} placeholder="Your game UID" className={`w-full ${t.input} border p-2.5 rounded-xl text-xs mt-1.5`} />
              </div>
              <div>
                <label className="text-[10px] text-slate-500">EMAIL (CANNOT CHANGE)</label>
                <input value={user.email} disabled className={`w-full ${t.input} border p-2.5 rounded-xl text-xs mt-1.5 opacity-50 cursor-not-allowed`} />
              </div>

              <button onClick={handleSaveProfile} className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5">
                <Save className="w-3.5 h-3.5" /><span>SAVE CHANGES</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {showCheckInModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => setShowCheckInModal(false)}>
          <div className={`${t.card} w-full max-w-xs rounded-2xl p-6 space-y-4 border ${t.border} text-center`} onClick={(e) => e.stopPropagation()}>
            <div className="w-16 h-16 bg-gradient-to-tr from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto"><Flame className="w-8 h-8 text-white" /></div>
            <div>
              <h3 className="font-bold text-sm">Daily Check-in</h3>
              {checkInBonusDays < CHECKIN_BONUS_LIMIT ? (
                <p className="text-xs text-slate-400 mt-1">Day {checkInStreak} streak — earn ৳{CHECKIN_DAILY_REWARD} bonus! ({CHECKIN_BONUS_LIMIT - checkInBonusDays} bonus day{CHECKIN_BONUS_LIMIT - checkInBonusDays !== 1 ? 's' : ''} left)</p>
              ) : (
                <p className="text-xs text-amber-400 mt-1">Apni maximum {CHECKIN_BONUS_LIMIT} diner bonus already peye gechen. Ar bonus paben na, tobe check-in korle streak update hobe.</p>
              )}
            </div>
            <button onClick={handleCheckIn} className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold">CHECK IN NOW</button>
            <button onClick={() => setShowCheckInModal(false)} className="w-full text-xs text-slate-500">Maybe later</button>
          </div>
        </div>
      )}

      {showNotifications && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-end sm:items-center justify-center p-4" onClick={() => setShowNotifications(false)}>
          <div className={`${t.card} w-full max-w-sm rounded-2xl border ${t.border} max-h-[80vh] flex flex-col overflow-hidden`} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 pb-3 flex-shrink-0">
              <h3 className="font-bold text-sm">Notifications</h3>
              <button onClick={() => setShowNotifications(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <div className="px-5 pb-5 overflow-y-auto overscroll-contain" style={{ WebkitOverflowScrolling: 'touch' }}>
              {myNotifications.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-6">Kono notification nei.</p>
              ) : (
                <div className="space-y-2">
                  {myNotifications.map(n => (
                    <div key={n.id} className={`${darkMode ? 'bg-slate-950' : 'bg-slate-100'} rounded-xl p-3 space-y-0.5`}>
                      <p className="text-xs font-bold">{n.title}</p>
                      <p className="text-[11px] text-slate-400">{n.message}</p>
                      <p className="text-[10px] text-slate-600">{n.time}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showHistory && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-end sm:items-center justify-center p-4" onClick={() => setShowHistory(false)}>
          <div className={`${t.card} w-full max-w-sm rounded-2xl border ${t.border} max-h-[80vh] flex flex-col overflow-hidden`} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 pb-3 flex-shrink-0">
              <h3 className="font-bold text-sm">Transaction History</h3>
              <button onClick={() => setShowHistory(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <div className="px-5 pb-5 overflow-y-auto overscroll-contain" style={{ WebkitOverflowScrolling: 'touch' }}>
              {pendingDeposits.filter(d => d.uid === user.uid).length === 0 && pendingWithdrawals.filter(w => w.uid === user.uid).length === 0 && pendingShopOrders.filter(o => o.uid === user.uid).length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-6">Kono pending transaction nei.</p>
              ) : (
                <div className="space-y-2">
                  {pendingDeposits.filter(d => d.uid === user.uid).map(d => (
                    <div key={d.id} className={`${darkMode ? 'bg-slate-950' : 'bg-slate-100'} rounded-xl p-3 flex items-center justify-between text-xs`}>
                      <div><p className="font-semibold">Deposit — {d.method}</p><p className="text-[10px] text-slate-500">TrxID: {d.trxId}</p></div>
                      <div className="text-right"><p className="font-bold text-emerald-400">+৳{d.amount}</p><p className="text-[10px] text-amber-400">Pending</p></div>
                    </div>
                  ))}
                  {pendingWithdrawals.filter(w => w.uid === user.uid).map(w => (
                    <div key={w.id} className={`${darkMode ? 'bg-slate-950' : 'bg-slate-100'} rounded-xl p-3 flex items-center justify-between text-xs`}>
                      <div><p className="font-semibold">Withdraw — {w.method}</p><p className="text-[10px] text-slate-500">A/C: {w.account}</p></div>
                      <div className="text-right"><p className="font-bold text-red-400">-৳{w.amount}</p><p className="text-[10px] text-amber-400">Pending</p></div>
                    </div>
                  ))}
                  {pendingShopOrders.filter(o => o.uid === user.uid).map(o => (
                    <div key={o.id} className={`${darkMode ? 'bg-slate-950' : 'bg-slate-100'} rounded-xl p-3 flex items-center justify-between text-xs`}>
                      <div><p className="font-semibold">{o.itemTitle}</p><p className="text-[10px] text-slate-500">FF UID: {o.ffUid}</p></div>
                      <div className="text-right"><p className="font-bold text-red-400">-৳{o.price}</p><p className="text-[10px] text-amber-400">Pending</p></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {walletAction === 'add' && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-end sm:items-center justify-center p-4" onClick={() => setWalletAction(null)}>
          <div className={`${t.card} w-full max-w-sm rounded-2xl border ${t.border} max-h-[90vh] flex flex-col overflow-hidden`} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 pb-3 flex-shrink-0">
              <button type="button" onClick={() => setWalletAction(null)} className="flex items-center space-x-1 text-slate-400 py-1 pr-2"><ArrowLeft className="w-4 h-4" /><span className="text-xs">Back</span></button>
              <h3 className="font-bold text-sm">Add Money</h3>
              <button type="button" onClick={() => setWalletAction(null)} className="p-1"><X className="w-5 h-5 text-slate-400" /></button>
            </div>

            <div className="px-5 pb-5 overflow-y-auto overscroll-contain space-y-4" style={{ WebkitOverflowScrolling: 'touch' }}>
              <div>
                <label className="text-xs text-slate-400 mb-1.5 block">Payment Method</label>
                {renderPaymentMethodSelector()}
              </div>

              <button onClick={() => copyToClipboard(appSettings.paymentNumber, 'Number')} className={`w-full text-left ${darkMode ? 'bg-slate-950' : 'bg-slate-100'} rounded-xl p-3 space-y-1`}>
                <p className="text-[10px] text-slate-500">Send Money To This {paymentMethod} Number (Personal) — tap to copy</p>
                <div className="flex items-center justify-between">
                  <p className="font-mono font-bold text-sm text-indigo-400">{appSettings.paymentNumber}</p>
                  <Copy className="w-4 h-4 text-slate-400" />
                </div>
              </button>

              <div>
                <label className="text-xs text-slate-400">Amount (Taka)</label>
                <input type="number" value={amountInput} onChange={(e) => setAmountInput(e.target.value)} placeholder="e.g. 100" className={`w-full ${t.input} border p-2.5 rounded-xl text-xs mt-1`} />
              </div>
              <div>
                <label className="text-xs text-slate-400">Transaction ID (TrxID)</label>
                <input value={trxIdInput} onChange={(e) => setTrxIdInput(e.target.value)} placeholder="e.g. 9N876XVC" className={`w-full ${t.input} border p-2.5 rounded-xl text-xs mt-1`} />
              </div>

              <button onClick={handleAddMoneySubmit} className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold">SUBMIT REQUEST</button>
              <button type="button" onClick={() => setWalletAction(null)} className={`w-full py-2.5 ${t.input} border rounded-xl text-xs font-bold`}>CANCEL</button>
            </div>
          </div>
        </div>
      )}

      {walletAction === 'withdraw' && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-end sm:items-center justify-center p-4" onClick={() => setWalletAction(null)}>
          <div className={`${t.card} w-full max-w-sm rounded-2xl border ${t.border} max-h-[90vh] flex flex-col overflow-hidden`} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 pb-3 flex-shrink-0">
              <button type="button" onClick={() => setWalletAction(null)} className="flex items-center space-x-1 text-slate-400 py-1 pr-2"><ArrowLeft className="w-4 h-4" /><span className="text-xs">Back</span></button>
              <h3 className="font-bold text-sm">Withdraw Money</h3>
              <button type="button" onClick={() => setWalletAction(null)} className="p-1"><X className="w-5 h-5 text-slate-400" /></button>
            </div>

            <div className="px-5 pb-5 overflow-y-auto overscroll-contain space-y-4" style={{ WebkitOverflowScrolling: 'touch' }}>
              <div className={`${darkMode ? 'bg-slate-950' : 'bg-slate-100'} rounded-xl p-3 grid grid-cols-3 gap-2 text-center`}>
                <div><p className="text-[9px] text-slate-500">Deposit</p><p className="text-xs font-bold text-indigo-400">৳{user.depositBalance.toFixed(2)}</p></div>
                <div><p className="text-[9px] text-slate-500">Winning</p><p className="text-xs font-bold text-emerald-400">৳{user.winningBalance.toFixed(2)}</p></div>
                <div><p className="text-[9px] text-slate-500">Total (withdraw jogyo)</p><p className="text-xs font-bold text-cyan-400">৳{(user.depositBalance + user.winningBalance).toFixed(2)}</p></div>
              </div>

              <div>
                <label className="text-xs text-slate-400 mb-1.5 block">Withdraw Method</label>
                {renderPaymentMethodSelector()}
              </div>

              <div>
                <label className="text-xs text-slate-400">Amount (Min ৳100)</label>
                <input type="number" value={amountInput} onChange={(e) => setAmountInput(e.target.value)} placeholder="e.g. 100" className={`w-full ${t.input} border p-2.5 rounded-xl text-xs mt-1`} />
              </div>
              <div>
                <label className="text-xs text-slate-400">Your {paymentMethod} Account Number</label>
                <input value={withdrawAccountInput} onChange={(e) => setWithdrawAccountInput(e.target.value)} placeholder="017XXXXXXXX" className={`w-full ${t.input} border p-2.5 rounded-xl text-xs mt-1`} />
              </div>

              {appSettings.withdrawRules && (
                <div className={`${darkMode ? 'bg-slate-950' : 'bg-slate-100'} rounded-xl p-3 space-y-1`}>
                  <p className="text-[10px] font-bold text-slate-400">NOTE</p>
                  {appSettings.withdrawRules.split('\n').filter(l => l.trim()).map((line, idx) => (
                    <p key={idx} className="text-[10px] text-slate-500 leading-relaxed">• {line}</p>
                  ))}
                </div>
              )}

              <button type="button" onClick={handleWithdrawSubmit} className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold">SUBMIT WITHDRAWAL REQUEST</button>
              <button type="button" onClick={() => setWalletAction(null)} className={`w-full py-2.5 ${t.input} border rounded-xl text-xs font-bold`}>CANCEL</button>
            </div>
          </div>
        </div>
      )}

      {selectedProduct && (() => {
        const isDiamond = selectedProduct.type !== 'product';
        const hasSizes = !isDiamond && selectedProduct.sizes && selectedProduct.sizes.length > 0;
        const isCOD = !isDiamond && shopDeliveryMethod === 'COD';
        const qty = isDiamond ? 1 : Math.max(1, orderQuantity);
        const subtotal = selectedProduct.price * qty;
        const deliveryChargeShown = isCOD ? COD_ADVANCE_CHARGE : 0;
        const totalPayableNow = isCOD ? COD_ADVANCE_CHARGE : subtotal;
        const totalBalance = user.depositBalance + user.winningBalance;
        const closeModal = () => { setSelectedProduct(null); setFfUidInput(''); setDeliveryName(''); setDeliveryPhone(''); setDeliveryAddress(''); setSelectedSize(''); setOrderQuantity(1); setOrderNote(''); };
        return (
          <div className="fixed inset-0 z-50 bg-black/70 flex items-end sm:items-center justify-center p-4" onClick={closeModal}>
            <div className={`${t.card} w-full max-w-sm rounded-2xl border ${t.border} max-h-[90vh] flex flex-col overflow-hidden`} onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-5 pb-3 flex-shrink-0">
                <button onClick={closeModal} className="flex items-center space-x-1 text-slate-400"><ArrowLeft className="w-4 h-4" /><span className="text-xs">Back</span></button>
                <h3 className="font-bold text-sm">Checkout</h3>
                <button onClick={closeModal}><X className="w-5 h-5 text-slate-400" /></button>
              </div>

              <div className="px-5 pb-5 overflow-y-auto overscroll-contain space-y-4" style={{ WebkitOverflowScrolling: 'touch' }}>
                {selectedProduct.images && selectedProduct.images.length > 1 ? (
                  <div className="space-y-2">
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-950">
                      <img src={selectedProduct.images[productImageIndex]} alt="" className="w-full h-full object-cover" />
                      <button
                        onClick={() => setProductImageIndex(i => (i - 1 + selectedProduct.images.length) % selectedProduct.images.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center"
                      >
                        <ArrowLeft className="w-4 h-4 text-white" />
                      </button>
                      <button
                        onClick={() => setProductImageIndex(i => (i + 1) % selectedProduct.images.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center"
                      >
                        <ArrowLeft className="w-4 h-4 text-white rotate-180" />
                      </button>
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1.5">
                        {selectedProduct.images.map((_, idx) => (
                          <span key={idx} className={`h-1.5 rounded-full transition-all ${idx === productImageIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/50'}`} />
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {selectedProduct.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setProductImageIndex(idx)}
                          className={`w-14 h-14 rounded-lg overflow-hidden border-2 flex-shrink-0 ${idx === productImageIndex ? 'border-indigo-500' : 'border-transparent opacity-60'}`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                    <div>
                      <p className="text-sm font-bold leading-snug">{selectedProduct.title}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <p className="text-base font-black text-amber-400">৳{selectedProduct.price}</p>
                        {selectedProduct.oldPrice && <p className="text-xs text-slate-500 line-through">৳{selectedProduct.oldPrice}</p>}
                      </div>
                      {!isDiamond && (
                        <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-1.5">
                          <span className="flex items-center space-x-1 text-[10px] text-emerald-400 font-semibold"><Shield className="w-3 h-3" /><span>SECURE PURCHASE</span></span>
                          {selectedProduct.courier && <span className="flex items-center space-x-1 text-[10px] text-emerald-400 font-semibold"><Send className="w-3 h-3" /><span>{selectedProduct.courier}</span></span>}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start space-x-3">
                    <IconBox value={selectedProduct.image} size="w-16 h-16" textSize="text-2xl" />
                    <div className="flex-1">
                      <p className="text-sm font-bold leading-snug">{selectedProduct.title}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <p className="text-base font-black text-amber-400">৳{selectedProduct.price}</p>
                        {selectedProduct.oldPrice && <p className="text-xs text-slate-500 line-through">৳{selectedProduct.oldPrice}</p>}
                      </div>
                      {!isDiamond && (
                        <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-1.5">
                          <span className="flex items-center space-x-1 text-[10px] text-emerald-400 font-semibold"><Shield className="w-3 h-3" /><span>SECURE PURCHASE</span></span>
                          {selectedProduct.courier && <span className="flex items-center space-x-1 text-[10px] text-emerald-400 font-semibold"><Send className="w-3 h-3" /><span>{selectedProduct.courier}</span></span>}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {!isDiamond && (selectedProduct.description || (selectedProduct.packageItems && selectedProduct.packageItems.length > 0) || (selectedProduct.features && selectedProduct.features.length > 0)) && (
                  <div className={`${t.card} border ${t.border} rounded-xl p-3 space-y-3`}>
                    {selectedProduct.description && (
                      <div>
                        <p className="text-[10px] font-bold text-indigo-400 flex items-center space-x-1 mb-1"><span>📄</span><span>PRODUCT DESCRIPTION</span></p>
                        <p className="text-[11px] text-slate-400 leading-relaxed whitespace-pre-line">{selectedProduct.description}</p>
                      </div>
                    )}
                    {selectedProduct.packageItems && selectedProduct.packageItems.length > 0 && (
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 flex items-center space-x-1 mb-1"><span>📦</span><span>প্যাকেজে যা থাকছে:</span></p>
                        <div className="space-y-0.5">
                          {selectedProduct.packageItems.map((item, idx) => (
                            <p key={idx} className="text-[11px] text-slate-300 flex items-start space-x-1.5"><span className="text-emerald-400 flex-shrink-0">✅</span><span>{item}</span></p>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedProduct.features && selectedProduct.features.length > 0 && (
                      <div>
                        <p className="text-[10px] font-bold text-amber-400 flex items-center space-x-1 mb-1"><span>✨</span><span>প্রধান বৈশিষ্ট্য:</span></p>
                        <div className="space-y-0.5">
                          {selectedProduct.features.map((f, idx) => (
                            <p key={idx} className="text-[11px] text-slate-300 flex items-start space-x-1.5"><span className="flex-shrink-0">•</span><span>{f}</span></p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {isDiamond ? (
                  <div>
                    <label className="text-xs text-slate-400">Your Free Fire UID</label>
                    <input value={ffUidInput} onChange={(e) => setFfUidInput(e.target.value)} placeholder="123456789" className={`w-full ${t.input} border p-2.5 rounded-xl text-xs mt-1`} />
                  </div>
                ) : (
                  <>
                    {hasSizes && (
                      <div>
                        <label className="text-xs text-slate-400">Select Size</label>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedProduct.sizes.map(sz => (
                            <button
                              key={sz}
                              onClick={() => setSelectedSize(sz)}
                              className={`px-4 py-1.5 rounded-lg text-xs font-bold border ${selectedSize === sz ? 'bg-indigo-600 border-indigo-600 text-white' : `${t.input} ${t.sub}`}`}
                            >
                              {sz}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="text-xs text-slate-400">Quantity</label>
                      <div className={`flex items-center ${t.input} border rounded-xl mt-1 overflow-hidden`}>
                        <button onClick={() => setOrderQuantity(q => Math.max(1, q - 1))} className="w-11 h-11 flex items-center justify-center text-lg font-bold text-slate-400">−</button>
                        <div className="flex-1 text-center text-sm font-bold">{orderQuantity}</div>
                        <button onClick={() => setOrderQuantity(q => q + 1)} className="w-11 h-11 flex items-center justify-center text-lg font-bold text-slate-400">+</button>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1">Total: <span className="text-amber-400 font-bold">৳{subtotal}</span></p>
                    </div>

                    <div>
                      <label className="text-xs text-slate-400">Full Name</label>
                      <input value={deliveryName} onChange={(e) => setDeliveryName(e.target.value)} placeholder="Apnar naam" className={`w-full ${t.input} border p-2.5 rounded-xl text-xs mt-1`} />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Contact Number</label>
                      <input value={deliveryPhone} onChange={(e) => setDeliveryPhone(e.target.value)} placeholder="017XXXXXXXX" className={`w-full ${t.input} border p-2.5 rounded-xl text-xs mt-1`} />
                      <p className="text-[10px] text-slate-500 mt-0.5">Courier delivery-r jonno active WhatsApp/Call number din</p>
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Full Address</label>
                      <textarea value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} placeholder="Basa/Holding no, Road, Elaka, Thana/Upojela, Zela, Post Code" rows={3} className={`w-full ${t.input} border p-2.5 rounded-xl text-xs mt-1`} />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Order Note (Optional)</label>
                      <input value={orderNote} onChange={(e) => setOrderNote(e.target.value)} placeholder="Color / Size / bisesh kono instruction" className={`w-full ${t.input} border p-2.5 rounded-xl text-xs mt-1`} />
                    </div>

                    <div>
                      <label className="text-xs text-slate-400 mb-1.5 block">Payment Method</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setShopDeliveryMethod('Online')}
                          className={`text-left p-3 rounded-xl border ${!isCOD ? 'border-indigo-500 bg-indigo-500/10' : `${t.input}`}`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <Wallet className="w-4 h-4 text-indigo-400" />
                            {!isCOD && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />}
                          </div>
                          <p className="text-xs font-bold">Wallet</p>
                          <p className="text-[9px] text-slate-500">Ekhoni pay korun</p>
                          <p className="text-[9px] text-amber-400 mt-0.5">Balance: ৳{totalBalance.toFixed(2)}</p>
                        </button>
                        <button
                          onClick={() => setShopDeliveryMethod('COD')}
                          className={`text-left p-3 rounded-xl border ${isCOD ? 'border-indigo-500 bg-indigo-500/10' : `${t.input}`}`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <Wallet className="w-4 h-4 text-emerald-400" />
                            {isCOD && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />}
                          </div>
                          <p className="text-xs font-bold">Cash on Delivery</p>
                          <p className="text-[9px] text-slate-500">Delivery te cash pay</p>
                          <p className="text-[9px] text-amber-400 mt-0.5">Delivery ৳{COD_ADVANCE_CHARGE} instant katbe</p>
                        </button>
                      </div>
                    </div>

                    <div className={`${darkMode ? 'bg-slate-950' : 'bg-slate-100'} rounded-xl p-3 space-y-1.5`}>
                      <div className="flex justify-between text-xs"><span className="text-slate-500">Subtotal</span><span className="font-semibold">৳{subtotal.toFixed(2)}</span></div>
                      <div className="flex justify-between text-xs"><span className="text-slate-500">Delivery Charge</span><span className="font-semibold">৳{deliveryChargeShown.toFixed(2)}</span></div>
                      <div className={`h-px ${darkMode ? 'bg-slate-800' : 'bg-slate-200'} my-1`} />
                      <div className="flex justify-between text-sm"><span className="font-bold">Total Payable Now</span><span className="font-black text-amber-400">৳{totalPayableNow.toFixed(2)}</span></div>
                      {isCOD && <div className="flex justify-between text-[10px]"><span className="text-slate-500">Baki (cash on delivery)</span><span className="text-slate-400">৳{subtotal.toFixed(2)}</span></div>}
                      <div className="flex justify-between text-[10px] pt-1"><span className="text-slate-500">Apnar Balance</span><span className="text-emerald-400 font-semibold">৳{totalBalance.toFixed(2)}</span></div>
                    </div>
                  </>
                )}

                {isDiamond && (
                  <div className={`${darkMode ? 'bg-slate-950' : 'bg-slate-100'} rounded-xl p-3 grid grid-cols-2 gap-2 text-center`}>
                    <div><p className="text-[9px] text-slate-500">Apnar Balance</p><p className="text-xs font-bold text-emerald-400">৳{totalBalance.toFixed(2)}</p></div>
                    <div><p className="text-[9px] text-slate-500">Ei Order-e Lagbe</p><p className="text-xs font-bold text-indigo-400">৳{selectedProduct.price}</p></div>
                  </div>
                )}

                <p className="text-[10px] text-slate-500">
                  {isDiamond
                    ? `Order confirm korle apnar balance theke ৳${selectedProduct.price} ekhoni kete newa hobe. Order reject hole taka ferot ashbe.`
                    : isCOD
                      ? `Cash on Delivery-r jonno delivery charge ৳${COD_ADVANCE_CHARGE} ekhoni advance hishebe kete newa hobe. Baki ৳${subtotal} product hate paile cash e dite hobe. Order reject hole advance ferot ashbe.`
                      : `Order confirm korle apnar balance theke full ৳${subtotal} ekhoni kete newa hobe. Order reject hole taka ferot ashbe.`}
                </p>

                <button onClick={handleShopOrderSubmit} className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4" /><span>CONFIRM & PAY — ৳{isDiamond ? selectedProduct.price : totalPayableNow.toFixed(2)}</span>
                </button>
                <button onClick={() => { closeModal(); setActiveTab('home'); }} className={`w-full py-3 ${t.input} border rounded-xl text-xs font-bold`}>
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

