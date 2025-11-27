// Middleware para proteger rutas verificando si el usuario tiene un token JWT válido

// Insportaciones
import express from 'express';

const user = [
  {
    user: 'john',
    password: 'passor1234admin',
    role: 'admin'
  }
]



// Middleware de ejemplo para proteger rutas
const auth = (req, res, next) => {
  // Aquí hay que
    // Obtener el token del header Authorization
    // y verificarlo usando una librería como jsonwebtoken
    // Si el token es válido, se puede guardar info del usuario en req.uid
    // Si no es válido, devolver un 401 (no autorizado)
    
  console.log("Middleware de auth ejecutado");
  next();
};

// Exportar como default
export default auth;
