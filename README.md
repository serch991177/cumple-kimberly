# Feliz cumpleaños, Kimberly — Angular

Página de cumpleaños interactiva creada con Angular standalone components.

Incluye:

- Globos, confeti y una carta sorpresa.
- Ramo de girasoles que se arma con una animación.
- Seis cupones para Kimberly: sushi, hamburguesas, mimos, cine, helado y bobas.
- Selector interactivo con vista ampliada de cada cupón.
- Descarga de las imágenes originales en alta calidad.
- Canje por WhatsApp con el mensaje preparado para `+591 77412318`.
- Estado «usado» persistente en el almacenamiento local del navegador.

## Ejecutar localmente

```bash
npm install
npm start
```

Después abre `http://localhost:4200`.

## Personalizar

Los textos, cupones y el número de WhatsApp están en
`src/app/app.component.ts`. El diseño está en `src/styles.css` y las imágenes
se encuentran en `public/coupons`.

## Compilar para producción

```bash
npm run build
```

El resultado se genera en `dist/cumple-kimberly`.
