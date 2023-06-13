const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const path = require('path');
const serviceKey = path.join(__dirname, './service-account-key/capstone-project-387109-5e2aadb14f5e.json');

const storage = new Storage({
  projectId: 'capstone-project-387109',
  keyFilename: serviceKey,
});

const multerGoogleStorage = multer({
  storage: multer.memoryStorage(),
  dest: 'adventour-storage/img-story/',
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
}).single('photoUrl');

function uploadFile(req, res) {
  multerGoogleStorage(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err });
    }

    const bucketName = 'adventour-storage';
    const bucket = storage.bucket(bucketName);
    // const destination = 'img-story';
    const file = req.file;
    const folderName = 'img-story';
    const destination = `${folderName}/${file.originalname}`;

    const blob = bucket.file(destination);

    const blobStream = blob.createWriteStream({
      resumable: false,
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on('error', (err) => {
      console.error(err);
      return res.status(500).json({ error: err });
    });

    blobStream.on('finish', () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${destination}/${blob.name}`;
      return res.status(200).json({ url: publicUrl });
    });

    blobStream.end(file.buffer);
  });
}

module.exports = { uploadFile };
