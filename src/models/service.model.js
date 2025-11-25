/* 
    Service.model.js es un modelo de Mongoose, que define cómo será un “Servicio” en la base de datos. Es como un “molde” o “plantilla” que efine qué campos tiene un servicio:
        _ nombre
        _ precio
        _ categoría
        _ descripción
        _ etc.
    Ejemplo:

    const ServiceSchema = new mongoose.Schema({
    nombre: String,
    precio: Number
    });
*/
// Importar mongoose para definir el esquemas y modelos de MongoDB
const mongoose = require('mongoose')

// Desestructurar Types de mongoose para tipos de datos 
const { Schema } = mongoose

// Definir un esquema para los servicios ("Service")
const serviceSchema = new mongoose.Schema(
    { 
        // Nombre del servicio, (requerido/obligatorio))
        nombre: {type:String, required: true },

        // Precio del servicio, (requerido/obligatorio))
        precio: { type: Number, required: true },

        // Descripcion opcional del servicio
        descripcion: { type: String }
     },

     {
        // crea/agrega automáticamente campos "createdAt" y "updatdAt"
        timestamps: true
     }
)

// Crear el modelo "Servicio" a partir del esquema
const Services = mongoose.model('Service', serviceSchema)

// Exportar el modelo para usarlo en otros archivos; ej.. controladores y rutas
module.exports = Services