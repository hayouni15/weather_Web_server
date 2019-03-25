
$(document).ready(() => {
    const $messages = document.querySelector('#future')
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    let now = new Date()
    const time= now.getTime()
    document.querySelector('#lastUpdated').insertAdjacentHTML('beforeend',`  ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`)
    const day = (now.getDay())
    var today = day - 1
    const locationinput = document.querySelector('form');
    const loc = document.getElementById('loc');
    const date = formatdate()
    console.log(date)
    $('#date').html(date);

    navigator.geolocation.getCurrentPosition(function (position) {
        $messages.innerHTML=''
        console.log(position.coords.latitude, position.coords.longitude);

        renderWeather(position.coords.latitude, position.coords.longitude)
    });

    document.querySelector('#locateBtn').addEventListener('click', () => {
        $messages.innerHTML=''
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position.coords.latitude, position.coords.longitude);

            renderWeather(position.coords.latitude, position.coords.longitude)
        });
    })

    locationinput.addEventListener('submit', (e) => {
        e.preventDefault();
        $messages.innerHTML=''
        $('#weather_current_summary').html("loading...");
        $('#place_name').html('');
        $('#weather_summary').html('');
        $('#weather_current_tmp').html('');
        fetch(`/weather?location=${loc.value}`).then((response) => {
            response.json().then((data) => {
                console.log(data);
                if (data.coordinates !== null) {
                    var skycons = new Skycons({ "color": "white" });
                    var icon = data.weather.currently.icon;
                    skycons.add("iconBig", icon);
                    skycons.play();
                    $('#place_name').html(data.coordinates.place_name);
                    $('#weather_current_summary').html(data.weather.currently.summary);
                    $('#weather_summary').html(data.weather.summary);
                    $('#temp').html(data.weather.currently.temperature)
                    $('#conditions').html(data.weather.currently.summary)
                    $('#weather_current_tmp').html(`Current Temperature :${data.weather.currently.temperature} \ 
                    feels like :${data.weather.currently.apparentTemperature}`);
                    // daily
                    // Select the element in which you want to render the template

                    let obj = (data.weather.daily.data)
                    jQuery.each(obj, (i, weather) => {
                        today = nextday(today)
                        console.log(today)
                        const $messages = document.querySelector('#future')
                        const messageTemplate = dailyTmp
                        const html = Mustache.render(messageTemplate, { day: days[today], iconid: `iconsmall${i}`, summary: weather.summary, tmpmin: weather.temperatureLow, tmpmax: weather.temperatureHigh })
                        $messages.insertAdjacentHTML('beforeend', html)
                        //icon
                        var skycons = new Skycons({ "color": "white" });
                        console.log(weather.icon)
                        var icon = weather.icon;
                        skycons.add(`iconsmall${i}`, icon);
                        skycons.play();
                    })



                }
                else {
                    $('#weather_summary').html(data.weather.summary);
                }

            })
        })
    })

    //



});

const renderWeather = async (lat, long) => {
    const $messages = document.querySelector('#future')
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    let now = new Date()
    const day = (now.getDay())
    var today = day - 1
    console.log('from function', lat, long)
    $('#weather_current_summary').html("loading...");
    $('#place_name').html('');
    $('#weather_summary').html('');
    $('#weather_current_tmp').html('');
    fetch(`/weatherAutoLocate?lat=${lat}&long=${long}`).then((response) => {
        response.json().then((data) => {
            console.log(data);
            if (data.coordinates !== null) {
                var skycons = new Skycons({ "color": "white" });
                var icon = data.weather.currently.icon;
                skycons.add("iconBig", icon);
                skycons.play();
                $('#place_name').html(data.coordinates.place_name);
                $('#weather_current_summary').html(data.weather.currently.summary);
                $('#weather_summary').html(data.weather.summary);
                $('#temp').html(data.weather.currently.temperature)
                $('#conditions').html(data.weather.currently.summary)
                $('#weather_current_tmp').html(`Current Temperature :${data.weather.currently.temperature} \ 
                feels like :${data.weather.currently.apparentTemperature}`);
                // daily
                // Select the element in which you want to render the template

                let obj = (data.weather.daily.data)
                $messages.innerHTML=''
                jQuery.each(obj, (i, weather) => {
                    today = nextday(today)
                    console.log(today)
                    
                    const messageTemplate = dailyTmp
                    const html = Mustache.render(messageTemplate, { day: days[today], iconid: `iconsmall${i}`, summary: weather.summary, tmpmin: weather.temperatureLow, tmpmax: weather.temperatureHigh })
                    $messages.insertAdjacentHTML('beforeend', html)
                    //icon
                    var skycons = new Skycons({ "color": "white" });
                    console.log(weather.icon)
                    var icon = weather.icon;
                    skycons.add(`iconsmall${i}`, icon);
                    skycons.play();
                })



            }
            else {
                $('#weather_summary').html(data.weather.summary);
            }

        })
    })
}
const formatdate = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    let now = new Date()
    const day = (now.getDay())
    const month = (now.getMonth())
    console.log(now)
    date = `${days[day - 1]},${monthNames[month]} ${now.getDate()} `

    return date
}

const nextday = (n) => {
    if (n <= 5) {
        return n + 1
    }
    else {
        return 0
    }
}

