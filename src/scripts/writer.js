const $  = require('jquery');

let   len   = 0;
const write = (target, text, cb) => {
    target.html(text.substr(0, len++));
    if (len < text.length + 1) {
      let time = Math.ceil( Math.random()*200 ) + 10;
      setTimeout(function () { write(target, text, cb); }, time);
    } else {
      cb();
    }
};

module.exports = {
    titles () {
        write($('#cover-title'), 'udine js', function () {
            setTimeout(() => {
                $('#down-icon').fadeIn();
            }, 250);
        });
    }
};