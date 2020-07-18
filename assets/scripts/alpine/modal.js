window.modal = function () {
    return {
        id: '',
        active: false,
        isActive: function() {
            return this.active;
        },
        close: function() {
            this.active = false;
        },
        init: function (id) {
            this.id = id;
    
            window.addEventListener(
                'showModal',
                (e) => {
                    let id = e.detail.id;

                    if (this.id === id) {
                        this.active = true;
                    }
                },
                false,
            );
        },
    };
};
