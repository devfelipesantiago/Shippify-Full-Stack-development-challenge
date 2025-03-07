import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createVehicle } from '../service/api';

const CreateVehicle = () => {
  const [vehicleData, setVehicleData] = useState({
    driver_id: '',
    plate: '',
    model: '',
    type: '',
    capacity: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setVehicleData({ ...vehicleData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createVehicle(vehicleData);
      navigate('/');
    } catch (error) {
      console.error('Error creating vehicle:', error);
    }
  };

  return (
    <div>
      <h2>Create New Vehicle</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="driver_id"
          value={vehicleData.driver_id}
          onChange={handleChange}
          placeholder="Driver ID"
          required
        />
        <input
          type="text"
          name="plate"
          value={vehicleData.plate}
          onChange={handleChange}
          placeholder="Plate"
          required
        />
        <input
          type="text"
          name="model"
          value={vehicleData.model}
          onChange={handleChange}
          placeholder="Model"
          required
        />
        <input
          type="text"
          name="type"
          value={vehicleData.type}
          onChange={handleChange}
          placeholder="Type"
          required
        />
        <input
          type="text"
          name="capacity"
          value={vehicleData.capacity}
          onChange={handleChange}
          placeholder="Capacity"
          required
        />
        <button type="submit">Create Vehicle</button>
      </form>
    </div>
  );
};

export default CreateVehicle;
