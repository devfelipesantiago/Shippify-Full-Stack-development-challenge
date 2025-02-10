const express = require('express')
const vehicleController = require('../controllers/vehicleController')

const router = express.Router()

router.get('/:companyId/:driverId', vehicleController.listVehiclesByDriver)
router.post('/', vehicleController.createVehicle)
router.get('/:id', vehicleController.getVehicleById)
router.put('/:id', vehicleController.updateVehicle)
router.delete('/:id', vehicleController.deleteVehicle)

module.exports = router

