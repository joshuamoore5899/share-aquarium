const Aquarium = require('../models/Aquarium')

module.exports = {

  getNew: async (req, res) => {
    let aquariums = await Aquarium.find().sort({dateCreated: 'desc'}).lean();
    res.render('index.ejs', { aquariums: aquariums });
  },
  filterHome: async (req, res) => {

    //get current date
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

    //get date to compare based off of current date and input date
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

    //determine water type
    let waterType = "";
    if (req.body.filterWaterType === 'fresh') {
      waterType = 'fresh';
    }
    else if (req.body.filterWaterType === 'salt') {
      waterType = 'salt';
    }

    let aquariums;

    //divide based on sort criteria and get aquarium that matches requirements
    if (req.body.selectSortBy === 'new') {
      if (waterType.length > 1) {
        if (req.body.filterFish !== 'all') {
          console.log('there')
          aquariums = await Aquarium.find({
            waterType: waterType,
            dateCreated: { $gte: date },
          }).find({ fish: req.body.filterFish }).sort({ dateCreated: 'desc' }).lean()
        }
        else {
          aquariums = await Aquarium.find({
            waterType: waterType,
            dateCreated: { $gte: date },
          }).sort({ dateCreated: 'desc' }).lean()
        }

      }
      else {
        if (req.body.filterFish !== 'all') {
          console.log('here')
          aquariums = await Aquarium.find({
            dateCreated: { $gte: date },
          }).find({ fish: req.body.filterFish }).sort({ dateCreated: 'desc' }).lean()
        }
        else {
          aquariums = await Aquarium.find({
            dateCreated: { $gte: date },
          }).sort({ dateCreated: 'desc' }).lean()
        }
      }
    }
    else if (req.body.selectSortBy === 'old') {
      if (waterType.length > 1) {
        if (req.body.filterFish !== 'all') {
          console.log('there')
          aquariums = await Aquarium.find({
            waterType: waterType,
            dateCreated: { $gte: date },
          }).find({ fish: req.body.filterFish }).sort({ dateCreated: 'asc' }).lean()
        }
        else {
          aquariums = await Aquarium.find({
            waterType: waterType,
            dateCreated: { $gte: date },
          }).sort({ dateCreated: 'asc' }).lean()
        }

      }
      else {
        if (req.body.filterFish !== 'all') {
          console.log('here')
          aquariums = await Aquarium.find({
            dateCreated: { $gte: date },
          }).find({ fish: req.body.filterFish }).sort({ dateCreated: 'asc' }).lean()
        }
        else {
          aquariums = await Aquarium.find({
            dateCreated: { $gte: date },
          }).sort({ dateCreated: 'asc' }).lean()
        }
      }
    }
    else if (req.body.selectSortBy === 'liked') {
      if (waterType.length > 1) {
        if (req.body.filterFish !== 'all') {
          console.log('there')
          aquariums = await Aquarium.find({
            waterType: waterType,
            dateCreated: { $gte: date },
          }).find({ fish: req.body.filterFish }).sort({ likes: 'desc' }).lean()
        }
        else {
          aquariums = await Aquarium.find({
            waterType: waterType,
            dateCreated: { $gte: date },
          }).sort({ likes: 'desc' }).lean()
        }

      }
      else {
        if (req.body.filterFish !== 'all') {
          console.log('here')
          aquariums = await Aquarium.find({
            dateCreated: { $gte: date },
          }).find({ fish: req.body.filterFish }).sort({ likes: 'desc' }).lean()
        }
        else {
          aquariums = await Aquarium.find({
            dateCreated: { $gte: date },
          }).sort({ likes: 'desc' }).lean()
        }
      }
    }
    else if (req.body.selectSortBy === 'big') {
      if (waterType.length > 1) {
        if (req.body.filterFish !== 'all') {
          console.log('there')
          aquariums = await Aquarium.find({
            waterType: waterType,
            dateCreated: { $gte: date },
          }).find({ fish: req.body.filterFish }).sort({ trueSize: 'desc' }).lean()
        }
        else {
          aquariums = await Aquarium.find({
            waterType: waterType,
            dateCreated: { $gte: date },
          }).sort({ trueSize: 'desc' }).lean()
        }

      }
      else {
        if (req.body.filterFish !== 'all') {
          console.log('here')
          aquariums = await Aquarium.find({
            dateCreated: { $gte: date },
          }).find({ fish: req.body.filterFish }).sort({ trueSize: 'desc' }).lean()
        }
        else {
          aquariums = await Aquarium.find({
            dateCreated: { $gte: date },
          }).sort({ trueSize: 'desc' }).lean()
        }
      }
    }
    else if (req.body.selectSortBy === 'small') {
      if (waterType.length > 1) {
        if (req.body.filterFish !== 'all') {
          console.log('there')
          aquariums = await Aquarium.find({
            waterType: waterType,
            dateCreated: { $gte: date },
          }).find({ fish: req.body.filterFish }).sort({ trueSize: 'asc' }).lean()
        }
        else {
          aquariums = await Aquarium.find({
            waterType: waterType,
            dateCreated: { $gte: date },
          }).sort({ trueSize: 'asc' }).lean()
        }

      }
      else {
        if (req.body.filterFish !== 'all') {
          console.log('here')
          aquariums = await Aquarium.find({
            dateCreated: { $gte: date },
          }).find({ fish: req.body.filterFish }).sort({ trueSize: 'asc' }).lean()
        }
        else {
          aquariums = await Aquarium.find({
            dateCreated: { $gte: date },
          }).sort({ trueSize: 'asc' }).lean()
        }
      }
    }

    //render page based on filter criteria
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
