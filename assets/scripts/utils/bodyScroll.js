const html = document.querySelector('html');

export function getWidth() {

    let scrollWidth = window.innerWidth - document.body.clientWidth;

    return scrollWidth;
}

export function setClass() {

    let scrollWidth = getWidth();

    html.classList.add(`scroll-width-${scrollWidth}`);
}

export function noScroll(noScroll) {

    if (noScroll) {
        html.classList.add('has-no-scroll');
    }
    else {
        html.classList.remove('has-no-scroll');
    }

}

export function getScrollTop() {

    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    return scrollTop;

}

export function init() {
    setClass();
    getScrollTop();
}


