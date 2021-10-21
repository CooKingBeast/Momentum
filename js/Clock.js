const timeSelector = document.querySelector(".time");
const dateSelector = document.querySelector(".date");

function showDate() {
  const date = new Date();
  const options = {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "UTC",
  };
  const currentDate = date.toLocaleDateString("de-De", options);
  dateSelector.textContent = currentDate;
  console.log(currentDate, "curDate");
}

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  timeSelector.textContent = currentTime;
  setTimeout(showTime, 1000);
  showDate();
}
showTime();
