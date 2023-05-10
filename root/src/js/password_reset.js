// this file will be sending the new password to the server. That marks the end of our forgot password flow.

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


// First get stuff from the DOM
const password = document.getElementById("password");
const confirmation_password = document.getElementById("c_password");
const email = document.getElementById("email");
const otp = document.getElementById("otp");
const submit_button = document.getElementById("submit_button");
const comment = document.getElementById("comment");

let checker = [false, false, false, false];
base_url = "http://localhost:3000";

// check password validity
password.addEventListener("input", () => {
	if (password.value.length < 8) {
		comment.innerHTML = "Password must be atleast 8 characters long!";
		checker[0] = false;
	} else if (password.value.length > 30) {
		comment.innerHTML = "Password must not exceed 30 characters!";
	} else {
		comment.innerHTML = "Enter the Passwords!";
		checker[0] = true;
	}
});

// check password confirmation validity
confirmation_password.addEventListener("input", () => {
	if (confirmation_password.value != password.value) {
		comment.innerHTML = "Passwords do not match!";
		checker[1] = false;
	} else {
		comment.innerHTML = "Enter the Passwords!";
		checker[1] = true;
	}
});

// check password confirmation validity
otp.addEventListener("input", () => {
	if (otp.value.length != 6) {
		comment.innerHTML = "OTP must be 6 characters long!";
		checker[2] = false;
	} else {
		comment.innerHTML = "Enter the Passwords!";
		checker[2] = true;
	}
});

email.addEventListener("input", () => {
	if (email.value.includes(" ")) {
		comment.innerHTML = "Email must not contain spaces!";
		checker[3] = false;
	} else if (email.value.includes("~`!#$%^&*()+=[]{}\\|;:'\",<>/?")) {
		comment.innerHTML = "Email must not contain special characters!";
		checker[3] = false;
	} else {
		comment.innerHTML = "Enter the Passwords!";
		checker[3] = true;
	}
});

// send the new password to the server
submit_button.addEventListener("click", async () => {
	console.log(checker)
    if (checker[0] && checker[1] && checker[2] && checker[3]) {
		// generate a random salt
		const salt = generateSalt(10);
		// hash the password
        const pass_hash = new Hashes.SHA1().b64(password.value + salt);
        
		// send the data to the server
		const response = await axios
			.post(
				`${base_url}/reset_password`,
				{},
				{
                    params: {
                        user_otp : otp.value,
						user_salt: salt,
						user_hash: pass_hash,
						user_email: email.value,
					},
				}
			)
			.then((response) => {
				return response;
			})
			.catch((error) => {
				console.error(error);
				alert("server not running! A simulated response is sent!");
				const response = {
					data: {
						message: "password reset successful",
					},
				};
				return response;
			});

		// check if the user exists in the database
		if (response.data.message == "password reset successful") {
			console.log("changed password");
			comment.innerHTML = "Your Password Reset was Successful!";
			// redirect to login page
			setTimeout(() => {
				window.location = "./login.html";
			}, 3000);
		} else if (response.data.message == "user not found") {
			comment.innerHTML = "User not found!";
		} else if (response.data.message == "otp invalid") {
			comment.innerHTML = "OTP not verified!";
		}
		else {
			comment.innerHTML = "Something went wrong! Call the Devs!";
			alert("Something went wrong! Call the Devs!");
		}
	}
});
