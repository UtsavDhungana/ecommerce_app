const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv/config');

const authJwt = require('./middlewares/jwt');
const errorHandler = require('./middlewares/error_handler');

const app = express();
const env = process.env;
const API = env.API_URL;
app.use(bodyParser.json());
app.use(morgan('tiny')); 
app.use(cors());
app.options('*',cors());

app.use(authJwt());
app.use(errorHandler);

const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');


app.use(`${API}/`, authRouter);
app.use(`${API}/users`, userRouter);

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

