// controlador para una ruta de inicio de sesión 

import { generateJWT } from "../utils/jwtUtils.js";

//((================== Importaciones ==================))\\
export const login = (req, res) => {
    // Logica de autenticación (verificar usuario, etc.)
    const user = {     
        user: 'john',
        id: 1,
        role: 'admin' 
    }
    const token = generateJWT(user); // Generar el JWT
    
    res.json({ token }); // Devolver el token al cliente
};
