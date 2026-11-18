import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { T, useLang } from '../lang.jsx';
const D = [['Guatemala', 'Guatemala'], ['Perú', 'Peru'], ['Francia', 'France'], ['Martinica', 'Martinique'], ['Colombia', 'Colombia']];
export default function Marquee() {
  const r = useRef();
  const { l } = useLang();
  useLayoutEffect(() => {
    const mm = gsap.matchMedia(r);
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tw = gsap.to('.mq-in', { xPercent: -50, duration: 36, ease: 'none', repeat: -1 });
      // la cinta se acelera con la velocidad del scroll
      const st = ScrollTrigger.create({ onUpdate: (s) => {
        gsap.to(tw, { timeScale: 1 + Math.min(Math.abs(s.getVelocity()) / 350, 5), duration: 0.2, overwrite: true });
        gsap.to(tw, { timeScale: 1, duration: 1.2, delay: 0.25 });
      } });
      return () => st.kill();
    });
    return () => mm.revert();
  }, []);
  const row = (k, hide) => D.map((d, i) => <span key={k + i} aria-hidden={hide || undefined}>{d[l === 'en' ? 1 : 0]}<i> ✦ </i></span>);
  return (
    <div className="mq" ref={r}>
      <p className="mq-cap"><T es="Destinos que aparecen en los registros comerciales" en="Destinations shown in trade records" /></p>
      <div className="mq-in">{row('a')}{row('b', true)}{row('c', true)}{row('d', true)}</div>
    </div>
  );
}
