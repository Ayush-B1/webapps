const weatherform = document.querySelector(".weatherform");
const cityInput = document.querySelector(".CityInput");
const card = document.querySelector(".card");
const apikey = "";

weatherform.addEventListener("submit", async event => {
    event.preventDefault();

    const City = cityInput.value;

    if (City) {
        try{
            const weatherdata = await getweatherdata(City);
            displayweatherinfo(weatherdata);
        }catch(error){
            console.error(error);
            displayerror(error);
        }
    } else {
        displayerror("Please enter a city");
    }
});

async function getweatherdata(City) {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${apikey}`;
    const response = await fetch(apiurl);
    if(!response.ok){
        throw new Error("could not fetch data");
    }
    return await response.json();
}

function displayweatherinfo(data) {
    const {name: City, main: {temp, humidity}, weather: [{description, id}]} = data;

    card.textContent = "";
    card.style.display = "flex";


    const citydisplay = document.createElement("h1")
    const tempdisplay = document.createElement("p")
    const humiditydisplay = document.createElement("p")
    const descriptiondisplay = document.createElement("p")
    const weatheremoji = document.createElement("p")

    citydisplay.textContent = City;
    citydisplay.classList.add("citydisplay")
    card.appendChild(citydisplay);

    tempdisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    tempdisplay.classList.add("tempdisplay")
    card.appendChild(tempdisplay);

    humiditydisplay.textContent = `Humidity: ${humidity}%`;
    humiditydisplay.classList.add("humiditydisplay")
    card.appendChild(humiditydisplay);

    descriptiondisplay.textContent = description;
    descriptiondisplay.classList.add("descriptiondisplay")
    card.appendChild(descriptiondisplay);

    weatheremoji.textContent = getweatheremoji(id);
    weatheremoji.classList.add("weatheremoji");
    card.appendChild(weatheremoji);
}

function getweatheremoji(weatherid) {
    switch(true){
        case (weatherid >= 200 && weatherid < 300):
            return "⚡";
        case (weatherid >= 300 && weatherid < 400):
            return "⛈️";
        case (weatherid >= 500 && weatherid < 600):
            return "⛈️";
        case (weatherid >= 600 && weatherid < 700):
            return "❄️";
        case (weatherid >= 700 && weatherid < 800):
            return "🌫️";
        case (weatherid === 800):
            return "☀️";
        case (weatherid >= 801 && weatherid < 810):
            return "⛅";
        default: 
            return "🤔";


        
    }
}

function displayerror(message) {
    const errordisplay = document.createElement("p");
    errordisplay.textContent = message;
    errordisplay.classList.add("errordisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errordisplay);
}
