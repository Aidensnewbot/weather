// Get DOM elements
const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");
const locationName = document.getElementById("locationName");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");

// Check if user preferences are stored in local storage
const storedLocation = localStorage.getItem("location");

if (storedLocation) {
    locationInput.value = storedLocation;
    getWeather(storedLocation);
}

// Add event listener to search button
searchButton.addEventListener("click", () => {
    const userLocation = locationInput.value.trim();
    if (userLocation) {
        getWeather(userLocation);
        // Store user's location in local storage
        localStorage.setItem("location", userLocation);
    }
});

// Function to fetch weather data from OpenWeatherMap API
function getWeather(location) {
    const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            if (data.cod === 200) {
                locationName.textContent = data.name;
                temperature.textContent = data.main.temp;
                condition.textContent = data.weather[0].description;
            } else {
                alert("Location not found. Please try again.");
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}

// Display weather for New York by default
displayWeather("NewYork");
