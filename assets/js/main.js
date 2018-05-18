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


var writeSlogan = function () {
    write($('#cover-title'), 'udine js', function () {
        setTimeout(function () {
            $('#down-icon').fadeIn();
        }, 500);
    });
};

var init = function () {
    setTimeout(function() {
        writeSlogan();
    }, 750);
};

window.onload = (function (){
    init();
});
