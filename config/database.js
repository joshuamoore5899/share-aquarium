const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    console.log(process.env.DB_STRING);
    const conn = await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

module.exports = connectDB;
