$(document).ready(function(){
	var
	id_song, Song, i, mute = false, volume = 1,
	songs = [
		muz_one = [0, 'Музыка_1', 'Foals - Spanish Sahara.mp3', '413.5712'],
		muz_two = [1, 'Музыка_2', 'Syd Matters - Obstacles.mp3', '208.901224']
	];
	for (var i = 0; i < songs.length; i++) {
		$('.wrp').append('<div class="song" id="'+songs[i][0]+'"><div class="play-pause_song"></div><div class="nameSong_song">'+songs[i][1]+'</div><div class="duration_song">'+parseInt(songs[i][3]/60)+':'+parseInt(songs[i][3]%60)+'</div></div>');
	}
	
	function playNewSong(id) {
		$('.player .nameSong').text(songs[id][1]);
		$('.play-pause').attr('id', id);
		id_song = id;
		Song = new Audio(songs[id][2]);
		$('.play-pause').css({'background-position':'5px -35px'});
		$('.song#'+id+' .play-pause_song').css({'background-position':'3px -17px'});
		Song.play();
		Song.volume = volume;
	}

	function playPauseSong(id) {
		if (Song) {
			if (id == id_song) {
				if (Song.paused) {
					Song.play();
					Song.volume = volume;
					$('.play-pause').css({'background-position':'5px -35px'});
					$('.song#'+id+' .play-pause_song').css({'background-position':'3px -17px'});
				}
				else {
					Song.pause();
					$('.play-pause').css({'background-position':'5px 5px'});
					$('.song#'+id+' .play-pause_song').css({'background-position':'3px 3px'});
				}
			}
			else {
				Song.pause();
				$('.play-pause_song').css({'background-position':'3px 3px'});
				$('.song#'+id+' .play-pause_song').css({'background-position':'3px -17px'});
				playNewSong(id);	
			}
		}
		else {
			playNewSong(id);
		}
	}


	$('.song, .play-pause').on('click', function(){
		var
		id = $(this).attr('id');
		$('.play-pause_song').css({'background-position':'3px 3px'});
		playPauseSong(id);
		id++;
		$('.sledbtn#sled').attr('data-id', id);
		id--;id--;
		$('.sledbtn#pred').attr('data-id', id);
	});

	$('sledbtn').on('click', function(){
		var
		id = $(this).attr('data-id');
		if (id != (-1)) {
			$('.play-pause_song').css({'background-position':'3px 3px'});
			playPauseSong(id);
			id++;
			$('.sledbtn#sled').attr('data-id', id);
			id--;id--;
			$('.sledbtn#pred').attr('data-id', id);
		}
	});
	$('.mute').on('click', function() {
		if (Song) {
			if (mute == false) {
				mute = true;
				$('.mute').css({'color':'#c0392b'});
				$('.volume').val(0);
			}
			else {
				mute = false;
				$('.mute').css({'color':'#ecf0f1'});
				$('.volume').val(100);	
			}
			Song.muted = mute;
		}
	});
	$('.volume').on('change', function(){
		var 
		val = $(this).val();
		if (Song) {
			volume = val/100;
			Song.volume = volume;
			if (val == 0) {
				mute = true;
				$('.mute').css({'color':'#c0392b'});
			}
			else if (val > 0) {
				mute = false;
				$('.mute').css({'color':'#ecf0f1'});
			}
		}
	});
});