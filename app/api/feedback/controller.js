const { user, gunung, feedback } = require('../../db/models');

module.exports = {
  userFeedback: async (req, res, next) => {
    try {
      const { gunungId, rating, review } = req.body;

      const Rate = await feedback.create({
        rating,
        review,
        gunungId,
        userId: req.user.id,
      });
      // console.log(req.user.id);

      res.status(201).json({
        message: 'Feedback berhasil ditambahkan',
        data: Rate,
      });
    } catch (error) {
      // console.log(error);
      res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
  },
  getAllFeedback: async (req, res) => {
    try {
      const result = await feedback.findAll({
        include: [
          {
            model: gunung,
            attributes: [
              'id',
              'nama',
              'ketinggian',
              'lokasi',
              'trek',
              'jalur',
              'simaksi',
              'level',
              'rating',
              'imageUrl',
            ],
          },
          {
            model: user,
            attributes: ['id', 'nama', 'domisili'],
          },
        ],
      });

      res.status(200).json({
        nessage: 'Success gett all feedback',
        data: result,
      });
    } catch (error) {
      // console.log(error);
      res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
  },
  getAllFeedBasedOnGunung: async (req, res) => {
    const { gunungId } = req.params;
    try {
      const result = await feedback.findAll({
        where: { gunungId },
        include: [
          {
            model: gunung,
            attributes: [
              'id',
              'nama',
              'ketinggian',
              'lokasi',
              'trek',
              'jalur',
              'simaksi',
              'level',
              'rating',
              'imageUrl',
            ],
          },
          {
            model: user,
            attributes: ['id', 'nama', 'domisili'],
          },
        ],
      });

      res.status(200).json({
        message: 'success get based on Gunung Id',
        data: result,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
