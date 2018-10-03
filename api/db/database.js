// config/database.js
'use strict';
const mysql = require('mysql2');

// var connection  = mysql.createPool({
//     host: '10.0.12.4',
//     user: 'brenna-dev',
//     password: 'cvPUluumzPaZW1I0',
//     database : 'market',
//   });

  var connection  = mysql.createPool({
    host: '10.0.12.4',
    user: 'progress-dev',
    password: 'c14g529$Wx1rJNcl%THV',
    database : 'progress',
  });
module.exports = connection;
