/* 
    Services.routes.js es el archivo se donde definen las rutas (URLs) y a qué controlador llaman estas rutas.
        Es como una agenda: "Si el usuario va a "/services" → usar el controlador getServices"
        Ejemplo: router.get('/services', servicesController.getServices);
*/

// Impportar express para poder usar su sitema de enrutamiento y crear un router modular
import express from 'express';

//  Importar los funciones/controladores que ejecutan/manejan la lógica de cada ruta
import { 
    getAllServices,
    getServicesById,
    createService, 
    updateService,
    deleteService
 } from '../controllers/services.controller.js';

 // Importación de middlewares
 import validateMongoId from "../middlewares/validateMongoId.js"; 
 import validateImputs from "../middlewares/aunth.js";
 import { createReservaValidator, reservaUpdateValidator } from "../validators/services.validators.js";

// Crear una instancia de router, que permite definir rutas separadas y organizadas
const router = express.Router();

// Rutas
// -> GET en /api/v1/services
// Obtener la lista completa de servicios almacenados en la base de datos
router.get('/', getAllServices);

// -> GET /api/v1/services/:id
// Obtener un único servicio según el "ID" proporcionado en la URL
router.get('/:id', validateMongoId, getServicesById);

// -> POST /api/v1/services
// Crear un nuevo servicio en la base de datos
router.post('/', createReservaValidator, validateImputs, createService);

// -> PUT /api/v1/services/:id
// Actualizar un servicio existente según su ID
router.put('/:id', validateMongoId, reservaUpdateValidator, validateImputs, updateService);

// -> DELETE /api/v1/services/:id
// elimina un servicio existente según su ID
router.delete('/:id', validateMongoId, deleteService);

// Exportar el objeto router para que pueda ser utilizado en app.js
export default router