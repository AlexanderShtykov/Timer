const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");

const createTimerAnimator = () => {
  let interval = null;
  let secondIncrement = 0;

  const getSecondsConverter = (seconds) => {
    const DAY_PER_SECONDS = 86400;
    if (seconds > DAY_PER_SECONDS) {
      seconds =
        seconds - Math.floor(seconds / DAY_PER_SECONDS) * DAY_PER_SECONDS;
    }

    return {
      hh: Math.floor(seconds / 3600),
      mm: Math.floor((seconds % 3600) / 60),
      ss: seconds % 60,
      currentTime: new Date(),
    };
  };

  const getFormatedTime = (currentTime) => {
    const addZeroToString = (time) =>
      time.toString().length === 1 ? "0" + time : time;

    return (
      addZeroToString(currentTime.getHours()) +
      ":" +
      addZeroToString(currentTime.getMinutes()) +
      ":" +
      addZeroToString(currentTime.getSeconds())
    );
  };

  const updateTimer = (hh, mm, ss, currentTime) => {
    currentTime.setHours(hh, mm, ss - secondIncrement);

    const timer = getFormatedTime(currentTime);
    timerEl.textContent = timer;

    secondIncrement++;
    if (timer === "00:00:00") {
      clearInterval(interval);
      secondIncrement = 0;
    }
  };

  return (seconds) => {
    clearInterval(interval);
    secondIncrement = 0;
    const { hh, mm, ss, currentTime } = getSecondsConverter(seconds);
    interval = setInterval(() => updateTimer(hh, mm, ss, currentTime), 1000);
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
