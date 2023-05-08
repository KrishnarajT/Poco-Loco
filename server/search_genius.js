const axios = require("axios");

class genius_searches {
	constructor() {
		this.token =
			"-_LLzpo9XsNG9B8HfxsLVp75ywZOVBy5yaHL0ctjP9hjWIRB5ImvMKCUvT5tEdSY";
		this.headers = { Authorization: `Bearer ${this.token}` };
	}

	async search_query(query) {
		const params = {
			text_format: "html",
			q: query,
			// 'id': '16775'
		};
		const headers = this.headers;
		const response = await axios
			.get("https://api.genius.com/search", { headers, params })
			.then((res) => {
				return res.data.response.hits;
			});
		return response;
	}

	async get_artist(artist_id) {
		const params = {
			text_format: "html",
			// 'id': '16775'
		};
		const headers = this.headers;

		const response = await axios
			.get(`https://api.genius.com/artists/${artist_id}`, {
				headers,
				params,
			})
			.then((res) => {
				return res.data.response;
			});
		return response;
	}
	async get_song_info(song_id) {
		const params = {
			text_format: "html",
			// 'id': '16775'
		};
		const headers = this.headers;
		const response = await axios
			.get(`https://api.genius.com/songs/${song_id}`, {
				headers,
				params,
			})
			.then((res) => {
				return res.data.response;
			});
		return response;
	}
}
// create an instance of the class
genius = new genius_searches();

module.exports = genius;
