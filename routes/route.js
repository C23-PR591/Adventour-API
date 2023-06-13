const express = require('express');
const router = express.Router();
const { signup, signin } = require('../app/api/auth/controller');
const {
  getAllGunung,
  searchGunung,
  getGunungById,
  addDataGunung,
  getGunungJawaBarat,
  getGunungJawaTengah,
  getGunungJawaTimur,
} = require('../app/api/gunung/controller');
const { userFeedback, getAllFeedBasedOnGunung, getAllFeedback } = require('../app/api/feedback/controller');
const { auth } = require('../middleware/auth');
const { getAllStory, getStoryById, addNewStory } = require('../app/api/story/controller');
const { uploadFile } = require('../middleware/cloudStorage');

const multer = require('multer');
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // Batasan ukuran file 5 MB
  },
});

// User
router.post('/auth/signup', signup);
router.post('/auth/signin', signin);

// Gunung
router.get('/gunung', getAllGunung);
router.get('/gunung/jawa-barat', getGunungJawaBarat);
router.get('/gunung/jawa-tengah', getGunungJawaTengah);
router.get('/gunung/jawa-timur', getGunungJawaTimur);
router.get('/gunung/:id', getGunungById);
router.get('/gunung/search', searchGunung);
router.post('/gunung/add', addDataGunung);

// Rating
router.post('/feedback', auth, userFeedback);
router.get('/feedback', getAllFeedback);
router.get('/feedback/:gunungId', getAllFeedBasedOnGunung);

// Story
router.get('/story', auth, getAllStory);
router.get('/story/:id', getStoryById);
router.post('/story/add', auth, upload.single('photoUrl'), addNewStory);

module.exports = router;
