import { createContext, useContext, useEffect, useState } from 'react';
const Ctx = createContext();
export function LangProvider({ children }) {
  const [l, setL] = useState(() => { try { return localStorage.getItem('lang') === 'en' ? 'en' : 'es'; } catch { return 'es'; } });
  useEffect(() => { document.documentElement.lang = l; try { localStorage.setItem('lang', l); } catch {} }, [l]);
  return <Ctx.Provider value={{ l, setL }}>{children}</Ctx.Provider>;
}
export const useLang = () => useContext(Ctx);
export const T = ({ es, en }) => (useLang().l === 'en' ? en : es);
