//Validar que el ID proporcionado en la URL sea un ObjectId válido de MongoDB
// Importar mongoose, que tiene la función para validar ObjectId
import mongoose from "mongoose";

// Middleware para validar IDs de MongoDB
const validateMongoId = (req, res, next) => {
    // Extraer el "id" de los parámetros de la URL
    const { id } = req.params;

    // Validar que el id sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID no válido" });
    }
    next();
};

// Exportar el middleware para poder usarlo en rutas
export default validateMongoId