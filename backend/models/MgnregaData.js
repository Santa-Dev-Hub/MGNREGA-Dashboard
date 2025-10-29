const mongoose = require('mongoose');

const mgnregaDataSchema = new mongoose.Schema({
  districtCode: { type: String, required: true },
  districtName: { type: String, required: true },
  month: { type: String, required: true },
  year: { type: Number, required: true },
  
  jobCardsIssued: Number,
  activeWorkers: Number,
  personsWorked: Number,
  personDaysGenerated: Number,
  
  expenditure: Number,
  fundsReleased: Number,
  
  worksCompleted: Number,
  worksInProgress: Number,
  
  avgWageRate: Number,
  womenParticipation: Number,
  scParticipation: Number,
  stParticipation: Number,
  
  householdsCompleted100Days: Number,
  
  lastUpdated: { type: Date, default: Date.now },
  dataSource: { type: String, default: 'nrega.nic.in' }
});

mgnregaDataSchema.index({ districtCode: 1, year: 1, month: 1 });

module.exports = mongoose.model('MgnregaData', mgnregaDataSchema);
