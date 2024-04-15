import { Notify } from "notiflix";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const datetimePicker = document.getElementById("datetime-picker");
const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");
const btnStart = document.querySelector("[data-start]");
btnStart.disabled = true;

let selectedDate = new Date();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    btnStart.disabled = true;
    const now = new Date();
    const dateDiff = selectedDates[0].getTime() - now.getTime();

    if (dateDiff < 0) {
      Notify.failure("Please choose a date in the future");
      return;
    }

    selectedDate = selectedDates[0];
    btnStart.disabled = false;

    if (timerId) {
      clearInterval(timerId);
    }
  },
};

let timerId;
btnStart.addEventListener("click", () => {
  timerId = setInterval(() => {
    btnStart.disabled = true;
    const now = new Date();
    const dateDiff = selectedDate.getTime() - now.getTime();

    if (dateDiff < 0) {
      clearInterval(timerId);
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(dateDiff);
    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
  }, 1000);
});

flatpickr(datetimePicker, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(number) {
  return number.toString().padStart(2, "0");
}
