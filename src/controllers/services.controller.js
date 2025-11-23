// Creando el cerebro de los servicios

const getAllServices = (req, res) => {
    res.json({
        message: `Aquí irán todos los servicios (respuesta desde el controlador)`
    })
};
 
module.exports = {
    getAllServices
}