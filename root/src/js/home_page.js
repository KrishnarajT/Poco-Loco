results_table_div = document.getElementById("results-table");
search_bar = document.getElementById("search-bar");
search_button = document.getElementById("search-button");
player = document.getElementById("player");
search_comment = document.getElementById("search-comment");
mainplayer = document.getElementById("mainplaybutton");
// ytplayer = document.getElementById("ytplayer");

results_table_div.classList.add("hidden");
search_comment.innerHTML = "Get started by searching for a song!";

function initamp(title, album, artist, url, cover_art_url) {
	Amplitude.init({
		bindings: {
			37: "prev",
			39: "next",
			// 32: 'play_pause'
		},
		callbacks: {
			timeupdate: function () {
				let percentage = Amplitude.getSongPlayedPercentage();

				if (isNaN(percentage)) {
					percentage = 0;
				}

				/**
				 * Massive Help from: https://nikitahl.com/style-range-input-css
				 */
				let slider = document.getElementById("song-percentage-played");
				slider.style.backgroundSize = percentage + "% 100%";
			},
		},
		songs: [
			{
				name: title,
				artist: artist,
				album: album,
				url: "https://521dimensions.com/song/FirstSnow-Emancipator.mp3",
				cover_art_url: cover_art_url,
			},
		],
    });
}
class SongResult {
	constructor(
		songName,
		artistName,
		primaryArtistName,
		primaryArtistID,
		songLength,
		imageUrl,
		songID
	) {
		this.songName = songName;
		this.songId = songID;
		this.artistName = artistName;
		this.songLength = songLength;
		this.imageUrl = imageUrl;
		this.primaryArtistID = primaryArtistID;
		this.primaryArtistName = primaryArtistName;
	}

