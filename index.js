



(function(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            lng = position.coords.longitude;
            lat = position.coords.latitude;
            // got location
            let res = await axios.get(`https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lng}`)
            document.querySelector("#weather-heading").innerHTML = 'Weather in ' + res.data.name + ', ' + res.data.sys.country
            document.querySelector("#temp").innerHTML = `${res.data.main.temp}° C`
            // set icons
            if (res.data.weather[0].description.includes("rain")) {
                // rainy
                document.querySelector("#weather-icon").src = '/img/rain.svg'
            } else if (res.data.weather[0].description.includes("sun")) {
                // sunny
                document.querySelector("#weather-icon").src = '/img/sun.svg'
            } else if (res.data.weather[0].description.includes("cloud") || res.data.weather.description.includes("cloudy")) {
                // cloudy
                document.querySelector("#weather-icon").src = '/img/cloud.svg'
            } else {
                // partial
                document.querySelector("#weather-icon").src = '/img/cloudy.svg'
            }
            // set description
            document.querySelector("#desc").innerHTML = capital(res.data.weather[0].description)

        })
    }



})()


function capital(text) {
    return (text.split(' ')
   .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
   .join(' '))

}