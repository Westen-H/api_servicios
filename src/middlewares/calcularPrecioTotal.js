// Calcular precio total de la reserva: idea --> el precioTotal debe ser elprecio por noche multiplicado por el numero de noche y sumarle los complementos si los hubiera, como mascotas, niños etc (primero saber los dias, despues saber (precio x noche) x dia. Por ultimo sumar pluses)
// Pluses: definir consto por mascota y algun otro

import Services from "../../models/service.model.js";

// Crear el middleware para que se ejecute antes de que se cree la reserva y se guarde algo en la base de datos, con --> "pre" / next --> para indicar que siga una vez echo lo que se define en la función
ServiceSchema.pre('save', function(next) { 
    const dias = (this.fechaSalida - this.fechaEntrada) / (1000 * 60 * 60 * 24) // Las fechas están en milisegundos --> convertir milisegundo a dias (milisegundo * segundo * minuto * hora)
    this.precioTotal = this.precioPorNoche * dias; // precio total
})