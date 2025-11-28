// Middleware para validar wel rol del usuario
const validateRole = (roles) => {
    return (req, res, next) => {
        const { role } = req.user; // Obtener el rol del usuario descodificado

        if (!roles.includes(role)) {
            return res.status(403).json({ message: 'Acceso denegado. No tiene el rol de adecuado.' });
        }

        next(); // Si el rol es válido, pasamos al siguiente middleware o ruta
    };
};

export default validateRole;