	createDiv() {
		const div = document.createElement("div");
		div.classList.add(
			"song-result",
			"m-2",
			"flex",
			"w-full",
			"justify-between",
			"rounded-2xl",
			"bg-transparent",
			"p-4",
			"text-lg",
			"text-white",
			"hover:bg-slate-100/10"
		);

		const mainDiv = document.createElement("div");
		mainDiv.classList.add("align-items-center", "flex");

		const img = document.createElement("img");
		img.classList.add("h-12", "w-12", "rounded-lg", "object-cover");
		img.src = this.imageUrl;
		img.alt = "unsplash image";

		const infoDiv = document.createElement("div");
		infoDiv.classList.add("ml-3", "flex", "flex-col", "justify-center");

		const songTitle = document.createElement("div");
		songTitle.classList.add("hover:underline");
		songTitle.textContent = this.songName;
		songTitle.onclick = async () => {
			console.log("clicked", this.songName);
			player.classList.add("main-player-animate-up");
			initamp(
				this.songName,
				"album",
				this.artistName,
				"url",
				this.imageUrl
			);
			const response = await axios
				.post(
					`${base_url}/download_song`,
					{},
					{
						params: {
							song_id: this.songId,
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
			console.log(response);
			initamp(
				this.songName,
				response.data.song.album.full_title,
				this.artistName,
				"url",
				// response.data.media[0].url,
				this.imageUrl
			);
			console.log(
				"playinggggggggggggggggggggggggggggggggggggggggggggggg"
			);
            const medias = response.data.song.media;
			// iterate through media and find youtube as provider.
			let linkurl = "";
            for (let i = 0; i < medias.length; i++) {
                console.log(medias[i]);
				if (medias[i].provider === "youtube") {
					linkurl = medias[i].url;
					break;
				}
			}
			// extract video id
			const video_id = response.data.song.media[0].url.split("v=")[1];
			// create embed link
			const embed_link = `https://www.youtube.com/embed/${video_id}?enablejsapi=1&version=3&playerapiid=ytplayer`;
			ytplayer.src = embed_link;
		};

		const artistName = document.createElement("div");

		artistName.classList.add("text-gray-500", "hover:underline");
		artistName.textContent = this.artistName;

		infoDiv.appendChild(songTitle);
		infoDiv.appendChild(artistName);

		const artistDiv = document.createElement("div");
		artistDiv.classList.add("artist-name");
		artistDiv.onclick = async () => {
			console.log("clicked", this.primaryArtistName);
			// redirect to artist page.
			const response = await axios
				.post(
					`${base_url}/this_is_the_artist`,
					{},
					{
						params: {
							artist_id: this.primaryArtistID,
							artist_name: this.primaryArtistName,
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
			console.log(response);
			window.location.href = `../pages/artist.html`;
		};
		artistDiv.classList.add(
			"song-artist",
			"self-center",
			"text-2xl",
			"text-slate-200",
			"hover:underline"
		);
		artistDiv.textContent = this.primaryArtistName;

		const lengthDiv = document.createElement("div");
		lengthDiv.classList.add(
			"song-length",
			"self-center",
			"text-2xl",
			"text-slate-200"
		);
		lengthDiv.textContent = this.songLength;

		mainDiv.appendChild(img);
		mainDiv.appendChild(infoDiv);

		div.appendChild(mainDiv);
		div.appendChild(artistDiv);
		// div.appendChild(lengthDiv);

		return div;
	}
}

const base_url = "http://localhost:3000";
// remove stuff from the search button

// // Example usage:
// const song = new SongResult(
// 	"The Days",
// 	"Avicii",
// 	"3:41",
// 	"https://images.unsplash.com/photo-1613588718956-c2e80305bf61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80"
// );

// results.push(song.createDiv());
// results_table_div.appendChild(results[0]);

const token =
	"-_LLzpo9XsNG9B8HfxsLVp75ywZOVBy5yaHL0ctjP9hjWIRB5ImvMKCUvT5tEdSY";

async function search_songs() {
	let results = [];
	results_table_div.innerHTML = "";

	search_query = search_bar.value;
	console.log(search_query);
	// search for the song
	const response = await axios
		.post(
			`${base_url}/search_query`,
			{},
			{
				params: {
					query: search_query,
				},
			}
		)
		.then((response) => {
			search_comment.innerHTML = "Here are the results for your search!";
			results_table_div.classList.remove("hidden");
			return response;
		})
		.catch((error) => {
			console.error(error);
			alert("server not running!");
			return error;
		});
	// console.log(response)

	// now depending on the response, we gotta make the divs and add them to the results table
	// we are gonna have an array of songs in the response
	// we gotta make a new songsresult object for each of them.
	for (let i = 0; i < response.data.length; i++) {
		let song = response.data[i];
		console.log(song);
		let songResult = new SongResult(
			song.title,
			song.artist,
			song.primary_artist,
			song.primary_artist_id,
			song.duration,
			song.image,
			song.id
		);
		results.push(songResult.createDiv());
		results_table_div.appendChild(results[i]);
	}
	// go through the results and extract song information in a for loop

	// create a SongResult object for each song and add it to the results array
}
search_bar.addEventListener("input", (event) => {
	if (search_bar.value == "") {
		results_table_div.classList.add("hidden");
		search_comment.innerHTML = "Get started by searching for a song!";
	}
});

search_button.addEventListener("click", async () => {
	console.log("clicked", search_bar.value);
	if (search_bar.value != "") {
		search_songs();
	}
});

$(".amplitude-paused").click(function () {
	console.log("clicked paused");
	$(".youtube-video")[0].contentWindow.postMessage(
		'{"event":"command","func":"' + "playVideo" + '","args":""}',
		"*"
	);
	// $("#mainplaybutton").addClass("pause-video");
	//             $("#mainplaybutton").removeClass("play-video");
});

// $(".stop-video").click(function () {
// 	$(".youtube-video")[0].contentWindow.postMessage(
// 		'{"event":"command","func":"' + "stopVideo" + '","args":""}',
// 		"*"
// 	);
// });

$(".amplitude-playing").click(function () {
	console.log("clicked playing");
	$(".youtube-video")[0].contentWindow.postMessage(
		'{"event":"command","func":"' + "pauseVideo" + '","args":""}',
		"*"
	);
	// $("#mainplaybutton").addClass("play-video");
	//         $("#mainplaybutton").removeClass("pause-video");
});

$("#mainplaybutton").click(function () {
	console.log("clicked");
	// print classes
	console.log($("#mainplaybutton").attr("class"));
});

mainplayer.addEventListener("click", () => {
	if (mainplayer.classList.contains("amplitude-playing")) {
		console.log("paused");
		$(".youtube-video")[0].contentWindow.postMessage(
			'{"event":"command","func":"' + "pauseVideo" + '","args":""}',
			"*"
		);
	} else if (mainplayer.classList.contains("amplitude-paused")) {
		console.log("playing");

		$(".youtube-video")[0].contentWindow.postMessage(
			'{"event":"command","func":"' + "playVideo" + '","args":""}',
			"*"
		);
	}
	console.log("clicked");
});
