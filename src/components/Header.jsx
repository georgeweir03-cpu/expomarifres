import { useEffect, useState } from 'react';
import { T, useLang } from '../lang.jsx';
const LINKS = [['nosotros', 'Nosotros', 'About'], ['hacemos', 'Qué hacemos', 'What we do'], ['mercados', 'Mercados', 'Markets']];
export default function Header() {
  const { l, setL } = useLang();
  const [open, setOpen] = useState(false);
  const [sc, setSc] = useState(false);
  useEffect(() => {
    const s = () => setSc(window.scrollY > 30);
    const k = (e) => e.key === 'Escape' && setOpen(false);
    s(); window.addEventListener('scroll', s, { passive: true }); window.addEventListener('keydown', k);
    return () => { window.removeEventListener('scroll', s); window.removeEventListener('keydown', k); };
  }, []);
  return (
    <header className={'bar' + (sc ? ' scrolled' : '')}>
      <div className="wrap">
        <a className="logo" href="#top" aria-label="EXPOMARIFRES – Mariscos Frescos"><img src="/img/logo.png" alt="EXPOMARIFRES – Mariscos Frescos" width="99" height="80" /></a>
        <button className="burger" type="button" aria-expanded={open} aria-controls="nav" aria-label="Menú / Menu" onClick={() => setOpen(!open)}><span /></button>
        <nav id="nav" className={open ? 'open' : ''} aria-label="Principal" onClick={(e) => e.target.closest('a') && setOpen(false)}>
          {LINKS.map(([id, es, en]) => <a key={id} className="l" href={'#' + id}><T es={es} en={en} /></a>)}
          <div className="lang" role="group" aria-label="Idioma / Language">
            {['es', 'en'].map((x) => <button key={x} type="button" aria-pressed={l === x} onClick={() => setL(x)}>{x.toUpperCase()}</button>)}
          </div>
          <a className="btn btn-pri" href="#contacto"><T es="Contacto" en="Contact" /></a>
        </nav>
      </div>
    </header>
  );
}
