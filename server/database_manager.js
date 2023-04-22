// file for managing all transactions with the database.
const mysql = require("mysql");

const { createHash } = require("crypto");

function hash(string) {
	return createHash("sha256").update(string).digest("hex");
}

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

		const query_result = this.executeQuery(
			"select * from lyrics_table"
		).then(
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
		const query = `SELECT * FROM user_login WHERE user_name = '${username}'`;
		const query_result = this.executeQuery(query).then(
			(result) => {
				// console.log(result);
				return result;
			},
			(err) => {
				console.log(err);
				return err;
			}
		);
		console.log("Checking if the user exists. ");
		console.log(result);
		if (query_result.length == 0) {
			return false;
		}
		return true;
	}

	checkPassword(username, password) {
		// get the salt and hash from the database
		const query = `SELECT user_salt, user_pass_hash FROM user_login WHERE user_name = '${username}'`;
		const result = this.executeQuery(query);
		console.log("Checking if the password is correct. ");
		console.log(result);
		if (result.length == 0) {
			return false;
		}
		const salt = result[0].user_salt;
		const db_hash = result[0].user_pass_hash;
		const user_hash = hash(password + salt);
		if (user_hash == db_hash) {
			return true;
		}
		return false;
	}
	destructor() {
		this.connection.end();
	}
}

dbobj = new DatabaseManager();

module.exports = dbobj;
