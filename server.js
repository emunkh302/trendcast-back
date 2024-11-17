// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const podcastRoutes = require('./routes/podcasts');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose
  .connect('mongodb://localhost:27017/podcasts', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.use('/api/podcasts', podcastRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
