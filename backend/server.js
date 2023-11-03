const express = require('express');
const path = require('path');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const db = require('./config/db');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/players', require('./routes/playerRoutes'));

db.query('SELECT 1')
	.then(() => {
		console.log(`MySQL Connected: ${process.env.MYSQL_HOST}`.cyan.underline);
		app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
	})
	.catch((err) => console.log(`Error: ${err}`.red.underline.bold));
