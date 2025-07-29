const express = require('express');
const router = express.Router();
const { getCars, getCarById, createCar, updateCar, deleteCar } = require('../controllers/carController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', getCars);
router.get('/:id', getCarById);
router.post('/', protect, admin, createCar);
router.put('/:id', protect, admin, updateCar);
router.delete('/:id', protect, admin, deleteCar);

module.exports = router;
