var len = 0;
var write = function (target, text, cb) {
    target.html(text.substr(0, len++));
    if (len < text.length + 1) {
      var time = Math.ceil( Math.random()*200 ) + 10;
      setTimeout(function () { write(target, text, cb); }, time);
    } else {
      cb();
    }
};

var writeTitles = function () {
    write($('#cover-title'), 'udine js', function () {
        setTimeout(() => {
            $('#down-icon').fadeIn();
        }, 250);
    });
};

var init = function () {
    setTimeout(function() {
        writeTitles();
    }, 500);


    $(window).scroll(function(){
        if ($(this).scrollTop() >= 100) {
            console.log('WORKS ');
            $('footer').css({ 'transform': 'translateY(0px)' });
        }
    });
};

window.onload = (function (){
    init();
});


var openSocial = function (social_name) {
    console.log('Should open ', social_name);
    var win;
    switch (social_name) {
        case 'twitter':
            win = window.open('https://twitter.com/Udine_JS', '_blank');
            break;
        case 'instagram':
            win = window.open('https://www.instagram.com/udinejs', '_blank');
            break;
        case 'facebook':
            win = window.open('https://www.facebook.com/udinejs', '_blank');
            break;
    }
    win.focus();
};