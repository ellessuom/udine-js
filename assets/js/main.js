var len = 0;
var write = function (target, text) {
    target.html(text.substr(0, len++));
    if (len < text.length + 1) {
      var time = Math.ceil( Math.random()*200 ) + 10;
      setTimeout(function () { write(target, text); }, time);
    } else {
      len = 0;
      text = '';
    }
};

var writeSlogan = function () {
    write($('#cover-title'), 'udine js');
};

var init = function () {
    setTimeout(function() {
        writeSlogan();
    }, 1000);
};

window.onload = (function (){
    init();
});
