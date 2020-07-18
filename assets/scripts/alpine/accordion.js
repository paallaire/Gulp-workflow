window.accordion = function () {
    return {
        isActive: false,
        init: function() {
            console.log('accordion loaded');
        },
        toggle: function () {
            this.isActive = !this.isActive;
        },
        open: function() {
            this.isActive = true;
        },
        close: function() {
            this.isActive = false;
        },
        isSelectedAria: function() {
            return this.isActive ? 'true' : 'false'
        },
        updateHeight: function(el) {
            return this.isActive == true ? 'max-height: ' + el.scrollHeight + 'px' : '';
        }
    };
}
