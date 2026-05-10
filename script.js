const apiKey =
  "9388b2a59582496db91161219253108";

/* =========================
   GET WEATHER
========================= */

async function getWeather(city) {

  const location =
    city ||
    document.getElementById(
      "locationInput"
    ).value;

  const weatherResult =
    document.getElementById(
      "weatherResult"
    );

  const forecastContainer =
    document.getElementById(
      "forecastContainer"
    );

  if (location === "") {

    alert("Enter city name");

    return;
  }

  try {

    const url =
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=5&aqi=yes&alerts=no`;

    const response =
      await fetch(url);

    const data =
      await response.json();

    // ERROR HANDLING

    if (data.error) {

      weatherResult.innerHTML =
        `<h3>${data.error.message}</h3>`;

      forecastContainer.innerHTML = "";

      return;
    }

    showCurrentWeather(data);

    showForecast(data);

  } catch (error) {

    console.log(error);

    weatherResult.innerHTML =
      `<h3>Error fetching weather</h3>`;
  }
}

/* =========================
   CURRENT WEATHER
========================= */

function showCurrentWeather(data) {

  const weatherResult =
    document.getElementById(
      "weatherResult"
    );

  weatherResult.innerHTML = `

    <h2>
      ${data.location.name},
      ${data.location.country}
    </h2>

    <img
      class="weather-icon"
      src="${data.current.condition.icon}"
    >

    <h1>
      ${data.current.temp_c}°C
    </h1>

    <p>
      ${data.current.condition.text}
    </p>

    <p>
      💧 Humidity:
      ${data.current.humidity}%
    </p>

    <p>
      💨 Wind:
      ${data.current.wind_kph} kph
    </p>
  `;
}

/* =========================
   FORECAST
========================= */

function showForecast(data) {

  const forecastContainer =
    document.getElementById(
      "forecastContainer"
    );

  forecastContainer.innerHTML =
    `<div class="forecast"></div>`;

  const forecast =
    document.querySelector(".forecast");

  data.forecast.forecastday.forEach(day => {

    forecast.innerHTML += `

      <div class="forecast-card">

        <h4>
          ${day.date}
        </h4>

        <img
          src="${day.day.condition.icon}"
        >

        <p>
          ${day.day.avgtemp_c}°C
        </p>

      </div>
    `;
  });
}

/* =========================
   CURRENT LOCATION
========================= */

function getCurrentLocationWeather() {

  navigator.geolocation.getCurrentPosition(

    async(position) => {

      const lat =
        position.coords.latitude;

      const lon =
        position.coords.longitude;

      getWeather(`${lat},${lon}`);
    },

    () => {

      alert(
        "Location access denied"
      );
    }
  );
}

/* =========================
   DARK MODE
========================= */

const darkBtn =
  document.getElementById(
    "darkModeBtn"
  );

darkBtn.addEventListener(
  "click",
  () => {

    document.body.classList.toggle(
      "dark-mode"
    );
  }
);