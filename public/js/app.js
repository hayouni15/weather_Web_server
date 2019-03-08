
$(document).ready(() => {

    const locationinput = document.querySelector('form');
    const loc = document.getElementById('loc');


    locationinput.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('clicked');
        $('#weather_current_summary').html("loading...");
        $('#place_name').html('');
        $('#weather_summary').html('');
        $('#weather_current_tmp').html('');
        fetch(`weather?location=${loc.value}`).then((response) => {
            response.json().then((data) => {
                console.log(data);
                if (data.coordinates !== null) {
                    $('#place_name').html(data.coordinates.place_name);
                    $('#weather_current_summary').html(data.weather.currently.summary);
                    $('#weather_summary').html(data.weather.summary);
                    $('#weather_current_tmp').html(data.weather.currently.temperature);
                }
                else {
                    $('#weather_summary').html(data.weather.summary);
                }

            })
        })
    })

    //


});