const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;


app.get('/', (req, res)=> {
  res.sendFile(__dirname + '/index.html');
})

app.get('/style.css', (req, res)=> {
  res.sendFile(__dirname + '/style.css');
})


app.get('/main.js', (req, res)=> {
  res.sendFile(__dirname + '/main.js');
})

app.get('/share.html', (req, res)=> {
  res.sendFile(__dirname + '/share.html');
})

app.get('/images/fish1.jpg', (req, res)=> {
  res.sendFile(__dirname + '/images/fish1.jpg');
})

app.get('/images/fish.png', (req, res)=> {
  res.sendFile(__dirname + '/images/fish.png');
})

app.get('/images/fish2.jpg', (req, res)=> {
  res.sendFile(__dirname + '/images/fish2.jpg');
})

app.get('/images/fish3.jpg', (req, res)=> {
  res.sendFile(__dirname + '/images/fish3.jpg');
})




app.listen(PORT, ()=> {
  console.log(`Server is running on port ${PORT}`);
})
