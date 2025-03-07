const vehicleService = require('../service/vehicleService');

const listVehiclesByDriver = async (req, res, next) => {
  try {
    const { companyId, driverId } = req.params;

    const vehicles = await vehicleService.listVehiclesByDriver(
      companyId,
      driverId
    );

    res.status(200).json(vehicles);
  } catch (error) {
    next(error);
  }
};

const createVehicle = async (req, res, next) => {
  try {
    const newVehicle = await vehicleService.createVehicle(req.body);

    res.status(201).json({
      id: newVehicle.id,
      message: 'Vehicle created successfully',
    });
  } catch (error) {
    next(error);
  }
};

const getVehicleById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const vehicle = await vehicleService.getVehicleById(id);

    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    res.status(200).json(vehicle);
  } catch (error) {
    next(error);
  }
};

const updateVehicle = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedVehicle = await vehicleService.updateVehicle(id, req.body);

    res.status(200).json(updatedVehicle);
  } catch (error) {
    next(error);
  }
};

const deleteVehicle = async (req, res, next) => {
  try {
    const { id } = req.params;

    await vehicleService.deleteVehicle(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listVehiclesByDriver,
  createVehicle,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};
