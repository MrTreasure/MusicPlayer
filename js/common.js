function $ (select){
    var selector = document.querySelector(select);
    selector.addClass = function(className){
        selector.className +=' ' + className;
    }
    selector.removeClass = function(className){
        selector.className.replace(className, '');
    }
    return selector;

}
function addClass(element, className) {
    element.className += ' ' + className;
}
function $all(select){
    return document.querySelectorAll(select);
}
function formatTime(seconds) {
    minutes = Math.floor(seconds / 60);
    minutes = (minutes >= 10) ? minutes : "0" + minutes;
    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    return minutes + ": " + seconds;
}
