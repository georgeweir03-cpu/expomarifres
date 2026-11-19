import { useLayoutEffect, useRef, useState } from 'react';
import { gsap, NO_REDUCE } from '../motion.js';
import { T, useLang } from '../lang.jsx';
import { Words, Arrow } from '../ui.jsx';
// Se configuran en Vercel (Settings → Environment Variables) o en un archivo .env local
const EMAIL = import.meta.env.VITE_CONTACT_EMAIL || '';
const WA = import.meta.env.VITE_CONTACT_WHATSAPP || '';
const waUrl = 'https://wa.me/' + WA.replace(/\D/g, '');
const MSG = {
  es: { missing: 'El envío por correo aún no está configurado. Intenta de nuevo más tarde.', need: 'Completa los tres campos con un correo válido para enviar tu consulta.', ok: 'Abriendo tu programa de correo…', subject: 'Consulta desde la web' },
  en: { missing: 'Email sending is not set up yet. Please try again later.', need: 'Please fill in all three fields with a valid email to send your inquiry.', ok: 'Opening your email app…', subject: 'Inquiry from the website' },
};
export function Contact() {
  const r = useRef();
  const { l } = useLang();
  const [st, setSt] = useState(null);
  useLayoutEffect(() => {
    const mm = gsap.matchMedia(r);
    mm.add(NO_REDUCE, () => {
      gsap.from('.ct-in', { y: 26, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: r.current, start: 'top 70%', once: true } });
      gsap.from('.form > div', { y: 18, opacity: 0, duration: 0.7, stagger: 0.09, delay: 0.2, ease: 'power3.out', scrollTrigger: { trigger: '.form', start: 'top 85%', once: true } });
    });
    return () => mm.revert();
  }, []);
  const submit = (e) => {
    e.preventDefault();
    const f = e.currentTarget;
    const d = { name: f.name.value.trim(), email: f.email.value.trim(), message: f.message.value.trim() };
    const bad = !d.name ? f.name : (!d.email || !f.email.checkValidity()) ? f.email : !d.message ? f.message : null;
    if (bad) { setSt({ k: 'need', err: true }); bad.focus(); return; }
    if (!EMAIL) { setSt({ k: 'missing', err: true }); return; }
    setSt({ k: 'ok' });
    const body = `Nombre / Name: ${d.name}\nEmail: ${d.email}\n\n${d.message}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(MSG[l].subject)}&body=${encodeURIComponent(body)}`;
  };
  return (
    <section id="contacto" className="sec-cta" ref={r}>
      <div className="wrap ct">
        <div>
          <h2><Words es="Cuéntanos qué producto y qué volumen necesitas" en="Tell us which product and volume you need" /></h2>
          <p className="intro ct-in"><T es="Si eres importador o distribuidor, escríbenos y te respondemos con una cotización." en="If you are an importer or distributor, write to us and we will reply with a quote." /></p>
          <dl className="det ct-in">
            {EMAIL && <div><dt><T es="Correo:" en="Email:" /></dt><dd><a href={'mailto:' + EMAIL}>{EMAIL}</a></dd></div>}
            {WA && <div><dt>WhatsApp:</dt><dd><a href={waUrl} target="_blank" rel="noopener noreferrer">{WA}</a></dd></div>}
            <div><dt><T es="Ubicación:" en="Location:" /></dt><dd>Guayaquil, Guayas, Ecuador</dd></div>
          </dl>
        </div>
        <form className="form" noValidate onSubmit={submit}>
          <div><label htmlFor="n"><T es="Nombre y empresa" en="Name and company" /></label><input id="n" name="name" type="text" autoComplete="name" required /></div>
          <div><label htmlFor="c"><T es="Tu correo" en="Your email" /></label><input id="c" name="email" type="email" autoComplete="email" required /></div>
          <div><label htmlFor="m"><T es="Producto y volumen de interés" en="Product and volume of interest" /></label><textarea id="m" name="message" required /></div>
          <div><button className="btn btn-dark" type="submit"><T es="Enviar consulta" en="Send inquiry" /><Arrow /></button></div>
          <p id="status" role="status" aria-live="polite" className={st?.err ? 'err' : ''}>{st ? MSG[l][st.k] : ''}</p>
        </form>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="top">
          <div><b>EXPOMARIFRES S.A.</b><br />Mariscos Frescos · Guayaquil, Guayas, Ecuador</div>
          <nav className="fn" aria-label="Pie">
            <a href="#productos"><T es="Productos" en="Products" /></a><a href="#compradores"><T es="Para compradores" en="For buyers" /></a>
            <a href="#empresa"><T es="Empresa" en="Company" /></a><a href="#contacto"><T es="Contacto" en="Contact" /></a>
          </nav>
        </div>
        <div className="bot"><span>© {new Date().getFullYear()} EXPOMARIFRES S.A.</span><span><T es="Comercio al por mayor de camarón y productos pesqueros" en="Wholesale trade of shrimp and fishery products" /></span></div>
      </div>
    </footer>
  );
}
export const WhatsAppFab = () => (WA ? <a className="wa-fab on" href={waUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a> : null);
