const Booking = require('../models/Booking');
const Car = require('../models/Car');
const AppError = require('../utils/appError');

exports.getBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find({ user: req.user._id }).populate('car');
        res.json(bookings);
    } catch (err) {
        next(err);
    }
};

exports.getBookingById = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('car');
        if (!booking || booking.user.toString() !== req.user._id.toString()) {
            return next(new AppError('Booking not found', 404));
        }
        res.json(booking);
    } catch (err) {
        next(err);
    }
};

exports.createBooking = async (req, res, next) => {
    try {
        const { car, startDate, endDate, totalPrice } = req.body;
        const carObj = await Car.findById(car);
        if (!carObj || !carObj.available) {
            return next(new AppError('Car not available', 400));
        }
        const booking = new Booking({
            user: req.user._id,
            car,
            startDate,
            endDate,
            totalPrice,
            status: 'booked',
        });
        await booking.save();
        carObj.available = false;
        await carObj.save();
        res.status(201).json(booking);
    } catch (err) {
        next(err);
    }
};

exports.updateBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking || booking.user.toString() !== req.user._id.toString()) {
            return next(new AppError('Booking not found', 404));
        }
        Object.assign(booking, req.body);
        await booking.save();
        res.json(booking);
    } catch (err) {
        next(err);
    }
};

exports.deleteBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking || booking.user.toString() !== req.user._id.toString()) {
            return next(new AppError('Booking not found', 404));
        }
        const car = await Car.findById(booking.car);
        if (car) {
            car.available = true;
            await car.save();
        }
        await booking.deleteOne();
        res.json({ message: 'Booking cancelled' });
    } catch (err) {
        next(err);
    }
};
