function getEnv(customSearchTerms) {
    const searchTerms = customSearchTerms || ['local', 'dev', 'stage', 'test'];
    const { href } = window.location;
    const isDev = searchTerms.some(el => href.includes(el));

    return isDev ? 'dev' : 'prod';
}

function setEnvOnBody() {
    const $body = document.querySelector('body');
    const env = getEnv();
    let classEnv = 'is-prod';

    if (env === 'dev') {
        classEnv = 'is-dev';
    }

    $body.classList.add(classEnv);
}

function getLang() {
    const html = document.querySelector('html');

    return html.getAttribute('lang') !== null ? html.getAttribute('lang') : 'en';
}

export { getEnv, setEnvOnBody, getLang };
