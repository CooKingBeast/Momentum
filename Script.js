const dateSelector = document.querySelector(".date");

function showDate() {
  const date = new Date();
  const options = {
    month: "long",
    day: "numeric",
    weekday: "long",
    timeZone: "UTC",
  };
  const currentDate = date.toLocaleDateString("en-US", options);
  dateSelector.textContent = currentDate;
  console.log(currentDate, "curDate");
}

const greetingSelector = document.querySelector(".greeting");

function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  let timeOfDay;
  switch (true) {
    case hours >= 6 && hours < 12:
      timeOfDay = "morning";
      break;

    case hours >= 12 && hours < 18:
      console.log(hours, "den'");
      timeOfDay = "day";
      break;

    case hours >= 18 && hours <= 23:
      timeOfDay = "evening";
      break;

    case hours >= 0 && hours < 6:
      timeOfDay = "night";
      break;

    default:
      timeOfDay = "wrong day time";
      break;
  }
  return timeOfDay;
}
function showGreeting() {
  const greetingText = `Good ${getTimeOfDay()}`;
  //console.log(greetingText, "123")
  greetingSelector.textContent = greetingText;
}
const nameSelector = document.querySelector(".name");

function setLocalStorage() {
  localStorage.setItem("name", nameSelector.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if (localStorage.getItem("name")) {
    nameSelector.value = localStorage.getItem("name");
  }
}
window.addEventListener("load", getLocalStorage);

const timeSelector = document.querySelector(".time");

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  timeSelector.textContent = currentTime;
  //setTimeout(showTime, 1000);
  showDate();
  showGreeting();
}
showTime();
