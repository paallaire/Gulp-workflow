/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */

export default class Tabs {
    constructor(selector) {
        this.selector = selector;
        this.$elements = document.querySelectorAll(this.selector);

        if (this.$elements) {
            this.init();
        } else {
            console.log('Module Tabs - Selector not found!');
        }
    }

    init() {
        const hash = window.location.hash.substr(1);

        this.$elements.forEach($tab => {
            const $buttons = $tab.querySelectorAll('.c-tabs__header-button');
            const $contents = $tab.querySelectorAll('.c-tabs__content');

            $tab.dataset.module = 'tabs';

            // Active first item
            if ($buttons && $contents) {
                $buttons[0].classList.add('is-active');
                $contents[0].classList.add('is-active');
            } else {
                console.log('Module Tabs - Missing button or content!');
            }

            $buttons.forEach(item => {
                if (item.hash.substr(1) === hash) {
                    this.tabs(hash, item);
                }

                item.addEventListener('click', this.onClick.bind(this));
            });
        });
    }

    tabs(hash, target) {
        const $tab = target.closest('.c-tabs');
        const $buttons = $tab.querySelectorAll('.c-tabs__header-button');
        const $contents = $tab.querySelectorAll('.c-tabs__content');

        $contents.forEach(item => {
            if (item.id === hash) {
                // buttons
                $buttons.forEach(button => {
                    button.classList.remove('is-active');
                });
                target.classList.add('is-active');

                // content
                $contents.forEach(content => {
                    content.classList.remove('is-active');
                });
                item.classList.add('is-active');
            }
        });
    }

    destroy() {
        console.log('Module Tabs - destroy!');

        this.$elements.forEach($tab => {
            const $buttons = $tab.querySelectorAll('.c-tabs__header-button');
            $buttons.forEach(item => {
                console.log('item', item)
                item.removeEventListener('click', this.onClick);
            });
        });
    }

    onClick(e) {
        this.tabs(e.target.hash.substr(1), e.target);
    }
}
