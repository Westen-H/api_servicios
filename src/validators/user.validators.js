// Definir reglas de validación para usuarios:
//===============================================

// importación de la funcion body que permite validar campos que vienen del cuerpo de la petición(put, post..)
import { body } from "express-validator";

// crear el validador de registro
const registerValidators = [
    body("name")
        .trim()
        .notEmpty().withMessage("El nombre es obligatorio") 
        .isLength({ min: 2}).withMessage("El nombre debe tener almenos 2 caracteres"),

    body("email")
        .trim()
        .notEmpty().withMessage("El email es obligatorio")
        .isEmail().withMessage("El eemail no es valido"),
        
    body("password")
        .trim()
        .notEmpty().withMessage("La contraseña es obligatoria")
        .isLength({ min: 6 }).withMessage("La contraseña debe tener almenos 6 caracteres")
        .matches(/[A-Z]/).withMessage("La contraseña debe tener almenos un caracter una letra mayuscula")
        .matches(/\d/).withMessage("La contraseña debe tener almenos un número")
        

        
];

// Crear el validador de inicio de sesión
const loginValidators = [
    body("email")
        .trim()
        .notEmpty().withMessage("El email es obligatorio")
        .isEmail().withMessage("El eemail no es valido"),
        
    body("password")
        .trim()
        .notEmpty().withMessage("La contraseña es obligatoria")                  
]

export {registerValidators, loginValidators}