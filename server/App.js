// creating a basic server with express and nodemon.
// using it to process the database queries.

const express = require("express");
const dbobj = require("./database_manager");
const cors = require("cors");

const app = express();

// // Using express.urlencoded middleware
// app.use(express.urlencoded({
//     extended: true
// }))
  
// // Using express.json middleware
// app.use(express.json())

// 👇️ configure CORS
app.use(cors());

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

app.post("/auth", async (request, response) => {
	console.log(request.query);
	response.send("Hello World!");
});


// app.use((req, res) => {
// 	res.json({ message: "Hey! This is your server response!" });
// });
module.exports = app;
