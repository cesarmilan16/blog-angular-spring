# Usamos una imagen base que soporte Java 21
FROM eclipse-temurin:21-jdk

# Establece el directorio de trabajo
WORKDIR /app

# Copia el JAR generado. ASUME que está en 'target/'
# CAMBIA 'nombre-de-tu-app.jar' por el nombre real de tu archivo
COPY target/blog-api-0.0.1-SNAPSHOT.jar /app/app.jar

# Expone el puerto que usa Spring Boot (8080)
EXPOSE 8080

# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]