# Adoptme Backend API 🐾

Proyecto backend desarrollado con **Node.js, Express y MongoDB**, correspondiente a la cursada de **Backend III**.
Incluye documentación de la API con **Swagger**, testing de integración con **Mocha y Supertest** y creación de imagen con **Docker**.

---

## 🚀 Tecnologías utilizadas

* Node.js
* Express
* MongoDB
* Mongoose
* Swagger (documentación de API)
* Mocha / Supertest (testing)
* Docker

---

## 📄 Documentación API (Swagger)

Una vez levantado el servidor, la documentación interactiva de la API está disponible en:

```
http://localhost:8080/api/docs
```

---

## 🧪 Testing

El proyecto cuenta con **tests de integración** que validan el funcionamiento de los endpoints principales utilizando **Mocha y Supertest**.

Para ejecutar los tests:

```bash
npm test
```

---

## 🐳 Docker

El proyecto incluye un **Dockerfile** que permite generar una imagen del backend y ejecutar la aplicación en un contenedor.

### Build de la imagen

```bash
docker build -t adoptme-backend .
```

### Ejecutar el contenedor

```bash
docker run -d -p 8080:8080 adoptme-backend
```