
const trackOutboundLink = function (e) {

    e.preventDefault();

    let url = this.href;

    ga('send', 'event', 'outbound', 'click', url, {
        'transport': 'beacon',
        'hitCallback': function () { document.location = url; }
    });

}

export const init = function () {

    let links = document.querySelectorAll('a');

    [].forEach.call(links, function (el) {

        if (el.hostname != window.location.hostname) {
            el.addEventListener('click', trackOutboundLink, false);
        }

    });

}