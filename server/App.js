// creating a basic server with express and nodemon.
// using it to process the database queries.

const express = require("express");
const dbobj = require("./database_manager");
const cors = require("cors");
const createHttpError = require("http-errors");

const app = express();
app.use(cors());

// // Using express.urlencoded middleware
// app.use(express.urlencoded({
//     extended: true
// }))

// // Using express.json middleware
// app.use(express.json())

// 👇️ configure CORS

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.get("/about", (request, response) => {
	response.send("<h1>About</h1>");
});

app.get("/test", async (request, response) => {
	const result = await dbobj.test();
	console.log("from the app.js file");
	console.log(result);
	response.send(result);
});

app.post("/auth", async (request, response) => {
	console.log(request.query);
	// const result = await dbobj.checkUser(request.query.username);
	// console.log(result);

	// response.send("Hello World!");

	// first step would be to check if the user exists in the database
	// at the time when this function is called, the user has entered the password, and the client wants to know if the user exist.
	// if the user exists, we send the salt, and the final password hash to the client. Or else we say user not found.

	// check if the user exists in the database
	const user_fate = await dbobj.checkUser(request.query.username);
	console.log("from the app.js file");
	console.log(user_fate);
	if (user_fate.message == "user not found") {
		// send a message to the client
		response.send({ user_data: user_fate, message: user_fate.message });
	} else if (user_fate.message == "user found") {
		// send the salt and the final password hash to the client
		response.send({ user_data: user_fate, message: user_fate.message });
	} else {
		const error = new createHttpError.BadRequest("something went wrong");
		return error;
	}
});

// app.use((req, res) => {
// 	res.json({ message: "Hey! This is your server response!" });
// });
module.exports = app;
