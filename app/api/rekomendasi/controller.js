const { gunung } = require('../../db/models');

module.exports = {
  showRecommend: async (req, res) => {
    try {
      const user_id = req.user.id;
      const age = req.user.umur;
      const gender = req.user.jenisKelamin;
      const level = req.user.level;

      try {
        const response = await axios.post('https://deploy-model-adventour-yp6f7ehf5q-et.a.run.app/predict', {
          user_id,
          age,
          gender,
          level,
        });

        console.log(response);

        // const resultRecommendation = response.data;

        const recommendedIds = response.data.res; // Ambil id gunung yang direkomendasikan dari respons FastAPI

        // Mengambil data gunung berdasarkan daftar ID
        const mountains = await gunung.findAll({
          where: {
            id: recommendedIds,
          },
        });

        res.status(200).json({
          message: 'success get data recommen',
          data: mountains,
        });
      } catch (error) {
        console.error('Error retrieving recommendations from FastAPI:', error);
        res.status(500).json({ message: 'Error retrieving recommendations from FastAPI' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
  },
};
