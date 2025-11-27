// middlewares/validateInput.js

// ===== IMPORTACIÓN =====
// Traemos validationResult de express-validator para capturar los errores de validación que definimos en las rutas antes de llegar al controlador
import { validationResult } from 'express-validator.js';


// ===== CREACIÓN DEL MIDDLEWARE =====
// Middleware de validación de inputs (datos de entrada)
// Recibe req (request), res (response) y next (siguiente middleware)
const validateRequest = (req, res, next) => {

    // Recoger los errores que se puedan dar al validar los datos de la petición según las reglas definidas y que expres-validator registra

    const errors = validationResult(req)

    // Si hay errores (no está vacío)
    if (!errors.isEmpty()) {
        // Devolver un JSON con:  ok: false -> para indicar que hubo un error y/ errors: un objeto con los errores de validación ->  mapeados para mostrarlos de forma clara al frontend(cada campo con error tendra su mensaje correspondiente)
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    // Si no hay errores, pasar al siguiente middleware o controlador
    next()
}


// ===== EXPORTACIÓN =====
// Exportamos el middleware para poder usarlo en nuestras rutas
// Esto permite mantener el código modular y limpio
export { validateRequest }
