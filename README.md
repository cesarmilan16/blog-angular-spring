# 🚀 Blog Full-Stack con Spring Boot y Angular (Docker Compose)

Este proyecto implementa una aplicación de blog moderna (**CRUD: Crear, Leer, Actualizar, Borrar**) utilizando una arquitectura basada en contenedores con tecnologías habituales en desarrollo empresarial.

---

## 🧱 Arquitectura y Tecnologías

| Componente        | Tecnología Principal        | Propósito |
|------------------|-----------------------------|----------|
| Backend (API)    | Spring Boot (Java/Kotlin)   | API REST, lógica de negocio y acceso a datos |
| Frontend (SPA)   | Angular                     | Interfaz de usuario de página única |
| Proxy / Servidor | NGINX                       | Servir Angular y actuar como proxy inverso |
| Base de Datos    | MySQL 8.0                   | Persistencia de datos |
| Orquestación     | Docker Compose              | Gestión y conexión de contenedores |

---

## 📦 Estructura del Proyecto

```text
/blog-proyecto
├── /backend/              # Código fuente de Spring Boot
│   ├── /src/
│   └── Dockerfile
├── /frontend/             # Código fuente de Angular
│   ├── /src/
│   ├── nginx.conf         # Configuración del proxy NGINX
│   └── Dockerfile
└── docker-compose.yml     # Orquestación de servicios
```

---

# ⚙️ Requisitos Previos

- Docker
- Docker Compose
- JDK 17+ (opcional, para ejecutar el backend fuera de Docker)
- Node.js 20+ (opcional, para ejecutar el frontend fuera de Docker)

# 🛠️ Despliegue y Ejecución

## 1️⃣ Construcción y Arranque Inicial

Desde la raíz del proyecto:

```bash
docker compose up -d --build
```

## 2️⃣ Acceso a la Aplicación

### A. Acceso Local (Desarrollo)

| Servicio             | URL                                  | Puerto |
|----------------------|--------------------------------------|--------|
| Frontend (Angular)   | http://localhost:4201                | 4201   |
| Backend (API)        | http://localhost:8084/api/posts      | 8084   |
| MySQL                | localhost                             | 3307   |

### B. Acceso en Producción (Cloudflare Tunnel)

La aplicación está desplegada y accesible públicamente mediante dominios seguros:

| Servicio             | URL Pública |
|----------------------|-------------|
| Frontend (Blog)      | https://blog.cesarmilandev.com |
| Backend (API)        | https://api-blog.cesarmilandev.com/api/posts |

## 3️⃣ Solución de Problemas (Cache y Recarga)

Si realizas cambios en la configuración de NGINX (`nginx.conf`) o en las variables de entorno de Angular (`environment.prod.ts`), Docker puede usar una versión antigua en caché. Para forzar la actualización de la imagen del frontend:

```bash
docker compose build --no-cache angular-web
docker compose up -d angular-web
```

## 4️⃣ Apagar los Contenedores

Para detener y eliminar los contenedores (pero manteniendo los volúmenes de datos):

```bash
docker compose down
```

## 📝 Configuración Clave

### A. Configuración de Red (Docker Compose)

El servicio `angular-web` accede al backend usando el nombre de servicio definido en `docker-compose.yml`:

```yaml
# En docker-compose.yml
services:
  spring-app: # <--- Nombre del host interno
    # ...
```

### B. Configuración de NGINX (Proxy)

El archivo `frontend/nginx.conf` es crucial para:

- **Proxy Inverso:** Redirige todas las llamadas `/api/` al backend de Spring:

```nginx
proxy_pass http://spring-app:8080/;
```

- **Enrutamiento SPA:** Permite recargar la página en cualquier ruta de Angular sin obtener un 404.

```nginx
try_files $uri $uri/ /index.html;
```

## 👨‍💻 Desarrollo Individual

Si prefieres ejecutar los servicios en tu máquina local para una depuración más rápida:

### Backend (Spring Boot)

1. Asegúrate de que el contenedor MySQL esté activo:

```bash
docker compose up -d mysql
```

### Backend (Spring Boot)

- Actualiza tu archivo `application.properties` para usar `localhost:3307` (el puerto mapeado) si lo ejecutas fuera de Docker.
- Ejecuta la aplicación principal en tu IDE (IntelliJ IDEA) o usando Maven:

```bash
cd backend
./mvnw spring-boot:run
```

### Frontend (Angular)

- Asegúrate de que el Backend de Spring Boot esté funcionando en el puerto 8080 (o 8084 si lo ejecutas con Docker).
- Ejecuta Angular:

```bash
cd frontend
npm install
npm start
```

> **Nota:** El servidor de desarrollo de Angular generalmente usa el puerto 4200 y requerirá que configures un proxy local si usas el prefijo `/api`.
