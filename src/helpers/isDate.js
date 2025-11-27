// Middleware helper para validar fechas
const isDate = (value) => {
    if (!value) return false; //Si el valor no existe (null, undefined o vacío) --> devolver false.
    const date = new Date(value); // Crear un objeto Date con ese valor
    return !isNaN(date.getTime()); // True si es fecha valida
};

export { isDate };