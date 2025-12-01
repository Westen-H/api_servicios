//((===== Helper para enviar respuestas consistentes =====))\\
/**
 * Enviar una respuesta exitosa de éxito con formato extándar.
 * @param {Response} res - Objeto de respuesta de Express
 * @param {number} statuscode - Código de estado HTTP
 * @param {string} message - Mensaje descriptivo
 * @param {any} data - Datos a devolver (objeto, array, etc.)
 * @returns 
 */
export const sendSuccess = (res, statusCode, message, data = null) => {
    return res.status(statusCode).json({
        ok: true,
        message,
        data,
    });
};

/**
 * Envíar una respuesta de error con fromato extándar
 * @param {Response} res - Objeto de respuesta de Express
 * @param {number} statusCode - Código de estado HTTP
 * @param {string} message - Mensaje de error
 * @returns 
 */
export const sendError = (res, statusCode, message) => {
    return res.status(statusCode).json({
        ok: false,
        message,
    });
};