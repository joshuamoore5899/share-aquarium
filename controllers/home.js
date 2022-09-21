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
  filterHome: async (req, res) => {
    let date = new Date().toLocaleDateString()
    let month = date.slice(0, date.indexOf('/'));
    if (month < 10) {
      month = `0${month}`;
    }
    let day = date.slice(date.indexOf('/') + 1, date.lastIndexOf('/'));
    if (day < 10) {
      day = `0${day}`;
    }
    let year = date.slice(date.lastIndexOf('/') + 1, date.length);
    if (req.body.filterDate === 'all') {
      date = '2000-01-01'
    }
    else if (req.body.filterDate === 'year') {
      year = Number(year) - 1;
      date = `${year}-${month}-${day}`;
    }
    else if (req.body.filterDate === '3months') {
      month = Number(month) - 3;
      if (Number(month) < 1) {
        year = Number(year) - 1;
        month = 12 + Number(month);
      }
      date = `${year}-${month}-${day}`;
    }
    else if (req.body.filterDate === '1month') {
      month = Number(month) - 1;
      if (Number(month) < 1) {
        year = Number(year) - 1;
        month = 12 + Number(month);
      }
      date = `${year}-${month}-${day}`;
    }
    else if (req.body.filterDate === '1week') {
      day = Number(day) - 7;
      if (Number(day) < 1) {
        month = Number(month) - 1;
        if (Number(month) < 1) {
          year = Number(year) - 1;
          month = 12 + Number(month);
        }
        day = 30 + Number(day);
      }
      date = `${year}-${month}-${day}`;
    }
    else if (req.body.filterDate === '24hours') {
      day = Number(day) - 1;
      if (Number(day) < 1) {
        month = Number(month) - 1;
        if (Number(month) < 1) {
          year = Number(year) - 1;
          month = 12 + Number(month);
        }
        day = 30 + Number(day);
      }
      date = `${year}-${month}-${day}`;
    }
    let waterType = "";
    if (req.body.filterWaterType === 'fresh') {
      waterType = 'fresh';
    }
    else if (req.body.filterWaterType === 'salt') {
      waterType = 'salt';
    }
    let aquariums;
    if (waterType.length > 1) {
      aquariums = await Aquarium.find({
        waterType: waterType,
        dateCreated: { $gte: date },
      }).lean()
    }
    else {
      aquariums = await Aquarium.find({
        dateCreated: { $gte: date },
      }).lean()
    }
    res.render('index.ejs', { aquariums: aquariums });
  },
  addLike: async (req, res)=> {
    try {
      const aquarium = await Aquarium.findOne({_id:req.body.itemID}).lean();
      let array = aquarium.liked;
      let numberOfLikes = aquarium.likes;
      if (array.includes(req.user.id)) {
        numberOfLikes--;
        let start = array.slice(0, array.indexOf(req.user.id));
        let end = array.slice(array.indexOf(req.user.id) + 1, array.length);
        array = start.concat(end);
      }
      else {
        array.push(req.user.id);
        numberOfLikes = aquarium.likes + 1;
      }
      await Aquarium.findOneAndUpdate({_id:req.body.itemID},{
        likes: numberOfLikes,
        liked: array,
      })
      res.json('Added Like');
    }
    catch(err) {
      console.error(err);
    }
  },
}
