MEGAVISIÓN MULTIUSUARIO INDEPENDIENTE

QUÉ ES
Sistema web con código fuente propio, API propia y PostgreSQL. No usa complementos de ChatGPT,
Hatchable, Supabase ni Vercel para funcionar. Puede instalarse en un servidor/VPS propio o de cualquier proveedor.

ARQUITECTURA
Navegador -> servidor Node.js/Express -> PostgreSQL.

INCLUYE
- Inicio / panel de ventas
- Nuevo cliente y venta
- Medidas optométricas
- Buscar cliente
- Recojo y pagos
- Lista de clientes
- Roles: Administrador General, Titular, Colaborador
- Usuarios por local
- Auditoría
- Sesiones seguras mediante cookie HttpOnly
- Contraseñas cifradas con bcrypt
- Borrado lógico de ventas
- Docker para mover el sistema completo a otro servidor

INSTALACIÓN RECOMENDADA EN UN SERVIDOR CON DOCKER
1. Instale Docker.
2. Cambie CAMBIAR_ESTA_CLAVE_DB en docker-compose.yml por una clave larga.
3. Ejecute: docker compose up -d --build
4. Cree el administrador:
   docker compose exec web npm run setup-admin
5. Abra http://IP_DEL_SERVIDOR:3000

PARA INTERNET REAL
Use HTTPS y un dominio. Puede poner Caddy, Nginx, Cloudflare Tunnel u otro proxy delante del puerto 3000.
No exponga PostgreSQL (5432) a Internet.

COPIAS DE SEGURIDAD
Ejemplo:
docker compose exec -T db pg_dump -U megavision megavision > respaldo.sql
Restauración:
cat respaldo.sql | docker compose exec -T db psql -U megavision megavision

PORTABILIDAD
La carpeta completa + un respaldo PostgreSQL permiten mover el sistema a otro servidor.
ChatGPT no interviene en la ejecución del sistema.

IMPORTANTE
Antes de usar datos reales en producción, configure HTTPS, copias de seguridad automáticas y una contraseña
de administrador exclusiva. No deje la contraseña de ejemplo de la base de datos.
