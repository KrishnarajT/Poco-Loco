const axios = require("axios");

// const options = {
// 	method: "GET",
// 	url: "https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/",
// 	params: { id: "2396871", text_format: "html" },
// 	headers: {
// 		"X-RapidAPI-Key": "39ab04b270msh3c5f249751c1c34p10318fjsn17ab431b79ef",
// 		"X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
// 	},
// };

// axios
// 	.request(options)
// 	.then(function (response) {
//         console.log(response.data);
//         console.log(response.data.lyrics)
// 	})
// 	.catch(function (error) {
// 		console.error(error);
// 	});

const token =
	"-_LLzpo9XsNG9B8HfxsLVp75ywZOVBy5yaHL0ctjP9hjWIRB5ImvMKCUvT5tEdSY";

const options = {
	method: "GET",
	url: "https://api.genius.com/artists",
	params: { id: "16775", text_format: "html" },
	// headers: {
	// 	"X-RapidAPI-Key": "39ab04b270msh3c5f249751c1c34p10318fjsn17ab431b79ef",
	// 	"X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
	// },
	headers: { Authorization: `Bearer ${token}` },
};
const headers = { Authorization: `Bearer ${token}` };

const params = {
    'text_format': 'html',
    'q': 'shape of you',
    // 'id': '16775'
}
axios.get("https://api.genius.com/search", { headers, params }).then((res) => {
    console.log(res.data);
    // console.log(res.data.response.artist.description);
    // console.log(res.data.response.hits[0]);
    console.log(res.data.response.hits[0]);
});
// for artists you gotta search for artists/16775 or id in the url, putting it in params doesnt work for some reason. 

// axios
// 	.request(options)
// 	.then(function (response) {
// 		// console.log(response.data);
// 		console.log(response.data.lyrics);
// 	})
// 	.catch(function (error) {
// 		console.error(error);
// 	});

// // const getUsers = () => {
// // 	axios
// // 		.get("https://reqres.in/api/users")
// // 		.then((response) => {
// // 			const users = response.data.data;
// // 			console.log(`GET users`, users);
// // 		})
// // 		.catch((error) => console.error(error));
// // };

// // getUsers();

const Genius = require("genius-lyrics");
const Client = new Genius.Client(token);

async function getsong() {
	const searches = await Client.songs.search("faded");
	// Pick first one
	const firstSong = searches[0];
	console.log("About the Song:\n", firstSong, "\n");
	// Ok lets get the lyrics
	const lyrics = await firstSong.lyrics();
	console.log("Lyrics of the Song:\n", lyrics, "\n");
	const artist = await Client.artists.get(456537);
	console.log("About the Artist:\n", artist, "\n");
	// return searches;
}

getsong();
