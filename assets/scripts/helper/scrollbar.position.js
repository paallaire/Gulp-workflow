var scrollbarPosition = (function () {
    'use strict';

    var position = null;
    var showDebug = false;

    var capture = function() {

        if( showDebug ) {
            console.log('--- scrollPosition.capture ---');
            console.log( "JS " + window.pageYOffset | document.body.scrollTop );
            console.log( "jQuery " +  $(window).scrollTop() );
            console.log("");
        }

         position = window.pageYOffset | document.body.scrollTop;

    }

    var get = function() {

        if( showDebug ) {
            console.log('--- scrollPosition.get ---');
            console.log( "position " +  position);
            console.log("");
        }

        return position;

    }

    var set = function(pPosition) {

        position = pPosition;

        if( showDebug ) {
            console.log('--- scrollPosition.set ---');
            console.log( "pPosition " +  pPosition);
            console.log( "position " +  position);
            console.log("");
        }

    }

    var init = function ( pDebug ) {

        showDebug = pDebug;

        this.capture();

        if( showDebug ) {
            console.log('--- scrollPosition.init ---');
            console.log( "showDebug " +  showDebug);
            console.log( "position " +  position);
            console.log("");
        }

    };

    return {
        init: init,
        get: get,
        set: set,
        capture: capture,
    };

})();