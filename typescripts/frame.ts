$(document).ready(() => {
    let url = 'https://api.openweathermap.org/data/2.5/weather?q=';
    let api_key = 'Your_API_Key';
    let units = "metric";
    function addLoader() {
        $('.container').append(`<div class="preloader">
        <img src="static/loader.png"/>
    </div> `);
    };
    function removeLoader() {
        $('.preloader').remove();
    };
    function handleSearch(e:KeyboardEvent) {
        if(e.keyCode == 13) {
            $('.container .error404').remove();
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
        $('.address').text(`${data['name']}, ${data['sys']['country']}`);
        let date = new Date();
        let day = date.toLocaleString('en-us', {  weekday: 'long' });
        $('.day').text(day);
        $('.date').text(`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`);
        $('#mainImg').attr('src', '');
        $('.tempNow').text(`${data['main']["temp"]} ℃`);
        $('.ppt').text(`${data['main']['humidity']} mm`)
    };

    $('.search').keydown(handleSearch);
});