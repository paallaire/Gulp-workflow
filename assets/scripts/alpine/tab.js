window.tab = function tab() {
    return {
        active: 1,
        init() {
            console.log('tab loaded', this.active);
        },
        open(id, el) {
            this.active = id;

            setTimeout(() => {
                el.focus();
            }, 1);
        },
        close() {
            this.active = false;
        },
        isActive(id) {
            return this.active === id;
        },
        isActiveAria(id) {
            return this.active === id ? 'true' : 'false';
        },
    };
};
