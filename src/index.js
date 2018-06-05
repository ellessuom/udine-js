const $ = require('jquery');
const anime = require('animejs');

const writer  = require('./scripts/writer');
const socials = require('./data/socials');

const runLogoAnimation = () => {
    const logo_square = anime.timeline({
        autoplay: true
    });

    logo_square
    .add({
        targets         : '.ico path.square',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing          : 'easeInOutSine',
        duration        : 1200
    }).add({
        targets : '.ico path.square',
        fill    : '#f0dc4f',
        easing  : 'easeInOutSine',
        duration: 800
    });

    const logo_j = anime({
        targets         : '.ico path.j',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing          : 'easeInOutSine',
        duration        : 600
    });

    const logo_s = anime({
        delay           : 600,
        targets         : '.ico path.s',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing          : 'easeInOutSine',
        duration        : 600,
    });
};

const init = () => {
    runLogoAnimation();

    setTimeout(function () {
        writer.titles();
    }, 500);

    $(window).scroll(function () {
        if ($(this).scrollTop() >= 100) {
            $('footer').css({
                'transform': 'translateY(0px)'
            });
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