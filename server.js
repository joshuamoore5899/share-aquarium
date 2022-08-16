const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8000;
require('dotenv').config()
const Aquarium = require('./model/Aquarium');


let db,     //adding db variables, especially DB_STRING which is found in .env to connect to mongo
    dbName = 'shareAquarium'

mongoose.connect(process.env.DB_STRING, { useUnifiedTopology: true })  //connecting to db
    .then(client => {
        console.log(`Connected to ${dbName} Database`);
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())



app.get('/', async (req, res)=> {
  const aquariums = await Aquarium.find().sort({dateCreated: 'desc'}).lean();
  res.render('index.ejs', { aquariums: aquariums })
  // res.sendFile(__dirname + '/index.html');
})


app.post('/shareAquarium', async (req, res)=> {
  try {
    const aquarium = await Aquarium.create({
      name: req.body.fname,
      waterType: req.body.waterType,
      tankSize: req.body.quantity[0],
      description: req.body.description,
      fish: req.body.fish,
      likes: 0,
      inspired: 0,
    });
    res.redirect('/');
  } catch (err) {
    console.error(err)
  }
})




app.listen(PORT, ()=> {
  console.log(`Server is running on port ${PORT}`);
})
