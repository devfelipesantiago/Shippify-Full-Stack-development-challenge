const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../src/app');
const vehicleModel = require('../src/models/vehicleModel');

chai.use(chaiHttp);
const { expect } = chai;

describe('Vehicle Routes', () => {
  describe('GET /api/vehicles/:companyId/:driverId', () => {
    it('should return vehicles for a driver', async () => {
      const mockVehicles = [
        {
          id: 1,
          driver_id: 1,
          plate: 'ABC123',
          model: 'Toyota',
          type: 'Sedan',
          capacity: '5',
        },
      ];
      sinon.stub(vehicleModel, 'listVehiclesByDriver').resolves(mockVehicles);

      const res = await chai.request(app).get('/api/vehicles/1/1');

      expect(res).to.have.status(200);
      expect(res.body).to.deep.equal(mockVehicles);

      sinon.restore();
    });
  });

  describe('GET /api/vehicles/:id', () => {
    it('should return a vehicle by id', async () => {
      const mockVehicle = {
        id: 1,
        driver_id: 1,
        plate: 'ABC123',
        model: 'Toyota',
        type: 'Sedan',
        capacity: '5',
      };
      sinon.stub(vehicleModel, 'getVehicleById').resolves(mockVehicle);

      const res = await chai.request(app).get('/api/vehicles/1');

      expect(res).to.have.status(200);
      expect(res.body).to.deep.equal(mockVehicle);

      sinon.restore();
    });

    it('should return 404 for non-existent vehicle', async () => {
      sinon.stub(vehicleModel, 'getVehicleById').resolves(null);

      const res = await chai.request(app).get('/api/vehicles/999');

      expect(res).to.have.status(404);
      expect(res.body).to.have.property('error', 'Vehicle not found');

      sinon.restore();
    });
  });

  describe('POST /api/vehicles', () => {
    it('should create a new vehicle', async () => {
      const newVehicle = {
        driver_id: 6,
        plate: 'XYZ789',
        model: 'Honda',
        type: 'SUV',
        capacity: '7',
      };
      sinon
        .stub(vehicleModel, 'createVehicle')
        .resolves({ id: 2, ...newVehicle });

      const res = await chai
        .request(app)
        .post('/api/vehicles')
        .send(newVehicle);

      expect(res).to.have.status(201);
      expect(res.body).to.deep.equal({
        id: 2,
        message: 'Vehicle created successfully',
      });

      sinon.restore();
    });

    it('should return an error for invalid input', async () => {
      const invalidVehicle = {
        driver_id: 'invalid',
        plate: 'XYZ789',
        model: 'Honda',
        type: 'SUV',
        capacity: '7',
      };

      const res = await chai
        .request(app)
        .post('/api/vehicles')
        .send(invalidVehicle);

      expect(res).to.have.status(500);
    });
  });

  describe('PUT /api/vehicles/:id', () => {
    it('should update a vehicle', async () => {
      const updatedVehicle = {
        driver_id: 1,
        plate: 'XYZ789',
        model: 'Honda',
        type: 'SUV',
        capacity: '7',
      };
      sinon
        .stub(vehicleModel, 'updateVehicle')
        .resolves({ id: 1, ...updatedVehicle });

      const res = await chai
        .request(app)
        .put('/api/vehicles/1')
        .send(updatedVehicle);

      expect(res).to.have.status(200);
      expect(res.body).to.deep.equal({ id: 1, ...updatedVehicle });

      sinon.restore();
    });
  });

  describe('DELETE /api/vehicles/:id', () => {
    it('should delete a vehicle', async () => {
      sinon.stub(vehicleModel, 'deleteVehicle').resolves();

      const res = await chai.request(app).delete('/api/vehicles/1');

      expect(res).to.have.status(204);

      sinon.restore();
    });
  });

  // Add this test to ensure Swagger documentation is accessible
  describe('GET /api-docs', () => {
    it('should return Swagger UI', async () => {
      const res = await chai.request(app).get('/api-docs/');
      expect(res).to.have.status(200);
      expect(res).to.be.html;
    });
  });
});
