const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    console.log('starting connection...');
    const conn = await mongoose.connect(process.env.DB_STRING, {
      console.log('connecting...');
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err) {
    console.log('There it is')
    console.error(err)
    process.exit(1)
  }
}

module.exports = connectDB;
