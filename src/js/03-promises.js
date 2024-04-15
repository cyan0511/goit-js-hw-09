import { Notify } from "notiflix";

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}

const btnSubmit = document.querySelector("[type=submit]");
const inputDelay = document.querySelector("[name=delay]");
const inputStep = document.querySelector("[name=step]");
const inputAmount = document.querySelector("[name=amount]");

btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  const step = inputStep.value;
  const delay = inputDelay.value;
  const amount = inputAmount.value;

  setTimeout(() => {
    let count = 0;
    const handle = setInterval(() => {
      if (count >= amount) {
        clearInterval(handle);
        return;
      }
      count++;
      createPromise(count, delay)
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }, step);
  }, delay);
});
