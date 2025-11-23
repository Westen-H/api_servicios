const express = require('express') // crear servidor

const app = express()
const PORT = 3000

// Importar las rutas de servicios
const servicesRoutes = require('./routes/services.routes')

// Ruta raiz
app.get('/', (req, res) => {
  res.send('Servidor Backend funcionando')
})

// Usar /services como prefijo
app.use('/services', servicesRoutes)

// Encender el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
