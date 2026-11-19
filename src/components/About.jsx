import { useLayoutEffect, useRef } from 'react';
import { gsap, NO_REDUCE } from '../motion.js';
import { T, useLang } from '../lang.jsx';
import { Words } from '../ui.jsx';
import { yearsSince2008 } from '../data.js';

const SPEC = [
  [['Razón social', 'Legal name'], ['EXPOMARIFRES S.A.']],
  [['Nombre comercial', 'Trade name'], ['Mariscos Frescos']],
  [['Fundación', 'Incorporated'], ['12 de marzo de 2008', 'March 12, 2008']],
  [['Sede', 'Headquarters'], ['Guayaquil, Guayas, Ecuador']],
  [['Actividad', 'Activity'], ['Comercio al por mayor de camarón y productos pesqueros', 'Wholesale trade of shrimp and fishery products']],
];
const V = ([es, en]) => <T es={es} en={en ?? es} />;

export default function About() {
  const r = useRef();
  const { l } = useLang();
  useLayoutEffect(() => {
    const mm = gsap.matchMedia(r);
    mm.add(NO_REDUCE, () => {
      // Foto: se descubre de izquierda a derecha y se asienta; después queda con un parallax suave
      gsap.fromTo('.ab-photo', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.3, ease: 'power3.inOut', scrollTrigger: { trigger: '.ab-photo', start: 'top 82%', once: true } });
      gsap.fromTo('.ab-photo img', { scale: 1.3 }, { scale: 1.08, duration: 1.8, ease: 'power2.out', scrollTrigger: { trigger: '.ab-photo', start: 'top 82%', once: true } });
      gsap.to('.ab-photo img', { yPercent: 6, ease: 'none', scrollTrigger: { trigger: '.ab-photo', start: 'top bottom', end: 'bottom top', scrub: true } });
      // Contador de años
      const el = r.current.querySelector('[data-years]');
      const o = { v: 0 };
      el.textContent = '0';
      gsap.to(o, { v: +el.dataset.years, duration: 1.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true }, onUpdate: () => { el.textContent = Math.round(o.v); } });
      // Ficha: las líneas se trazan y los datos aparecen después
      gsap.from('.spec .ln', { scaleX: 0, transformOrigin: 'left', duration: 1, stagger: 0.12, ease: 'power3.inOut', scrollTrigger: { trigger: '.spec', start: 'top 85%', once: true } });
      gsap.from('.spec .row > :not(.ln)', { opacity: 0, y: 10, duration: 0.7, stagger: 0.06, delay: 0.25, ease: 'power2.out', scrollTrigger: { trigger: '.spec', start: 'top 85%', once: true } });
      return () => { el.textContent = String(yearsSince2008()); };
    });
    return () => mm.revert();
  }, []);
  return (
    <section id="empresa" className="sec-sand ab" ref={r}>
      <div className="wrap ab-grid">
        <figure className="ab-fig">
          <div className="ab-photo"><img src="/img/proceso.webp" alt={l === 'en' ? 'Plant team peeling shrimp in the processing room' : 'Equipo de planta pelando camarón en la sala de proceso'} width="900" height="1125" loading="lazy" decoding="async" /></div>
          <figcaption><T es="Equipo de planta en la sala de proceso." en="Plant team in the processing room." /></figcaption>
        </figure>
        <div className="ab-text">
          <h2><Words es="Una empresa guayaquileña con vocación exportadora" en="A Guayaquil company with an export focus" /></h2>
          <p className="intro"><T es="Constituida el 12 de marzo de 2008 en Guayaquil, EXPOMARIFRES S.A. opera en el comercio mayorista de camarón y productos pesqueros. Nuestro enfoque es el comercio internacional entre empresas: vendemos en volúmenes comerciales a importadores y distribuidores, no al consumidor final." en="Incorporated on March 12, 2008 in Guayaquil, EXPOMARIFRES S.A. operates in the wholesale trade of shrimp and fishery products. We focus on international business-to-business trade: we sell in commercial volumes to importers and distributors, not to individual consumers." /></p>
          <div className="years"><b data-years={yearsSince2008()}>{yearsSince2008()}</b><span><T es="años desde la constitución de la empresa" en="years since the company was incorporated" /></span></div>
          <div className="spec">
            <h3><T es="Ficha de la empresa" en="Company profile" /></h3>
            <dl>{SPEC.map(([k, v]) => <div className="row" key={k[0]}><i className="ln" aria-hidden="true" /><dt>{V(k)}</dt><dd>{V(v)}</dd></div>)}</dl>
          </div>
        </div>
      </div>
    </section>
  );
}
