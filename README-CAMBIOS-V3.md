# Cambios v3 – cómo aplicarlos

## 1. Respaldo (antes de subir nada)
En GitHub: menú de ramas → escribe `respaldo-react-v1` → "Create branch from main".

## 2. Archivos de este ZIP (súbelos respetando las carpetas)
    src/main.jsx, src/App.jsx           (reemplazan)
    src/v3.css, src/ui.jsx              (nuevos)
    src/components/Hero.jsx             (reemplaza)
    src/components/Sections.jsx         (reemplaza)
    src/components/Contact.jsx          (reemplaza)
    src/components/Marquee.jsx          (nuevo)
Hazlo en una rama nueva (`rediseno-v3`) para ver primero la vista previa de Vercel y fusionar a `main` solo si te gusta.

## 3. Fotos (ya vienen resueltas, sin subir nada)
`src/images.js` enlaza dos fotos provisionales de Pexels (licencia gratuita para uso comercial, sin obligación de atribución):
- Portada: camarón sobre hielo (Pexels 6372957).
- Banda de exportación: puerto con contenedores y grúas (Pexels 3057960).
Prioridad: tu archivo en `public/img/` (`portada.jpg`, `exportacion.jpg`) > Pexels > fotos actuales. Cuando tengas fotos propias o descargues estas, súbelas con esos nombres y se usan solas.
Aviso: están enlazadas desde el servidor de Pexels (no copiadas al repositorio). Para producción conviene descargarlas, comprimirlas (≤350 KB) y subirlas con los nombres indicados.

## 4. Qué cambia
- Duotono azul verdoso en las fotos (armoniza con la marca).
- Portada fija en escritorio: el panel central crece a pantalla completa y recupera el color. En móvil, parallax sin fijar.
- Cinta de destinos (de los registros comerciales) que se acelera con el scroll.
- Cortinas entre secciones, titulares palabra por palabra, contador de años desde 2008 (automático), entrada de los países.
- Todo se desactiva con "reducir movimiento".

## 5. Antes de fusionar
`npm install && npm run build`, luego `npm run dev`: revisa portada, cinta, cortinas y móvil.
