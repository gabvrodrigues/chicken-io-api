const express = require('express');

const app = express();
// const fs = require('fs')
// const morgan = require('morgan')
// const path = require('path')

// // log only 4xx and 5xx responses to console
// app.use(morgan('dev', {
//   skip: function (req, res) { return res.statusCode < 400 }
// }))

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

require('./routes/index')(app);

app.listen(3000);

module.exports = app;