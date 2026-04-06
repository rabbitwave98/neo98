let player;
let currentIndex = 0;

const playlist = [
  { id: "OUfDs5Eh_i0", title: "HeadOverHeels // Tears for Fears x KwanLi" },
  { id: "hflvTmh_9qA", title: "Start A Cult (music box) // Cult of the Lamb x R3 Music Box" },
  { id: "ygkT0qCstmo", title: "Show 'n Tell // Adam Kane" },
  { id: "GM14B2e1cGU", title: "Chill Afternoon Near the Mekong // Jim" }  
];

function onYouTubeIframeAPIReady() {
  player = new YT.Player("yt-player", {
    height: "1",
    width: "1",
    videoId: playlist[currentIndex].id,
    playerVars: {
      autoplay: 0,
      controls: 0
    },
    events: {
      onReady: updateTitle,
      onStateChange: handleStateChange
    }
  });
}

function updateTitle() {
  document.getElementById("track-title").textContent =
    playlist[currentIndex].title;
}

function handleStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    nextTrack();
  }
}

function playPause() {
  const state = player.getPlayerState();
  const button = document.getElementById("play");

  if (state === YT.PlayerState.PLAYING) {
    player.pauseVideo();
    button.textContent = "▶";
  } else {
    player.playVideo();
    button.textContent = "⏸";
  }
}

function nextTrack() {
  currentIndex = (currentIndex + 1) % playlist.length;
  player.loadVideoById(playlist[currentIndex].id);
  updateTitle();
  document.getElementById("play").textContent = "⏸";
}

function prevTrack() {
  currentIndex =
    (currentIndex - 1 + playlist.length) % playlist.length;
  player.loadVideoById(playlist[currentIndex].id);
  updateTitle();
  document.getElementById("play").textContent = "⏸";
}

document.getElementById("play").addEventListener("click", playPause);
document.getElementById("next").addEventListener("click", nextTrack);
document.getElementById("prev").addEventListener("click", prevTrack);