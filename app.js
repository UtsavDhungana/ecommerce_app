const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv/config');

const app = express();
const env = process.env;
const API = env.API_URL;
app.use(bodyParser.json());
app.use(morgan('tiny')); 
app.use(cors());
app.options('*',cors());

const authRouter = require('./routes/auth');

app.use(`${API}/`, authRouter);

const hostname = env.HOSTNAME;
const port = env.PORT;

mongoose.connect(env.MONGODB_CONNECTION_STRING).then(() => {
    console.log("Connected to database");
}).catch((er)=>{
    console.error(er);
});

app.listen(port,hostname,() => {
    console.log(`Server running at http://${hostname}:${port}`)
});
