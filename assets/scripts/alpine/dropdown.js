window.dropdown = function () {
    return {
        active: false,
        init: function() {
            console.log('dropdown loaded')
        },
        toggle: function () {
            this.active = !this.active;
        },
        open: function() {
            this.active = true;
        },
        close: function() {
            this.active = false;
        },
        isOpen: function() {
            return this.active;
        },
        activeAria: function() {
            return this.active ? 'true' : 'false'
        },
    };
}
