const express = require('express');
const { PORT } = require('./config/index');
const router = require('./routes/index');
const cors = require('cors');
const dbConnect = require('./database/mongodbConnect');
const app = express();
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');

app.use(cookieParser());

// middleware for connecting frontend and backend
app.use(
    cors({
      origin: function (origin, callback) {
        return callback(null, true);
      },
      optionsSuccessStatus: 200,
      credentials: true,
    })
);

app.use(express.json({ limit: "50mb" }));

app.use('/', router);

// connect to mongo
dbConnect();

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));