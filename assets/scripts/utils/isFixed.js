


let removeScroll = (e) => {
    e.preventDefault();
}

let isFixed = (status) => {

    let html = document.querySelector('html');

    console.log(" status = " + status);

    if (status) {
        console.log('add');
        html.classList.add('is-fixed');
        document.body.addEventListener("touchmove", removeScroll, false);
    }
    else {
        console.log('remove');
        html.classList.remove('is-fixed');
        document.body.removeEventListener("touchmove", removeScroll, false);
    }

}


export default { removeScroll, isFixed }