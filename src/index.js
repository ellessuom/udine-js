import $ from 'jquery';
import { titles } from './scripts/writer';
import socials from "./data/socials";

const init = () => {
    setTimeout(function() {
        titles();
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

window.onload = (function (){
    init();
    addSocialsListeners();
});


// function openSocial (social_name) {
    
//     let win;
//     switch (social_name) {
//         case 'twitter':
//             win = window.open('https://twitter.com/Udine_JS', '_blank');
//             break;
//         case 'instagram':
//             win = window.open('https://www.instagram.com/udinejs', '_blank');
//             break;
//         case 'facebook':
//             win = window.open('https://www.facebook.com/udinejs', '_blank');
//             break;
//     }
//     win.focus();
// };