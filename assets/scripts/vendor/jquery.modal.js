// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
; (function ($, window, document, undefined) {
    "use strict";

    var _this;

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variables rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = "modal",
        defaults = {
            propertyName: "value",
            selectorModal: ".c-modal",
            selectorOverlay: ".c-modal",
            selectorContent: ".c-modal-content",
            selectorBtnClose: "[data-modal-close]",
            selectorStatus: "html"
        };

    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;

        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;

        _this = this;

        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
        init: function () {

            $(this.element).each(function (index, element) {

                var modal = "#" + this.href.substring(this.href.indexOf('#') + 1);

                $(element).on('click', function (e) {

                    e.preventDefault();

                    if (!$(modal).hasClass('is-show is-hide')) {
                        _this.open(modal);
                    }

                });

                $(modal).find(_this.settings.selectorBtnClose).on('click', function (e) {

                    e.preventDefault();
                    e.stopPropagation();

                    _this.close(modal);

                });

                $(modal).on('click', function (e) {

                    e.preventDefault();

                    _this.close(modal);

                });

                $(modal).find(_this.settings.selectorContent).on('click', function (e) {

                    e.stopPropagation();

                });

            });

        },
        open: function (modal) {

            $(modal).addClass('is-active');
            $('body').addClass('has-modal');

            $(modal).addClass('is-show').onCSSAnimationEnd(function (e) {
                console.log('animation done is-show');
                $(this).removeClass('is-show');
            });

        },
        close: function (modal) {

            if ($('body').hasClass('has-modal')) {

                $(modal).addClass('is-hide').onCSSAnimationEnd(function (e) {
                    $(this).removeClass('is-hide is-active');
                    $('body').removeClass('has-modal');
                });
            }
   
        },
        reset: function (modal) {
            $(this).removeClass('is-show is-hide is-active');
        }
    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" +
                    pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);