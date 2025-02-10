const vehicleModel = require("../models/vehicleModel")
const Joi = require("joi")

const vehicleSchema = Joi.object({
  driver_id: Joi.number().integer().positive().required(),
  plate: Joi.string().max(100).required(),
  model: Joi.string().max(100).required(),
  type: Joi.string().max(100).required(),
  capacity: Joi.string().max(100).required(),
})

const listVehiclesByDriver = async (companyId, driverId) => {
  return await vehicleModel.listVehiclesByDriver(companyId, driverId)
}

const createVehicle = async (vehicleData) => {
  const { error } = vehicleSchema.validate(vehicleData)
  if (error) {
    throw new Error(error.details[0].message)
  }
  return await vehicleModel.createVehicle(vehicleData)
}

const getVehicleById = async (id) => {
  return await vehicleModel.getVehicleById(id)
}

const updateVehicle = async (id, vehicleData) => {
  const { error } = vehicleSchema.validate(vehicleData)
  if (error) {
    throw new Error(error.details[0].message)
  }
  return await vehicleModel.updateVehicle(id, vehicleData)
}

const deleteVehicle = async (id) => {
  await vehicleModel.deleteVehicle(id)
}

module.exports = {
  listVehiclesByDriver,
  createVehicle,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
}

