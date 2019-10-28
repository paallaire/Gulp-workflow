/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */

export default class NavCanvas {
    constructor(selector, config) {
        this.selector = selector;
        this.$element = document.querySelector(this.selector);
        this.isActive = false;
        this.$body = document.querySelector('body');

        const defautConfig = {
            style: 'default',
        };

        this.config = Object.assign(defautConfig, config);

        if (this.$element) {
            this.init();
        } else {
            console.log('Module NavCanvas - Selector not found!');
        }
    }

    init() {}

    open() {
        console.log('open');
        this.$body.classList.add('c-nav-canvas--is-active');
    }

    close() {
        console.log('close');
        this.$body.classList.remove('c-nav-canvas--is-active');
    }

    toggle() {
        if (this.$body.classList.contains('c-nav-canvas--is-active')) {
            this.close();
        } else {
            this.open();
        }
    }

    destroy() {
        console.log('Module NavCanvas - destroy!');
    }
}
