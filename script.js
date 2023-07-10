const apiKey = "33a92cd7df2a4056a8272008231606";
const apiUrl = "http://api.weatherapi.com/v1/current.json?&aqi=yes";

const searchInput = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city){
    const response = await fetch(apiUrl +`&q=${city}`  + `&key=${apiKey}`);
    if(response.status == 401){
      document.querySelector(".error").style.display = "block";  
      document.querySelector(".weather").style.display = "none";  
    }else{
        var data = await response.json();

        console.log(data)
    
        document.querySelector(".city").innerHTML = data.location.name;
        document.querySelector(".temp").innerHTML = Math.round(data.current.temp_c)+"°C";
        document.querySelector(".humidity").innerHTML = data.current.humidity+"%";
        document.querySelector(".wind").innerHTML = data.current.wind_kph + "kph";
        
        if(data.current.condition.text === 'Partly cloudy'){
          weatherIcon.src = "images/clouds.png";
        }else if(data.current.condition.text === 'Sunny'){
            weatherIcon.src = "images/clear.png";  
        }else if(data.current.condition.text === 'Rainy'){
            weatherIcon.src = "images/rain.png";  
        }else if(data.current.condition.text === 'Drizzle'){
            weatherIcon.src = "images/drizzle.png";  
        }else if(data.current.condition.text === 'Mist'){
            weatherIcon.src = "images/mist.png";  
        }else if(data.current.condition.text === 'Snow'){
            weatherIcon.src = "images/snow.png";  
        }
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none"; 
    }

    searchInput.value = ""
}
searchBtn.addEventListener("click", ()=>{
    checkWeather(searchInput.value)
});
