import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LangProvider } from './lang.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import { About, Services, Markets } from './components/Sections.jsx';
import { Contact, Footer, WhatsAppFab } from './components/Contact.jsx';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const root = useRef();
  useLayoutEffect(() => {
    const mm = gsap.matchMedia(root);
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // aparición progresiva de bloques de texto
      gsap.set('.rv', { opacity: 0, y: 28 });
      ScrollTrigger.batch('.rv', {
        start: 'top 88%', once: true,
        onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out', overwrite: true }),
      });
      // revelado de fotografías (el zoom al hover queda en CSS sobre la <img>)
      gsap.utils.toArray('.zoom').forEach((z) =>
        gsap.fromTo(z, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: z, start: 'top 88%', once: true } }));
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
          <Hero /><About /><Services /><Markets /><Contact />
        </main>
        <Footer /><WhatsAppFab />
      </div>
    </LangProvider>
  );
}
