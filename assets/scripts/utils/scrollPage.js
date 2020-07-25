// Credit : // https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/

function initScrollPage() {
    window.addEventListener('scroll', () => {
        document.documentElement.dataset.scrollY = `${window.scrollY}px`;
    });
}

function disableScrollBar() {
    const { body } = document;
    const { scrollY } = document.documentElement.dataset;

    // body.style.paddingRight = '17px';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}`;
}

function restoreScrollBar() {
    const { body } = document;
    const scrollY = body.style.top;

    body.style.position = '';
    body.style.top = '';
    // body.style.paddingRight = '0px';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
}

function manageScrollPage(state) {
    if (state) {
        disableScrollBar();
    } else {
        restoreScrollBar();
    }
}

export { initScrollPage, manageScrollPage };
