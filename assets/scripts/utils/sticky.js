export class Sticky {

    constructor() {
        this.el = null;
        this.offsetTop = null;
        this.scrollBoundFunction = this.scroll.bind(this);
    }

    init(selector) {
        this.el = document.querySelector(selector);

        if (this.el) {
            let wrapper = document.createElement('div');
            this.offsetTop = this.el.offsetTop;

            wrapper.classList.add('container-sticky');
            wrapper.style.height = this.el.offsetHeight + "px";
            this.el.parentNode.insertBefore(wrapper, this.el);
            wrapper.appendChild(this.el);

            window.addEventListener("scroll", this.scrollBoundFunction);
        }
    }

    scroll() {
        let top = window.pageYOffset;

        if (top >= this.offsetTop) {
            this.el.classList.add('is-sticky');
        } else {
            this.el.classList.remove('is-sticky');
        }

    }

    destroy() {
        window.removeEventListener("scroll", this.scrollBoundFunction);
    }

}
