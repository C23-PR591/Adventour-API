const { gunung } = require('../../db/models');
const { Op } = require('sequelize');

module.exports = {
  getAllGunung: async (req, res, next) => {
    try {
      const Gunung = await gunung.findAll();

      res.status(200).json({
        message: 'Success Data gunung',
        data: Gunung,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
  },
  searchGunungByName: async (req, res, next) => {
    try {
      const { keyword } = req.query;

      const Gunung = await gunung.findAll({
        where: {
          nama: {
            [Op.like]: `%${keyword}%`,
          },
        },
      });

      res.status(200).json({
        message: 'Success Data gunung',
        data: Gunung,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
  },
  getGunungJawaBarat: async (req, res) => {
    try {
      const result = await gunung.findAll({
        where: {
          daerah: 'Jawa Barat',
        },
      });

      res.status(200).json({
        message: 'Data gunung Jawa Barat',
        data: result,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
  },
  getGunungJawaTengah: async (req, res) => {
    try {
      const result = await gunung.findAll({
        where: {
          daerah: 'Jawa Tengah',
        },
      });

      res.status(200).json({
        message: 'Data gunung Jawa Tengah',
        data: result,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
  },
  getGunungJawaTimur: async (req, res) => {
    try {
      const result = await gunung.findAll({
        where: {
          daerah: 'Jawa Timur',
        },
      });

      res.status(200).json({
        message: 'Data gunung Jawa Timur',
        data: result,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
  },
  getGunungById: async (req, res, next) => {
    try {
      const { id } = req.params;

      const Gunung = await gunung.findOne({ where: { id } });

      res.status(200).json({
        message: 'Success get data',
        data: Gunung,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
  },
  addDataGunung: async (req, res) => {
    try {
      const { daerah, nama, ketinggian, lokasi, trek, jalur, simaksi } = req.body;

      const Gunung = await gunung.create({ daerah, nama, ketinggian, lokasi, trek, jalur, simaksi });

      res.status(201).json({
        message: 'Berhasil tambah data Gunung',
        data: Gunung,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
  },
};
