console.log('hello');

let lastTop = document.documentElement.scrollTop;
let top = document.documentElement.scrollTop;

let elNav = document.querySelector('.c-nav-sticky');

let onScroll = function () {
    top = document.documentElement.scrollTop;

    if (top !== lastTop) {
        console.log('top:', top);

        if (top <= 0) {
            console.log('top');
            elNav.classList.add('is-top');
        } else {
            elNav.classList.remove('is-top');
        }

        if (top > lastTop) {
            console.log('down');
            elNav.classList.add('is-hide');
        } else if (top < lastTop) {
            console.log('up');
            elNav.classList.remove('is-hide');
        }
    }

    lastTop = document.documentElement.scrollTop;
    requestAnimationFrame(onScroll);
};

let navSicktyInit = function () {
    console.log('navSicktyInit:');
    onScroll();
};

navSicktyInit();

// var scroll = function () {
//     console.log('scroll:');
//     // do the onscroll stuff you want here
// };
// var raf =
//     window.requestAnimationFrame ||
//     window.webkitRequestAnimationFrame ||
//     window.mozRequestAnimationFrame ||
//     window.msRequestAnimationFrame ||
//     window.oRequestAnimationFrame;
// // var $window = $(window);
// // var lastScrollTop = $window.scrollTop();

// if (raf) {
//     loop();
// }

// function loop() {
//     scroll();
//     raf(loop);
// }
