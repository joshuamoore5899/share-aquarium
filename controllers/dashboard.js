const Aquarium = require('../models/Aquarium');
const cloudinary = require("../middleware/cloudinary");

module.exports = {
  getDashboard: async (req, res) => {
    try {
      const aquariums = await Aquarium.find({ user: req.user.id });
      const savedAquariums = await Aquarium.find({ saved: req.user.id });
      res.render('dashboard.ejs', { aquariums: aquariums, savedAquariums: savedAquariums, user: req.user});
    }
    catch (e) {
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
      let images = [];
      let imageID = [];
      for (let i = 0; i < req.files.length && i < 10; i++) {
        let result = await cloudinary.uploader.upload(req.files[i].path);
        images.push(result.secure_url);
        imageID.push(result.public_id);
      }
      const aquarium = await Aquarium.create({
        name: req.body.fname,
        waterType: req.body.waterType,
        tankSize: tankSize,
        trueSize: trueSize,
        measurementType: measurementType,
        images: images,
        cloudinaryID: imageID,
        description: req.body.description,
        fish: req.body.fish,
        likes: 0,
        user: req.user.id,
        username: req.user.userName,
      });
      res.redirect('/dashboard');
    } catch (err) {
      res.redirect('/dashboard');
      console.error(err)
    }
  },
  deleteAquarium: async (req, res) => {
    try {
      let aquarium = await Aquarium.findById({ _id: req.params.id });

      for (let i = 0; i < aquarium.images.length; i++) {
        await cloudinary.uploader.destroy(aquarium.cloudinaryID[i]);
      }
      await Aquarium.remove({ _id: req.params.id });
      res.redirect("/dashboard");
    }
    catch (err) {
      console.error(err);
      res.redirect("/dashboard");
    }
  },
  editAquarium: async (req, res) => {
    try {
      let imagesToDelete = req.body.deleteImages.split(', ');
      imagesToDelete = imagesToDelete.slice(0, imagesToDelete.length - 1);
      for (let i = 0; i < imagesToDelete.length; i++) {
        await cloudinary.uploader.destroy(imagesToDelete[i]);
      }
      let aquariumObj = await Aquarium.findById({ _id: req.params.id });
      let aquariumImages = aquariumObj.images;
      let aquariumCloudinary = aquariumObj.cloudinaryID;
      for (let i = 0; i < imagesToDelete.length; i++) {
        let index = aquariumCloudinary.indexOf(imagesToDelete[i]);
        aquariumImages.splice(index, 1);
        aquariumCloudinary.splice(index, 1);
      }
      for (let i = 0; i < req.files.length; i++) {
        if (aquariumImages.length < 10) {
          let result = await cloudinary.uploader.upload(req.files[i].path);
          aquariumImages.push(result.secure_url);
          aquariumCloudinary.push(result.public_id);
        }
      }
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
      const aquarium = await Aquarium.findOneAndUpdate(
        {_id: req.params.id },
        {
        name: req.body.fname,
        waterType: req.body.waterType,
        tankSize: tankSize,
        trueSize: trueSize,
        measurementType: measurementType,
        images: aquariumImages,
        cloudinaryID: aquariumCloudinary,
        description: req.body.description,
        fish: req.body.fish,
      });
      res.redirect('/dashboard');
    } catch (err) {
      console.error(err)
    }
  },
}
