const { Sequelize, DataTypes } = require('sequelize');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const sequelize = new Sequelize('homework', 'user', 'secret', {
	host: 'homework-db',
	dialect: 'postgres',
});

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

	app.use(cors());
	app.use(bodyParser());

	app.get('/', (req, res) => {
		res.send('Hello World!');
	});

	app.get('/users', async (req, res) => {
		res.json(await User.findAndCountAll());
	});

	app.post('/users', async (req, res) => {
		const newUser = await User.create({
			...req.body,
			avatarUrl: `https://i.pravatar.cc/150?u=${uuidv4()}`
		});

		res.json(newUser);
	});

	app.patch('/users/:id', async (req, res) => {
		await User.update(
			req.body,
			{
				where: {
					id: req.params.id,
				},
			},
		);

		res.json(await User.findByPk(req.params.id));
	});

	app.delete('/users/:id', async (req, res) => {
		res.json(await User.destroy({ where: { id: req.params.id } }));
	});

	app.listen(PORT, HOST, () => {
		console.log(`Example app listening at http://localhost:${PORT}`);
	});
})();
