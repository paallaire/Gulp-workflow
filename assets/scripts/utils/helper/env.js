function getEnv() {
    const body = document.querySelector('body');
    const { href } = window.location;
    const isDev = !!(href.includes('local') || href.includes('dev') || href.includes('stage') || href.includes('test'));
    const classEnv = isDev ? 'is-dev' : 'is-prod';

    body.classList.add(classEnv);

    const test = 'tello';

    return isDev ? 'dev' : 'prod';
}

function getLang() {
    const html = document.querySelector('html');

    return html.getAttribute('lang') !== null ? html.getAttribute('lang') : 'en';
}

export { getEnv, getLang };
