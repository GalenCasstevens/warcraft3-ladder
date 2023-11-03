const mysql = require('mysql2');

const connUri = {
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
};
pool = mysql.createPool(connUri).promise();

module.exports = pool;
