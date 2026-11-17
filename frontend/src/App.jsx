import { useState } from 'react';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';
import IslandMenu from './components/IslandMenu.jsx';
import ChatPage from './pages/ChatPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ExercisesPage from './pages/ExercisesPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

export default function App() {
  const [page, setPage] = useState('chat'); const [notice, setNotice] = useState(null);
  const notifyError = (message) => setNotice({ type: 'error', message });
  const notifySuccess = (message) => setNotice({ type: 'success', message });
  return <div className="app-shell"><IslandMenu page={page} onNavigate={setPage}/>{page === 'chat' && <ChatPage onError={notifyError} onSuccess={notifySuccess}/ >}{page === 'dashboard' && <DashboardPage/>}{page === 'exercises' && <ExercisesPage onError={notifyError}/ >}{page === 'settings' && <SettingsPage/>}{notice && <div className={`toast toast--${notice.type}`} role="status">{notice.type === 'error' ? <AlertCircle size={18}/> : <CheckCircle2 size={18}/>}<span>{notice.message}</span><button onClick={() => setNotice(null)} aria-label="Fechar aviso"><X size={16}/></button></div>}</div>;
}
