# EXPOMARIFRES S.A. – Sitio web (v4)

Sitio bilingüe (ES/EN) en React 18 + Vite 5 + GSAP 3 (ScrollTrigger). Sin otras dependencias.

## Estructura
```
index.html              SEO, fuentes, precarga de la foto de portada
src/main.jsx            Punto de entrada
src/App.jsx             Composición, titulares y transiciones entre secciones
src/motion.js           Importa GSAP y registra ScrollTrigger UNA vez
src/data.js             Destinos de la cinta (editar aquí) y años desde 2008
src/lang.jsx, ui.jsx    Idioma ES/EN y utilidades
src/components/         Header, Hero, Marquee, Products, Risks, About, Contact
src/styles.css          Todos los estilos
public/img/             Logo, favicon y fotos (WebP)
vercel.json             Cabeceras de seguridad y caché
```

## Comandos
```
npm install
npm run dev        # desarrollo
npm run build      # producción (carpeta dist)
npm run preview    # probar el build
```
Vercel: Framework Preset "Vite" (o "Other" con `npm run build` y salida `dist`).

## Contacto
Variables de entorno (Vercel → Settings → Environment Variables, o archivo `.env`):
```
VITE_CONTACT_EMAIL=ventas@tudominio.com
VITE_CONTACT_WHATSAPP=+593999999999
```
Sin correo, el formulario avisa que el envío no está configurado y no se muestran datos de contacto vacíos.

## Fotos
- Portada: `portada.webp` (escritorio), `portada-1100.webp` (tablet) y `portada-m.webp` (recorte vertical para móvil). Se cambian por archivos con el mismo nombre.
- Planta: `proceso.webp`, `tina.webp`, `cajas.webp` (fotos propias de la empresa).
- Ya no se enlaza ninguna imagen externa.

## Pendiente cuando se conozca el dominio
`og:image` con URL absoluta, `canonical` y `sitemap.xml`.
