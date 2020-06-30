$(document).ready(() => {
    function addBox() {
        let iframeBox = document.createElement('iframe');
        iframeBox.src = '/template.html';
        $('body').append(iframeBox);
        $('#reveal').remove();
    }
    ;
    $('#reveal').click(addBox);
});
