import { useEffect, useState } from 'react';
import { BookOpen, ChartNoAxesColumnIncreasing, MessageCircle, Settings, Sparkles, X, Menu, LogOut } from 'lucide-react';
import Mascot from './Mascot.jsx';

const items = [
  { id: 'chat', label: 'Conversar', detail: 'Seu espaço com a Lumina', icon: MessageCircle },
  { id: 'dashboard', label: 'Visão geral', detail: 'Seu progresso nos estudos', icon: ChartNoAxesColumnIncreasing },
  { id: 'exercises', label: 'Exercícios', detail: 'Pratique e evolua', icon: BookOpen },
  { id: 'settings', label: 'Preferências', detail: 'Personalize sua experiência', icon: Settings }
];

export default function IslandMenu({ page, onNavigate }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = (event) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  const navigate = (id) => { onNavigate(id); setOpen(false); };
  return <>
    {open && <button className="island-backdrop" aria-label="Fechar menu" onClick={() => setOpen(false)} />}
    <header className={`island-wrap ${open ? 'island-wrap--open' : ''}`}>
      <div className="island-shell">
        <div className="island-topline">
          <div className="island-brand"><span className="brand-spark"><Sparkles size={15}/></span><span>Lumina</span><span className="brand-dot"/></div>
          <span className="island-current">{items.find((item) => item.id === page)?.label || 'Lumina'}</span>
          <button className="island-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Fechar menu' : 'Abrir menu'}>{open ? <X size={18}/> : <Menu size={18}/>}</button>
        </div>
        <div className={`island-content ${open ? 'island-content--visible' : ''}`}>
          <div className="island-welcome"><div><span className="eyebrow">SEU CANTINHO DE APRENDIZADO</span><h3>Oi! Que bom te ver ✨</h3><p>Por onde vamos começar hoje?</p></div><Mascot large waving/></div>
          <nav className="island-links" aria-label="Navegação principal">
            {items.map(({ id, label, detail, icon: Icon }) => <button key={id} className={`island-link ${page === id ? 'island-link--active' : ''}`} onClick={() => navigate(id)}><span className="island-link-icon"><Icon size={18}/></span><span className="island-link-copy"><strong>{label}</strong><small>{detail}</small></span><span className="island-arrow">↗</span></button>)}
          </nav>
          <div className="island-footer"><span><span className="online-dot"/> Lumina está por aqui</span><span>feito com carinho <span className="heart">♥</span></span></div>
        </div>
      </div>
    </header>
  </>;
}
