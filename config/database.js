const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    console.log('starting connection...');
    const conn = await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(
      app.listen(process.env.PORT, ()=> {
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
