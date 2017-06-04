var scrollbarWidth = (function () {
    'use strict';

    var width = null;
    var showDebug = false;

    var get = function() {

        var body = document.body;
        var box = document.createElement('div');
        var boxStyle = box.style;
        var width;

        boxStyle.position = 'absolute';
        boxStyle.top = boxStyle.left = '-9999px';
        boxStyle.width = boxStyle.height = '100px';
        boxStyle.overflow = 'scroll';

        body.appendChild(box);

        width = box.offsetWidth - box.clientWidth;

        body.removeChild(box);

        if( showDebug ) {
            console.log('--- scrollWidth.get ---');
            console.log( "scroll bar width " +  width );
            console.log("\n");
        }

        return width;

    }

    var remove = function() {

        var body = document.body;
        var width = this.get();

        body.classList.remove('scrollbarWidth-'+width);
        
    }

    var add = function() {

        var body = document.body;
        var width = this.get();

        body.classList.add('scrollbarWidth-'+width);

        if( showDebug ) {
            console.log('--- scrollWidth.add ---');
            console.log( "width " +  width);
            console.log("\n");
        }

    }

    var init = function ( pDebug ) {

        showDebug = pDebug;

        this.add();

        if( showDebug ) {
            console.log('--- scrollWidth.init ---');
            console.log( "showDebug " +  showDebug);
            console.log("\n");
        }

    };

    return {
        init: init,
        get: get,
        remove: remove,
        add: add, 
    };

})();


