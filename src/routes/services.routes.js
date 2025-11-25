/* 
    Services.routes.js es el archivo se donde definen las rutas (URLs) y a qué controlador llaman estas rutas.
        Es como una agenda: "Si el usuario va a "/services" → usar el controlador getServices"
        Ejemplo: router.get('/services', servicesController.getServices);
*/

// Impportar express para poder usar su sitema de enrutamiento y crear un router modular
const express = require('express');

// Crear una instancia de router, que permite definir rutas separadas y organizadas
const router = express.Router()

//  Importar los controladores que ejecutan/manejan la lógica de cara ruta
const { 
    getAllServices,
    getServicesById,
    createService, 
    updateService,
    deleteService
 } = require('../controllers/services.controller');

 /*
  ======================================
  Rutas relacionadas con Services
  Prefijo usado en server.js → /services
  ======================================
*/

// -> GET en /api/v1/services
// Obtner la lista completa de servicios almacenados en la base de datos
router.get('/', getAllServices);

// -> GET /api/v1/servicios/:id
// Obtner un único servicio según el "ID" proporcionado en la URL
router.get('/:id', getServicesById);

// -> POST /api/v1/services
// Crear un nuevo servicio en la base de datos
router.post('/', createService);

// -> PUT /api/v1//servicios/:id
// Actualizar un servicio existente según su ID
router.put('/:id', updateService);

// -> DELETE /api/v1//servicios/:id
// elimina un servicio existente según su ID
router.delete('/:id', deleteService);

// Exportar el objeto router para que pueda ser utilizado en app.js
module.exports = router