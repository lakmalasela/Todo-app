require('dotenv').config();
const express = require("express");
var bodyParser = require("body-parser");
const mongoose = require('mongoose');
const User = require('./src/model/user');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3000;



app.use(cors());

app.use(bodyParser.json());

const routes = require('./src/controllers/index');
routes.forEach(([name,handler]) => app.use(`/${name}`,handler));

app.use(bodyParser.urlencoded({ extended: false }));


const connectionURI = process.env.MONGO_URI;
mongoose.connect(connectionURI);
// mongoose.connect(connectionURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }); 
//established the connection

//check the if have any error
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('DB Connected');

});




app.listen(port, () => {
    console.log("Server Started");
  });

