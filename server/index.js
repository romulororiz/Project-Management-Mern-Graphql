const path = require('path');
const express = require('express');
require('dotenv').config();
require('colors');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;
const app = express();

// Connect to Database
connectDB();

app.use(cors());

app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: process.env.NODE_ENV === 'development',
	})
);

// Serve frontend
if (process.env.NODE_ENV === 'production') {
	// Set build folder as static
	app.use(express.static(path.join(__dirname, '../client/build')));

	app.get('*', (req, res) => {
		res.sendFile(__dirname, '../client/build/index.html');
	});
} else {
	app.get('/', (req, res) => {
		res.status(200).json({ message: 'Welcome to the ProjectMgmt App' });
	});
}

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
