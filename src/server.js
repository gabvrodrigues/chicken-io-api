require('dotenv/config');
var cors = require('cors')
const express = require('express');
const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

require('./routes/index')(app);
app.listen(process.env.PORT || 3000);

module.exports = app;