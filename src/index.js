const $  = require('jquery');
const writer  = require('./scripts/writer');
const socials = require('./data/socials');

const init = () => {
    setTimeout(function() {
        writer.titles();
    }, 500);

    $(window).scroll(function(){
        if ($(this).scrollTop() >= 100) {
            $('footer').css({ 'transform': 'translateY(0px)' });
        }
    });
};

const addSocialsListeners = () => {
    $('#socials-container').children().each((i, element) => {
        element.addEventListener('click', () => {
            window.open(socials[element.id].url, '_blank');    
        }, false)
    });
};

window.onload = (() => {
    init();
    addSocialsListeners();
});