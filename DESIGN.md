# DESIGN.md – EXPOMARIFRES S.A. (Mariscos Frescos)

Dirección: sobria y comercial, pensada para importadores. Los colores salen del logo real; las fotos son del proceso real de la empresa. Una sola cosa memorable: la portada con foto real y el titular amarillo. Todo lo demás es calmado.

## Color (tokens en `:root` de `index.html`)
| Token | Valor | Uso |
|---|---|---|
| `--orange` | #E07B39 | Botón principal, sección de contacto (color del logo) |
| `--orange-hi` | #E98C4C | Hover del botón principal |
| `--orange-ink` | #A9480E | Texto naranja sobre fondo claro (5.5:1) |
| `--yellow` | #F5D94A | Titular de la portada y anillo de foco (color del logo) |
| `--teal` | #17414F | Secciones oscuras, pie (azul verdoso del logo) |
| `--ink` / `--ink-deep` | #123743 / #0B242E | Texto; texto sobre naranja |
| `--paper` / `--sand` | #FCFAF6 / #F4ECDD | Fondos claros alternados |
| `--muted` | #55504A | Texto secundario |
| `--line` | #E3D8C4 | Líneas finas |

Contraste mínimo 4.5:1 en texto normal (verificado).

## Tipografía
- Títulos: Bricolage Grotesque 700 (carácter propio, formas redondeadas como el logo).
- Texto: Instrument Sans 400/500/600, 17 px, líneas de máx. ~65 caracteres.
- Escala: h1 36–68 px, h2 30–46 px, h3 18–22 px, texto 17 px, notas 14–15 px.
- Sin etiquetas en mayúsculas ni palabras sueltas resaltadas.

## Forma y espacio
- Radio único de 6 px (fotos, campos, formulario); botones en píldora.
- Sin sombras ni degradados. Estructura con líneas finas (ficha de la empresa, lista de servicios).
- Secciones con relleno `clamp(64px, 9vw, 112px)`; ancho máximo 1180 px.

## Componentes
- Botones: principal (naranja), contorno (sobre foto), oscuro (formulario). Foco visible: anillo amarillo con borde azul verdoso.
- Portada: logo a la izquierda, botón de contacto a la derecha, frase clara, beneficio, dos acciones, foto de fondo (estructura de la clase).
- Ficha de la empresa: lista de definición con filas separadas por líneas.
- Destinos: lista tipográfica, no etiquetas.
- Formulario: etiquetas visibles, mensajes de estado en `aria-live`.

## Imágenes
- Fotos reales en WebP (`img/*.webp`) con tamaño explícito y carga diferida (excepto la portada).
- Logo en PNG transparente (`img/logo.png`), ícono en `img/favicon.png`.
- No se usan fotos con etiquetas de terceros ni datos internos de lote.

## Movimiento
- Una sola animación al cargar (texto de la portada). Se desactiva con `prefers-reduced-motion`.
