import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LangProvider } from './lang.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Marquee from './components/Marquee.jsx';
import { About, Services, Band, Markets } from './components/Sections.jsx';
import { Contact, Footer, WhatsAppFab } from './components/Contact.jsx';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const root = useRef();
  useLayoutEffect(() => {
    const mm = gsap.matchMedia(root);
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // bloques de texto
      gsap.set('.rv', { opacity: 0, y: 28 });
      ScrollTrigger.batch('.rv', { start: 'top 88%', once: true,
        onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out', overwrite: true }) });
      // titulares palabra por palabra
      gsap.set('h2 .hw', { yPercent: 110 });
      ScrollTrigger.batch('h2 .hw', { start: 'top 92%', once: true,
        onEnter: (b) => gsap.to(b, { yPercent: 0, duration: 0.9, stagger: 0.05, ease: 'power3.out' }) });
      // fotografías: se descubren con un recorte
      gsap.utils.toArray('.zoom').forEach((z) =>
        gsap.fromTo(z, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: z, start: 'top 88%', once: true } }));
      // transición entre secciones: la sección se abre como una cortina al entrar
      gsap.utils.toArray('#hacemos,#mercados,#contacto').forEach((s) =>
        gsap.fromTo(s, { clipPath: 'inset(7% 5% 0% 5% round 32px 32px 0 0)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none',
          scrollTrigger: { trigger: s, start: 'top 98%', end: 'top 35%', scrub: true } }));
      // contador de años desde 2008
      const el = document.querySelector('[data-years]');
      if (el) {
        const to = +el.dataset.years, o = { v: 0 };
        el.textContent = '0';
        ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true,
          onEnter: () => gsap.to(o, { v: to, duration: 1.6, ease: 'power2.out', onUpdate: () => { el.textContent = Math.round(o.v); } }) });
      }
      // países de la sección de mercados: entrada escalonada lateral
      gsap.from('.dest li', { xPercent: -8, opacity: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '.dest', start: 'top 85%', once: true } });
    });
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    return () => { window.removeEventListener('load', refresh); mm.revert(); };
  }, []);
  return (
    <LangProvider>
      <div ref={root}>
        <a className="skip" href="#contenido">Saltar al contenido / Skip to content</a>
        <Header />
        <main id="contenido">
          <Hero /><Marquee /><About /><Services /><Band /><Markets /><Contact />
        </main>
        <Footer /><WhatsAppFab />
      </div>
    </LangProvider>
  );
}
