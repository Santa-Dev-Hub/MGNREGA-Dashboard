const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const districtRoutes = require('./routes/districts');
const dataRoutes = require('./routes/data');
const healthRoutes = require('./routes/health');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json());

let mongoRetries = 0;
const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    console.log('✓ MongoDB connected successfully');
    mongoRetries = 0;
  } catch (err) {
    mongoRetries++;
    console.error(`✗ MongoDB connection failed (attempt ${mongoRetries}):`, err.message);
    if (mongoRetries < 5) {
      console.log('Retrying in 5 seconds...');
      setTimeout(connectMongo, 5000);
    } else {
      console.error('Failed to connect to MongoDB after 5 attempts');
      process.exit(1);
    }
  }
};

connectMongo();

app.use('/api/districts', districtRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/health', healthRoutes);

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: true,
    message: err.message || 'Internal server error',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
