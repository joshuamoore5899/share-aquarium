const Aquarium = require('../models/Aquarium');

module.exports = {
  getProfile: async (req, res) => {
    try {
      const aquariums = await Aquarium.find({ username: req.params.id });
      res.render('profile.ejs', { aquariums: aquariums, user: req.params.id})
    } catch (e) {
      console.error(e);
    }
  },
}
