import { manageScrollPage } from '../utils/scrollPage';

window.menuPanel = function menuPanel() {
    return {
        id: '',
        active: false,
        elButtonTrigger: null,
        init(id, selectorButtonTrigger) {
            this.id = id;
            this.elButtonTrigger = document.querySelector(selectorButtonTrigger);

            window.addEventListener(
                'showPanel',
                (e) => {
                    const { id } = e.detail;

                    if (this.id === id) {
                        this.toggle();
                    }
                },
                false,
            );

            console.log('menuPanel loaded', this.id);
        },
        toggle() {
            this.active = !this.active;
            this.updateButtonTrigger();
            manageScrollPage(this.active);
        },
        updateButtonTrigger() {
            if (this.active) {
                this.elButtonTrigger.classList.add('is-active');
            } else {
                this.elButtonTrigger.classList.remove('is-active');
            }
        },
        open() {
            this.active = true;
            this.updateButtonTrigger();
            manageScrollPage(true);
        },
        close() {
            this.active = false;
            this.updateButtonTrigger();
            manageScrollPage(false);
        },
        isOpen() {
            return this.active === true;
        },
        isClose() {
            return this.active === false;
        },
    };
};
