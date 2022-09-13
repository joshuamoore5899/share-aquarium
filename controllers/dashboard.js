const Aquarium = require('../models/Aquarium');

module.exports = {
  getDashboard: async (req, res) => {
    try {
      const aquariums = await Aquarium.find({ user: req.user.id });
      res.render('dashboard.ejs', { aquariums: aquariums, user: req.user})
    } catch (e) {
      console.error(e);
    }
  },
  shareAquarium: async (req, res)=> {
    try {
      let tankSize;
      let measurementType;
      let trueSize;
      let gallonsToLiters = Number(req.body.quantity[0]) * 3.78541;
      let liters = Number(req.body.quantity[1]);
      if (gallonsToLiters >= liters) {
        tankSize = Number(req.body.quantity[0]);
        measurementType = 'gallons';
        trueSize = Number(req.body.quantity[0]) * 3.78541;
      }
      else {
        tankSize = Number(req.body.quantity[1]);
        measurementType = 'liters';
        trueSize = Number(req.body.quantity[1]);
      }
      const aquarium = await Aquarium.create({
        name: req.body.fname,
        waterType: req.body.waterType,
        tankSize: tankSize,
        trueSize: trueSize,
        measurementType: measurementType,
        images: req.body.myFile,
        description: req.body.description,
        fish: req.body.fish,
        likes: 0,
        inspired: 0,
        user: req.user.id,
      });
      res.redirect('/dashboard');
    } catch (err) {
      console.error(err)
    }
  },
}
