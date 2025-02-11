import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

export const listVehiclesByDriver = async (companyId, driverId) => {
  const response = await api.get(`/vehicles/${companyId}/${driverId}`);
  return response.data;
};

export const createVehicle = async (vehicleData) => {
  const response = await api.post('/vehicles', vehicleData);
  return response.data;
};

export const getVehicleById = async (id) => {
  const response = await api.get(`/vehicles/${id}`);
  return response.data;
};

export const updateVehicle = async (id, vehicleData) => {
  const response = await api.put(`/vehicles/${id}`, vehicleData);
  return response.data;
};

export const deleteVehicle = async (id) => {
  await api.delete(`/vehicles/${id}`);
};
