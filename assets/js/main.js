let text = 'udine js';

let len = 0;
var writeSlogan = function () {
    $('#cover-title').html(text.substr(0, len++));
    if (len < text.length + 1) {
      let time = Math.ceil(Math.random()*200)+10
      setTimeout('writeSlogan()', time);
    } else {
      len = 0;
      text = '';
    }
  }

var init = function () {
    setTimeout(writeSlogan, 1000);
};

// document.addEventListener("DOMContentLoaded", function(event) { 
//     init();
// });

window.onload = (function (){
    init()
});
