// Primero cargar todas las variables de entorno, para que estén disponibles en toda la configuración y el resto de la app
import "dotenv/config";

// Definir el objeto de configuración principal
const config = {
    // configurar el servidor
    server: {
        port: process.env.PORT || 3000,
    },

    // Configuración de la base de datos
    db: {
        // Si Mongo_URI no está definido, usar un valor por defecto
        uri: process.env.MONGO_URI || 'mongodb://localhost:27017/mi_app_default',
    },

    // Configuración de seguridad

    security: {
        // Para claves secretas. Importante: no valores por defecto
        secretKey: process.env.JWT_SECRET,
    },

    // Otras configuraciones si precisan.....

}

// Exportar el objeto de configuración
export default config;