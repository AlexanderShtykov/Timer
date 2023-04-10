const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");

const createTimerAnimator = () => {
  let interval = null;

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

  return (seconds) => {
    clearInterval(interval);
    const { hh, mm, ss, currentTime } = getSecondsConverter(seconds);
    let secondIncrement = 0;

    const updateTimer = () => {
      currentTime.setHours(hh, mm, ss - secondIncrement);
      const timer = getFormatedTime(currentTime);
      timerEl.textContent = timer;
      secondIncrement++;

      if (timer === "00:00:00") {
        clearInterval(interval);
      }
    };

    interval = setInterval(updateTimer, 1000);
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
