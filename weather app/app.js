window.addEventListener('load', ()=>{
    let KELVIN = 273;
    
    let notificationElement = document.querySelector(".notification")
    let iconElement = document.querySelector(".iconImage");
    let temperatureDesc = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let degreeSection = document.querySelector('.degree-section');
    let degreeSpan = document.querySelector('.degree-section span');

    if('geolocation' in navigator){
        navigator.geolocation.getCurrentPosition(setPosition, showError);
    }else{
        notificationElement.style.display = "block";
        notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
    }
    
    // SET USER'S POSITION
    function setPosition(position){
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        
        getWeather(latitude, longitude);
    }
    
    // SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
    function showError(error){
        notificationElement.style.display = "block";
        notificationElement.innerHTML = `<p> ${error.message} </p>`;
    }
    // CALL API
    function getWeather(latitude, longitude){
        let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=1c80e3d5764cebb11b5d69335c720d9d`;
        // CONVERT TO JSON
        fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data =>{
            // TAKE WHAT YOU WANT FROM JSON 
            const weatherIcon = data.weather[0].icon;
            temperatureDegree.textContent = Math.floor(data.main.temp - KELVIN);
            temperatureDesc.textContent = data.weather[0].description;
            locationTimezone.textContent = data.name;
            iconElement.innerHTML = `<img src="icons/${weatherIcon}.png"/>`;

            // CHANGE TEMPERATURE FROM CELSIUS TO FAHRENEIT
            degreeSection.addEventListener('click', ()=>{
                if(degreeSpan.textContent == "F"){
                    degreeSpan.textContent = "C";
                    temperatureDegree.textContent = Math.floor(data.main.temp - KELVIN);
                }else{
                    degreeSpan.textContent = "F";
                    temperatureDegree.textContent = data.main.temp;
                }
                
            })
            
        })    
    }

    
})