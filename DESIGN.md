# DESIGN.md – EXPOMARIFRES S.A. (v4)

Dirección: sobria, comercial y B2B. Una sola foto de portada a todo ancho con el titular anclado abajo a la izquierda; el resto es calmado y se diferencia por composición, no por decoración.

## Orden narrativo
Portada → cinta de mercados → Productos (selector con foto) → Para compradores (dificultades) → Empresa → Contacto.

## Color (`:root` en `styles.css`)
Los del logo: naranja #E07B39, amarillo #F5D94A, azul verdoso #17414F / #0B242E; fondos #FCFAF6 y #F4ECDD. Texto sobre naranja siempre en #0B242E (el blanco no cumple 4.5:1). El logo va sobre fondo blanco.

## Tipografía
Bricolage Grotesque 700/800 (títulos) e Instrument Sans (texto). Sin etiquetas en mayúsculas ni palabras sueltas resaltadas.

## Forma
Radio de 2 px en fotos y campos; botones en píldora. Estructura con líneas finas. Sin sombras decorativas.

## Movimiento (GSAP; todo se desactiva con "reducir movimiento")
| Lugar | Efecto |
|---|---|
| Portada | Cortina que sube, foto que se asienta (zoom), titular palabra por palabra; al hacer scroll, la foto se desplaza más lento y el texto se aparta |
| Cinta | Bucle continuo que se acelera con la velocidad del scroll |
| Productos | Líneas que se trazan; al elegir una línea la foto entra con barrido lateral |
| Compradores | Cada dificultad se enciende al cruzar el centro de la pantalla; una línea amarilla marca el avance |
| Empresa | Foto que se descubre de izquierda a derecha; contador de años; ficha con líneas que se trazan |
| Secciones | Las secciones oscura y naranja se abren a todo el ancho al entrar |

Regla: un efecto distinto por función; la aparición simple (`.rv`) solo se usa en la introducción de Productos.

## Contenido
Solo datos verificados. Los destinos son los de `src/data.js`. Las dificultades de la sección "Para compradores" son generales del sector, no promesas de la empresa. No se publican clientes, cifras ni certificaciones.
