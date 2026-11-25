# Landing de POS Cloud

Bienvenido a la landing page de POS Cloud, un sistema de gestión en la nube diseñado para simplificar y optimizar la administración de negocios.

## Publicación

Solo la rama `main` publica. Cada push a `main` corre GitHub Actions y despliega el sitio en Cloudflare Workers, con el secreto `CLOUDFLARE_API_TOKEN`.

El sitio en producción sigue siendo [https://poscloud.com.ar](https://poscloud.com.ar) cuando el dominio apunte a ese Worker.  

## Contribuir

Si deseas mejorar la landing, sigue estos pasos:  
1. Clona el repositorio:  
   ```bash
   git clone https://github.com/pos-cloud/landing.git
   cd landing
