const { user } = require('../../db/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  signup: async (req, res, next) => {
    try {
      const { nama, jenisKelamin, umur, domisili, pengalaman, email, password, confirmPassword } = req.body;

      if (password !== confirmPassword) {
        res.status(403).json({ message: "Password and confirm password doesn't match" });
      }

      const checkEmail = await user.findOne({ where: { email: email } });
      if (checkEmail) {
        return res.status(403).json({ message: 'Email Registered' });
      }

      const User = await user.create({
        nama,
        jenisKelamin,
        umur,
        domisili,
        pengalaman,
        email,
        password: bcrypt.hashSync(password, 10),
      });
      //   console.log(user);

      delete User.dataValues.password;

      res.status(201).json({
        message: 'Success SignUp',
        data: User,
      });
    } catch (error) {
      next(error);
    }
  },
  signin: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const checkUser = await user.findOne({ where: { email: email } });
      //   Cek email apakah email yang dimasukkan sama dengan yang ada di database
      if (checkUser) {
        const checkPassword = bcrypt.compareSync(password, checkUser.password);

        // cek password apakah yang dimasukkan sama dengan yang ada di database
        if (checkPassword) {
          const token = jwt.sign(
            {
              user: {
                id: checkUser.id,
                name: checkUser.nama,
                email: checkUser.email,
                jenisKelamin: checkUser.jenisKelamin,
                umur: checkUser.umur,
                domisili: checkUser.domisili,
                pengalaman: checkUser.pengalaman,
              },
            },
            'secret'
          );
          res.status(200).json({ message: 'Success SignIn', data: token });
        } else {
          // pesan jika password salah
          res.status(404).json({ message: 'Invalid password' });
        }
      } else {
        // pesan jika email salah diinput
        res.status(403).json({ message: 'Invalid Email' });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
