# API de Servicios (Reservas)

## 1. Descripción:

Esta API gestiona servicios de reserva (por ejemplo, alojamiento o servicios similares), permitiendo crear, consultar, actualizar, y eliminar reservas almacenadas en una base de datos MongoDB.

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