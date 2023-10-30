const mysql = require('mysql2');

const connUri = {
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
};

const pool = mysql.createPool(connUri).promise();

const getPlayers = async () => {
	const [rows] = await pool.query('SELECT * FROM players');
	return rows;
};

let players;
(async () => {
	players = await getPlayers();
	console.log(players);
})();
console.log(players);
