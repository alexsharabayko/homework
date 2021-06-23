const { Sequelize, DataTypes } = require('sequelize');
const express = require('express');
const bodyParser = require('body-parser');

const sequelize = new Sequelize('homework', 'user', 'secret', {
	host: 'homework-db',
	dialect: 'postgres',
});

(async () => {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
})();

const User = sequelize.define('User', {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	avatarUrl: {
		type: DataTypes.TEXT,
		isUrl: true,
	},
	status: {
		type: DataTypes.ENUM,
		values: ['working', 'lunch', 'vacation', 'trip'],
		allowNull: false,
	},
}, {
	paranoid: true,
});

(async () => {
	await sequelize.sync({ force: true });
	console.log("All models were synchronized successfully.");

	const app = express();
	const PORT = 3000;
	const HOST = '0.0.0.0';

	app.use(bodyParser());

	app.get('/', (req, res) => {
		res.send('Hello World!');
	});

	app.get('/users', async (req, res) => {
		res.json(await User.findAndCountAll());
	});

	app.post('/users', async (req, res) => {
		res.json(await User.create(req.body));
	});

	app.delete('/users/:id', async (req, res) => {
		res.json(await User.destroy({ where: { id: req.params.id } }));
	});

	app.listen(PORT, HOST, () => {
		console.log(`Example app listening at http://localhost:${PORT}`);
	});
})();
