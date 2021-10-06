// require node modules
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root', //might try leaving password as empty string to see if my sql will connect been having issues
    database: 'employee',
});

module.exports = connection; 