/* 
    db.js es un archivo encargado de establecer la conexión entre la aplicación y la base de datos. Su propósito es centralizar la lógica de conexión para que otras partes del proyecto puedan usar la base de datos sin repetir código. Por ejemplo, si la aplicación necesita guardar o consultar información (como usuarios, productos o servicios), debe conectarse a la base de datos, sea MongoDB. El archivo db.js contiene precisamente el código que crea y gestiona esa conexión.
*/

// Importar libreria Mongoose, para facilitar la conexión y manejo de MongoDB
import mongoose from 'mongoose'

// Función asincrona encargada de establecer conexión con MongoDB usando Mongoose como intermediario
const connectDB = async () => {
    try {
        // Intentar conectarse a MongoDB unsado la URI definida en las variables de entorno (archivo .env)(variable MONGO_URI)
        await mongoose.connect(process.env.MONGO_URI)
        console.log('🦇 Protocolo MongoDB conectado satisfactoriamente 🦇')
    } catch (error) {
        // Mensaje de error en consola, por si existe algun error y se detiene la ejecución del backend
        console.error('❌ Error conectando al Protocolo MongoDB:', error.message)
        // Detener la ejecución de la app para evitar errores posteriores
        process.exit(1) 
    }
};

// Exportar la función connectDB para poder usarla en otros archivos
export default connectDB 