/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
// https://gomakethings.com/how-to-add-transition-animations-to-vanilla-javascript-show-and-hide-methods/
// https://stackoverflow.com/questions/44467909/animating-max-height-with-pure-js

import getHeightElement from '../utils/getHeightElement';

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

            if (item.dataset.open === 'true') {
                this.toggle(item);
            }

            $header.addEventListener('click', this.onClick.bind(this));
        });
    }

    toggle($element) {
        const $content = $element.querySelector('.c-toggle__content');

        let contentHeight = getHeightElement($content);

        $content.style.height = contentHeight;

        if ($element.classList.contains('is-active')) {
            contentHeight = 0;
        }

        $content.style.height = contentHeight;
        $element.classList.toggle('is-active');
    }

    destroy() {
        console.log('Module Toggle - destroy!');
        this.element.forEach(item => {
            const $header = item.querySelector('.c-toggle__header');

            $header.removeEventListener('click', this.onClick);
        });
    }

    onClick(item) {
        const $element = item.target.closest('.c-toggle');
        this.toggle($element);
    }
}
