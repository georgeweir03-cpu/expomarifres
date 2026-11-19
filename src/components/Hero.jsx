import { useLayoutEffect, useRef } from 'react';
import { gsap, NO_REDUCE } from '../motion.js';
import { T } from '../lang.jsx';
import { Words, Arrow } from '../ui.jsx';

export default function Hero() {
  const r = useRef();
  useLayoutEffect(() => {
    const mm = gsap.matchMedia(r);
    mm.add(NO_REDUCE, () => {
      // Entrada: una cortina sube y descubre la foto mientras esta se asienta; luego titular, texto y botones
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .fromTo('.hero-veil', { scaleY: 1 }, { scaleY: 0, duration: 1.1, ease: 'power3.inOut' }, 0)
        .from('.hero-photo img', { scale: 1.16, duration: 2.4, ease: 'power2.out' }, 0)
        .from('.hero .hw', { yPercent: 115, duration: 0.95, stagger: 0.055 }, 0.5)
        .from('.hero .hf', { y: 22, opacity: 0, duration: 0.8, stagger: 0.12 }, 1.0)
        .from('.hero-facts .wrap > div', { y: 16, opacity: 0, duration: 0.7, stagger: 0.1 }, 1.3);
      // Scroll: la foto se desplaza más lento que la página y el texto se aparta
      gsap.to('.hero-photo img', { yPercent: 9, ease: 'none', scrollTrigger: { trigger: r.current, start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to('.hero-in', { y: -60, opacity: 0.15, ease: 'none', scrollTrigger: { trigger: r.current, start: 'top top', end: '70% top', scrub: true } });
      gsap.to('.hero-shade', { opacity: 1, ease: 'none', scrollTrigger: { trigger: r.current, start: '30% top', end: 'bottom top', scrub: true } });
    });
    return () => mm.revert();
  }, []);
  return (
    <section className="hero" id="top" ref={r} aria-labelledby="h1">
      <div className="hero-photo" aria-hidden="true">
        <picture>
          <source media="(max-width: 700px)" srcSet="/img/portada-m.webp" />
          <source media="(max-width: 1200px)" srcSet="/img/portada-1100.webp" />
          <img src="/img/portada.webp" alt="" width="1672" height="941" fetchPriority="high" decoding="async" />
        </picture>
        <div className="hero-tone" />
        <div className="hero-shade" />
      </div>
      <div className="hero-veil" aria-hidden="true" />
      <div className="wrap hero-in">
        <h1 id="h1"><Words es="Comercializamos camarones congelados en volúmenes comerciales." en="We market frozen shrimp in commercial volumes." /></h1>
        <p className="lead hf"><T es="Disfruta de nuestra variedad de mariscos ecuatorianos." en="Enjoy our variety of Ecuadorian seafood." /></p>
        <div className="btns hf">
          <a className="btn btn-pri" href="#productos"><T es="Explora nuestra variedad" en="Explore our variety" /><Arrow /></a>
          <a className="btn btn-line" href="#contacto"><T es="Solicitar información comercial" en="Request commercial information" /></a>
        </div>
      </div>
      <div className="hero-facts"><div className="wrap">
        <div><b><T es="Desde 2008" en="Since 2008" /></b><span><T es="Constituida en Guayaquil" en="Incorporated in Guayaquil" /></span></div>
        <div><b><T es="Comercio mayorista" en="Wholesale trade" /></b><span><T es="Camarón y productos pesqueros" en="Shrimp and fishery products" /></span></div>
        <div><b>B2B</b><span><T es="Importadores y distribuidores" en="Importers and distributors" /></span></div>
      </div></div>
    </section>
  );
}
