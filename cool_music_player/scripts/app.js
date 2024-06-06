//This is the main JS file
const music = document.querySelector('audio');
const img = document.querySelector('img');
const play = document.getElementById('play');
const artist = document.getElementById('artist');
const song = document.getElementById('song');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

let progress = document.getElementById('progress');
let total_duration = document.getElementById('duration');
let current_time = document.getElementById('current_time');
const progress_div = document.getElementById('progress_div');

const songs = [
  {
    name: 'Qismat Ki Hawa Kabhi Naram',
    song: 'o beta ji',
    artist: 'C Ramchandra',
  },
  {
    name: 'Kho Gaye Hum Kahan',
    song: 'kho gaye hum',
    artist: 'jasleen royal',
  },
  {
    name: 'Aabaad Barbaad',
    song: 'aabaad barbaad',
    artist: 'arijit singh',
  },
  {
    name: 'Aaya Na Tu',
    song: 'aaya na tu',
    artist: 'arjun kanungo',
  },
];

let isPlaying = false;
let count2 = 0;

const playMusic = () => {
  isPlaying = true;
  if (count2 <= 0) {
    loadSong(songs[0]);
    count2++;
  }
  music.play();
  play.classList.replace('fa-play-circle', 'fa-pause-circle');
  img.classList.add('anime');
};

const pauseMusic = () => {
  isPlaying = false;
  music.pause();
  play.classList.replace('fa-pause-circle', 'fa-play-circle');
  img.classList.remove('anime');
};

//changing the music data
const loadSong = (songs) => {
  song.textContent = songs.song;
  artist.textContent = songs.artist;
  music.src = 'music/' + songs.name + '.mp3';
  let strname = 'img/' + songs.name + '.jpg';
  img.src = strname;
};

songIndex = 0;
//loadSong(songs[2]);
const nextSong = () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playMusic();
};

const prevSong = () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playMusic();
};

//progress bar js work
music.addEventListener('timeupdate', (event) => {
  // console.log(event);
  const { currentTime, duration } = event.srcElement;
  let progress_time = (currentTime / duration) * 100;
  progress.style.width = `${progress_time}%`;

  //music duration update

  let min_duration = Math.floor(duration / 60);
  let sec_duration = Math.floor(duration % 60);
  let tot_duration = `${min_duration}:${sec_duration}`;
  if (duration) {
    total_duration.textContent = `${tot_duration}`;
  }

  //current duration update

  let min_currentTime = Math.floor(currentTime / 60);
  let sec_currentTime = Math.floor(currentTime % 60);

  if (sec_currentTime < 10) {
    sec_currentTime = `0${sec_currentTime}`;
  }
  let tot_currentTime = `${min_currentTime}:${sec_currentTime}`;
  current_time.textContent = `${tot_currentTime}`;
});

let clientWidth_seek = 0;
let count = 0;

progress_div.addEventListener('click', (event) => {
  // console.log(event);
  console.log('Running progress_div');
  console.log(event.offsetX);
  console.log(event.srcElement.clientWidth);
  const { currentTime, duration } = music;
  if (count <= 0) {
    clientWidth_seek = event.srcElement.clientWidth;
    count++;
  }
  let move_progress = (event.offsetX / clientWidth_seek) * duration;

  music.currentTime = move_progress;
});
function playMusicReal() {
  if (!isPlaying) {
    playMusic();
  } else {
    pauseMusic();
  }
}

// play.addEventListener('click', () => {
//   if (isPlaying) {
//     pauseMusic();
//   } else {
//     playMusic();
//   }
// });
play.addEventListener('click', playMusicReal);
next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);
music.addEventListener('ended', nextSong);
