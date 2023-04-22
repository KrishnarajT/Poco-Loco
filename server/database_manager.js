// file for managing all transactions with the database.
const mysql = require("mysql");


class DatabaseManager {
	constructor() {
		this.connection = mysql.createConnection({
			host: "35.200.182.124",
			user: "Admin",
			password: "4123",
			database: "Poco-Loco-db",
		});
		this.connect();
		this.query_result = null;
	}
	connect() {
		this.connection.connect(function (err) {
			if (err) {
				console.log("Error connecting");
				console.log(err);
				return;
			}
			console.log("Connected to GCS!");
		});
	}

	test() {
		console.log("Testing");

		const query_result = this.executeQuery("select * from user_login").then(
			(result) => {
				// console.log(result);
				return result;
			},
			(err) => {
				console.log(err);
				return err;
			}
		);
		return query_result;
	}

	executeQuery(query) {
		return new Promise((resolve, reject) =>
			this.connection.query(query, function (err, result) {
				if (err) {
					console.log("Error executing query");
					console.log(err);
					return reject(err);
				}
				console.log("Query executed successfully");
				resolve(result);
			})
		);
	}

	checkUser(username) {
		console.log("Checking user");
		const query = `SELECT * FROM user_login WHERE user_name = '${username}'`;
		const query_result = this.executeQuery(query).then(
			(result) => {
				if (result.length == 0) {
					result["message"] = "user not found";
				} else {
					result["message"] = "user found";
				}
				return result;
			},
			(err) => {
				// say user not found
				console.log(err);
				return err;
			}
		);
		return query_result;
	}

	destructor() {
		this.connection.end();
	}
}

dbobj = new DatabaseManager();

module.exports = dbobj;
