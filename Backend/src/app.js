const express = require('express')
const vehicleRoutes = require('./routes/vehicleRoutes')
const swaggerUi = require("swagger-ui-express")
const swaggerSpec = require("./swaggerConfig")

const app = express()

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/api/vehicles', vehicleRoutes)

app.use((err, _req, res, _next) => {
  console.error(err.stack)
  res.status(500).json({ error: error.message })
})

module.exports = app