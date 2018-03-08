const html = document.querySelector('html');

let disabledBodyScroll = (status) => {

    if (status) {
        html.classList.add('has-no-scroll');
    }
    else {
        html.classList.remove('has-no-scroll');
    }

}

export default { disabledBodyScroll }