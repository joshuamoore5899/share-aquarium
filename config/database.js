const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

//in cyclic all variable names need to be strings without the quotes

module.exports = connectDB;
