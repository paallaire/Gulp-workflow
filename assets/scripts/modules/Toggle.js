/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
// https://gomakethings.com/how-to-add-transition-animations-to-vanilla-javascript-show-and-hide-methods/
// https://stackoverflow.com/questions/44467909/animating-max-height-with-pure-js

// https://github.com/edenspiekermann/a11y-toggle/blob/master/a11y-toggle.js

export default class Toggle {
    constructor(selector) {
        this.selector = selector;
        this.elements = document.querySelectorAll(this.selector);
        this.buttonHandlerClick = [];

        console.log('toggle');

        if (this.el) {
            this.init();
        }
    }

    init() {
        this.getHash();

        this.elements.forEach(($item) => {
            const $header = $item.querySelector('.c-toggle__header');
            const handlerClick = this.onClick.bind(this);

            $item.dataset.module = 'toggle';

            if ($item.dataset.open === 'true' || $item.id === this.hash) {
                this.toggle($item);
            }

            this.buttonHandlerClick.push(handlerClick);
            $header.addEventListener('click', handlerClick);
        });
    }

    getHash() {
        this.hash = window.location.hash.substr(1);
    }

    toggle() {
        // const $content = elements.querySelector('.c-toggle__content');
        // let contentHeight = getHeightel($content);

        // $content.style.height = contentHeight;

        // if (elements.classList.contains('is-active')) {
        //     contentHeight = 0;
        // }

        // $content.style.height = contentHeight;
        // elements.classList.toggle('is-active');
    }

    destroy() {
        console.log('Module Toggle - destroy!');
        this.el.forEach(($item, index) => {
            $item.querySelector('.c-toggle__header').removeEventListener('click', this.buttonHandlerClick[index]);
        });
    }

    onClick(item) {
        // const elements = item.target.closest('.c-toggle');
        // this.toggle(elements);
    }
}
