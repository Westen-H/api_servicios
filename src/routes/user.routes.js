// Definir rutas de autentificación de usuario.

//importaciónes y creación de router
import express from 'express'; 
const usersRouter = express.Router();// crear router modular para definir rutas separadas del app.js pricipal

// Importar controladores --> funciones que contienen la logica de cada ruta
import {
registerUser, // --> manejar registro nuevo
    loginUser, // --> manejar inicio de sesión/login
    refreshToken, // --> renovar el token de autenticación
} from "../controllers/user.controller.js";

// Importar middlewares
import validateRequest from "../middlewares/validateRequest" // Middleware para revisar que los datos sean correctos
import { registerValidators, loginValidators } from "../validators/user.validators" // Validaciones especificas ara cada rutas
import auth from "../middlewares/auth" // Middleware para proteger rutas, viendo si el usuario tiene token JWT

// Heal check --> Ruta para test de Usuario + devolver info del usuario autenticado
usersRouter.get('/', (req, res) => {
    res.json({ 
        message: 'Usuario funcionando',
        usuario: req.uid 
    });
});

// Rutas de auth
usersRouter.post("/register", registerValidators, validateRequest, registerUser );
usersRouter.post("/login", loginValidators, validateRequest, loginUser );
usersRouter.get("/renew", auth, refreshToken );

// Exportar el router en default
export default usersRouter;