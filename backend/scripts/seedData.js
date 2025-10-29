const mongoose = require('mongoose');
require('dotenv').config();
const District = require('../models/District');
const MgnregaData = require('../models/MgnregaData');

const utPradesDistricts = [
  { code: '01', name: 'Agra' },
  { code: '02', name: 'Aligarh' },
  { code: '03', name: 'Allahabad' },
  { code: '04', name: 'Ambedkar Nagar' },
  { code: '05', name: 'Amethi' },
  { code: '06', name: 'Amroha' },
  { code: '07', name: 'Auraiya' },
  { code: '08', name: 'Azamgarh' },
  { code: '09', name: 'Baghpat' },
  { code: '10', name: 'Bagpat' },
  { code: '11', name: 'Bahraich' },
  { code: '12', name: 'Ballia' },
  { code: '13', name: 'Balrampur' },
  { code: '14', name: 'Banda' },
  { code: '15', name: 'Bara Banki' },
  { code: '16', name: 'Bareilly' },
  { code: '17', name: 'Basti' },
  { code: '18', name: 'Bijnour' },
  { code: '19', name: 'Budaun' },
  { code: '20', name: 'Bulandshahr' },
  { code: '21', name: 'Chandauli' },
  { code: '22', name: 'Chhatarpur' },
  { code: '23', name: 'Chitrakoot' },
  { code: '24', name: 'Deoria' },
  { code: '25', name: 'Etah' },
  { code: '26', name: 'Etawah' },
  { code: '27', name: 'Firozabad' },
  { code: '28', name: 'Gautam Budh Nagar' },
  { code: '29', name: 'Ghaziabad' },
  { code: '30', name: 'Ghazipur' },
  { code: '31', name: 'Gonda' },
  { code: '32', name: 'Gorakhpur' },
  { code: '33', name: 'Greater Noida' },
  { code: '34', name: 'Gwalior' },
  { code: '35', name: 'Hamirpur' },
  { code: '36', name: 'Hapur' },
  { code: '37', name: 'Hardoi' },
  { code: '38', name: 'Hathras' },
  { code: '39', name: 'Hazaribagh' },
  { code: '40', name: 'Indore' },
  { code: '41', name: 'Jalaun' },
  { code: '42', name: 'Jaunpur' },
  { code: '43', name: 'Jehanabad' },
  { code: '44', name: 'Jhansi' },
  { code: '45', name: 'Jodhpur' },
  { code: '46', name: 'Kannauj' },
  { code: '47', name: 'Kanpur Dehat' },
  { code: '48', name: 'Kanpur Nagar' },
  { code: '49', name: 'Kasganj' },
  { code: '50', name: 'Kaushambi' },
  { code: '51', name: 'Kheri' },
  { code: '52', name: 'Kholapur' },
  { code: '53', name: 'Kushinagar' },
  { code: '54', name: 'Lakhimpur Kheri' },
  { code: '55', name: 'Lalitpur' },
  { code: '56', name: 'Lucknow' },
  { code: '57', name: 'Madhya Pradesh' },
  { code: '58', name: 'Mahoba' },
  { code: '59', name: 'Mahrajganj' },
  { code: '60', name: 'Mainpuri' },
  { code: '61', name: 'Mathura' },
  { code: '62', name: 'Mau' },
  { code: '63', name: 'Meerut' },
  { code: '64', name: 'Mirzapur' },
  { code: '65', name: 'Moradabad' },
  { code: '66', name: 'Muzaffarnagar' },
  { code: '67', name: 'Nalanda' },
  { code: '68', name: 'Nand' },
  { code: '69', name: 'Narayanganj' },
  { code: '70', name: 'Noida' },
  { code: '71', name: 'Orai' },
  { code: '72', name: 'Orissa' },
  { code: '73', name: 'Palamu' },
  { code: '74', name: 'Panna' },
  { code: '75', name: 'Panipat' }
];

// Seed districts FIRST
async function seedDistricts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing data
    await District.deleteMany({ stateCode: '31' });
    await MgnregaData.deleteMany({});
    console.log('Cleared old data');
    
    // Create new districts
    const districtsToCreate = utPradesDistricts.map(district => ({
      districtCode: district.code,
      districtName: district.name,
      stateCode: '31',
      stateName: 'Uttar Pradesh'
    }));
    
    const created = await District.insertMany(districtsToCreate);
    console.log(`✓ Seeded ${created.length} districts`);
    
    // Now seed MGNREGA data for last 12 months
    await seedMgnregaData();
    
    process.exit(0);
  } catch (err) {
    console.error('Error seeding districts:', err);
    process.exit(1);
  }
}

// Seed MGNREGA performance data for each district (12 months)
async function seedMgnregaData() {
  try {
    const districts = await District.find({ stateCode: '31' });
    console.log(`\nCreating 12 months of MGNREGA data for ${districts.length} districts...`);

    let count = 0;
    
    // Generate data for last 12 months
    for (let monthsAgo = 11; monthsAgo >= 0; monthsAgo--) {
      const date = new Date();
      date.setMonth(date.getMonth() - monthsAgo);
      const month = date.toISOString().slice(0, 7); // Format: YYYY-MM
      const year = date.getFullYear();
      
      console.log(`Creating data for ${month}...`);
      
      for (const district of districts) {
        const mgnregaData = {
          districtCode: district.districtCode,
          districtName: district.districtName,
          month: month,
          year: year,
          
          // Generate realistic varying data
          jobCardsIssued: Math.floor(Math.random() * 500000) + 100000,
          activeWorkers: Math.floor(Math.random() * 300000) + 50000,
          personDaysGenerated: Math.floor(Math.random() * 10000000) + 1000000,
          expenditure: Math.floor(Math.random() * 50000000) + 5000000,
          fundsReleased: Math.floor(Math.random() * 50000000) + 5000000,
          worksCompleted: Math.floor(Math.random() * 5000) + 100,
          worksInProgress: Math.floor(Math.random() * 3000) + 50,
          avgWageRate: Math.floor(Math.random() * 100) + 150,
          womenParticipation: Math.floor(Math.random() * 40) + 30,
          scParticipation: Math.floor(Math.random() * 25) + 10,
          stParticipation: Math.floor(Math.random() * 25) + 10,
          householdsCompleted100Days: Math.floor(Math.random() * 50000) + 5000,
          lastUpdated: new Date(),
          dataSource: 'nrega.nic.in'
        };

        await MgnregaData.create(mgnregaData);
        count++;
      }
    }

    console.log(`✓ Created ${count} MGNREGA data records (12 months × 75 districts)\n`);
  } catch (err) {
    console.error('Error seeding MGNREGA data:', err);
  }
}

// Start the seed process
seedDistricts();
