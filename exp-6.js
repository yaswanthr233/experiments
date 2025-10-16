const apiKey = "YOUR_API_KEY";
const weatherOutput = document.getElementById("weatherOutput");
const errorMsg = document.getElementById("errorMsg");
const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.getElementById("getWeatherBtn");
async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    displayWeather(data);
    localStorage.setItem("lastCity", city);
  } catch (error) {
    weatherOutput.innerHTML = "";
    errorMsg.textContent = error.message;
  }
}
function displayWeather(data) {
  const { name, main, weather } = data;
  errorMsg.textContent = "";

  weatherOutput.innerHTML = `
    <h3>${name}</h3>
    <p>🌡️ Temperature: ${main.temp}°C</p>
    <p>☁️ Condition: ${weather[0].description}</p>
  `;
}
getWeatherBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city === "") {
    errorMsg.textContent = "Please enter a city name";
    return;
  }
  getWeather(city);
});
window.addEventListener("load", () => {
  const lastCity = localStorage.getItem("lastCity");
  if (lastCity) {
    cityInput.value = lastCity;
    getWeather(lastCity);
  }
});
