# Web Vorenex Labs · v2 (España)

Sitio estático (HTML/CSS/JS, sin compilación). La versión anterior sigue intacta en `../vorenex-labs-site`.

## Antes de publicar (pendiente)
1. `assets/app.js` → bloque CONFIG: correo real, WhatsApp (formato 34600000000 o 57300...), enlace de reserva (Cal.com/Calendly) y endpoint de Formspree.
2. `privacidad.html` y `aviso-legal.html`: completar los campos entre [corchetes] y revisarlos con asesoría.
3. Si el dominio no es vorenexlabs.me, cambiarlo en `index.html` (canonical, og:url, og:image), `robots.txt` y `sitemap.xml`.
4. Confirmar los precios de la sección #precios.

## Publicar en GitHub Pages
1. Crear un repositorio (p. ej. `vorenex-web`) y subir el CONTENIDO de esta carpeta a la raíz.
2. Settings → Pages → Source: rama `main`, carpeta `/ (root)`.
3. Dominio propio: Settings → Pages → Custom domain, y en el DNS del dominio:
   - registros A a 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   - CNAME `www` → `<usuario>.github.io`
4. Activar "Enforce HTTPS".

## Ver en local
python -m http.server 4180 --bind 127.0.0.1
→ http://127.0.0.1:4180/
