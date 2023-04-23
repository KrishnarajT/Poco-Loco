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

const salt = "Fbc%%23Oyh1w";
console.log(salt);
let password = 'asdf';
const pass_hash = new Hashes.SHA1().b64(
	password + salt
);
console.log(pass_hash);
