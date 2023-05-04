comment = document.getElementById("comment");
comment.innerHTML = "Enter your credentials to Signup!";

username = document.getElementById("username");
password = document.getElementById("password");
confirmation_password = document.getElementById("c_password");
email = document.getElementById("email")
register = document.getElementById("register");
base_url = "http://localhost:3000";

let checker = [false, false, false, false];


// function to generate a random salt
generateSalt = function (salt_length) {
	let salt = "";
	const salt_characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
	for (let i = 0; i < salt_length; i++) {
		salt += salt_characters.charAt(
			Math.floor(Math.random() * salt_characters.length)
		);
	}
	return salt;
};

// check username validity
username.addEventListener("input", () => {
	if (username.value.length < 4) {
		comment.innerHTML = "Username must be atleast 4 characters long!";
		checker[0] = false;
	} else if (username.value.length > 20) {
		comment.innerHTML = "Username must not exceed 20 characters!";
		checker[0] = false;
	} else if (username.value.includes(" ")) {
		comment.innerHTML = "Username must not contain spaces!";
		checker[0] = false;
	} else if (username.value.includes("@")) {
		comment.innerHTML = "Username must not contain '@'!";
		checker[0] = false;
	} else if (username.value.includes("~`!#$%^&*()+=[]{}\\|;:'\",.<>/?")) {
		comment.innerHTML = "Username must not contain special characters!";
	} else {
		comment.innerHTML = "Enter your credentials to Signup!";
		checker[0] = true;
	}
});

// check password validity
password.addEventListener("input", () => {
	if (password.value.length < 8) {
		comment.innerHTML = "Password must be atleast 8 characters long!";
		checker[1] = false;
	} else if (password.value.length > 30) {
		comment.innerHTML = "Password must not exceed 30 characters!";
	} else {
		comment.innerHTML = "Enter your credentials to Signup!";
		checker[1] = true;
	}
});

// check password confirmation validity
confirmation_password.addEventListener("input", () => {
	if (confirmation_password.value != password.value) {
		comment.innerHTML = "Passwords do not match!";
	} else {
		comment.innerHTML = "Enter your credentials to Signup!";
		checker[2] = true;
	}
});

// check email validity
email.addEventListener("input", () => {
	if (email.value.includes(" ")) {
		comment.innerHTML = "Email must not contain spaces!";
		checker[3] = false;
	} else if (email.value.includes("~`!#$%^&*()+=[]{}\\|;:'\",<>/?")) {
		comment.innerHTML = "Email must not contain special characters!";
	} else {
		comment.innerHTML = "Enter your credentials to Signup!";
		checker[3] = true;
	}
});

// call a function to register the user when the register button is clicked
register.addEventListener("click", async () => {
	// check if all the fields are valid

	if (checker[0] && checker[1] && checker[2] && checker[3]) {
		// generate a random salt
		const salt = generateSalt(10);
		// hash the password
		const pass_hash = new Hashes.SHA1().b64(password.value + salt);
		// send the data to the server
		const response = await axios
			.post(
				`${base_url}/signup`,
				{},
				{
					params: {
						username: username.value,
						user_pass_hash: pass_hash,
						user_email: email.value,
						user_salt: salt,
					},
				}
			)
			.then((response) => {
				return response;
			})
			.catch((error) => {
				console.error(error);
				alert("server not running!");
				return error;
			});

		// check if the user exists in the database
		if (response.data.message == "signup successful") {
			console.log("signup successful");
			// redirect to login page
			window.location = "./login.html";
		} else if (response.data.message == "user exists") {
			comment.innerHTML = "User Already Exists!";
		} else {
			comment.innerHTML = "Something went wrong! Call the Devs!";
			alert("Something went wrong! Call the Devs!");
		}
	} else {
		comment.innerHTML = "Invalid Credentials! Try Again or Sign Up!";
	}
});

// const salt = "Fbc%%23Oyh1w";
// console.log(salt);
// let password = 'asdf';
// const pass_hash = new Hashes.SHA1().b64(
// 	password + salt
// );
// console.log(pass_hash);
