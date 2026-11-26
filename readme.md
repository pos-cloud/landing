# Landing de POS Cloud

Bienvenido a la landing page de POS Cloud, un sistema de gestión en la nube diseñado para simplificar y optimizar la administración de negocios.

## Publicación

Solo la rama `main` publica. El sitio es Astro: GitHub Actions corre `npm ci` y `npm run build`, y despliega la carpeta `dist` en Cloudflare Workers con el secreto `CLOUDFLARE_API_TOKEN`.

El sitio en producción es [https://poscloud.com.ar](https://poscloud.com.ar).  

## Contribuir

Si deseas mejorar la landing, sigue estos pasos:  
1. Clona el repositorio:  
   ```bash
   git clone https://github.com/pos-cloud/landing.git
   cd landing
