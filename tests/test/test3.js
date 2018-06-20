var audio, playbtn, seekto, seeking=false, onceStarted=false;
function initAudioPlayer() {
	audio = new Audio();
	audio.src = "Syd Matters - Obstacles.mp3";
	audio.load();
	audio.loop = true;
	playbtn = document.getElementById("playpausebtn");
	seekslider = document.getElementById("seekslider");
	playbtn.addEventListener("click", playPause);
	seekslider.addEventListener("oninput", (this.value));
	seekslider.addEventListener("onchange", (this.value));
	seekslider.addEventListener("mousedown", function(event){ seeking=true; seek(event);});
	seekslider.addEventListener("click", function(event){ change();});
	seekslider.addEventListener("mousemove", function(event){ seek(event);});
	seekslider.addEventListener("mouseup", function(){ seeking=false;});
	audio.addEventListener("timeupdate", function() { seektimeupdate(); });

function change() {
	seekto = (audio.duration * seekslider.value) / 100;
	audio.currentTime = seekto;
}

function playPause() {
	if (audio.paused) {
		audio.play();
		onceStarted=true;
		playbtn.style.background = "url(pause.png) no-repeat";
	}
	else {
		audio.pause();
		playbtn.style.background = "url(play.png) no-repeat";
	}
}

	function seek(event){
	    if(seeking == true){
	    	change();
			console.log("adr = ", audio.duration);
			console.log("seek val = ", seekslider.value);
			console.log("seekto = ", seekto);
	    }
    }

function seektimeupdate() {
	if (seeking == false && onceStarted == true) {
		seekslider.value = audio.currentTime * (100 / audio.duration);
		console.log(seekslider.value);
	}
}

}
window.addEventListener("load", initAudioPlayer);