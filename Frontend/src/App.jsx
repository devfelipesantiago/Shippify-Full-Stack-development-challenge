import { Route, Routes, Link } from 'react-router-dom';
import VehicleList from './components/VehicleList';
import CreateVehicle from './components/CreateVehicle';
import UpdateVehicle from './components/UpdateVehicle';
import './App.css';

function App() {
  return (
    <>
      <div className="container">
        <h1>Vehicle Management System</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/create">Create Vehicle</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/:companyId/:driverId" element={<VehicleList />} />
          <Route path="/create" element={<CreateVehicle />} />
          <Route path="/update/:id" element={<UpdateVehicle />} />
          <Route
            path="/"
            element={
              <div>
                <h2>Welcome to the Vehicle Management System</h2>
                <p>
                  Please select a company and driver to view their vehicles.
                </p>
              </div>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
