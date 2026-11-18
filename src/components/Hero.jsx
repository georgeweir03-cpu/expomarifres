import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { T, useLang } from '../lang.jsx';
const PHOTOS = ['/img/tina.webp', '/img/hero.webp', '/img/cajas.webp'];
const Words = ({ es, en }) => {
  const { l } = useLang();
  return (l === 'en' ? en : es).split(' ').map((w, i) => <span className="wm" key={l + i}><span className="hw">{w}</span></span>);
};
export default function Hero() {
  const r = useRef();
  const { l } = useLang();
  useLayoutEffect(() => {
    const mm = gsap.matchMedia(r);
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .fromTo('.pn', { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.2, stagger: 0.15 })
        .from('.pn img', { scale: 1.25, duration: 1.8, stagger: 0.15 }, 0)
        .from('.hw', { yPercent: 110, duration: 0.9, stagger: 0.06 }, 0.5)
        .from('.hf', { y: 24, opacity: 0, duration: 0.8, stagger: 0.12 }, 0.9);
      // parallax moderado: solo las fotos, al salir de la portada
      gsap.to('.pn img', { yPercent: 8, ease: 'none', scrollTrigger: { trigger: r.current, start: 'top top', end: 'bottom top', scrub: true } });
    });
    return () => mm.revert();
  }, []);
  return (
    <section className="hero" id="top" ref={r} aria-labelledby="h1">
      <div className="tri" aria-hidden="true">
        {PHOTOS.map((s, i) => <div className="pn" key={s}><img src={s} alt="" width="900" height="1100" fetchPriority={i === 1 ? 'high' : undefined} decoding="async" /></div>)}
      </div>
      <div className="wrap hero-in">
        <h1 id="h1"><Words es="Camarón congelado de Ecuador, en volúmenes comerciales." en="Frozen shrimp from Ecuador, in commercial volumes." /></h1>
        <p className="lead hf"><T es="Suministramos camarón y productos pesqueros a importadores y distribuidores internacionales, con atención directa desde Guayaquil y condiciones claras." en="We supply shrimp and fishery products to international importers and distributors, with direct service from Guayaquil and clear terms." /></p>
        <div className="btns hf">
          <a className="btn btn-pri" href="#contacto"><T es="Solicitar cotización" en="Request a quote" /><span className="ar" aria-hidden="true">→</span></a>
          <a className="btn btn-line" href="#nosotros"><T es="Conocer la empresa" en="About the company" /></a>
        </div>
      </div>
      <div className="facts hf"><div className="wrap">
        <svg className="stamp" viewBox="0 0 200 200" aria-hidden="true">
          <circle cx="100" cy="100" r="96" />
          <defs><path id="cp" d="M100,100 m-70,0 a70,70 0 1,1 140,0 a70,70 0 1,1 -140,0" /></defs>
          <g className="spin"><text><textPath href="#cp" textLength="436">{l === 'en' ? 'SINCE 2008 · GUAYAQUIL · ECUADOR · ' : 'DESDE 2008 · GUAYAQUIL · ECUADOR · '}</textPath></text></g>
          <text className="big" x="100" y="113" textAnchor="middle">2008</text>
        </svg>
        <div><b><T es="Desde 2008" en="Since 2008" /></b><T es="Constituida en Guayaquil, Ecuador" en="Incorporated in Guayaquil, Ecuador" /></div>
        <div><b><T es="Comercio mayorista" en="Wholesale trade" /></b><T es="Camarón y productos pesqueros" en="Shrimp and fishery products" /></div>
        <div><b>B2B</b><T es="Importadores y distribuidores" en="Importers and distributors" /></div>
      </div></div>
    </section>
  );
}
