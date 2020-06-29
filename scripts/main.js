$(document).ready(() => {
    let container;
    let inputBox;
    function addBox() {
        container = document.createElement('div');
        container.classList.add('container');
        $('body').append(container);
        inputBox = document.createElement('input');
        inputBox.type = "text";
        inputBox.classList.add('search');
        $(container).append(inputBox);
    }
    $('#reveal').click(addBox);
});
