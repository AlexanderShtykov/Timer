const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");

const createTimerAnimator = () => {
  let interval;
  return (seconds) => {
    let secondPlus = 0;
    const { hh, mm, ss, currentTime } = getSecondsConverter(seconds);
    clearInterval(interval);
    interval = setInterval(() => {
      currentTime.setHours(hh, mm, ss + secondPlus);
      timerEl.innerHTML = getFormatedTime(currentTime);
      secondPlus++;
    }, 1000);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener("input", () => {
  inputEl.value = inputEl.value.replace(/[^0-9]/g, "");
});

buttonEl.addEventListener("click", () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = "";
});

function getFormatedTime(currentTime) {
  const addZeroToString = (currentTime) => {
    return currentTime.toString().length == 2 ? currentTime : "0" + currentTime;
  };
  return (
    addZeroToString(currentTime.getHours()) +
    ":" +
    addZeroToString(currentTime.getMinutes()) +
    ":" +
    addZeroToString(currentTime.getSeconds())
  );
}

function getSecondsConverter(seconds) {
  const DAY_PER_SECONDS = 86400;
  if (seconds > DAY_PER_SECONDS) {
    seconds = seconds - Math.floor(seconds / DAY_PER_SECONDS) * DAY_PER_SECONDS;
  }

  return {
    hh: Math.floor(seconds / 3600),
    mm: Math.floor((seconds % 3600) / 60),
    ss: seconds % 60,
    currentTime: new Date(),
  };
}
