window.modal = function modal() {
    return {
        id: '',
        active: false,
        isActive() {
            return this.active;
        },
        close() {
            this.active = false;
        },
        init(id) {
            this.id = id;

            window.addEventListener(
                'showModal',
                (e) => {
                    const { id } = e.detail;

                    if (this.id === id) {
                        this.active = true;
                    }
                },
                false,
            );
        },
    };
};
