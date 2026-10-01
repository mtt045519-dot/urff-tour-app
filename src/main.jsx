import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { authReady } from './firebase.js'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 20, background: '#fff', color: '#000', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
          <h2>Error দেখা গেছে:</h2>
          <p>{this.state.error.message}</p>
          <pre style={{ fontSize: 11 }}>{this.state.error.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
const mount = () => root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);

authReady.then(mount).catch((err) => {
  root.render(
    <div style={{ padding: 20, fontFamily: 'sans-serif', color: '#fff', background: '#111', minHeight: '100vh' }}>
      <h2>Connection error</h2>
      <p>Firebase Authentication-e connect kora jacche na.</p>
      <p style={{ fontSize: 12, opacity: 0.7 }}>{err && err.code ? err.code : String(err)}</p>
      <p style={{ fontSize: 12, opacity: 0.7 }}>Firebase Console &gt; Authentication &gt; Sign-in method e "Anonymous" enable ache kina check korun.</p>
    </div>
  );
});

