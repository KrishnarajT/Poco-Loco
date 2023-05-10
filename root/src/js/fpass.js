// this file creates a uuid for the forgot password link
// and then sends an email to the user with the link

function create_otp() {
	// create a 6 digit otp on random. 
	// this otp will be sent to the user's email
	let otp = "";
	for (let i = 0; i < 6; i++) {
		otp += Math.floor(Math.random() * 10);
	}
	return otp;
}

// get things from the DOM
const comment = document.getElementById("comment");
const email = document.getElementById("email");
const fpass_button = document.getElementById("fpass_button");
let checker = false;
base_url = "http://localhost:3000";

// if the email is valid
email.addEventListener("keyup", () => {
	if (email.value.includes(" ")) {
		comment.innerHTML = "Email must not contain spaces!";
		checker = false;
	} else if (email.value.includes("~`!#$%^&*()+=[]{}\\|;:'\",<>/?")) {
		comment.innerHTML = "Email must not contain special characters!";
		checker = false;
	} else {
		comment.innerHTML = "Enter your credentials to Signup!";
		checker = true;
	}
});

fpass_button.addEventListener("click", async () => {
	// check if the email is valid
	if (checker) {
		const otp = await create_otp();
		// check if user email exists in db
		// send the data to the server
		const response = await axios
			.post(
				`${base_url}/send_email`,
				{},
				{
					params: {
						user_email: email.value,
						user_otp : otp,
					},
				}
			)
			.then((response) => {
				return response;
			})
			.catch((error) => {
				console.error(error);
				alert("server not running! a Response will be Simulated");
				const response = {
					data: {
						message: "email sent",
					},
				};
				return response;
			});

		// check if the user exists in the database
		if (response.data.message == "email sent") {
			console.log("email sent");
			comment.innerHTML = "Simualated Email Sent to your email address!";
			// redirect to login page
			setTimeout(() => {
				window.location = "./reset_pass.html";
			}, 3000);
		} else if (response.data.message == "email not sent") {
			comment.innerHTML = "Email Doesnt Exist in our Database!";
		} else {
			comment.innerHTML = "Something went wrong! Call the Devs!";
			alert("Something went wrong! Call the Devs!");
		}
	}
});
