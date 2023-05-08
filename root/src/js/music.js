let theme = window.matchMedia("(prefers-color-scheme: dark)").matches
	? "dark"
	: "light";

if (theme == "dark") {
	document.documentElement.classList.add("dark");
}

// document.getElementById('dark-mode-toggle').addEventListener('click', function(){
// 	document.documentElement.classList.toggle('dark')
// });

document.getElementById("song-saved").addEventListener("click", function () {
	document.getElementById("song-saved").classList.toggle("saved");
});



// window.onkeydown = function(e) {
//     return !(e.keyCode == 32);
// };
