

// Importaciones --> body y isDate: body es la función que permite validar campos que vienen en el body de la peticvión (POST,PUT) / is date es una función personalizada, para validadr si un valor es una fecha valida
import body from "express-validator";
import isDate from "../helpers/isDate";

// Validaciones para crear un servicio(de reserva)
const createReservaValidator = [
    // Nombre del cliente
    body("name")
        .trim()
        .notEmpty().withMessage("El nombre es obligatorio") 
        .isLength({ min: 3}).withMessage("El nombre debe tener almenos 3 caracteres"), 

    // Email del cliente
    body("emailCliente")
        .trim()
        .notEmpty().withMessage("El email del cliente es obligatorio") 
        .isEmail().withMessage("El email del cliente no es válido"),

    // Tipo de habitación
    body("tipoHabitacion")
        .trim()
        .notEmpty().withMessage("El tipo de habitación es obligatorio") 
        .isIn(["suite", "doble", "simple"]).withMessage("Tipo de habitacion invalido"),

    // Adultos
    body("adultos")
        .trim()
        .notEmpty().withMessage("La cantidad de adultos es obligatoria") 
        .isIn({ min: 1 }).withMessage("Debe haber almenos un adulto"),

    // Niños
    body("ninos")
        .trim()
        .optional()
        .isIn({ min: 0 }).withMessage("La cantiddad de niños debe ser 0 o más"),

    // Mascotas
    body("mascotas")
        .trim()
        .optional()
        .isIn({ min: 0 }).withMessage("La cantiddad de mascotas debe ser 0 o más"),

    // Detalles de mascotas
    body("mascotaDetalles")
        .trim()
        .optional()
        .isArray().withMessage("Los detalles de mascotas debe ser un areglo"),

    body("mascotasDetalles.*.tipo")
        .trim()
        .optional()
        .notEmpty().withMessage("El tipo de mascota es obligatorio si se envía"),

    body("mascotasDetalles.*.tamano")
        .trim()
        .optional()
        .notEmpty().withMessage("El tamaño de la mascota es obligatorio si se envía"),

    // Precio por noche
  body("precioPorNoche")
    .notEmpty().withMessage("El precio por noche es obligatorio")
    .isNumeric().withMessage("El precio por noche debe ser numérico"),

  // Fechas
  body("fechaEntrada")
    .notEmpty().withMessage("La fecha de entrada es obligatoria")
    .custom(isDate).withMessage("La fecha de entrada no es válida"),

  body("fechaSalida")
    .notEmpty().withMessage("La fecha de salida es obligatoria")
    .custom(isDate).withMessage("La fecha de salida no es válida")
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.fechaEntrada)) {
        throw new Error("La fecha de salida debe ser posterior a la fecha de entrada");
      }
      return true;
    }),

  // Número de habitación
  body("numeroHabitacion")
    .trim()
    .notEmpty().withMessage("El número de habitación es obligatorio"),

  // Ubicación
  body("ubicacion")
    .trim()
    .notEmpty().withMessage("La ubicación es obligatoria"),

  // Taxi y alquiler de coche
  body("taxi")
    .optional()
    .isIn(["confirmado", "no"]).withMessage("Valor de taxi inválido"),

  body("alquilerCoche")
    .optional()
    .isString().withMessage("El alquiler de coche debe ser un string"),

  // Estado de la reserva
  body("estadoReserva")
    .trim()
    .notEmpty().withMessage("El estado de la reserva es obligatorio")
    .isIn(["pendiente", "confirmada", "cancelada"])
    .withMessage("Estado de reserva inválido"),

  // Descripción
  body("descripcion")
    .optional()
    .isString().withMessage("La descripción debe ser un texto"),

  // Precio total
  body("precioTotal")
    .notEmpty().withMessage("El precio total es obligatorio")
    .isNumeric().withMessage("El precio total debe ser numérico")
    .custom((value, { req }) => {
      const noches = (new Date(req.body.fechaSalida) - new Date(req.body.fechaEntrada)) / (1000 * 60 * 60 * 24);
      const calculado = noches * parseFloat(req.body.precioPorNoche);
      if (parseFloat(value) !== calculado) {
        throw new Error("El precio total no coincide con el precio por noche y la cantidad de noches");
      }
      return true;
    })
];

const reservaUpdateValidator = createReservaValidator.map(rule => rule.optional());

export default {createReservaValidator, reservaUpdateValidator}