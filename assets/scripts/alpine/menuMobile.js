import { manageScrollPage } from '../utils/scrollPage';

window.menuMobile = function () {
    return {
        id: '',
        active: false,
        elButtonTrigger: null,
        init: function (id, selectorButtonTrigger) {
            this.id = id;
            this.elButtonTrigger = document.querySelector(selectorButtonTrigger);

            window.addEventListener(
                'toggleMenuMobile',
                (e) => {
                    let id = e.detail.id;

                    if (this.id === id) {
                        this.toggle();
                    }
                },
                false,
            );

            console.log('menuMobile loaded' , this.id);
        },
        toggle: function () {
            this.active = !this.active;
            this.updateButtonTrigger();
            manageScrollPage(this.active);
        },
        updateButtonTrigger: function () {
            if (this.active) {
                this.elButtonTrigger.classList.add('is-active');
            } else {
                this.elButtonTrigger.classList.remove('is-active');
            }
        },
        open: function () {
            this.active = true;
            this.updateButtonTrigger();
            manageScrollPage(true);
        },
        close: function () {
            this.active = false;
            this.updateButtonTrigger();
            manageScrollPage(false);
        },
        isOpen: function () {
            return this.active === true;
        },
        isClose: function () {
            return this.active === false;
        },
    };
};
