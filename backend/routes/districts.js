const express = require('express');
const router = express.Router();
const District = require('../models/District');

router.get('/', async (req, res) => {
  try {
    const districts = await District.find({ stateCode: '31' })
      .sort({ districtName: 1 });
    
    res.json({
      success: true,
      count: districts.length,
      data: districts
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch districts'
    });
  }
});

router.get('/:districtCode', async (req, res) => {
  try {
    const district = await District.findOne({ districtCode: req.params.districtCode });
    
    if (!district) {
      return res.status(404).json({
        success: false,
        error: 'District not found'
      });
    }
    
    res.json({
      success: true,
      data: district
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch district'
    });
  }
});

module.exports = router;
