console.log("Welcome to Spotify");
let currentSong = new Audio();
let currentTrackName = "";

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);

    // Add leading zeros
    minutes = minutes < 10 ? "0" + minutes : minutes;
    secs = secs < 10 ? "0" + secs : secs;

    return `${minutes}:${secs}`;
}

async function getSongs(folder) {
    let response = await fetch("songs.json");
    let songFiles = await response.json();
    let songs = songFiles.map(file => "songs/" + file);
    return songs;
}


const PlayMusic = (track, pause = false) => {
    currentSong.src = "/songs/" + track + ".mp3";
    if (!pause) {
        currentSong.play();
    }
    play.src = "pause.svg";
    currentTrackName = track;
    document.querySelector(".songinfo").innerHTML = track;
}

async function main() {

    let songs = await getSongs();
    // currentSong.src = songs[0];
    PlayMusic(songs[0].split("/").pop().replace(".mp3", ""), true);

    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li>
                            <img src="music.svg" alt="">
                            <div class="info">
                                <div>${song.split("/").pop().replace(".mp3", "")}</div>
                                <div>Sevanth</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img class="invert " src="play.svg" alt="">
                            </div>
                        </li>`;
    }

    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log(e.querySelector(".info").firstElementChild.innerHTML);
            PlayMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
        });
    });

    // attach an event listener to play,  next and previous buttons
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "pause.svg";
            document.querySelector(".songinfo").innerHTML = currentTrackName;
            document.querySelector(".songtime").innerHTML = "0:00/ 0:00";
        } else {
            currentSong.pause();
            play.src = "play.svg";
        }
    });

    // listen to timeupdate event
    currentSong.addEventListener("timeupdate", () => {
        console.log("currentSong.currentTime, currentSong.duration");
        document.querySelector(".songtime").innerHTML = `${formatTime(currentSong.currentTime)}/${formatTime(currentSong.duration)}`;
    document.querySelector(".circle").style.width = `${(currentSong.currentTime / currentSong.duration) * 100}%`;
    });

    // Add an event listener to seekbar
    document.querySelector(".seekbar").addEventListener("click", (e) => {
        let percent = e.offsetX / e.currentTarget.offsetWidth;
        currentSong.currentTime = percent * currentSong.duration;
        document.querySelector(".circle").style.width = `${percent * 100}%`;
    });

    // Addd an event listen to previous clicked
    previous.addEventListener("click", () => {
        let currentIndex = songs.findIndex(song => song.split("/").pop().replace(".mp3", "") === currentTrackName);
        let previousIndex = (currentIndex - 1 + songs.length) % songs.length;
        PlayMusic(songs[previousIndex].split("/").pop().replace(".mp3", ""));
    });

    // Addd an event listen to next clicked
    next.addEventListener("click", () => {
        let currentIndex = songs.findIndex(song => song.split("/").pop().replace(".mp3", "") === currentTrackName);
        let nextIndex = (currentIndex + 1) % songs.length;
        PlayMusic(songs[nextIndex].split("/").pop().replace(".mp3", ""));
    });

}

main();
