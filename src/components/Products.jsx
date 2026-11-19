import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap, NO_REDUCE } from '../motion.js';
import { T, useLang } from '../lang.jsx';
import { Words } from '../ui.jsx';

// Solo se describe lo que está documentado: camarón congelado y actividad en productos pesqueros.
const ITEMS = [
  { img: '/img/cajas.webp', alt: ['Camarón pelado en cajas de planta', 'Peeled shrimp in plant crates'],
    h: ['Camarón congelado', 'Frozen shrimp'],
    p: ['Nuestra línea de exportación según los registros comerciales, en volúmenes comerciales.', 'Our export line according to trade records, in commercial volumes.'],
    cap: ['Camarón pelado en cajas de planta.', 'Peeled shrimp in plant crates.'] },
  { img: '/img/proceso.webp', alt: ['Equipo de planta en la sala de proceso', 'Plant team in the processing room'],
    h: ['Trabajo en planta', 'Plant work'],
    p: ['Parte del producto pasa por nuestra sala de proceso, donde el equipo pela el camarón.', 'Part of the product goes through our processing room, where the team peels the shrimp.'],
    cap: ['Equipo de planta en la sala de proceso.', 'Plant team in the processing room.'] },
  { img: '/img/portada-1100.webp', alt: ['Camarón sobre hielo en una caja azul', 'Shrimp on ice in a blue crate'],
    h: ['Otros productos pesqueros', 'Other fishery products'],
    p: ['La actividad registrada incluye productos pesqueros además del camarón. Consúltanos la disponibilidad.', 'Our registered activity includes fishery products besides shrimp. Ask us about availability.'],
    cap: ['Imagen de referencia.', 'Reference image.'] },
];

export default function Products() {
  const r = useRef();
  const stage = useRef();
  const first = useRef(true);
  const [k, setK] = useState(0);
  const { l } = useLang();
  const i = l === 'en' ? 1 : 0;

  // Entrada de la sección (titular, filas y foto)
  useLayoutEffect(() => {
    const mm = gsap.matchMedia(r);
    mm.add(NO_REDUCE, () => {
      gsap.from('.pl', { xPercent: 6, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: '.pl-list', start: 'top 82%', once: true } });
      gsap.from('.pl-line', { scaleX: 0, transformOrigin: 'left', duration: 1.1, stagger: 0.12, ease: 'power3.inOut', scrollTrigger: { trigger: '.pl-list', start: 'top 82%', once: true } });
      gsap.fromTo('.stage', { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.2, ease: 'power3.inOut', scrollTrigger: { trigger: '.stage', start: 'top 85%', once: true } });
      gsap.fromTo('.stage .on img', { scale: 1.22 }, { scale: 1, duration: 1.6, ease: 'power2.out', scrollTrigger: { trigger: '.stage', start: 'top 85%', once: true } });
    });
    return () => mm.revert();
  }, []);

  // Cambio de producto: la nueva foto entra con un barrido lateral
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.stage .on', { clipPath: 'inset(0 0 0 100%)' }, { clipPath: 'inset(0 0 0 0%)', duration: 0.8, ease: 'power3.inOut' });
      gsap.fromTo('.stage .on img', { scale: 1.2 }, { scale: 1, duration: 1.1, ease: 'power2.out' });
    }, stage);
    return () => ctx.revert();
  }, [k]);

  return (
    <section id="productos" ref={r}>
      <div className="wrap pr">
        <div className="pr-head rv">
          <h2><Words es="Camarón y productos del mar para quien compra en volumen" en="Shrimp and seafood for buyers who purchase in volume" /></h2>
          <p className="intro"><T es="Elige una línea para ver más. Cuéntanos qué necesitas y te respondemos con una cotización." en="Choose a line to see more. Tell us what you need and we will reply with a quote." /></p>
        </div>
        <div className="pr-body">
          <ul className="pl-list">
            {ITEMS.map((it, n) => (
              <li key={n}>
                <i className="pl-line" aria-hidden="true" />
                <button type="button" className={'pl' + (k === n ? ' on' : '')} aria-pressed={k === n}
                  onClick={() => setK(n)} onMouseEnter={() => setK(n)} onFocus={() => setK(n)}>
                  <h3>{it.h[i]}</h3>
                  <p>{it.p[i]}</p>
                </button>
              </li>
            ))}
            <li><i className="pl-line" aria-hidden="true" /><a className="more" href="#contacto"><T es="Solicitar información comercial" en="Request commercial information" /><span className="ar" aria-hidden="true">→</span></a></li>
          </ul>
          <figure className="pr-fig">
            <div className="stage" ref={stage}>
              {ITEMS.map((it, n) => (
                <div key={n} className={'st' + (k === n ? ' on' : '')} aria-hidden={k !== n}>
                  <img src={it.img} alt={it.alt[i]} loading="lazy" decoding="async" width="1000" height="750" />
                </div>
              ))}
            </div>
            <figcaption aria-live="polite">{ITEMS[k].cap[i]}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
