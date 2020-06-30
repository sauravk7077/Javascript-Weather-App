
$(document).ready(()=>{
    function addBox() {
        $('.buttonDiv').remove();
        let iframeBox = document.createElement('iframe');
        iframeBox.src = '/template.html';
        $('body').append(iframeBox);
    };
    
    
    $('#reveal').click(addBox);
});