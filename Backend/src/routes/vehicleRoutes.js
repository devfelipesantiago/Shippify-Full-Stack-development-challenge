const express = require('express');
const vehicleController = require('../controllers/vehicleController');

const router = express.Router();

/**
 * @swagger
 * /vehicles/{companyId}/{driverId}:
 *   get:
 *     summary: Get vehicles for a specific driver in a company
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: driverId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of vehicles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vehicle'
 */
router.get('/:companyId/:driverId', vehicleController.listVehiclesByDriver);

/**
 * @swagger
 * /vehicles:
 *   post:
 *     summary: Create a new vehicle
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VehicleInput'
 *     responses:
 *       201:
 *         description: Created vehicle
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 */
router.post('/', vehicleController.createVehicle);

/**
 * @swagger
 * /vehicles/{id}:
 *   get:
 *     summary: Get a vehicle by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Vehicle details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       404:
 *         description: Vehicle not found
 */
router.get('/:id', vehicleController.getVehicleById);

/**
 * @swagger
 * /vehicles/{id}:
 *   put:
 *     summary: Update a vehicle
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VehicleInput'
 *     responses:
 *       200:
 *         description: Updated vehicle
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 */
router.put('/:id', vehicleController.updateVehicle);

/**
 * @swagger
 * /vehicles/{id}:
 *   delete:
 *     summary: Delete a vehicle
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Vehicle deleted successfully
 */
router.delete('/:id', vehicleController.deleteVehicle);

/**
 * @swagger
 * components:
 *   schemas:
 *     Vehicle:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         driver_id:
 *           type: integer
 *         plate:
 *           type: string
 *         model:
 *           type: string
 *         type:
 *           type: string
 *         capacity:
 *           type: string
 *         creation_date:
 *           type: string
 *           format: date-time
 *     VehicleInput:
 *       type: object
 *       required:
 *         - driver_id
 *         - plate
 *         - model
 *         - type
 *         - capacity
 *       properties:
 *         driver_id:
 *           type: integer
 *         plate:
 *           type: string
 *         model:
 *           type: string
 *         type:
 *           type: string
 *         capacity:
 *           type: string
 */

module.exports = router;
