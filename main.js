var audio,
  playbtn,
  song_artist,
  album_cover,
  song_title,
  seekslider,
  seeking = false,
  seekto,
  currenttimetext,
  durationtimetext,
  playlist_status,
  dir,
  song_url,
  ext,
  agent,
  playlists_artists,
  repeat,
  random;

song_url = [
  "tumse.mp3",
  "kudmayi.mp3"
];

song_artist = [
  "Pritam",
  "Post Malone Ft. Gunna",
  "Post Malone",
  "Post Malone"
];

album_cover = [
  "https://akamai.sscdn.co/uploadfile/letras/albuns_high/55401_20171022080200.jpg",
  "https://lastfm.freetls.fastly.net/i/u/d897b8b9afe75c015ae753ff914f9021.png",
  "https://assets.codepen.io/4927073/icon-125_1.jpg",
  "https://prowly-uploads.s3.eu-west-1.amazonaws.com/uploads/landing_page_image/image/480651/828df859c44d8d4f0a3b3cc486718952.jpg"
];
song_title = [
  "Tumse",
  "I Cannot Be (A Sadder Song)",
  "Candy Paint",
  "Mourning"
];

playlist_index = 0;
agent = navigator.userAgent.toLowerCase();
if (agent.indexOf("firefox") != -1 || agent.indexOf("opera") != -1) {
  ext = ".ogg";
}

playbtn = document.getElementById("playpausebtn");
nextbtn = document.getElementById("nextbtn");
prevbtn = document.getElementById("prevbtn");
seekslider = document.getElementById("seekslider");
currenttimetext = document.getElementById("currenttimetext");
durationtimetext = document.getElementById("durationtimetext");
playlist_status = document.getElementById("playlist_status");
playlists_artists = document.getElementById("playlist_artist");
repeat = document.getElementById("repeat");
randomSong = document.getElementById("random");
volume_slider = document.getElementById(".volume_slider");

audio = new Audio();
audio.src = song_url[0];
audio.loop = false;

playlist_status.innerHTML = song_artist[playlist_index];
playlists_artists.innerHTML = song_title[playlist_index];

playbtn.addEventListener("click", playPause);

nextbtn.addEventListener("click", nextSong);
prevbtn.addEventListener("click", prevSong);
seekslider.addEventListener("mousedown", function (event) {
  seeking = true;
  seek(event);
});
seekslider.addEventListener("mousemove", function (event) {
  seek(event);
});

seekslider.addEventListener("mouseup", function () {
  seeking = false;
});

audio.addEventListener("timeupdate", function () {
  seektimeupdate();
});
audio.addEventListener("ended", function () {
  switchTrack();
});
repeat.addEventListener("click", loop);
randomSong.addEventListener("click", random);

//functions
function fetchMusicDetail() {
  $("#image").attr("src", album_cover[playlist_index]);
  $("#image2").attr("src", album_cover[playlist_index]);

  var imageUrl = album_cover[playlist_index];
  var songUrl = song_title[playlist_index];

  // body background image
  $(".box").css("background-image", "url(" + imageUrl + ")");
  document.getElementById("playlist_artist").className = songUrl;
  document.getElementById("image").className = "image rotate " + songUrl;
  document.getElementById("image3").className = "image rotate " + songUrl;
  document.getElementById("seekslider").className = songUrl;

  playlist_status.innerHTML = song_artist[playlist_index];
  playlist_artist.innerHTML = song_title[playlist_index];
  audio.src = song_url[playlist_index];
  audio.play();
}

function getRandomNumber(min, max) {
  let step1 = max - min + 1;
  let step2 = Math.random() * step1;
  let result = Math.floor(step2) + min;
  return result;
}

function random() {
  let randomIndex = getRandomNumber(0, song_url.length - 1);
  playlist_index = randomIndex;
  fetchMusicDetail();
  document.querySelector(".playpause").classList.add("active");
}

function loop() {
  if (audio.loop) {
    audio.loop = false;
    document.querySelector(".loop").classList.remove("active");
  } else {
    audio.loop = true;
    document.querySelector(".loop").classList.add("active");
  }
}

function nextSong() {
  document.querySelector(".playpause").classList.add("active");
  document.querySelector("#image").classList.add("rotate");
  document.querySelector("#image3").classList.add("rotate");
  playlist_index++;
  if (playlist_index > song_url.length - 1) {
    playlist_index = 0;
  }
  fetchMusicDetail();
}
function prevSong() {
  document.querySelector(".playpause").classList.add("active");
  document.querySelector("#image").classList.add("rotate");
  document.querySelector("#image3").classList.add("rotate");
  playlist_index--;
  if (playlist_index < 0) {
    playlist_index = song_url.length - 1;
  }
  fetchMusicDetail();
}

function playPause() {
  if (audio.paused) {
    audio.play();
    document.querySelector(".playpause").classList.add("active");
    document.querySelector("#image").classList.add("rotate");
    document.querySelector("#image3").classList.add("rotate");
  } else {
    audio.pause();
    document.querySelector("#image").classList.remove("rotate");
    document.querySelector("#image3").classList.remove("rotate");
    document.querySelector(".playpause").classList.remove("active");
  }
}

function switchTrack() {
  if (playlist_index == song_url.length - 1) {
    playlist_index = 0;
  } else {
    playlist_index++;
  }
  fetchMusicDetail();
}

function seek(event) {
  if (audio.duration == 0) {
    seekslider.value = 0;
  } else {
    if (seeking) {
      seekslider.value = event.clientX - seekslider.offsetLeft;
      seekto = audio.duration * (seekslider.value / 100);
      //audio.currentTime = seekto;
    }
  }
}

function seektimeupdate() {
  if (audio.duration) {
    var nt = audio.currentTime * (100 / audio.duration);
    seekslider.value = nt;
    var curmins = Math.floor(audio.currentTime / 60);
    var cursecs = Math.floor(audio.currentTime - curmins * 60);
    var durmins = Math.floor(audio.duration / 60);
    var dursecs = Math.floor(audio.duration - durmins * 60);
    if (cursecs < 10) {
      cursecs = "0" + cursecs;
    }
    if (dursecs < 10) {
      dursecs = "0" + dursecs;
    }
    if (curmins < 10) {
      curmins = "0" + curmins;
    }
    if (durmins < 10) {
      durmins = "0" + durmins;
    }
    currenttimetext.innerHTML = curmins + ":" + cursecs;
    durationtimetext.innerHTML = durmins + ":" + dursecs;
  } else {
    currenttimetext.innerHTML = "00" + ":" + "00";
    durationtimetext.innerHTML = "00" + ":" + "00";
  }
}

let checkbox = document.querySelector("input[name=theme]");
checkbox.addEventListener("change", function () {
  if (this.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
});

// body background image
let backgroundColor = song_artist[playlist_index];
$("body").css("background", backgroundColor);
$("#background").css("background-image");
