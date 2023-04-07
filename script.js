const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const prev = document.getElementById('prev');
const play = document.getElementById('play');
const next = document.getElementById('next');
const progressContain = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');


// music
const songs = [
  {
    name: 'chidoka (1)',
    displayName: 'Real Nigga',
    artist: '21 Savage & Metro Boomin'
  },
  {
    name: 'chidoka (2)',
    displayName: 'Philo',
    artist: 'Bella Shmurda ft Omah Lay'
  },
  {
    name: 'chidoka (3)',
    displayName: 'Kilometer (Remix)',
    artist: 'Buju ft Zinolesky'
  },
  {
    name: 'chidoka (4)',
    displayName: 'Different Size',
    artist: 'Burna boy ft Victony'
  },
  {
    name: 'chidoka (5)',
    displayName: 'Final Champion',
    artist: 'Santi'
  },
  {
    name: 'chidoka (6)',
    displayName: 'Kerosene',
    artist: 'Crystal Castle'
  },
  {
    name: 'chidoka (7)',
    displayName: 'Tab Buluku (Remix)',
    artist: 'DJ Tarico & Burna boy'
  },
  {
    name: 'chidoka (8)',
    displayName: 'Life Is Good',
    artist: 'Future ft Drake'
  }
]

// check if it's playing
let isPlaying = false;

// play
function playSong() {
  isPlaying = true;
  play.classList.replace('fa-play', 'fa-pause');
  play.setAttribute('title', 'pause')
  music.play()
}

// pause
function pauseSong() {
  isPlaying = false;
  play.classList.replace('fa-pause', 'fa-play');
  play.setAttribute('title', 'play')
  music.pause()
}

// play or pause event listener
play.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));


// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`
}
// current song
let songIndex = 0;

// prev song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// next song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// on load
loadSong(songs[songIndex]);

// update progress
function updateProgress(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;

    // update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // calculate the duration
    const durationMin = Math.floor(duration / 60);
    let durationSec = Math.floor(duration % 60);
    if (durationSec < 10) {
      durationSec = `0${durationSec}`;
    }

    // delay switching duration to avoid NaN
    if (durationSec) {
      durationEl.textContent = `${durationMin}:${durationSec}`;
    }

    // calculate the current
    const currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) {
      currentSec = `0${currentSec}`;
    }
    currentTimeEl.textContent = `${currentMin}:${currentSec} `;
  }
}

// set progress bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// event listener
prev.addEventListener('click', prevSong);
next.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong)
music.addEventListener('timeupdate', updateProgress);
progressContain.addEventListener('click', setProgressBar);