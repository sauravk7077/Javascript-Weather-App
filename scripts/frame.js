$(document).ready(() => {
    let api_key = 'api_Key';
    function addLoader() {
        $('body').append(`<div class="preloader">
        <img src="static/loader.png"/>
    </div> `);
    }
    function removeLoader() {
        $('.preloader').remove();
    }
});
