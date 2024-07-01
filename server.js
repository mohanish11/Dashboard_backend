const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
const mongoUri = process.env.MONGODB_URL;
mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => {
    console.error('Error connecting to MongoDB Atlas:', err);
    process.exit(1); 
  });
const DataSchema = new mongoose.Schema({}, { strict: false });
const DataModel = mongoose.model('test', DataSchema, 'jsondata');
app.get('/api/data', async (req, res) => {
  try {
    const data = await DataModel.find({});
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
