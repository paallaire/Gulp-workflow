/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
// https://gomakethings.com/how-to-add-transition-animations-to-vanilla-javascript-show-and-hide-methods/
// https://stackoverflow.com/questions/44467909/animating-max-height-with-pure-js
export default class Toggle {
    constructor(selector) {
        this.selector = selector;
        this.element = document.querySelectorAll(this.selector);

        if (this.element) {
            this.init();
        } else {
            console.log('Module Toggle - Selector not found!');
        }
    }

    init() {
        this.element.forEach(item => {
            const $header = item.querySelector('.c-toggle__header');

            $header.addEventListener('click', this.onClick);
        });
    }

    destroy() {
        console.log('Module Toggle - destroy!');
        this.element.forEach(item => {
            const $header = item.querySelector('.c-toggle__header');

            $header.removeEventListener('click', this.onClick);
        });
    }

    onClick(item) {
        const $root = item.target.closest('.c-toggle');
        const $content = $root.querySelector('.c-toggle__content');

        $content.classList.toggle('hidden');
    }
}
