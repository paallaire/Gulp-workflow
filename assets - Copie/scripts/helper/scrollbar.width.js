let scrollbarWidth = (function () {
    'use strict';

    let width = null;
    let showDebug;

    let get = () => {

        let body = document.body;
        let box = document.createElement('div');
        let boxStyle = box.style;
        let width;

        boxStyle.position = 'absolute';
        boxStyle.top = boxStyle.left = '-9999px';
        boxStyle.width = boxStyle.height = '100px';
        boxStyle.overflow = 'scroll';

        body.appendChild(box);

        width = box.offsetWidth - box.clientWidth;

        body.removeChild(box);

        if( showDebug ) {
            console.log('--- scrollWidth.get ---');
            console.log( `width = ${width}`);
            console.log("\n");
        }

        return width;

    }

    let removeClass = () => {

        let body = document.body;
        let width = this.get();

        body.classList.remove('scrollbarWidth-'+width);
        
    }

    let addClass = () => {

        let body = document.body;
        let width = this.get();

        body.classList.add('scrollbarWidth-'+width);

        if( showDebug ) {
            console.log('--- scrollWidth.add ---');
            console.log( `width = ${width}`);
            console.log("\n");
        }

    }

    let init = (pDebug) => {

        showDebug = pDebug;

        this.addClass();

        if( showDebug ) {
            console.log('--- scrollWidth.init ---');
            console.log( `showDebug = ${showDebug}`);
            console.log("\n");
        }

    };

    return {
        init,
        get,
        removeClass,
        addClass
    };

})();


