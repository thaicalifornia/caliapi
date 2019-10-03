const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

// MONGO_URI=mongodb://localhost/cali
{ useUnifiedTopology:true }
mongoose.connect(process.env.MONGO_URI,{ useUnifiedTopology: true, 
  useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log('BB connected..'));
mongoose.connection.on('error', err => {
  console.log(`DB connecting error ${err.message}`);
})

const postRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

// may be not need 
app.get('/api', (req,res) => {
  fs.readFile('docs/apiDocs.json', (err, data) => {
    if(err){
      res.status(400).json({
        error: err
      })
    }
    const docs = JSON.parse(data);
    res.json(docs);
  })
})

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use("/api", postRoutes);
app.use("/api", authRoutes);
app.use("/api", userRoutes)

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({error: 'Unauthorized!'});
  }
});

const PORT = 5000;
app.listen(PORT, function() { console.log(`Running on port ${PORT}`)});
