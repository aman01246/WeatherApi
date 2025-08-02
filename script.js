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
          getData(`http://api.weatherapi.com/v1/current.json?key=c4d6b8c848ef44f68c512239252907&q=${userInput.value}`)
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




        }

       
        function nextWeatherData(){
            fetch(`https://api.weatherapi.com/v1/forecast.json?key=c4d6b8c848ef44f68c512239252907&q=${userInput.value}&days=4`)
            .then((res)=>res.json())
            .then((data)=>nextWeatherData(data))
            .catch((err)=>console.log(err))
        }
        nextWeatherData()
        function nextWeather(data){

            const NextDayName = document.getElementById('dayName');
            const nextTemp = document.getElementById('nextTemp');
            const nextWind = document.getElementById('nextWind');
            const humidity = document.getElementById('humidity');
            
            



        }
        

    