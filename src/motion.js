// Punto único de GSAP: el plugin se registra una sola vez, al importar este archivo.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export { gsap, ScrollTrigger };
export const NO_REDUCE = '(prefers-reduced-motion: no-preference)';
