const Car = require('../models/Car');
const AppError = require('../utils/appError');

exports.getCars = async (req, res, next) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (err) {
        next(err);
    }
};

exports.getCarById = async (req, res, next) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return next(new AppError('Car not found', 404));
        }
        res.json(car);
    } catch (err) {
        next(err);
    }
};

exports.createCar = async (req, res, next) => {
    try {
        const { make, model, year, pricePerDay, available, image } = req.body;
        const car = new Car({ make, model, year, pricePerDay, available, image });
        await car.save();
        res.status(201).json(car);
    } catch (err) {
        next(err);
    }
};

exports.updateCar = async (req, res, next) => {
    try {
        const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!car) {
            return next(new AppError('Car not found', 404));
        }
        res.json(car);
    } catch (err) {
        next(err);
    }
};

exports.deleteCar = async (req, res, next) => {
    try {
        const car = await Car.findByIdAndDelete(req.params.id);
        if (!car) {
            return next(new AppError('Car not found', 404));
        }
        res.json({ message: 'Car removed' });
    } catch (err) {
        next(err);
    }
};
