🚀 Blog Full-Stack con Spring Boot y Angular (Docker Compose)Este proyecto implementa una aplicación de blog moderna (CRUD: Crear, Leer, Actualizar, Borrar) utilizando una arquitectura de microservicios con tecnologías clave para el desarrollo empresarial:ComponenteTecnología PrincipalPropósitoBackend (API)Spring Boot (Java/Kotlin)Servidor RESTful, lógica de negocio y comunicación con la base de datos.Frontend (SPA)AngularInterfaz de usuario de página única (SPA).Proxy/ServidorNGINXSirve el contenido estático de Angular y actúa como Proxy Inverso para la API.Base de DatosMySQL 8.0Almacenamiento persistente de los posts y usuarios.OrquestaciónDocker ComposeLevanta, configura y conecta los tres servicios de forma aislada.📦 Estructura del ProyectoEl proyecto está organizado en tres directorios principales, reflejando su arquitectura de contenedores:/blog-proyecto
├── /backend/              (Código fuente de Spring Boot)
│   ├── /src/
│   └── Dockerfile
├── /frontend/             (Código fuente de Angular)
│   ├── /src/
│   ├── nginx.conf         (Configuración esencial del Proxy NGINX)
│   └── Dockerfile
└── docker-compose.yml     (Orquestación de todos los servicios)
⚙️ Requisitos PreviosNecesitas tener instalados los siguientes programas en tu máquina:DockerDocker Compose (Generalmente se incluye con las instalaciones modernas de Docker Desktop)JDK 17+ (Si deseas ejecutar el backend fuera de Docker)Node.js 20+ (Si deseas ejecutar el frontend fuera de Docker)🛠️ Despliegue y EjecuciónLa forma recomendada de ejecutar toda la aplicación es mediante Docker Compose.1. Construcción y Arranque InicialDesde el directorio raíz del proyecto, ejecuta el siguiente comando. La bandera --build es esencial para compilar Spring Boot y Angular por primera vez.Bashdocker compose up -d --build
2. Acceso a la AplicaciónUna vez que los contenedores estén activos:ServicioDirección de AccesoPuerto ExpuestoFrontend (Angular)http://localhost:42014201Backend (API)http://localhost:8084/api/posts8084 (Solo para depuración)Base de Datoslocalhost:33073307 (Para herramientas como MySQL Workbench)3. Solución de Problemas (Cache y Recarga)Si realizas cambios en la configuración de NGINX (nginx.conf) o en las variables de entorno de Angular (environment.prod.ts), Docker puede usar una versión antigua en caché. Para forzar la actualización de la imagen del frontend:Bashdocker compose build --no-cache angular-web
docker compose up -d angular-web
4. Apagar los ContenedoresPara detener y eliminar los contenedores (pero manteniendo los volúmenes de datos):Bashdocker compose down
📝 Configuración ClaveA. Configuración de Red (Docker Compose)El servicio angular-web accede al backend usando el nombre de servicio definido en docker-compose.yml:YAML# En docker-compose.yml
services:
  spring-app: # <--- Nombre del host interno
    # ...
B. Configuración de NGINX (Proxy)El archivo frontend/nginx.conf es crucial para:Proxy Inverso: Redirige todas las llamadas /api/ al backend de Spring:Nginxproxy_pass http://spring-app:8080/;
Enrutamiento SPA: Permite recargar la página en cualquier ruta de Angular sin obtener un 404:Nginxtry_files $uri $uri/ /index.html;
👨‍💻 Desarrollo IndividualSi prefieres ejecutar los servicios en tu máquina local para una depuración más rápida:Backend (Spring Boot)Asegúrate de que el contenedor MySQL esté activo (docker compose up -d mysql).Actualiza tu archivo application.properties para usar localhost:3307 (el puerto mapeado) si lo ejecutas fuera de Docker.Ejecuta la aplicación principal en tu IDE (IntelliJ IDEA) o usa Maven:Bashcd backend
./mvnw spring-boot:run
Frontend (Angular)Asegúrate de que el Backend de Spring Boot esté funcionando en el puerto 8080 (o 8084 si lo ejecutas con Docker).Ejecuta Angular:Bashcd frontend
npm install
npm start
(Nota: El servidor de desarrollo de Angular generalmente usa el puerto 4200 y requerirá que configures un proxy local si usas el prefijo /api.)
