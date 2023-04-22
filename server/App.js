// creating a basic server with express and nodemon.
// using it to process the database queries.

const express = require("express");
const dbobj = require("./database_manager");

const app = express();

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.get("/about", (request, response) => {
	response.send("<h1>About</h1>");
});

app.get("/test", async (request, response) => {
	const result = await dbobj.test();
	console.log('from the app.js file')
	console.log(result);
	response.send(result);
});

// app.use((req, res) => {
// 	res.json({ message: "Hey! This is your server response!" });
// });
module.exports = app;
