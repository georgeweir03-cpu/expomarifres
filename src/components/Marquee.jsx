import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger, NO_REDUCE } from '../motion.js';
import { T, useLang } from '../lang.jsx';
import { DEST } from '../data.js';

export default function Marquee() {
  const r = useRef();
  const { l } = useLang();
  useLayoutEffect(() => {
    const mm = gsap.matchMedia(r);
    mm.add(NO_REDUCE, () => {
      // 4 copias; desplazar -50 % = dos copias exactas, el bucle no tiene saltos
      const tw = gsap.to('.mq-in', { xPercent: -50, duration: 38, ease: 'none', repeat: -1 });
      let calm;
      const st = ScrollTrigger.create({
        onUpdate: (s) => {
          tw.timeScale(1 + Math.min(Math.abs(s.getVelocity()) / 300, 6)); // acelera con el scroll
          calm && calm.kill();
          calm = gsap.to(tw, { timeScale: 1, duration: 1.2, delay: 0.15, ease: 'power2.out' });
        },
      });
      return () => { calm && calm.kill(); st.kill(); tw.kill(); };
    });
    return () => mm.revert();
  }, []);
  const row = (k, hide) => DEST.map((d, i) => (
    <span key={k + i} aria-hidden={hide || undefined}>{d[l === 'en' ? 1 : 0]}<i aria-hidden="true">✦</i></span>
  ));
  return (
    <div className="mq" ref={r} role="region" aria-label={l === 'en' ? 'Markets' : 'Mercados'}>
      <p className="mq-cap"><T es="Mercados" en="Markets" /></p>
      <div className="mq-in">{row('a')}{row('b', true)}{row('c', true)}{row('d', true)}</div>
    </div>
  );
}
