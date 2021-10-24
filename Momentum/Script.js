const dateSelector = document.querySelector(".date");
const greetingSelector = document.querySelector(".greeting");
const nameSelector = document.querySelector(".name");
const bodySelector = document.querySelector("body");
const slideNextSelector = document.querySelector(".slide-next");
const slidePrevSelector = document.querySelector(".slide-prev");
const timeSelector = document.querySelector(".time");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const citySelector = document.querySelector(".city");
const windSelector = document.querySelector(".wind");
const humiditySelector = document.querySelector(".humidity");
const quoteSelector = document.querySelector(".quote");
const authorSelector = document.querySelector(".author");
const changeQuoteSelector = document.querySelector(".change-quote")

citySelector.addEventListener("change", () => {
  getWeather(citySelector.value);
});
window.addEventListener("beforeunload", setLocalStorage);
window.addEventListener("load", getLocalStorage);
slideNextSelector.addEventListener("click", getSlideNext);
slidePrevSelector.addEventListener("click", getSlidePrev);
changeQuoteSelector.addEventListener("click", getQuotes);
let randomNum = getRandomInt(1, 21);

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
  //console.log(currentDate, "curDate");
}

function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  let timeOfDay;
  switch (true) {
    case hours >= 6 && hours < 12:
      timeOfDay = "morning";
      break;

    case hours >= 12 && hours < 18:
      timeOfDay = "afternoon";
      break;

    case hours >= 18 && hours <= 23:
      timeOfDay = "evening";
      break;

    case hours >= 0 && hours < 06:
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

function setLocalStorage() {
  localStorage.setItem("name", nameSelector.value);
}

function getLocalStorage() {
  if (localStorage.getItem("name")) {
    nameSelector.value = localStorage.getItem("name");
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function setBg(randomNum) {
  const img = new Image();
  let timeOfDay = getTimeOfDay();
  let bgNum = randomNum.toString().padStart(2, "0");
  // bodySelector.style.backgroundImage = `url('https://raw.githubusercontent.com/CooKingBeast//stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`;
  //console.log(bodySelector.style.backgroundImage, " img number");
  img.src = `https://raw.githubusercontent.com/CooKingBeast//stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  //console.log(img.src);
  img.onload = () => {
    bodySelector.style.backgroundImage = `url('https://raw.githubusercontent.com/CooKingBeast//stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`;
  };
}
setBg(randomNum);

function getSlideNext() {
  if (randomNum < 20) {
    randomNum += 1;
  } else {
    randomNum = 1;
  }
  console.log(randomNum, "123");
  setBg(randomNum);
}

function getSlidePrev() {
  if (randomNum >= 2) {
    randomNum -= 1;
  } else {
    randomNum = 20;
  }
  console.log(randomNum, "123");
  setBg(randomNum);
}

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  timeSelector.textContent = currentTime;
  setTimeout(showTime, 1000);
  showDate();
  showGreeting();
}
showTime();

async function getWeather(cityInput) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&lang=en&appid=4ada66ddf05802af358c8b69ed55adaf&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  const tempRound = Math.round(data.main.temp);
  const windSpeedRound = Math.round(data.wind.speed);

  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${tempRound}°C`;
  weatherDescription.textContent = data.weather[0].description;
  windSelector.textContent = `Wind speed: ${windSpeedRound} m/s`;
  humiditySelector.textContent = `Humidity: ${data.main.humidity} %`;
}
getWeather();

async function getQuotes() {  
  const quotes = '../Quotes.json';
  const res = await fetch(quotes);
  const data = await res.json(); 
  const randomQuote = getRandomInt(0, 102);
  quoteSelector.textContent = data[randomQuote].quote;
  authorSelector.textContent = data[randomQuote].author;
}
getQuotes();

