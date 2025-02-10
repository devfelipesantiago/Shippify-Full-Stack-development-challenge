const connection = require('../db/connection')

const listVehiclesByDriver = async (companyId, driverId) => {
  const [vehicles] = await connection.execute(
    'SELECT v.* FROM vehicle v JOIN driver d ON v.driver_id = d.id WHERE d.company_id = ? AND d.id = ?',
    [companyId, driverId],
  )
  return vehicles
}

const createVehicle = async (vehicleData) => {
  const { driver_id, plate, model, type, capacity } = vehicleData
  const [result] = await connection.execute(
    'INSERT INTO vehicle (driver_id, plate, model, type, capacity, creation_date) VALUES (?, ?, ?, ?, ?, NOW())',
    [driver_id, plate, model, type, capacity],
  )
  return { id: result.insertId, ...vehicleData }
}

const getVehicleById = async (id) => {
  const [[vehicle]] = await connection.execute('SELECT * FROM vehicle WHERE id = ?', [id])
  return vehicle
}

const updateVehicle = async (id, vehicleData) => {
  const { driver_id, plate, model, type, capacity } = vehicleData
  await connection.execute(
    'UPDATE vehicle SET driver_id = ?, plate = ?, model = ?, type = ?, capacity = ? WHERE id = ?',
    [driver_id, plate, model, type, capacity, id],
  )
  return { id, ...vehicleData }
}

const deleteVehicle = async (id) => {
  await connection.execute('DELETE FROM vehicle WHERE id = ?', [id])
}

module.exports = {
  listVehiclesByDriver,
  createVehicle,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
}

