
const audio = document.getElementById("main-audio");
const playBtn = document.getElementById("main-play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const albumArt = document.getElementById("album-art");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progressFill = document.getElementById("progress-fill");

// 1. PLAYLIST WITH DIRECT MP3 LINKS
// These are hosted on SoundHelix and Bensound for testing purposes.
const playlist = [
    {
        title: "Stay (Popular Pop)",
        artist: "Zain's Pick",
        img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        title: "Sunset Acoustic",
        artist: "Nature Melodies",
        img: "https://images.unsplash.com/photo-1459749411177-042180ce673c?w=500",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
    },
    {
        title: "Digital Horizon",
        artist: "Tech Beats",
        img: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=500",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    }
];

let songIndex = 0;
let isPlaying = false;

// 2. INITIALIZE TRACK
function loadSong(song) {
    title.innerText = song.title;
    artist.innerText = song.artist;
    audio.src = song.src;
    albumArt.style.backgroundImage = `url('${song.img}')`;
    
    // Set default volume
    audio.volume = 0.7; 
}

// 3. PLAY/PAUSE FUNCTION
function togglePlay() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

function playSong() {
    isPlaying = true;
    // Add 'playing' class to animate the album art rotation in CSS
    document.querySelector(".music-player").classList.add("playing");
    playBtn.classList.replace("fa-play", "fa-pause");
    audio.play().catch(error => {
        console.log("Playback failed. Most browsers require a user click first:", error);
    });
}

function pauseSong() {
    isPlaying = false;
    document.querySelector(".music-player").classList.remove("playing");
    playBtn.classList.replace("fa-pause", "fa-play");
    audio.pause();
}

// 4. NAVIGATION
function nextSong() {
    songIndex = (songIndex + 1) % playlist.length;
    loadSong(playlist[songIndex]);
    if (isPlaying) playSong();
}

function prevSong() {
    songIndex = (songIndex - 1 + playlist.length) % playlist.length;
    loadSong(playlist[songIndex]);
    if (isPlaying) playSong();
}

// 5. PROGRESS BAR UPDATE
audio.addEventListener("timeupdate", (e) => {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progressFill.style.width = `${progressPercent}%`;

    // Time Display Logic
    let curMin = Math.floor(currentTime / 60);
    let curSec = Math.floor(currentTime % 60);
    if (curSec < 10) curSec = `0${curSec}`;
    document.getElementById("current").innerText = `${curMin}:${curSec}`;
});

// 6. AUTO-PLAY NEXT TRACK
audio.addEventListener("ended", nextSong);

// EVENT LISTENERS
playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// Initial Load
loadSong(playlist[songIndex]);

```
