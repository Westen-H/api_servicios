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
import mongoose from 'mongoose';

// Desestructurar Types de mongoose para tipos de datos 
const { Schema } = mongoose

// Definir un esquema para el servicio de reserva ("Service")
const serviceSchema = new Schema({ 
        // Nombre del servicio, (requerido/obligatorio))
        nombreCliente: { 
            type:String, 
            required: true 
        },

        emailCliente: { 
            type:String, 
            required: true,
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email invalido"]
        },

        telefonoCliente: { 
            type: String, 
            required: false,
            match: [/^\+?\d{9,15}$/, 'Número de teléfono inválido'] 
        },

        tipoHabitacion: { 
            type:String, 
            required: true,
            enum: ['single', 'doble', 'familiar', 'suite', 'individual']
         },
                         
        adultos: { 
            type:Number, 
            required: true 
        },

        ninos: { 
            type:Number, 
            required: false, 
            default: 0, 
            min: 0 
        },

        mascotas: { 
            type:Number, 
            required: false, 
            default: 0, 
            min: 0 
        },

        // Tipo de mascotas, en un array por si se lleva más de una; gato + perro por ejemplo
        mascotaDetalles: [
            {
                tipo: String,
                tamamo: {
                    type: String,
                    enum: ['pequeño', 'mediano', 'grande'],
                    required: false
                }
            }
        ],

        precioPorNoche: { 
            type: Number, 
            required: true, 
            min: 0 
        },

        fechaEntrada: { 
            type:Date, 
            required: true 
        },

        fechaSalida: { 
            type:Date, 
            required: true 
        },

        numeroHabitacion: { 
            type:Number, 
            required: true 
        },

        ubicacion: { 
            type:String, 
            required: true 
        },

        taxi: { 
            type:String, 
            enum: ['confirmado', 'no se precisa', 'no', 'cancelada'], 
            default: 'no se precisa',
            required: false 
        },

        alquilerCoche: { 
            type:String, 
            enum: ['confirmado', 'no se precisa', 'no', 'cancelada'], 
            default: 'no se precisa', 
            required: false 
        },

        estadoReserva: { 
            type:String, 
            required: true,
            enum: ['confirmada', 'pendiente', 'cancelada'],
            default: 'pendiente'
        },

        // Descripcion opcional del servicio
        descripcion: { type: String },

        precioTotal: {
            type:Number,
            default:0
        }
     },

     {
        // crea/agrega automáticamente campos "createdAt" y "updatdAt"
        timestamps: true
     }
);

// Crear el modelo "Servicio" a partir del esquema
const Services = mongoose.model('Service', serviceSchema);

// Exportar el modelo para usarlo en otros archivos; ej.. controladores y rutas
export default Services;
console.log("desde la carpeta models/servicios.models, todo funcion OK")



/* Para postman:
Copiar y cambiar datos para crear diferentes reservas
{
    "nombreCliente": "Jhon Doe",
    "emailCliente": "Jhon.Doe@example.com",
    "tipoHabitacion": "suite",
    "adultos": "2",
    "ninos": "1",
    "mascotas": "1",
    "mascotaDetalles": [{ "tipo": "perro", "tamano": "mediano" }],
    "precioPorNoche": "120",
    "fechaEntrada": "2025-12-01T00:00:00Z",
    "fechaSalida": "2025-12-07T00:00:00Z",
    "numeroHabitacion": "101",
    "ubicacion": "Playa de roqueta de Mar",
    "taxi": "confirmado",
    "alquilerCoche": "no se precisa",
    "estadoReserva": "pendiente",
    "descripcion": "Reserva para vacaciones familiares",
    "precioTotal": "720"
}

*/