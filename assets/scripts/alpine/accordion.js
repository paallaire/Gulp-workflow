window.accordion = function accordion() {
    return {
        isActive: false,
        init() {
            console.log('accordion loaded');
        },
        toggle() {
            this.isActive = !this.isActive;
        },
        open() {
            this.isActive = true;
        },
        close() {
            this.isActive = false;
        },
        isSelectedAria() {
            return this.isActive ? 'true' : 'false';
        },
        updateHeight(el) {
            return this.isActive == true ? `max-height: ${el.scrollHeight}px` : '';
        },
    };
};
