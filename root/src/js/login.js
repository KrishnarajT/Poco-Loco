// import dbobj from "../../../server/database_manager.js";

// check if the credentials are correct
const comment = document.getElementById("comment");

// checkbox
const remember_text = document.getElementById("remember");
const remember = document.getElementById("remember_checkbox");

// check the checkbox
remember.checked = true;
setInterval(() => {
	if (remember.checked == false) {
		remember.checked = true;
	}
}, 2000);

let i = 0;
const remember_me_lyrics = [
	"<span style='color:#e78345'>Remember me</span>",
	"Though I have to say <span style='color:#e78345'>goodbye</span>",
	"<span style='color:#e78345'>Remember me</span>",
	"Don't let it make you <span style='color:#e78345'>cry</span>",
	"For even if I'm <span style='color:#e78345'>far away</span> I hold you in <span style='color:#e78345'>my heart</span>",
	"I sing a secret song to you <span style='color:#e78345'>each night we are apart</span>",
	"<span style='color:#e78345'>Remember me</span>",
	"Though I have to travel far",
	"<span style='color:#e78345'>Remember me</span>",
	"Each time you hear a sad guitar",
	"Know that <span style='color:#e78345'>I'm with you</span> the only way that I can be",
	"Until you're <span style='color:#e78345'>in my arms</span> again",
	"<span style='color:#e78345'>Remember me</span>",
	"<span style='color:#e78345'>Remember me</span>",
	"Though I have to say <span style='color:#e78345'>goodbye</span>",
	"<span style='color:#e78345'>Remember me</span>",
	"Don't let it make you <span style='color:#e78345'>cry</span>",
	"For even if I'm <span style='color:#e78345'>far away</span> I hold you in <span style='color:#e78345'>my heart</span>",
	"I sing a secret song to you <span style='color:#e78345'>each night we are apart</span>",
	"<span style='color:#e78345'>Remember me</span>",
	"For I will soon be <span style='color:#e78345'>gone</span>",
	"<span style='color:#e78345'>Remember me</span>",
	"And let the <span style='color:#e78345'>love we have</span> live on",
	"And Know that <span style='color:#e78345'>I'm with you</span> the only way that I can be",
	"Until you're <span style='color:#e78345'>in my arms</span> again",
	"<span style='color:#e78345'>Remember me</span>",
	"If you close your eyes and let the music play",
	"Keep our love alive, I'll never fade away",
	"Remember me, for I will soon be <span style='color:#e78345'>gone</span>",
	"<span style='color:#e78345'>Remember me</span>",
	"Remember me, and let the <span style='color:#e78345'>love we have</span> live on",
	"And Know that <span style='color:#e78345'>I'm with you</span> the only way that I can be",
	"Until you're <span style='color:#e78345'>in my arms</span> again",
	"<span style='color:#e78345'>Remember me</span>",
];

// Play the lyrics to remember me
setInterval(() => {
	remember_text.innerHTML = remember_me_lyrics[i];
	remember_text.style.opacity = 1;
	i++;
	setTimeout(() => {
		remember_text.style.opacity = 0;
	}, 2500);
	if (i == remember_me_lyrics.length) i = 0;
}, 3000);

function check() {
	console.log("checking credentials");
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;

	// log everything
	console.log("email: " + email);
	console.log("password: " + password);

	// check if the user exists in the database
	if (dbobj.checkUser(username) == true) {
		// check if the password is correct
		if (dbobj.checkPassword(username, password) == true) {
			// redirect to the home page
			window.location = "./home_page.html"; // Redirecting to other page.
		} else {
			comment.innerHTML = "Invalid Credentials! Try Again or Sign Up!";
			alert("Invalid credentials");
		}
	} else {
		comment.innerHTML = "User Doesnt Exist! Try Again or Sign Up!";
	}

	// if (email == "admin" && password == "admin") {
	// 	window.location = "./home_page.html"; // Redirecting to other page.

	// 	return false;
	// } else {
	// 	comment.innerHTML = "Invalid Credentials! Try Again or Sign Up!";
	// 	alert("Invalid credentials");
	// }
}
