const audio = document.getElementById("audio");
const playButton = document.getElementById("playButton");
const progressArea = document.getElementById("progressArea");
const progressFill = document.getElementById("progressFill");
const progressDot = document.getElementById("progressDot");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

async function togglePlay() {
  if (audio.paused) {
    try {
      await audio.play();
      document.body.classList.add("playing");
    } catch (error) {
      console.error("Audio could not start:", error);
    }
  } else {
    audio.pause();
  }
}

playButton.addEventListener("click", togglePlay);

audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;
  const percent = (audio.currentTime / audio.duration) * 100;
  progressFill.style.width = `${percent}%`;
  progressDot.style.left = `${percent}%`;
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

audio.addEventListener("play", () => {
  document.body.classList.add("playing");
});

audio.addEventListener("pause", () => {
  document.body.classList.remove("playing");
});

audio.addEventListener("ended", () => {
  document.body.classList.remove("playing");
  progressFill.style.width = "0%";
  progressDot.style.left = "0%";
  currentTimeEl.textContent = "0:00";
});

function seek(event) {
  if (!audio.duration) return;

  const rect = progressArea.getBoundingClientRect();
  const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
  audio.currentTime = (x / rect.width) * audio.duration;
}

progressArea.addEventListener("click", seek);
