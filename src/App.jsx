import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger, NO_REDUCE } from './motion.js';
import { LangProvider } from './lang.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Marquee from './components/Marquee.jsx';
import Products from './components/Products.jsx';
import Risks from './components/Risks.jsx';
import About from './components/About.jsx';
import { Contact, Footer, WhatsAppFab } from './components/Contact.jsx';

export default function App() {
  const root = useRef();
  useLayoutEffect(() => {
    const mm = gsap.matchMedia(root);
    mm.add(NO_REDUCE, () => {
      // Titulares: cada palabra sube desde una máscara
      gsap.set('h2 .hw', { yPercent: 112 });
      ScrollTrigger.batch('h2 .hw', { start: 'top 92%', once: true,
        onEnter: (b) => gsap.to(b, { yPercent: 0, duration: 0.95, stagger: 0.05, ease: 'power3.out', overwrite: true }) });
      // Introducciones: aparición sencilla (único uso de este efecto)
      gsap.set('.rv', { opacity: 0, y: 20 });
      ScrollTrigger.batch('.rv', { start: 'top 90%', once: true,
        onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out', overwrite: true }) });
      // Transición entre secciones: las secciones oscura y naranja se abren a todo el ancho al entrar
      ['#compradores', '#contacto'].forEach((s) =>
        gsap.fromTo(s, { clipPath: 'inset(8% 4% 0% 4%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none',
          scrollTrigger: { trigger: s, start: 'top 98%', end: 'top 30%', scrub: true } }));
    });
    // Medidas correctas cuando cargan fuentes e imágenes
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    document.fonts && document.fonts.ready.then(refresh);
    return () => { window.removeEventListener('load', refresh); mm.revert(); };
  }, []);
  return (
    <LangProvider>
      <div ref={root}>
        <a className="skip" href="#contenido">Saltar al contenido / Skip to content</a>
        <Header />
        <main id="contenido">
          <Hero /><Marquee /><Products /><Risks /><About /><Contact />
        </main>
        <Footer /><WhatsAppFab />
      </div>
    </LangProvider>
  );
}
