import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger, NO_REDUCE } from '../motion.js';
import { T } from '../lang.jsx';
import { Words, Arrow } from '../ui.jsx';

// Dificultades generales de quien compra producto del mar congelado. No son promesas de EXPOMARIFRES.
const RISKS = [
  [['Una oferta que no es constante', 'Supply that is not steady'], ['Si un mes hay producto y al siguiente no, comprar se vuelve improvisar.', 'If product is there one month and gone the next, buying turns into improvising.']],
  [['Elegir a quién comprarle', 'Choosing who to buy from'], ['Sin referencias claras, escoger un proveedor se parece más a una apuesta que a una decisión.', 'Without clear references, picking a supplier feels more like a bet than a decision.']],
  [['Calidad y conservación', 'Quality and preservation'], ['En producto congelado, el manejo y la cadena de frío importan tanto como el origen.', 'With frozen product, handling and the cold chain matter as much as the origin.']],
  [['Inventario difícil de planificar', 'Inventory that is hard to plan'], ['Sin visibilidad de volúmenes y fechas, es complicado calcular cuánto pedir y cuándo.', 'Without visibility on volumes and dates, it is hard to work out how much to order and when.']],
  [['Pedidos y entregas', 'Orders and deliveries'], ['Coordinar pedidos, documentos y embarques exige un interlocutor que responda.', 'Coordinating orders, paperwork and shipments takes a counterpart who answers.']],
];

export default function Risks() {
  const r = useRef();
  useLayoutEffect(() => {
    const mm = gsap.matchMedia(r);
    mm.add(NO_REDUCE, () => {
      const el = r.current;
      el.classList.add('live'); // solo con movimiento activo se atenúan los puntos; sin JS todo se lee completo
      gsap.utils.toArray('.risk').forEach((n) =>
        ScrollTrigger.create({ trigger: n, start: 'top 64%', end: 'bottom 40%', toggleClass: { targets: n, className: 'on' } }));
      gsap.fromTo('.rk-fill', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.rk-list', start: 'top 60%', end: 'bottom 50%', scrub: true } });
      gsap.from('.rk-close > *', { y: 26, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: '.rk-close', start: 'top 85%', once: true } });
      return () => el.classList.remove('live');
    });
    return () => mm.revert();
  }, []);
  return (
    <section id="compradores" className="sec-dark rk" ref={r}>
      <div className="wrap rk-grid">
        <div className="rk-head">
          <h2><Words es="Elegir mal al proveedor sale caro" en="Choosing the wrong supplier gets expensive" /></h2>
          <p className="intro"><T es="Quien compra producto del mar en volumen suele enfrentar estas dificultades. Por eso conviene mirar con cuidado con quién se trabaja." en="Buyers of seafood in volume often face these difficulties. That is why it pays to look carefully at who you work with." /></p>
        </div>
        <div className="rk-list">
          <div className="rk-track" aria-hidden="true"><div className="rk-fill" /></div>
          <ul>
            {RISKS.map(([h, p]) => (
              <li className="risk" key={h[0]}>
                <h3><T es={h[0]} en={h[1]} /></h3>
                <p><T es={p[0]} en={p[1]} /></p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="wrap rk-close">
        <p><T es="Antes de comprar, conviene hablar con el proveedor: volúmenes, condiciones y tiempos claros desde la primera cotización." en="Before you buy, talk to the supplier: clear volumes, terms and timing from the first quote." /></p>
        <a className="btn btn-pri" href="#contacto"><T es="Solicitar información comercial" en="Request commercial information" /><Arrow /></a>
      </div>
    </section>
  );
}
