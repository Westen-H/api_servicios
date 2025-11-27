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
        
        // Creando el cerebro de los servicios

// Importar el modelo de MongoDB para poder interactuar con la colección "services"
import Service from '../models/service.model.js';

/* =======================================
    Controladores para la entidad Service                                   
 ======================================= */
 
    // GET /api/v1/service
// Devolver todos los servicios alamacenados en MongoDB
const getAllServices = async (req, res) => {
    try {
        // Usar find()--> busca todos los documentos en la colección 2services" 
        const services = await Service.find()

        // Devolver los servicios encontrados en formato JSON
        res.json(services)
    } catch (error) {
        next(error)
    }
}
    // GET /api/v1/services/:id
// Controlador que devuelve un solo servivio usando su ID
const getServicesById = async (req, res) => {

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
        res.json(service)
    } catch (error) {
        next(error)
    }
}

    // POST /api/v1/service
// Crear un nuevo servicio (de reserva) y guardarlo en MongoDB 
const createService = async (req, res) => {
    try {
        // ver que llega all body desde postman
        console.log('Este es el contenido que llega al BODY :', req.body);

        // // extraer los campos enviados en el body de la petición
        // const { nombre, precio, descripcion } = req.body

        // Usar todo el body para crear el nuevo documento según el schema/modelo.
        const newService = await Service.create(req.body)

        // Responder con un satatus 201 "creado" y el servicio recién creado EN json
        res.status(201).json(newService)
    } catch (error) {
        next(error)
    }
} 

    // PUT /api/v1/services/:id
// Controlador para ACTUALIZAR un servicio existente

const updateService = async (req, res) => {
    try {
        // Extraer el ID que viene en la URL
        const { id } = req.params

        // Buscar documento por ID y localizar "req.body" que tendría los campos que se quiera cambiar y "{ new:true }" hace que se devuelva el documento actualizado en la respuesta
        const updateServicesId = await Service.findByIdAndUpdate(
            id, // El ide del servicio, que se actualiza
            req.body, // "Qué" campo a actualizar 
            { new: true } // devolver el documento actualizado en la respuesta
        )
        
        // Si no existe el servicio devolver un erro status 404 en formato json
        if (!updateServicesId) {
            return res.status(404).json({ message: 'servicio no encontrado' });
        }

        // Si todo esta correcto enviar el servicio actualizado en formato JSON + msg
        res.json(updateServicesId)

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
        return res.status(200).json({ message: 'Servicio eliminado correctamente' });

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