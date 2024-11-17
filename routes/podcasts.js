// routes/podcasts.js
const express = require('express');
const multer = require('multer');
const Podcast = require('../models/Podcast');
const router = express.Router();
const path = require('path');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'audio') {
      cb(null, 'uploads/audio/');
    } else if (file.fieldname === 'image') {
      cb(null, 'uploads/images/');
    }
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// POST /api/podcasts - Add a new podcast
router.post(
  '/',
  upload.fields([
    { name: 'audio', maxCount: 1 },
    { name: 'image', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { title, description } = req.body;
      const audioUrl = req.files['audio'][0].path;
      const imageUrl = req.files['image'][0].path;

      const newPodcast = new Podcast({
        title,
        description,
        audioUrl,
        imageUrl,
      });

      const savedPodcast = await newPodcast.save();
      res.status(201).json(savedPodcast);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

// GET /api/podcasts - Fetch all podcasts
router.get('/', async (req, res) => {
  try {
    const podcasts = await Podcast.find();
    res.json(podcasts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/podcasts/:id - Get a single podcast
router.get('/:id', getPodcast, (req, res) => {
  res.json(res.podcast);
});

// PUT /api/podcasts/:id - Update a podcast
router.put('/:id', getPodcast, async (req, res) => {
  if (req.body.title != null) {
    res.podcast.title = req.body.title;
  }
  if (req.body.description != null) {
    res.podcast.description = req.body.description;
  }
  try {
    const updatedPodcast = await res.podcast.save();
    res.json(updatedPodcast);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/podcasts/:id - Delete a podcast
router.delete('/:id', getPodcast, async (req, res) => {
  try {
    await res.podcast.remove();
    res.json({ message: 'Podcast deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get podcast by ID
async function getPodcast(req, res, next) {
  let podcast;
  try {
    podcast = await Podcast.findById(req.params.id);
    if (podcast == null) {
      return res.status(404).json({ message: 'Cannot find podcast' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.podcast = podcast;
  next();
}

module.exports = router;
