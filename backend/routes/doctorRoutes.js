const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// Add doctor
router.post('/add-doctor', async (req, res) => 
    {
        console.log(req.body)
    try {
        const doctor = new Doctor(req.body);
        console.log('doctor'+ doctor)
        await doctor.save();
        res.status(201).json({ message: 'Doctor added successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// List doctors with filter and pagination
router.get('/list-doctor-with-filter', async (req, res) => {
    try {
        const { page = 1, limit = 10, gender, rating, feeMin, feeMax } = req.query;

        let query = {};
        if (gender) query.gender = gender;
        if (rating) query.rating = { $gte: Number(rating) };
        if (feeMin || feeMax) {
            query.fee = {};
            if (feeMin) query.fee.$gte = Number(feeMin);
            if (feeMax) query.fee.$lte = Number(feeMax);
        }

        const doctors = await Doctor.find(query)
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const total = await Doctor.countDocuments(query);

        res.json({ data: doctors, total });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
