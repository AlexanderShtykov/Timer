const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  let interval;
  return (seconds) => {
    let secondPlus = 0;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    const hh = hours.toString().padStart(2, "0");
    const mm = minutes.toString().padStart(2, "0");
    const ss = remainingSeconds.toString().padStart(2, "0");
    const currentTime = new Date();
    clearInterval(interval);
    interval = setInterval(() => {
      currentTime.setHours(hh, mm, ss + secondPlus);
      innerTimeSpan =
        currentTime.getHours() +
        ":" +
        currentTime.getMinutes() +
        ":" +
        currentTime.getSeconds();
      timerEl.innerHTML = innerTimeSpan;
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
