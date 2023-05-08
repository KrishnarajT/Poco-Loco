// const fs = require("fs");
// const ytdl = require("ytdl-core");
// // TypeScript: import ytdl from 'ytdl-core'; with --esModuleInterop
// // TypeScript: import * as ytdl from 'ytdl-core'; with --allowSyntheticDefaultImports
// // TypeScript: import ytdl = require('ytdl-core'); with neither of the above
// // Example of filtering the formats to audio only.

// async function download_video(videoID) {
// 	let info = await ytdl.getInfo(videoID);
// 	let audioFormats = ytdl.filterFormats(info.formats, "audioonly");
//     console.log("Formats with only audio: " + audioFormats);
//     console.log("Formats with only audio: " + audioFormats[0].container);
// 	// Example with custom function.
// 	ytdl("http://www.youtube.com/watch?v=" + videoID, {
// 		filter: (audioFormats) => audioFormats.quality === "tiny",
// 	}).pipe(fs.createWriteStream("video" + videoID + "." + audioFormats[0].container));
// }

// let videoID = "https://www.youtube.com/watch?v=ndkSnNe_drE";
// download_video("ndkSnNe_drE");
// // ytdl("http://www.youtube.com/watch?v=aqz-KE-bpKQ").pipe(
// // 	fs.createWriteStream("video.mp4")
// // );


var YoutubeMp3Downloader = require("youtube-mp3-downloader");

//Configure YoutubeMp3Downloader with your settings
var YD = new YoutubeMp3Downloader({
	ffmpegPath: "/usr/bin/ffmpeg", // FFmpeg binary location
	outputPath: ".", // Output file location (default: the home directory)
	youtubeVideoQuality: "ultralow", // Desired video quality (default: highestaudio)
	queueParallelism: 2, // Download parallelism (default: 1)
	progressTimeout: 2000, // Interval in ms for the progress reports (default: 1000)
	allowWebm: false, // Enable download from WebM sources (default: false)
});

//Download video and save as MP3 file
YD.download("Vhd6Kc4TZls");

YD.on("finished", function (err, data) {
    console.log(JSON.stringify(data));
});

YD.on("error", function (error) {
	console.log(error);
});

YD.on("progress", function (progress) {
	console.log(JSON.stringify(progress));
});