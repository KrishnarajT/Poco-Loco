const mysql = require("mysql");

const connection = mysql.createConnection({
	// host: "sql12.freemysqlhosting.net",
	// user: "sql12613035",
	// password: "ZTz3SxSQvN",
	// database: "sql12613035",
	host: "35.200.182.124",
	user: "Admin",
	password: "4123",
	database: "Poco-loco-db",
});

connection.connect(function (err) {
	if (err) {
		console.log("Error connecting");
		console.log(err)
		return;
	}
	console.log("Connected!");
	connection.query("select * from artist_table", function (err, result) {
		if (err) {
			console.log("Table does not exist");
		}
		console.log(result);
	});

	// connection.query("describe test", function (err, result) {
	// 	if (err) {
	// 		console.log("Table does not exist");
	// 	}
	// 	console.log(result);
	// });
	connection.end();
});

