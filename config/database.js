const mongoose = require('mongoose');
const express = require('express');
const app = express();
const connectDB = async () => {
  try {
    console.log(process.env.DB_STRING);
    const conn = await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(
      app.listen(process.env.PORT, ()=> {
        console.log('listening')
        console.log(`Server is running on port ${process.env.PORT}`);
      })
    )
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err) {
    console.log('There it is')
    console.error(err)
    process.exit(1)
  }
}

module.exports = connectDB;
