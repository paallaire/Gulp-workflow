
const trackOutboundLink = function (e) {

    e.preventDefault();

    let url = this.href;

    gtag('event', 'click', {
        'event_category': 'outbound',
        'event_label': url,
        'transport_type': 'beacon',
        'event_callback': function () { document.location = url; }
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
