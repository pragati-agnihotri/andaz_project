const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    experience: { type: Number, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    rating: { type: Number, required: true },
    fee: { type: Number, required: true },
    profilePicture: { type: String, required: false }
});

module.exports = mongoose.model('Doctor', DoctorSchema);
