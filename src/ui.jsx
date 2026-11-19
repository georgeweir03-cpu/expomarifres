import { useLang } from './lang.jsx';
// Titular dividido en palabras (cada una se anima al entrar). La clave incluye el idioma
// para que, al cambiarlo, React cree palabras nuevas ya visibles.
export const Words = ({ es, en }) => {
  const { l } = useLang();
  return (l === 'en' ? en : es).split(' ').map((w, i) => (
    <span className="wm" key={l + i}><span className="hw">{w}</span></span>
  ));
};
// Botón con flecha
export const Arrow = () => <span className="ar" aria-hidden="true">→</span>;
