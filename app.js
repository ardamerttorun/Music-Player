const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const play = document.querySelector("#controls #play");
const prev = document.querySelector("#controls #prev");
const next = document.querySelector("#controls #next");
const currentTime = document.querySelector("#current-time");
const duration = document.querySelector("#duration");
const progressBar=document.querySelector("#progress-bar");

const player = new MusicPlayer(musicList);

window.addEventListener("load", () => {
  let music = player.getMusic();
  displayMusic(music);
});

const displayMusic=(music) => {
  title.innerText = music.getName();
  singer.innerText = music.singer;
  image.src = "img/" + music.img;
  audio.src = "mp3/" + music.file;
}

play.addEventListener("click", () => {
  const isMusicPlay = container.classList.contains("playing");
  isMusicPlay ? pauseMusic() : playMusic();
});

prev.addEventListener("click", () => {
  prevMusic();
});

const prevMusic= () => {
  player.prev();
  let music = player.getMusic();
  displayMusic(music);
  playMusic();
}

next.addEventListener("click", () => {
  nextMusic();
});

const nextMusic=() => {
  player.next();
  let music = player.getMusic();
  displayMusic(music);
  playMusic();
}

const playMusic=() => {
  container.classList.add("playing");
  play.classList = "fa-solid fa-pause";
  audio.play();
}

const pauseMusic=() => {
  container.classList.remove("playing");
  play.classList = "fa-solid fa-play";
  audio.pause();
}

const calculateTime=(totalSecond)=>{
  const minute=Math.floor(totalSecond/60);
  const second=Math.floor(totalSecond % 60);
  const updatedSeconds =second<10 ? `0${second}`:`${second}`
  const conclusion=`${minute}:${updatedSeconds}`;
  return conclusion;
}

audio.addEventListener("loadedmetadata", () => {
    duration.textContent=calculateTime(audio.duration);
    progressBar.max=Math.floor(audio.duration);
});

audio.addEventListener("timeupdate",()=>{
  progressBar.value=Math.floor(audio.currentTime);
  currentTime.textContent=calculateTime(progressBar.value);
})

progressBar.addEventListener("input",()=>{
  currentTime.textContent=calculateTime(progressBar.value);
  audio.currentTime=progressBar.value;
})