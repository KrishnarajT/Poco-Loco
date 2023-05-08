// working

// const gis = require("async-g-i-s");

// (async () => {
// 	try {
// 		const results = await gis("akif");
// 		console.log(results.slice(0, 10));
// 	} catch (e) {
// 		console.error(e);
// 	}
// })();

// also working nicely.

const {
		GOOGLE_IMG_SCRAP,
		GOOGLE_IMG_INVERSE_ENGINE_URL,
		GOOGLE_IMG_INVERSE_ENGINE_UPLOAD,
		GOOGLE_QUERY,
 } = require("google-img-scrap");

async function get_images(query) {
	const images = await GOOGLE_IMG_SCRAP({
		search: query,
		limit: 9,
		safeSearch: true,
		query: {
			SIZE: GOOGLE_QUERY.SIZE.LARGE,
			// TYPE: GOOGLE_QUERY.TYPE.CLIPART,
			// LICENCE: GOOGLE_QUERY.LICENCE.COMMERCIAL_AND_OTHER,
			// EXTENSION: GOOGLE_QUERY.EXTENSION.JPG,
		},
	});
    final_image_ulrs = [];
    for (let i = 0; i < images.result.length; i++) {
        final_image_ulrs.push(images.result[i].url);
    }
    return final_image_ulrs;
}

module.exports = get_images;

// const google = require("googlethis");
// // import google from 'googlethis';

// const options = {
// 	page: 0,
// 	safe: false, // Safe Search
// 	parse_ads: false, // If set to true sponsored results will be parsed
// 	additional_params: {
// 		// add additional parameters here, see https://moz.com/blog/the-ultimate-guide-to-the-google-search-parameters and https://www.seoquake.com/blog/google-search-param/
// 		hl: "en",
// 	},
// };

// (async function () {
// 	const response = await google.search("kumar sanu", options);
// 	console.log(response);
// })();



// const google = require('googlethis');


// // Image Search
// (async function () {
// 	const images = await google.image("The Wolf Among Us", { safe: false });
// 	console.log(images);
// })();
	