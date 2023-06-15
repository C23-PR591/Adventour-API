const express = require('express');
const router = express.Router();
const { signup, signin, getDataUser } = require('../app/api/auth/controller');
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

const multer = require('multer');
const { showRecommend } = require('../app/api/rekomendasi/controller');
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // Batasan ukuran file 5 MB
  },
});

// User
router.post('/auth/signup', signup);
router.post('/auth/signin', signin);
router.get('/auth/user', getDataUser);

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

// rekomendasi

router.get('/recommendation', auth, showRecommend);

module.exports = router;
