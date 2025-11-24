 // Crear servidor HTTP importando Express
const express = require('express') 

// Carga las variables de entorno definidas en el archivo .env y las agrega a process.env
// Permitir usar variables de entorno, cargando el paquete dotenv para leer los valores del archivo .env
const dotenv = require('dotenv') 

// Importar la funcion para conectar a la base de datos mongoDB 
const connectDB = require('./config/db') 

// Cargar variable de entorno desde .env
dotenv.config()

// Conectar a MongoDB con la función personalizada antes de levantar el servidor
connectDB()

const app = express()

// Puerto para ejecutar el servidor, usar .env o 3000
const PORT = process.env.PORT || 3000  

// Middleware que permite recibir y leer/analiza (parsea) el body de las peticiones con JSON y lo agrega en req.body
app.use(express.json())

// Importar el módulo de rutas relacionadas con "service"
const servicesRoutes = require('./routes/services.routes')
const { connect } = require('http2')

// Ruta raíz para comprobar que el servidor está funcionando correctamente
app.get('/', (req, res) => {
  res.send('Servidor Backend funcionando')
})

// Usar /services como prefijo: así que todas las rutas que comiencen con /services serán manejadas por Servicesroutes
app.use('/services', servicesRoutes)

// Encender el servidor y escuchando en el puerto indicado
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
