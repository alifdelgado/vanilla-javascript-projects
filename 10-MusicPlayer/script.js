const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const songs = ['hey', 'summer', 'ukulele'];

let songIndex = 2;

const loadSong = (song) => {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
};

const playSong = () => {
    musicContainer.classList.add('play');
    playBtn.children[0].classList.remove('fa-play');
    playBtn.children[0].classList.add('fa-pause');
    audio.play();
};

const pauseSong = () => {
    musicContainer.classList.remove('play');
    playBtn.children[0].classList.remove('fa-pause');
    playBtn.children[0].classList.add('fa-play');
    audio.pause();
};

const prevSong = () => {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
};

const nextSong = () => {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
};

const updateProgress = (e) => {
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
};

const setProgress = (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
};

loadSong(songs[songIndex]);
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    if(isPlaying) {
        pauseSong();
        return;
    }
    playSong();
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);