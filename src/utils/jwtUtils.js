//((================== Importaciones ==================))\\
import jwt from 'jsonwebtoken'
import config from '../config/config.js'

//((================== Generar token ==================))\\
export const generateJWT = (payload, expiresIn = '2h') => {
    return jwt.sign(payload, config.security.secretKey, { expiresIn });
};

export const generateRefreshToken = (user) => {
    return jwt.sign(user, config.security.secretKey, { expiresIn: '7d'}) // expiración larga para el refresh token
};

//((================== Verificar token ==================))\\
export const verifyJWT = (token) => {
    try {
        return jwt.verify(token, config.security.secretKey); // Verificar el token
    } catch (error) {
        throw new Error('Token no válido o ha expirado');
    }
};
