window.tab = function () {
    return {
        active: 1,
        init: function () {
            console.log('tab loaded', this.active);
        },
        open: function (id, el) {
            this.active = id;

            setTimeout(function () {
                el.focus();
            }, 1);
        },
        close: function () {
            this.active = false;
        },
        isActive: function (id) {
            return this.active === id;
        },
        isActiveAria: function (id) {
            return this.active === id ? 'true' : 'false';
        },
    };
};
