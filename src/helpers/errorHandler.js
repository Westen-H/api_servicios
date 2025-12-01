// Hacer un Middleware global de manejo de errores
/**
 * 
 * @param {object} err 
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 * @returns {object}
 */
const errorHandler = (err, req, res, next) => {
    console.error("❌ Error en el servidor: ", err);

    if (!res.headersSent) {
        return res.status(500).json({
            message: "Error interno en el servidor"
        });
    }
};

export default errorHandler; // Default ya que un middleware de errores es de un único valor central