import { useEffect, useState } from 'react';
import { useLang } from './lang.jsx';
// Titular dividido en palabras (para la animación de entrada)
export const Words = ({ es, en }) => {
  const { l } = useLang();
  return (l === 'en' ? en : es).split(' ').map((w, i) => <span className="wm" key={l + i}><span className="hw">{w}</span></span>);
};
// Prueba cada fuente en orden y usa la primera que carga; si ninguna, `fallback`
export function useImg(srcs, fallback = null) {
  const list = [].concat(srcs);
  const key = list.join('|');
  const [s, setS] = useState(fallback);
  useEffect(() => {
    let dead = false;
    (function t(i) {
      if (i >= list.length) { if (!dead) setS(fallback); return; }
      const im = new Image();
      im.onload = () => { if (!dead) setS(list[i]); };
      im.onerror = () => t(i + 1);
      im.src = list[i];
    })(0);
    return () => { dead = true; };
    // eslint-disable-next-line
  }, [key, fallback]);
  return s;
}
