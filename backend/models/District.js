const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema({
  districtCode: { type: String, required: true, unique: true },
  districtName: { type: String, required: true },
  stateName: { type: String, default: 'Uttar Pradesh' },
  stateCode: { type: String, default: '31' },
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  createdAt: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('District', districtSchema);
