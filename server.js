const express = require('express');
const app = express();
const connectDB = require('./config/database');
const PORT = process.env.PORT || 8000;
require('dotenv').config({path: './config/.env'})
const Aquarium = require('./model/Aquarium');
const homeRoutes = require('./routes/home');
const shareRoutes = require('./routes/share');

connectDB();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/', homeRoutes);
app.use('/share', shareRoutes);

app.listen(PORT, ()=> {
  console.log(`Server is running on port ${PORT}`);
})
