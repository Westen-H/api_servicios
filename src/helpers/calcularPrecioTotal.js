// Calcular precio total de la reserva: idea --> el precioTotal debe ser elprecio por noche multiplicado por el numero de noche y sumarle los complementos si los hubiera, como mascotas, niños etc (primero saber los dias, despues saber (precio x noche) x dia. Por ultimo sumar pluses)
// Pluses: definir consto por mascota y algun otro

import { Children } from "react";
import Services from "../../models/service.model.js";

// Crear el middleware para que se ejecute antes de que se cree la reserva y se guarde algo en la base de datos, con --> "pre" / next --> para indicar que siga una vez echo lo que se define en la función
ServiceSchema.pre('save', function(next) { 
    const dias = (this.fechaSalida - this.fechaEntrada) / (1000 * 60 * 60 * 24) // Las fechas están en milisegundos --> convertir milisegundo a dias (milisegundo * segundo * minuto * hora)
    this.precioTotal = this.precioPorNoche * dias; // precio total
})


// helpers/calculateTotal
export function calculateTotal ({ noches, precioHabitacion, extras = 0, mascotas = [], niños = 0, adultos = 1 }) {
    // Validaciones básicas
    if (noches < 0 || precioHabitacion < 0 || adultos < 1) {
        throw new Error('Valores de entrada inválidos')
    };

    // Precios por mascotas segun tamaños
    const precioMascotas = { pequeño: 0, mediano: 10, grande: 20 };

    // Subtotales
    const subtotalHabitacion = noches * precioHabitacion;
    const subtotalMascotas = mascotas.reduce(
        (total, mascota) => total + (precioMascotas[mascota.size] || 0), 
        0
    );
    const subtotalNiños = niños * 10;
    const subtotaladultosExtras = adultos > 2 ? (adultos -2) * 10 : 0;

    // Total final
    let total = subtotalHabitacion + extras + subtotalMascotas + subtotaladultosExtras + subtotalNiños;

    return total;
} 