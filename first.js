const apiKey = "034c56a983624948b9a43729250701";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`);

    if (response.status == 400 || response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.location.name;
        document.querySelector(".temp").innerHTML = Math.round(data.current.temp_c) + "°C";
        document.querySelector(".humidity").innerHTML = data.current.humidity + "%";
        document.querySelector(".wind").innerHTML = data.current.wind_kph + " km/h";

        let condition = data.current.condition.text;

        if (condition.includes("Cloud")) {
            weatherIcon.src = "./clouds.png";
        }
        else if (condition.includes("Clear")) {
            weatherIcon.src = "./clear.png";
        }
        else if (condition.includes("Rain")) {
            weatherIcon.src = "./rain.png";
        }
        else if (condition.includes("Drizzle")) {
            weatherIcon.src = "./drizzle.png";
        }
        else if (condition.includes("Mist") || condition.includes("Fog")) {
            weatherIcon.src = "./mist.png";
        } else {
            weatherIcon.src = "./default.png"; // Default image
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});



//also work when enter is pressed
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
  });





