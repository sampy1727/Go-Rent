const express = require('express');
const router = express.Router();
const { getBookings, getBookingById, createBooking, updateBooking, deleteBooking } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getBookings);
router.get('/:id', protect, getBookingById);
router.post('/', protect, createBooking);
router.put('/:id', protect, updateBooking);
router.delete('/:id', protect, deleteBooking);

module.exports = router;
