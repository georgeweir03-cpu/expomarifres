import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { T } from '../lang.jsx';
import { Words, useImg } from '../ui.jsx';
import { IMG } from '../images.js';
const yearsSince2008 = () => { const n = new Date(); return n.getFullYear() - 2008 - (n < new Date(n.getFullYear(), 2, 12) ? 1 : 0); };
const ROWS = [
  [['Camarón congelado', 'Frozen shrimp'], ['Exportamos camarón congelado en volúmenes comerciales.', 'We export frozen shrimp in commercial volumes.']],
  [['Ventas B2B internacionales', 'International B2B sales'], ['Atendemos a importadores y distribuidores en distintos mercados.', 'We serve importers and distributors across different markets.']],
  [['Relaciones comerciales estables', 'Stable business relationships'], ['Trabajamos en el desarrollo de mercados y en cuentas de largo plazo, con precios y condiciones claras.', 'We work on market development and long-term accounts, with clear pricing and terms.']],
];
const SPEC = [
  [['Razón social', 'Legal name'], ['EXPOMARIFRES S.A.']],
  [['Nombre comercial', 'Trade name'], ['Mariscos Frescos']],
  [['Fundación', 'Incorporated'], ['12 de marzo de 2008', 'March 12, 2008']],
  [['Sede', 'Headquarters'], ['Guayaquil, Guayas, Ecuador']],
  [['Actividad', 'Activity'], ['Comercio al por mayor de camarón y productos pesqueros', 'Wholesale trade of shrimp and fishery products']],
];
const DEST = [['Guatemala'], ['Perú', 'Peru'], ['Francia', 'France'], ['Martinica', 'Martinique'], ['Colombia']];
const V = ([es, en]) => <T es={es} en={en ?? es} />;

export function About() {
  return (
    <section id="nosotros">
      <div className="wrap cols">
        <div className="rv">
          <h2><Words es="Una empresa guayaquileña con vocación exportadora" en="A Guayaquil company with an export focus" /></h2>
          <p className="intro"><T es="Constituida el 12 de marzo de 2008 en Guayaquil, EXPOMARIFRES S.A. opera en el comercio mayorista de camarón y productos pesqueros. Nuestro enfoque es el comercio internacional entre empresas: vendemos en volúmenes comerciales a importadores y distribuidores, no al consumidor final." en="Incorporated on March 12, 2008 in Guayaquil, EXPOMARIFRES S.A. operates in the wholesale trade of shrimp and fishery products. We focus on international business-to-business trade: we sell in commercial volumes to importers and distributors, not to individual consumers." /></p>
          <div className="years"><b data-years={yearsSince2008()}>{yearsSince2008()}</b><span><T es="años desde la constitución de la empresa" en="years since the company was incorporated" /></span></div>
          <div className="spec">
            <h3><T es="Ficha de la empresa" en="Company profile" /></h3>
            <dl>{SPEC.map(([k, v]) => <div className="row" key={k[0]}><dt>{V(k)}</dt><dd>{V(v)}</dd></div>)}</dl>
          </div>
        </div>
        <figure style={{ margin: 0 }}>
          <div className="zoom about-photo"><img src="/img/proceso.webp" alt="Equipo de planta pelando camarón en la sala de proceso" width="900" height="1125" loading="lazy" decoding="async" /></div>
          <figcaption><T es="Equipo de planta en la sala de proceso." en="Plant team in the processing room." /></figcaption>
        </figure>
      </div>
    </section>
  );
}
export function Services() {
  return (
    <section id="hacemos" className="sec-sand">
      <div className="wrap">
        <div className="do-head">
          <div className="rv">
            <h2><Words es="Comercio mayorista de productos del mar" en="Wholesale seafood trade" /></h2>
            <p className="intro"><T es="Trabajamos con camarón y productos pesqueros, pensados para quien compra en volumen." en="We work with shrimp and fishery products, built for buyers who purchase in volume." /></p>
          </div>
          <ul className="rows">{ROWS.map(([h, p]) => <li className="rv" key={h[0]}><div><h3>{V(h)}</h3><p>{V(p)}</p></div></li>)}</ul>
        </div>
        <figure className="wide-fig" style={{ margin: 0 }}>
          <div className="zoom wide"><img src="/img/tina.webp" alt="Camarón pelado en una tina de proceso" width="1000" height="750" loading="lazy" decoding="async" /></div>
          <figcaption><T es="Camarón pelado en tina de proceso." en="Peeled shrimp in a process tank." /></figcaption>
        </figure>
      </div>
    </section>
  );
}
export function Markets() {
  return (
    <section id="mercados" className="sec-dark">
      <div className="wrap mk">
        <div className="rv">
          <h2><Words es="Presencia en mercados internacionales" en="Presence in international markets" /></h2>
          <p className="intro"><T es="Los registros comerciales muestran operaciones de exportación con destinos como estos." en="Trade records show export operations to destinations such as these." /></p>
        </div>
        <ul className="dest rv">{DEST.map((d) => <li key={d[0]}>{V(d)}</li>)}</ul>
      </div>
    </section>
  );
}

// Banda de exportación: exportacion.jpg propia > Pexels; si ninguna carga, no se muestra
export function Band() {
  const r = useRef();
  const src = useImg([IMG.exportacion.local, IMG.exportacion.remote], null);
  useLayoutEffect(() => {
    if (!src || !r.current) return;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(r.current.querySelector('img'), { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: r.current, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    ScrollTrigger.refresh();
    return () => mm.revert();
  }, [src]);
  if (!src) return null;
  return (
    <section className="band" ref={r} aria-label="Exportación">
      <img src={src} alt="" loading="lazy" decoding="async" />
      <p><T es="Exportamos camarón congelado en volúmenes comerciales." en="We export frozen shrimp in commercial volumes." /></p>
    </section>
  );
}
