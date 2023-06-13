const { gunung, story } = require('../../db/models');
const { Storage } = require('@google-cloud/storage');
const path = require('path');
const serviceKey = path.join(
  __dirname,
  '../../../middleware/service-account-key/capstone-project-387109-5e2aadb14f5e.json'
);

const storage = new Storage({
  projectId: 'capstone-project-387109',
  keyFilename: serviceKey,
});
const bucketName = 'adventour-storage';
const bucket = storage.bucket(bucketName);
const folderName = 'img-story'; //nama-folder

module.exports = {
  getAllStory: async (req, res, next) => {
    try {
      const Story = await story.findAll({
        where: {
          user: req.user.id,
        },
      });

      res.status(200).json({
        message: 'Success get All My Story',
        data: Story,
      });
    } catch (error) {
      next(error);
    }
  },
  getStoryById: async (req, res, next) => {
    try {
      const { id } = req.params;

      const Story = await story.findOne({ where: { id } });

      res.status(200).json({
        message: 'Success get this story',
        data: Story,
      });
    } catch (error) {
      next(error);
    }
  },
  addNewStory: async (req, res) => {
    try {
      const { caption, gunungId } = req.body;

      const file = req.file;

      // Buat nama file yang unik
      // const fileName = `${Date.now()}-${file.originalname}`;

      // Upload file ke Cloud Storage      
      const destination = `${folderName}/${Date.now()}-${file.originalname}`;
      const blob = bucket.file(destination);

      const blobStream = blob.createWriteStream();
      blobStream.on('error', (error) => {
        console.error(error);
        res.status(500).json({ message: 'Failed to upload image' });
      });
      blobStream.on('finish', async () => {
        // Simpan data posting ke database
        const posting = await story.create({
          userId: req.user.id,
          caption,
          gunungId,
          photoUrl: `https://storage.googleapis.com/${bucketName}/${folderName}/${destination}`,
        });

        res.status(201).json({
          message: 'Data posting berhasil disimpan',
          data: posting,
        });
      });
      blobStream.end(file.buffer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  },
  getDataLocationGunung: async (req, res) => {
    try {
      const Gunung = await gunung.findAll({
        attributes: ['nama', 'lokasi'],
      });

      res.status(200).json({
        message: 'Success get Data Name and Location',
        data: Gunung,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
  },
};
