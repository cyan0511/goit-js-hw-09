const bodyEl = document.body;
const btnStart = document.querySelector("[data-start");
const btnStop = document.querySelector("[data-stop");
btnStop.disabled = true;

let timerId = null;

btnStart.addEventListener("click", (e) => {
  toggleButtonAccess();
  changeBodyColor();
});

btnStop.addEventListener("click", (e) => {
  toggleButtonAccess();
  clearInterval(timerId);
});

function toggleButtonAccess() {
  btnStart.disabled = !btnStart.disabled;
  btnStop.disabled = !btnStart.disabled;
}

function changeBodyColor() {
  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
