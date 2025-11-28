// Middleware para proteger rutas verificando si el usuario tiene un token JWT válido

//((================== Importaciones ==================))\\
import { verifyJWT } from '../utils/jwtUtils.js';

// Middleware para proteger rutas
const auth = (req, res, next) => {
  // obtener el token de authorization
  const token = req.header('authorization')?.replace('bearer', '');

  // Si no hay token responder con 401
  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No tiene un token de autorización ' });
  }

  // si hay token
  try {
    // Verificar el token con la clave serceta
    const descodificado = verifyJWT(token); // Verificar el token con la función
    req.user = descodificado  // Guardar la información descodificada del usuario
    next(); // Pasar al siguiente middleware
  } catch (error) {
    return res.status(400).json({ message: 'Token no válido o expirado' })
  }
    
  console.log("Middleware de auth ejecutado");
};

// Exportar como default
export default auth;
