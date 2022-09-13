const Aquarium = require('../models/Aquarium')

module.exports = {

  getNew: async (req, res) => {
    let aquariums = await Aquarium.find().sort({dateCreated: 'desc'}).lean();
    res.render('index.ejs', { aquariums: aquariums });
  },
  getOld: async (req, res) => {
    let aquariums = await Aquarium.find().sort({dateCreated: 'asc'}).lean();
    res.render('index.ejs', { aquariums: aquariums });
  },
  getLiked: async (req, res) => {
    let aquariums = await Aquarium.find().sort({likes: 'desc'}).lean();
    res.render('index.ejs', { aquariums: aquariums });
  },
  getInspired: async (req, res) => {
    let aquariums = await Aquarium.find().sort({inspired: 'desc'}).lean();
    res.render('index.ejs', { aquariums: aquariums });
  },
  getBig: async (req, res) => {
    let aquariums = await Aquarium.find().sort({trueSize: 'desc'}).lean();
    res.render('index.ejs', { aquariums: aquariums });
  },
  getSmall: async (req, res) => {
    let aquariums = await Aquarium.find().sort({trueSize: 'asc'}).lean();
    res.render('index.ejs', { aquariums: aquariums });
  },
  addLike: async (req, res)=> {
    try {
      const aquarium = await Aquarium.findOne({_id:req.body.itemID}).lean();
      let numberOfLikes = aquarium.likes + 1;
      await Aquarium.findOneAndUpdate({_id:req.body.itemID},{
        likes: numberOfLikes
      })
      res.json('Added Like');
    }
    catch(err) {
      console.error(err);
    }
  },
  addInspired: async (req, res)=> {
    try {
      const aquarium = await Aquarium.findOne({_id:req.body.itemID}).lean();
      let numberOfInspired = aquarium.inspired + 1;
      await Aquarium.findOneAndUpdate({_id:req.body.itemID},{
        inspired: numberOfInspired
      })
      res.json('Added Like');
    }
    catch(err) {
      console.error(err);
    }
  },
}
