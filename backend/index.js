const express = require('express');
const { PORT } = require('./config/index');
const router = require('./routes/index');
const cors = require('cors');
const dbConnect = require('./database/mongodbConnect');
const app = express();
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');

// middleware for connecting frontend and backend
app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use('/', router);

// connect to mongo
dbConnect();

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));