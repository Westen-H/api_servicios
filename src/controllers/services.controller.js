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
const Service = require('../models/service.model');

/* =======================================
    Controladores para la entidad Service                                   
 ======================================= */

    // // Datos de prueba
    // const services = [
    //     { id: 1, name: 'Limpieza', price: 20 },
    //     { id: 2, name: 'Mantenimiento', price: 50 },
    //     { id: 3, name: 'Reparación', price: 80 }
    // ]

    // GET /api/v1/servicios
// Devolver todos los servicios alamacenados en MongoDB
const getAllService = async (req, res) => {
    try {
        // Usar find()--> busca todos los documentos en la colección 2services" 
        const services = await Service.find()

        // Devolver los servicios encontrados en formato JSON
        res.json(services)
    } catch (error) {
        // Si ocurre un error en el servidor, se devuelve error: status 500 + msg
        res.status(500).json({ message: 'Error obteniendo servicios' })
    }
}
    // GET /api/v1/servicios/:id
// Controlador que devuelve un solo servivio usando su ID
const getServicesById = async (req, res) => {

    try {
        // Obtener el parámetro "ID" de la URL
        const { id } = req.params

        // Buscar el documento por su "ID"
        const service = await Service.findById(id)

        // Si no existe un servicio con ese ID, responder con error 404 + msg
        if (!service) {
            return res.status(404).json({ message: 'Servicio no encontrado' })
        };

        // Si la busqueda tiene éxito, devuelve como JSON el servicio encontrado
        res.json(service)
    } catch (error) {
        // Error de servidor o "ID" invalído
        console.error('Error obteniendo servicios', error.message)
        res.status(500).json({ message: 'Error obteniendi servicios' })
    }
}

    // POST /api/v1/servicios
// Crear un nuevo servicio y guardarlo en MongoDB 
const createService = async (req, res) => {
    try {
        // extraer los campos enviados en el body de la petición
        const { nombre, precio, descripcion } = req.body

        // Crear un nuevo documento usando el modelo Service
        const newService = await Service.create({ nombre, precio, descripcion })

        // Responder con un satatus 201 "cread0" y el servicio recién creado EN json
        res.status(201).json(newService)
    } catch (error) {
        // Si hay error de validación mandar status400 + msg
        console.error('Error creando servicio:', error.message)
        res.status(400).json({ message: 'Error creando servicio' })
    }
} 

    // PUT /api/v1/servicios/:id
// Controlador para ACTUALIZAR un servicio existente

const updateService = async (req, res) => {
    try {
        // Extraer el ID que viene en la URL
        const { id } = req.params

        // Buscar documento por ID y localizar "req.body" que tendría los campos que se quiera cambiar y "{ new:true }" hace que se devuelva el documento actualizado en la respuesta
        const updateServices = await Service.findByIdAndUpdate(
            id, // lo que se actualiza
            req.body, // "Qué" actualizar 
            { new: true } // devolver el documento actualizado en la respuesta
        )
        
        // Si no existe el servicio devolver un erro status 404 en formato json
        if (!updateServices) {
            return res.ststus(404).json({ message: 'servicio no encontrado' });
        }

        // Si todo esta correcto enviar el servicio actualizado en formato JSON + msg
        res.json(updateServices)

    } catch (error) {
        // Si pasa cualquier error; mal formato "id", datos invalidos et.. devolver error status 400 + msg
        response.status(500).json({ message: 'Error actualizando servicio' });
        error: error.message

    }
}

    // DELETE /api/v1/servicios/:id
// ELIMINAR un servicio por su id y devolver un mensaje de confirmación
const deleteService = async (req, res) => {
    try {
        // Extraer ID desde la URL
        const { id } = req.params

        // Burcar y eliminar el doocumento con el ID solicitado en MongoDB
        const deleteService = await Service.findByIdAndDelete(id);

        // Si no existe un servicio con ese "id" devolver error 404 + msg en formato json
        if (!deleteService) {
            return res.status(404).json({ message: 'Servicio no econtrado' })
        }

        // Si se elimina correctamente, enviar mensaje de ´exito, json:
        res.json({ message: 'Servicio eliminado correctamente' });

    } catch (error) {
        // Error del servicio o del id en formato no valido
        console.error('Error eliminando servicio;', error.message)
        res.status(500).json({ menssaje: 'Error eliminando servicio' })
    }
}


// Exportar los controladores para que puedan ser usados en las rutas 
module.exports = {
    getAllService,
    getServicesById,
    createService,
    updateService,
    deleteService
}