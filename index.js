const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");

const createTimerAnimator = () => {
  let interval;

  const getFormatedTime = (currentTime) => {
    const addZeroToString = (time) =>
      time.toString().length == 2 ? time : "0" + time;

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
    let secondIncrement = 0;
    const { hh, mm, ss, currentTime } = getSecondsConverter(seconds);
    clearInterval(interval);
    interval = setInterval(() => {
      currentTime.setHours(hh, mm, ss - secondIncrement);
      spanTimer = getFormatedTime(currentTime);
      timerEl.innerHTML = spanTimer;
      secondIncrement++;
      if (spanTimer === "00:00:00") {
        clearInterval(interval);
      }
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
