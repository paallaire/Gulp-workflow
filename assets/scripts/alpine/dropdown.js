window.dropdown = function dropdown() {
    return {
        active: false,
        init() {
            console.log('dropdown loaded');
        },
        toggle() {
            this.active = !this.active;
        },
        open() {
            this.active = true;
        },
        close() {
            this.active = false;
        },
        isOpen() {
            return this.active;
        },
        activeAria() {
            return this.active ? 'true' : 'false';
        },
    };
};
