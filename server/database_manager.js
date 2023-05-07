// file for managing all transactions with the database.
const { query } = require("express");
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

	// executed queries.
	// create table otp (user_id int not null, otp int not null, foreign key (user_id) references user_login(user_id));

	// create trigger clear_otps before update on user_login for each row begin delete from user_otp where user_otp.user_id = new.user_id; end;
	async test() {
		console.log("Testing");
		const query_result = await this.executeQuery(
			`select * from user_otp`
		).then(
			(result) => {
				// console.log(result);
				return JSON.parse(JSON.stringify(result));
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

	async checkUser(username) {
		console.log("Checking user");
		const query = `SELECT * FROM user_login WHERE user_name = '${username}'`;
		const query_result = await this.executeQuery(query).then(
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

	async checkUserEmail(user_email) {
		console.log("Checking user");
		const query = `SELECT * FROM user_login WHERE user_email = '${user_email}'`;
		const query_result = await this.executeQuery(query).then(
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

	async add_user(username, user_pass_hash, user_email, user_salt) {
		// calculate user id
		let user_id = await this.executeQuery(
			"select count(*) as count from user_login"
		).then((result) => {
			return result;
		});
		console.log(user_id);

		user_id = user_id[0].count + 1;
		console.log(user_id);

		// pushing to database.
		const query = `insert into user_login values(${user_id}, '${username}', '${user_email}', '${user_pass_hash}', '${user_salt}')`;
		const query_result = await this.executeQuery(query).then(
			(result) => {
				// console.log(result);
				return result;
			},
			(err) => {
				// console.log(err);
				return err;
			}
		);
		console.log("Query executed");
		console.log(query_result.sql);

		if (query_result.errno == undefined) {
			return true;
		}
		return false;
	}

	async add_otp(otp, user_id) {
		const query = `insert into user_otp(user_id, otp) values(${user_id}, ${otp})`;
		const query_result = await this.executeQuery(query).then(
			(result) => {
				console.log(result);
				return result;
			},
			(err) => {
				console.log(err);
				return err;
			}
		);
		if (query_result) {
			return true;
		}
		return false;
	}

	async verify_uuid(user_id, uuid) {
		const query = `select * from user_uuid where user_id = ${user_id} and uuid = '${uuid}'`;
		const query_result = await this.executeQuery(query).then(
			(result) => {
				console.log(result);
				return result;
			},
			(err) => {
				console.log(err);
				return err;
			}
		);
		if (query_result.length == 0) {
			return false;
		}
		return true;
	}

	// subqueries are used here. This is a nested query.
	async reset_pass(new_pass_hash, new_user_salt, user_id, otp) {
		// please keep in mind the existance of a t rigger that will delete all previous values of the user id, when you try to add another row here.

		// check if the otp is valid
		this.executeQuery(
			`select otp from user_otp where user_id = ${user_id} order by t_id desc limit 1`
		).then((result) => {
			if (result[0].otp != otp) {
				return false;
			}
		});

		const query = `update user_login set user_pass_hash = '${new_pass_hash}', user_salt = '${new_user_salt}' where user_id = ${user_id}`;

		const query_result = await this.executeQuery(query).then((result) => {
			console.log(result);
			return result;
		});
		if (query_result) {
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
