import { useState } from 'react';
import { T, useLang } from '../lang.jsx';
// Se configuran en Vercel (Settings → Environment Variables) o en un archivo .env local
const EMAIL = import.meta.env.VITE_CONTACT_EMAIL || '';
const WA = import.meta.env.VITE_CONTACT_WHATSAPP || '';
const waUrl = 'https://wa.me/' + WA.replace(/\D/g, '');
const MSG = {
  es: { missing: 'Aún no se ha configurado el correo de contacto.', need: 'Completa los tres campos con un correo válido para enviar tu consulta.', ok: 'Abriendo tu programa de correo…', subject: 'Consulta desde la web' },
  en: { missing: 'The contact email has not been set up yet.', need: 'Please fill in all three fields with a valid email to send your inquiry.', ok: 'Opening your email app…', subject: 'Inquiry from the website' },
};
export function Contact() {
  const { l } = useLang();
  const [st, setSt] = useState(null);
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
    <section id="contacto" className="sec-cta">
      <div className="wrap ct">
        <div className="rv">
          <h2><T es="Hablemos de negocios" en="Let’s talk business" /></h2>
          <p className="intro"><T es="Si eres importador o distribuidor, cuéntanos qué producto y volumen necesitas y te respondemos con una cotización." en="If you are an importer or distributor, tell us which product and volume you need and we will reply with a quote." /></p>
          <dl className="det">
            <div><dt><T es="Correo:" en="Email:" /></dt><dd>{EMAIL ? <a href={'mailto:' + EMAIL}>{EMAIL}</a> : '[CORREO]'}</dd></div>
            <div><dt>WhatsApp:</dt><dd>{WA ? <a href={waUrl} target="_blank" rel="noopener noreferrer">{WA}</a> : '[WHATSAPP]'}</dd></div>
            <div><dt><T es="Ubicación:" en="Location:" /></dt><dd>Guayaquil, Guayas, Ecuador</dd></div>
          </dl>
        </div>
        <form className="form rv" noValidate onSubmit={submit}>
          <div><label htmlFor="n"><T es="Nombre y empresa" en="Name and company" /></label><input id="n" name="name" type="text" autoComplete="name" required /></div>
          <div><label htmlFor="c"><T es="Tu correo" en="Your email" /></label><input id="c" name="email" type="email" autoComplete="email" required /></div>
          <div><label htmlFor="m"><T es="Producto y volumen de interés" en="Product and volume of interest" /></label><textarea id="m" name="message" required /></div>
          <button className="btn btn-dark" type="submit"><T es="Enviar consulta" en="Send inquiry" /><span className="ar" aria-hidden="true">→</span></button>
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
            <a href="#nosotros"><T es="Nosotros" en="About" /></a><a href="#hacemos"><T es="Qué hacemos" en="What we do" /></a>
            <a href="#mercados"><T es="Mercados" en="Markets" /></a><a href="#contacto"><T es="Contacto" en="Contact" /></a>
          </nav>
        </div>
        <div className="bot"><span>© {new Date().getFullYear()} EXPOMARIFRES S.A.</span><span><T es="Comercio al por mayor de camarón y productos pesqueros" en="Wholesale trade of shrimp and fishery products" /></span></div>
      </div>
    </footer>
  );
}
export const WhatsAppFab = () => (WA ? <a className="wa-fab on" href={waUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a> : null);
