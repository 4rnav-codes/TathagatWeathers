const API_KEY = "6e16721118d37632436c59e0cdf18c96";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherDisplay = document.getElementById("weatherDisplay");
const errorText = document.getElementById("errorId");

// Search Button Click
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeatherData(city);
  } else {
    displayError("Please enter a city name");
  }
});

// Fetch Weather Data (Celsius)
async function fetchWeatherData(city) {
  weatherDisplay.innerHTML = "";
  errorText.textContent = "";
  weatherDisplay.classList.remove("error");

  const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      displayWeather(data);
    } else {
      displayError(data.message || "City not found");
    }
  } catch (error) {
    console.error("Error:", error);
    displayError("Unable to fetch weather. Try again later.");
  }
}

// Display Weather Data
function displayWeather(data) {
  if (!data || !data.main || !data.weather) {
    displayError("Unexpected data format.");
    return;
  }

  const { name, main, weather, sys, wind } = data;
  const temperature = main.temp;
  const feelsLike = main.feels_like;
  const description = weather[0].description;
  const iconCode = weather[0].icon;

  weatherDisplay.innerHTML = `
    <h2>${name}, ${sys.country}</h2>
    <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${description}">
    <p class="temperature">${Math.round(temperature)}°C</p>
    <p>Feels Like: ${Math.round(feelsLike)}°C</p>
    <p>Condition: ${description.charAt(0).toUpperCase() + description.slice(1)}</p>
    <p>Humidity: ${main.humidity}%</p>
    <p>Wind Speed: ${wind.speed} m/s</p>
  `;

  weatherDisplay.classList.remove("error");
}

// Display Error
function displayError(message) {
  weatherDisplay.innerHTML = "<p class='weatherDisplayText'>No weather data available.</p>";
  errorText.textContent = message;
  weatherDisplay.classList.add("error");
}
