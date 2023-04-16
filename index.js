const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");

const createTimerAnimator = () => {
  let interval = null;
  let secondDecrement = 0;

  const getSecondsConverter = (seconds) => {
    const hh = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");

    const mm = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");

    const ss = (seconds % 60).toString().padStart(2, "0");

    return `${hh}:${mm}:${ss}`;
  };

  const updateTimer = () => {
    const timer = getSecondsConverter(secondDecrement);
    timerEl.textContent = timer;

    secondDecrement--;
    if (timer === "00:00:00") {
      clearInterval(interval);
      secondDecrement = 0;
    }
  };

  return (seconds) => {
    clearInterval(interval);
    secondDecrement = seconds;
    interval = setInterval(updateTimer, 1000);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener("input", () => {
  inputEl.value = inputEl.value.replace(/^0+|[^0-9]/g, "");
});

buttonEl.addEventListener("click", () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = "";
});
