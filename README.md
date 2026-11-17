# EXPOMARIFRES S.A. – Sitio web

Sitio estático bilingüe (ES/EN) de EXPOMARIFRES S.A. "Mariscos Frescos". No tiene dependencias ni paso de compilación.

## Estructura
```
index.html      Página completa (HTML + CSS + JS)
img/            Logo, favicon y fotos (WebP)
vercel.json     Cabeceras de seguridad y caché para Vercel
robots.txt      Permite el rastreo
DESIGN.md       Decisiones de diseño y tokens
.gitignore      Excluye secretos y archivos locales
```

## Configurar el contacto
En `index.html`, al final, completa:
```js
var CONTACT_EMAIL='';      // ej. ventas@tudominio.com
var CONTACT_WHATSAPP='';   // ej. +593 99 999 9999
```
Con el correo configurado, el formulario abre el programa de correo del visitante con el mensaje listo.

## Desplegar en Vercel
Sube estos archivos al repositorio de GitHub (rama principal). Vercel despliega solo. En la configuración del proyecto: Framework Preset "Other", sin comando de compilación y sin directorio de salida.

## Pendiente cuando se conozca el dominio
Agregar `og:image` con URL absoluta, `canonical` y `sitemap.xml`.
