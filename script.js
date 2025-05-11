const apiKey = "14139bfbd1030e3af21029a76794eaab";

function startApp() {
  document.getElementById("welcomeScreen").classList.add("hidden");
  document.getElementById("weatherScreen").classList.remove("hidden");
}

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) {
    alert("Please enter a city.");
    return;
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );
  const data = await response.json();

  if (data.cod !== 200) {
    alert("City not found!");
    return;
  }

  document.getElementById("city").innerText = data.name;
  document.getElementById("date").innerText = new Date().toISOString().split("T")[0];
  document.getElementById("temperature").innerText = `${data.main.temp.toFixed(1)} °C`;
  document.getElementById("condition").innerText = data.weather[0].description;
  document.getElementById("pressure").innerText = data.main.pressure;
  document.getElementById("humidity").innerText = data.main.humidity;
  document.getElementById("wind").innerText = data.wind.speed;

  getForecast(city);
}

async function getForecast(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
  );
  const data = await response.json();

  const container = document.getElementById("forecastContainer");
  container.innerHTML = "";

  const filtered = data.list.filter((_, index) => index % 8 === 0);
  filtered.slice(0, 5).forEach(day => {
    const date = day.dt_txt.split(" ")[0];
    const temp = `${day.main.temp.toFixed(1)}°`;
    const iconCode = day.weather[0].icon;
    const icon = `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="icon" width="40" />`;

    const div = document.createElement("div");
    div.className = "forecast-day";
    div.innerHTML = `<p>${date}</p>${icon}<p>${temp}</p>`;
    container.appendChild(div);
  });
}
