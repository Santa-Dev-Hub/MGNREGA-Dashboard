const express = require('express');
const router = express.Router();
const MgnregaData = require('../models/MgnregaData');

// Get latest performance data for a district
router.get('/district/:districtCode', async (req, res) => {
  try {
    const latestData = await MgnregaData.findOne({ 
      districtCode: req.params.districtCode 
    }).sort({ year: -1, month: -1 });
    
    if (!latestData) {
      return res.status(404).json({
        success: false,
        error: 'No data found for this district'
      });
    }
    
    res.json({
      success: true,
      data: latestData
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch data'
    });
  }
});

// Get historical data for comparison
router.get('/district/:districtCode/history', async (req, res) => {
  try {
    const months = req.query.months || 12;
    
    const historicalData = await MgnregaData.find({
      districtCode: req.params.districtCode
    })
    .sort({ year: -1, month: -1 })
    .limit(parseInt(months));
    
    res.json({
      success: true,
      count: historicalData.length,
      data: historicalData
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch historical data'
    });
  }
});

// Get state-level averages for comparison
router.get('/state/averages', async (req, res) => {
  try {
    console.log('Calculating state averages...');
    
    // Get the latest month's data for all districts
    const latestMonth = await MgnregaData.findOne()
      .sort({ year: -1, month: -1 })
      .select('year month');
    
    if (!latestMonth) {
      return res.json({
        success: true,
        data: {
          avgPersonDaysGenerated: 0,
          avgExpenditure: 0,
          avgWomenParticipation: 0,
          avgWorksCompleted: 0
        }
      });
    }

    console.log('Latest month:', latestMonth.month, latestMonth.year);
    
    // Calculate averages for that month across all districts
    const stateAverages = await MgnregaData.aggregate([
      {
        $match: { 
          year: latestMonth.year,
          month: latestMonth.month
        }
      },
      {
        $group: {
          _id: null,
          avgPersonDaysGenerated: { $avg: '$personDaysGenerated' },
          avgExpenditure: { $avg: '$expenditure' },
          avgWomenParticipation: { $avg: '$womenParticipation' },
          avgWorksCompleted: { $avg: '$worksCompleted' }
        }
      }
    ]);
    
    console.log('State averages calculated:', stateAverages[0]);
    
    res.json({
      success: true,
      data: stateAverages[0] || {
        avgPersonDaysGenerated: 0,
        avgExpenditure: 0,
        avgWomenParticipation: 0,
        avgWorksCompleted: 0
      }
    });
  } catch (err) {
    console.error('Error calculating state averages:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch state averages'
    });
  }
});

module.exports = router;
