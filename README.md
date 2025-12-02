# API de Servicios (Reservas)

## 1. Descripción del proyecto:

Esta API gestiona servicios de reserva (por ejemplo, alojamiento o servicios similares), permitiendo crear, consultar, actualizar, y eliminar reservas almacenadas en una base de datos MongoDB.
Incluye operaciones CRUD:
    <> Crear una reserva
    <> Obtener todas las reservas
    <> Obtener una reserva por Id
    <> Actualizar una reserva
    <> Eliminar una reserva

    Las reservas tienen el siguíente esquema o modelo:
        ## 🧱 1.1. Estructura de datos (Modelo Service / Reserva)

Cada documento de la colección **Servicios** representa una **reserva de alojamiento** con información del cliente, la habitación, fechas, costes y servicios adicionales.

Campos principales del modelo:

### 👤 Información del cliente

- `nombreCliente` (String, requerido)  
- `emailCliente` (String, requerido, formato email, lowercase)  
- `telefonoCliente` (String, opcional, formato tipo `+34123456789`)  

### 🏨 Información de la reserva

- `tipoHabitacion` (String, requerido, enum: `single`, `doble`, `familiar`, `suite`, `individual`)  
- `adultos` (Number, requerido, mínimo 1)  
- `ninos` (Number, por defecto 0, mínimo 0)  
- `mascotas` (Number, por defecto 0, mínimo 0)  
- `mascotaDetalles` (Array de objetos con:
  - `tipo` (String)
  - `tamamo` (String, enum: `pequeño`, `mediano`, `grande`)
)

### 💵 Costes y fechas

- `precioPorNoche` (Number, requerido, mínimo 0)  
- `precioTotal` (Number, por defecto 0, calculado a partir de noches × precio/noche)  
- `fechaEntrada` (Date, requerida)  
- `fechaSalida` (Date, requerida)  

### 📍 Habitación y ubicación

- `numeroHabitacion` (Number, requerido, mínimo 1)  
- `ubicacion` (String, requerida)  

### 🚕 Servicios adicionales

- `taxi` (String, enum: `confirmado`, `no se precisa`, `no`, `cancelada`, por defecto `no se precisa`)  
- `alquilerCoche` (String, enum: `confirmado`, `no se precisa`, `no`, `cancelada`, por defecto `no se precisa`)  

### 📦 Estado y notas

- `estadoReserva` (String, requerido, enum: `confirmada`, `pendiente`, `cancelada`, por defecto `pendiente`)  
- `descripcion` (String, opcional)  

El modelo se define en `src/models/service.model.js` usando Mongoose, con `timestamps: true` y `versionKey: false`.

## Estructura del proyecto:
  


## 2. Instalar dependencias y configurar variables de entorno:
    🔹 Clonar el repositorio:
        _ git clone https://github.com/TU_USER/TU_REPO.git
    🔹 Instalación las dependecias:
        _ npm install


## 3. Configurar variables de entorno:


## 3. Ejecutar el Proyecto en Local:
    🔹 Desarrollo con nodemon:
        _ npm run dev

    🔹 Ejecución:
        _ npm start

    🔹 La API esta disponible en:
        _  http://localhost:3000


## 4. Variables de entorno:
        
    Se ha de crear un archivo .env en la raíz del proyecto con:
        _ PORT=3000
        _ MONGO_URI=tu_uri_de_mongodb_atlas
        < Podras encontrar un archivo .env.example como referencia > 


## 5. URL de Despliegue (Render):
        _ // Aquí hiria la URL del proyecto en render
         

## 6. Endponts de la API:
         
    🔹 Obtener los servicios
        _ GET /api/v1/servicios 

    🔹 Obtener un servidor por ID
        _ GET /api/v1/servicios/:id 

    🔹 Crear un servicios
        _ POST /api/v1/servicios
    🔹 
        _ 
    🔹 
        _  
    🔹 
        _  


## 2. Datos que maneja:

Cada servicio/reserva tiene, entre otros, los siguientes campos:
_ `nombreCliente`: Nombre de la persoa que realiza la reserva.
_ `emailCliente`: Email de contacto.
_ `telefonoCliente`: Telefono de contacto.
_ `nombreAlojamiento` / `tipoServicio`: Nombre o tipo del servicio.
_ `fechaDeEntrada`: Fecha inicio de la reserva.
_ `fechaDeSalida`: Fecha fin de la reserva.
_ `precioPorNoche`: Precio base por noche.
_ `precioTotal`: Precio calculado (nº denoches x precio por noche + extras (si los hubiera)).
_ `estado`: Estado de la reserva (`pendiente`, `pagado`, `cancelado`, etc.).

## Tipo de API:

_ Tipo: ** REST API **
_ Formato de datos: ** JSON **
_ BD: ** MongoDB ** (Mongoose)

## Endpoints principales:

_ ` GET /api/v1/services` → obtener todas las reservas
_ ` GET /api/v1/services/:id` → obtener una reserva por ID
_ ` POST /api/v1/services` → crear una reserva
_ ` PUT /api/v1/services/:id` → actualizar una reserva
_ ` DELETE /api/v1/services/:id` → eliminar una reserva

## 5. Flujo básico:

1. El cliente (fronten o Postamn) envia una petición HTTP a la API.
2. La ruta correspondiente llama al controlador.
3. El controlador usa el modelo (Mongoose) para leer/escribir en MongoDB.
4. La API responde con un JSON indicando el resultado.