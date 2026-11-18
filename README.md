# EXPOMARIFRES S.A. – Sitio web (React + Vite + GSAP)

## Respaldo antes de migrar (la versión HTML actual)
    git checkout -b respaldo-html && git push origin respaldo-html
    git checkout main
Luego reemplaza el contenido de `main` por esta carpeta y **mueve tus fotos a `public/img/`** (logo.png, favicon.png, hero.webp, proceso.webp, tina.webp, cajas.webp). Las URLs `/img/...` se conservan.

## Desarrollo
    npm install
    npm run dev      # local
    npm run build    # genera dist/

## Contacto (sin tocar código)
Copia `.env.example` a `.env` o crea en Vercel (Settings → Environment Variables):
`VITE_CONTACT_EMAIL` y `VITE_CONTACT_WHATSAPP`. Luego vuelve a desplegar.

## Vercel
Framework Preset **Vite**, Build `npm run build`, Output `dist`.

## Dependencias
- react / react-dom: componentes.
- gsap (+ScrollTrigger): revelados, tríptico de portada y parallax. Respeta `prefers-reduced-motion`.
- vite: compilación.

## Pendiente
og:image absoluta, canonical y sitemap.xml cuando haya dominio.
