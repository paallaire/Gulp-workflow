/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */

export default class NavCanvas {
    constructor(selector, config) {
        this.selector = selector;
        this.$element = document.querySelector(this.selector);
        this.$buttonNav = document.querySelector('[data-module="navButton"]');
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

    init() {
        this.$buttonNav.addEventListener('click', this.onClick.bind(this));
    }

    open() {
        console.log('open');
        this.$body.classList.add('c-nav-canvas--is-active');
        this.$buttonNav.classList.add('is-active');
    }

    close() {
        console.log('close');
        this.$body.classList.remove('c-nav-canvas--is-active');
        this.$buttonNav.classList.remove('is-active');
    }

    onClick(e) {
        e.preventDefault();

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
