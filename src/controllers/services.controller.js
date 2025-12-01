/* 
    Services.controller.js es un controlador en el que se escribe las funciones que "hacen algo" cuando el usuario "hace una petición". Sirve para controla la lógica. Ejemplos de funciones típicas:
        _ crear un servicio
        _ listar servicios
        _ actualizar un servicio
        _eliminar un servicio
    Ejemplo:
    exports.getServices = async (req, res) => {
    const servicios = await Service.find();
    res.json(servicios);
    };
*/       
        
//((================== Controladores para el recurso Services ==================))\\
        // Creando el cerebro de los servicios

// Importar el modelo de MongoDB para poder interactuar con la colección "services"
import Service from '../models/service.model.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

/* =======================================
    Controladores para la entidad Service                                   
 ======================================= */

    // GET /api/v1/services
// Devolver todos los servicios alamacenados en MongoDB
const getAllServices = async (req, res, next) => {
    try {
        // Usar find()--> busca todos los documentos en la colección 2services" 
        const services = await Service.find()

        // Devolver los servicios encontrados en formato JSON (centralizado en un herlper en utils)
        return sendSuccess(res, 200, 'Lista de servicios', services);
    } catch (error) {
        // Error con middleware global
        next(error)
    }
}
    // GET /api/v1/services/:id
// Controlador que devuelve un solo servivio usando su ID
const getServicesById = async (req, res, next) => {

    try {
        // Obtener el parámetro "ID" de la URL
        const { id } = req.params

        // Buscar el documento por su "ID"
        const service = await Service.findById(id)

        // Si no existe un servicio con ese ID, responder con status 404 + msg
        if (!service) {
            return res.status(404).json({ message: 'Servicio no encontrado' })
        };

        // Si la busqueda tiene éxito, devuelve como JSON el servicio encontrado 
        return sendSuccess(res, 200, 'Servicio encontrado', service);
    } catch (error) {
        next(error)
    }
}

    // POST /api/v1/services
// Crear un nuevo servicio (de reserva) y guardarlo en MongoDB 
const createService = async (req, res, next) => {
    try {
        // ver que llega all body desde postman
        console.log('Este es el contenido que llega al BODY :', req.body);

if (!req.body || (Array.isArray(req.body) && req.body.length === 0)) {
            return res.status(400).json({ message: 'No hay datos para crear el servicio' });
        }

        console.log('Contenido recibido en BODY:', req.body);

        let newServices;

        if (Array.isArray(req.body)) {
            // Crear varios documentos
            newServices = await Service.insertMany(req.body);
        } else {
            // Crear un solo documento
            newServices = await Service.create(req.body);
        }

        // Responder con estado 201 y los servicios creados
        return sendSuccess(res, 201, 'Servicio creado correctamente', newServices);
    } catch (error) {
        // Log de errores real para depuración
        console.error('Error creando servicios:', error);

        // Pasar el error al middleware de manejo de errores
        next(error);
    }
}; 

    // PUT /api/v1/services/:id
// Controlador para ACTUALIZAR un servicio existente

const updateService = async (req, res, next) => {
    try {
        // Extraer el ID que viene en la URL
        const { id } = req.params;

        // Buscar documento por ID y localizar "req.body" que tendría los campos que se quiera cambiar y "{ new:true }" hace que se devuelva el documento actualizado en la respuesta
        const updatedServicesId = await Service.findByIdAndUpdate(
            id, // El ide del servicio, que se actualiza
            req.body, // "Qué" campo a actualizar 
            { new: true } // devolver el documento actualizado en la respuesta
        )
        
        // Si no existe el servicio devolver un erro status 404 en formato json
        if (!updatedServicesId) {
            return res.status(404).json({ message: 'servicio no encontrado' });
        }

        // Si todo esta correcto enviar el servicio actualizado en formato JSON + msg
        return sendSuccess(
            res, // objeto de respuesta de Express
            200, // código HTTP de éxito
            'Servicio actualizado correctamente',  // mensaje para el cliente
            updatedServicesId // datos del servicio actualizado
        );

    } catch (error) {
        next(error)
    }
}

    // DELETE /api/v1/services/:id
// ELIMINAR un servicio por su id y devolver un mensaje de confirmación
const deleteService = async (req, res, next) => {
    try {
        // Extraer ID desde la URL
        const { id } = req.params;

        // Burcar y eliminar el doocumento con el ID solicitado en MongoDB
        const deleteService = await Service.findByIdAndDelete(id);

        // Si no existe un servicio con ese "id" devolver error 404 + msg en formato json
        if (!deleteService) {
            return res.status(404).json({ message: 'Servicio no econtrado' });
        }

        // Si se elimina correctamente, enviar mensaje de ´exito, json:
        return sendSuccess(res, 200, 'Servicio eliminado correctamente', null); // null porque no hay datos adicio nales, ya que se elimina.

    } catch (error) {
        next(error)
    }
};


// Exportar los controladores para que puedan ser usados en las rutas 
export {
    getAllServices,
    getServicesById,
    createService,
    updateService,
    deleteService
}
console.log("desde la carpeta controller/servicios.controller, todo funcion OK")