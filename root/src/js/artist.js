const base_url = "http://localhost:3000";
async function set_stuff() {
	const response = await axios
		.post(
			`${base_url}/get_artist_description`,
			{},
			{
				params: {},
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
	console.log(response);
	const artist_description = document.getElementById("artist-description");
	const carousal_div = document.getElementById("car-div");
	console.log(carousal_div);
	const carousals = carousal_div.querySelectorAll("div");
	const artist_name_div = document.getElementById("artist-text");
	artist_name_div.innerHTML = response.data.artist.name;
	artist_description.innerHTML = response.data.artist.description.html;
	for (let i = 0; i < carousals.length; i++) {
		// add images from results.images
		carousals[i].style.backgroundImage = `url(${response.data.images[i]})`;
		carousals[i].classList.add("hidden");
	}
}
window.onload = set_stuff();
