function getHeightElement($element) {
    let height = 0;
    const $el = $element;

    $el.style.display = 'block'; // Make it visible
    height = `${$element.scrollHeight}px`; // Get it's height
    $el.style.display = ''; //  Hide it again

    return height;
}

function toto() {
    console.log('toto !');
}

function $(selector, context) {
    return Array.prototype.slice.call(
        (context || document).querySelectorAll(selector),
    );
}

export { getHeightElement, toto, $ };
