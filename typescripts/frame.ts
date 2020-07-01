$(document).ready(() => {
    let url = 'https://api.openweathermap.org/data/2.5/weather?q=';
    let imgUrl = 'https://openweathermap.org/img/wn/';
    let api_key = '37540f937e26e3fe35860c835ecb224a';
    let units = "metric";
    function addLoader() {
        $('.container').append(`<div class="preloader">
        <img src="static/preloader.png"/>
    </div> `);
    };
    function removeLoader() {
        $('.preloader').remove();
    };
    function hideColumnBox() {
        if (!$('#hidden').hasClass('hide'))
            $('#hidden').addClass('hide');
        if($('#hidden').hasClass('columnBox'))
            $('#hidden').removeClass('columnBox');
    }
    function showColumnBox() {
        if ($('#hidden').hasClass('hide'))
            $('#hidden').removeClass('hide');
        if(!$('#hidden').hasClass('columnBox'))
            $('#hidden').addClass('columnBox');
    }
    function handleSearch(e:KeyboardEvent) {
        if(e.keyCode == 13) {
            $('.container .error404').remove();
            hideColumnBox();
            addLoader();
            let city = $('.search').val();
            $.get(`${url}${city}&appid=${api_key}&units=${units}`)
            .then(handleData)
            .catch((e) => {
                console.log(e);
                if(e.status == 404) {
                    $('.container').append('<h2 class="error404">City Not found</h2>');
                }
            }).always( function() {
                removeLoader();
            })
        }
    };
    function handleData(data) {
        $.get('/static/icons.json').then((jsonData) =>{
            modifiyTemplate(data, jsonData);
        });
    };

    function modifiyTemplate(data, icons) {
        $('.address').text(`${data['name']}, ${data['sys']['country']}`);
        //Handling Date
        let date = new Date();
        let day = date.toLocaleString('en-us', {  weekday: 'long' });
        $('.day').text(day);
        $('.date').text(`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`);

        $('#mainImg').removeClass();
        $('#mainImg').addClass(`${getIcon(data, icons)}`);
        
        $('.tempNow').text(`${data['main']["temp"]} ℃`);
        $('.desc').text(data.weather[0].description);
        $('.humidity').text(`${data['main']['humidity']} %`)
        $('.maxTemp').text(`${data['main']['temp_max']} ℃`);
        $('.minTemp').text(`${data['main']['temp_min']} ℃`);
        $('.pressure').text(`${data['main']['pressure']} hPa`);
        $('.windSpeed').text(`${data.wind.speed} ms⁻¹`);
        $('.winddirection').text(`${data.wind.deg}°`);
        $('.windDirImg').removeClass();
        $('#windDirImg').addClass(`wi wi-wind towards-${data.wind.deg}-deg`);
        showColumnBox();
    }
    function getIcon(resp, weatherIcons){
        var prefix = 'wi wi-';
        var code = resp.weather[0].id;
        var icon = weatherIcons[code].icon;

        // If we are not in the ranges mentioned above, add a day/night prefix.
        if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
            icon = 'day-' + icon;
        }

        // Finally tack on the prefix.
        icon = prefix + icon;
        return icon;
    }

    $('.search').keydown(handleSearch);
});