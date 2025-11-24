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

    // GET /services
// Devolver todos los servicios alamacenados en MongoDB
const getAllServices = async (req, res) => {
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
    // GET /services/:id
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

    // POST /services
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


// Exportar los controladores para que puedan ser usados en las rutas 
module.exports = {
    getAllServices,
    getServicesById,
    createService
}