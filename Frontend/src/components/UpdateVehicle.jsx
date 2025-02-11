import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getVehicleById, updateVehicle } from '../service/api';

const UpdateVehicle = () => {
  const [vehicleData, setVehicleData] = useState({
    driver_id: '',
    plate: '',
    model: '',
    type: '',
    capacity: '',
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const data = await getVehicleById(id);
        setVehicleData(data);
      } catch (error) {
        console.error('Error fetching vehicle:', error);
      }
    };
    fetchVehicle();
  }, [id]);

  const handleChange = (e) => {
    setVehicleData({ ...vehicleData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateVehicle(id, vehicleData);
      navigate('/');
    } catch (error) {
      console.error('Error updating vehicle:', error);
    }
  };

  return (
    <div>
      <h2>Update Vehicle</h2>
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
        <button type="submit">Update Vehicle</button>
      </form>
    </div>
  );
};

export default UpdateVehicle;
