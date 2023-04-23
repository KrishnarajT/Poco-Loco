// creating a basic server with express and nodemon.
// using it to process the database queries.

const express = require("express");
const dbobj = require("./database_manager");
const cors = require("cors");
const createHttpError = require("http-errors");

const app = express();
app.use(cors());

// processing get request

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

// processing post request

// login
app.post("/auth", async (request, response) => {
	console.log(request.query);

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

// signup
app.post("/signup", async (request, response) => {
	console.log(request.query);
	// check if the user exists in the database
	const user_fate = await dbobj.checkUser(request.query.username);
	console.log("from the app.js file");
	console.log(user_fate);


	if (user_fate.message == "user not found") {
		// push to database.
		const signup_result = await dbobj.add_user(
			request.query.username,
			request.query.user_pass_hash,
			request.query.user_email,
			request.query.user_salt
		);
		if (signup_result) {
			response.send({ message: "signup successful" });
		} else {
			response.send({ message: "signup failed" });
		}
	} else if (user_fate.message == "user found") {
		// send a message to the client
		response.send({ message: "user exists" });
	}
});

// forgot password
app.post("/forgot_password", async (request, response) => {
	console.log(request.query);

	// check if the user exists in the database
	const user_fate = await dbobj.checkUser(request.query.username);
	console.log("from the app.js file");
	console.log(user_fate);
	if (user_fate.message == "user not found") {
		// send a message to the client
		response.send({ message: "user not found" });
	} else if (user_fate.message == "user found") {
		// update the database.
		const forgot_password_result = await dbobj.forgot_password(
			request.query.username,
			request.query.user_pass_hash
		);
		if (forgot_password_result) {
			response.send({ message: "password updated" });
		} else {
			response.send({ message: "password update failed" });
		}
	}
});

module.exports = app;