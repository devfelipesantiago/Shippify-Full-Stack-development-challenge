import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { listVehiclesByDriver, deleteVehicle } from '../service/api';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const { companyId, driverId } = useParams();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await listVehiclesByDriver(companyId, driverId);
        setVehicles(data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };
    fetchVehicles();
  }, [companyId, driverId]);

  const handleDelete = async (id) => {
    try {
      await deleteVehicle(id);
      setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
    } catch (error) {
      console.log('Error deleting vehicle:', error);
    }
  };

  return (
    <div>
      <h2>
        Vehicles for Driver {driverId} in Company {companyId}
      </h2>
      <table>
        <thead>
          <tr>
            <th>Plate</th>
            <th>Model</th>
            <th>Type</th>
            <th>Capacity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td data-label="Plate">{vehicle.plate}</td>
              <td data-label="Model">{vehicle.model}</td>
              <td data-label="Type">{vehicle.type}</td>
              <td data-label="Capacity">{vehicle.capacity}</td>
              <td data-label="Actions">
                <Link to={`/update/${vehicle.id}`}>Edit</Link>
                <button onClick={() => handleDelete(vehicle.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleList;
