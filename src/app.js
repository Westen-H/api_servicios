// ===== IMPORTACIONES ===== \\
// Importar libreria externas:
 // Crear servidor HTTP importando Express
import express from 'express';
// Carga las variables de entorno definidas en el archivo .env y las agrega a process.env
// Permitir usar variables de entorno, cargando el paquete dotenv para leer los valores del archivo .env
import dotenv from 'dotenv';
//
import cors from "cors";
import morgan from 'morgan';

// Importar libreria internas (config, rutas): --> Importar la funcion para conectar a la base de datos mongoDB 
import connectDB from './config/dbConnect.js';
// Importar el módulo de rutas relacionadas con "service"
import servicesRoutes from './routes/services.routes.js';
import errorHandler from "./middlewares/errorHanddler.js";
import userRouter from './routes/user.routes.js';

// ===== CONFIGURACIÓN de entorno ===== \\ --> Cargar variable de entorno desde .env
dotenv.config();
// Puerto para ejecutar el servidor, usar .env o 3000
const PORT = process.env.PORT || 3000  

// Conectar la base de datos, MongoDB, con la función personalizada antes de levantar el servidor
connectDB();

// Crear instancias de Express
const app = express();

// ===== MIDDLEWARES globales ===== \\
// Middleware que permite recibir y leer/analiza (parsea) el body de las peticiones con JSON y lo agrega en req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// =====  RUTAS de la API ===== \\
// // Usar /services como prefijo: así que todas las rutas que comiencen con /services serán manejadas por Servicesroutes
app.use('/api/v1/services', servicesRoutes)
app.use('/api/v1/auth', userRouter)

// Health check --> Ruta raíz para comprobar que el servidor está funcionando correctamente
app.get('/', (req, res) => {
  res.status(200).json({
    ok: true,
    message: 'API_Servidor Backend funcionando'
  });
});

// Middleware global de errores
app.use(errorHandler);

// ===== INICIO DEL SERVIDOR ===== \\
// Encender el servidor y escuchando en el puerto indicado
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
});
