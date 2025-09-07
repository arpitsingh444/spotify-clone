const playbar = document.querySelector(".playbar");
const cover = document.getElementById("cover");
const title = document.getElementById("song-title");
const artist = document.getElementById("song-artist");
const audio = document.getElementById("global-audio");
const playBtn = document.getElementById("playpause");
const seekbar = document.getElementById("seek");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volumeEl = document.getElementById("volume");

// 1️⃣ Handle play click from card
document.querySelectorAll(".card .play").forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".card");
    const songTitle = card.querySelector("span").textContent;
    const songArtist = card.querySelector("div").textContent;
    const songCover = card.querySelector("img").src;
    const songAudio = card.querySelector("audio")?.src;

    if (!songAudio) return alert("No audio source found");

    title.textContent = songTitle;
    artist.textContent = songArtist;
    cover.src = songCover;
    audio.src = songAudio;
    playbar.style.display = "flex";

    audio.play();
    playBtn.classList.remove("fa-circle-play");
    playBtn.classList.add("fa-circle-pause");
  });
});

// 2️⃣ Play/Pause toggle
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.classList.remove("fa-circle-play");
    playBtn.classList.add("fa-circle-pause");
  } else {
    audio.pause();
    playBtn.classList.remove("fa-circle-pause");
    playBtn.classList.add("fa-circle-play");
  }
});

// 3️⃣ Update Seekbar & Time
audio.addEventListener("timeupdate", () => {
  seekbar.value = (audio.currentTime / audio.duration) * 100 || 0;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
});

// 4️⃣ Seekbar change (user seeks)
seekbar.addEventListener("input", () => {
  audio.currentTime = (seekbar.value / 100) * audio.duration;
});

// 5️⃣ Volume Control
volumeEl.addEventListener("input", () => {
  audio.volume = volumeEl.value / 100;
});

// 6️⃣ Time Formatter
function formatTime(time) {
  if (isNaN(time)) return "0:00";
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}
