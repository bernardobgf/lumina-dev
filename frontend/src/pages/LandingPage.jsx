import { ArrowRight, BookOpen, BrainCircuit, Check, MessageCircle, Sparkles, Target } from 'lucide-react';
import Mascot from '../components/Mascot.jsx';

const features = [
  { icon: MessageCircle, title: 'Converse sem medo', text: 'Pergunte do seu jeito. A Lumina explica com calma, exemplos e linguagem simples.' },
  { icon: BookOpen, title: 'Aprenda praticando', text: 'Transforme dúvidas em exercícios e descubra o que já domina e o que pode melhorar.' },
  { icon: Target, title: 'Estude com direção', text: 'Organize seus estudos, acompanhe sua evolução e avance um passo de cada vez.' }
];

export default function LandingPage({ onStart }) {
  return <main className="landing-page">
    <header className="landing-nav">
      <a className="landing-brand" href="#inicio" aria-label="Lumina início"><span className="landing-brand-icon"><Sparkles size={18}/></span><span>lumina<span className="brand-period">.</span></span></a>
      <nav className="landing-nav-links" aria-label="Navegação da página"><a href="#como-funciona">Como funciona</a><a href="#recursos">Recursos</a><a href="#sobre">Nossa ideia</a></nav>
      <button className="landing-nav-cta" onClick={onStart}>Acessar plataforma <ArrowRight size={16}/></button>
    </header>

    <section className="landing-hero" id="inicio">
      <div className="hero-glow hero-glow-one"/><div className="hero-glow hero-glow-two"/>
      <div className="hero-copy">
        <div className="hero-kicker"><span className="kicker-spark">✦</span> SEU APRENDIZADO, NO SEU RITMO</div>
        <h1>Aprender pode ser<br/>mais <span>leve.</span> E mais seu.</h1>
        <p className="hero-description">Uma companhia para estudar, tirar dúvidas e descobrir que você é capaz de muito mais do que imagina.</p>
        <div className="hero-actions"><button className="primary-cta" onClick={onStart}>Começar a aprender <ArrowRight size={18}/></button><a className="secondary-cta" href="#como-funciona">Conhecer a Lumina <span>↓</span></a></div>
        <div className="hero-proof"><div className="proof-avatars"><span>♡</span><span>✦</span><span>☼</span></div><p><strong>Seu espaço de aprendizado.</strong><br/>Sem pressão. Sem julgamento. Com possibilidades.</p></div>
      </div>
      <div className="hero-art" aria-label="Mascote da Lumina"><div className="orbit orbit-a"/><div className="orbit orbit-b"/><div className="sparkle sparkle-a">✦</div><div className="sparkle sparkle-b">✧</div><div className="sparkle sparkle-c">✦</div><div className="hero-mascot-card"><div className="mascot-aura"/><Mascot large waving/><span className="mascot-name">oi, eu sou a Lumina! <span>✦</span></span></div><div className="floating-note note-top"><span className="note-icon note-purple"><BrainCircuit size={17}/></span><span><strong>Vamos entender?</strong><small>Do seu jeito, no seu tempo</small></span></div><div className="floating-note note-bottom"><span className="note-icon note-yellow"><Check size={17}/></span><span><strong>Você está evoluindo!</strong><small>Cada passo conta ✨</small></span></div><div className="tiny-star star-left">✧</div><div className="tiny-star star-right">✦</div></div>
      <div className="hero-bottom-label"><span/> UM LUGAR PARA CURIOSIDADE VIRAR CONHECIMENTO</div>
    </section>

    <section className="landing-intro" id="como-funciona"><div className="section-eyebrow">CONHEÇA SEU NOVO JEITO DE ESTUDAR</div><h2>Não precisa saber por onde começar.<br/><span>A gente descobre junto.</span></h2><p>A Lumina é uma plataforma de apoio aos estudos que coloca você no centro do aprendizado. Aqui, perguntar é o primeiro passo.</p></section>

    <section className="feature-section" id="recursos"><div className="feature-grid">{features.map(({ icon: Icon, title, text }, index) => <article className="feature-card" key={title}><div className={`feature-icon feature-icon-${index}`}><Icon size={21}/></div><span className="feature-number">0{index + 1}</span><h3>{title}</h3><p>{text}</p><a href="#inicio" onClick={(event) => { event.preventDefault(); onStart(); }}>Experimentar <ArrowRight size={14}/></a></article>)}</div></section>

    <section className="landing-callout" id="sobre"><div className="callout-decoration"><div className="callout-circle circle-one"/><div className="callout-circle circle-two"/><Mascot large waving/></div><div className="callout-copy"><div className="section-eyebrow">UM PASSO DE CADA VEZ</div><h2>Seu potencial não tem<br/>que caber em uma nota.</h2><p>Estudar não precisa ser solitário ou complicado. Tenha um espaço para explorar ideias, errar, tentar de novo e comemorar cada conquista.</p><button className="callout-cta" onClick={onStart}>Vamos nessa? <ArrowRight size={17}/></button></div></section>

    <footer className="landing-footer"><a className="landing-brand" href="#inicio"><span className="landing-brand-icon"><Sparkles size={16}/></span><span>lumina<span className="brand-period">.</span></span></a><span>Feita para aprender com mais leveza. <span className="footer-heart">♥</span></span><span className="footer-caption">© {new Date().getFullYear()} Lumina</span></footer>
  </main>;
}
