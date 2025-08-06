const userInput = document.getElementById('Userinput');
const btnSearch = document.getElementById('btn1');


const weather = document.getElementById('currentWeather');


// let apiKey = c4d6b8c848ef44f68c512239252907 
// api = `http://api.weatherapi.com/v1/current.json?key=c4d6b8c848ef44f68c512239252907&q=${userInput.value}`

        // `http://api.weatherapi.com/v1/current.json?key=be96115c8a3b4ab7b2655227252807&q=${inp.value}`

         // fetch(`http://api.weatherapi.com/v1/current.json?key=c4d6b8c848ef44f68c512239252907&q=${userInput.value}`)
            // .then((res) => res.json())
            // .then((data) => console.log(data))
            // // ())
            // .catch((err) => console.log(err))


    const btnLocation = document.getElementById('locationBtn');

    // function location(){
    //     if(navigator.geolocation){

    //     }

    // }


        async function getData(url){         
            try{
                const res = await fetch(url)
                const data = await res.json();
                displayData(data)
            }
            catch(err){
                console.log(err);   
            }
        }



        const weatherContent = document.getElementById('weather_content')
        const weatherImg = document.getElementById('weatherImg')

        btnSearch.addEventListener('click',()=>{
          getData(`https://api.weatherapi.com/v1/current.json?key=c4d6b8c848ef44f68c512239252907&q=${userInput.value}`)
        })

        function displayData(data){
            const city = document.getElementById('cityW')
            const state = document.getElementById('stateW')
            const temp = document.getElementById('tempW')
            const icon = document.getElementById('wImg')
            const wind = document.getElementById('wind')
            const humidity = document.getElementById('humidity')
            const text = document.getElementById('text')

            city.textContent = data.location.name;
            state.textContent = data.location.region;

            temp.innerHTML = data.current.temp_c;
            icon.src = data.current.condition.icon;
            icon.style.height = "100px";
            icon.style.width = "100px";
            wind.textContent = data.current.wind_kph;
            text.textContent = data.current.condition.text;
           humidity.textContent = data.current.humidity;

             nextWeatherData();


        }

       
        function nextWeatherData(){
            // "http://api.weatherapi.com/v1/forecast.json?key=&q=London&days=4&aqi=no&alerts=no"
            fetch(`https://api.weatherapi.com/v1/forecast.json?key=c4d6b8c848ef44f68c512239252907&q=${userInput.value}&days=5`)
            .then((res)=>res.json())
            .then((data)=>nextWeather(data))
            .catch((err)=>console.log(err))
        }
       
        function nextWeather(data){
           const main =  document.getElementById("nextWeather");
           main.innerHTML = ""
            console.log(data.forecast);
            if(data){
                data.forecast.forecastday.forEach((day,index)=>{
                       if(index > 0){
                         const d = document.createElement("div");
                        d.innerHTML = `
                         <div class="weather bg-secondary " id="nextBox1">
                            <p><span>(</span><span id="dayName">${getDayName(day.date)}</span><span>)</span></p>
                            <p><span>Temp :</span><span id="nextTemp">${day.day.avgtemp_c}</span><span><sup>O</sup>C</span></p>
                            <p><span>Wind :</span><span id="nextWind">${day.day.maxwind_kph}</span><span>Km/h</span></p>
                            <p><span>Humidity : </span><span id="humidity">${day.day.avghumidity}</span><span>%</span></p>

                        </div>
                        
                        `
                        main.append(d);
                       }
                })
            }
            // const NextDayName = document.getElementById('dayName');
            // const nextTemp = document.getElementById('nextTemp');
            // const nextWind = document.getElementById('nextWind');
            // const humidity = document.getElementById('humidity');
            
            



        }



btnLocation.addEventListener('click',()=>{
    navigator.geolocation.getCurrentPosition(
  function (position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);

    // Proceed to reverse geocoding to get city name
    getCityName(latitude, longitude);
  },
  function (error) {
    console.error("Error getting location:", error);
  }
);
})

function getCityName(latitude, longitude) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const city = data.address.city || data.address.town || data.address.village || data.address.hamlet;
      userInput.value = city;
      btnSearch.click()
    })
    .catch(error => {
      console.error("Error in reverse geocoding:", error);
    });
}

function getDayName(dateString) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const date = new Date(dateString);  
  const dayIndex = date.getDay();
  return days[dayIndex];
}


        


   

    
