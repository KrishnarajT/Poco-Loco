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
			alert("server not running! A response will be simulated. ");
			const response = {
				data: {
					artist: {
						name: "Taylor Swift",
						description: {
							html: "(simulated response) One of the defining artists of the 2010s, Taylor Alison Swift, born December 13th, 1989, is an American singer-songwriter and actress who has achieved success in both country and pop. Raised on a Christmas tree farm in Reading, Pennsylvania, Swift moved to Nashville, Tennessee at age fourteen to pursue a career in country music. Scott Borchetta signed Swift to his then-nonexistent label Big Machine Records after seeing her perform at the Bluebird Cafe in November 2004.",
						},
					},
					images: [
						"https://www.rollingstone.com/wp-content/uploads/2023/01/taylor-swift-1975.jpg",
						"https://media.cnn.com/api/v1/images/stellar/prod/230318120009-01-taylor-swift-eras-tour-0317.jpg?c=4x3",
						"https://hips.hearstapps.com/hmg-prod/images/taylor-swift-performs-onstage-as-taylor-swift-dua-lipa-sza-news-photo-1587245373.jpg",
						"https://d.newsweek.com/en/full/2143867/taylor-swift-performs-stage.jpg",
						"https://assets.teenvogue.com/photos/641b2a23912ddccbabf80f80/16:9/w_2560%2Cc_limit/GettyImages-1474459622.jpg",
						"https://people.com/thmb/uuPGxQDpQeh35iKyxDnWuzCuldg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(701x0:703x2)/taylor-swift-performs-nashville-songwriter-awards-1-92122-512828fbf94347b39dfe985a758a4c69.jpg",
						"https://www.reviewjournal.com/wp-content/uploads/2023/03/17584261_web1_AP23077144507236.jpg?crop=1",
						"https://www.refinery29.com/images/8833407.jpg",
						"https://media.pitchfork.com/photos/5f62c6f6b2d5b619cfead49d/1:1/w_1500,h_1500,c_limit/Taylor%20Swift.jpg",
					],
				},
			};
			return response;
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
