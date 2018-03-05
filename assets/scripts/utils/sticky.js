export class Sticky {

    constructor() {
        this.el = null;
        this.offsetTop = null;
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

            // working !!
            window.addEventListener("scroll", (e) => {
             // this.scroll();
            });

            // why not working ?
             window.addEventListener("scroll", this.scroll.bind(this) );

        }
    }

    scroll() {
        console.log( this)
        let top = window.pageYOffset;

        if (top >= this.offsetTop) {
            this.el.classList.add('is-sticky');
        } else {
            this.el.classList.remove('is-sticky');
        }

    }

    /* TO DO : HOW remove the listener ? */
    destroy() {
        window.removeEventListener("scroll", this.scroll.bind(this) );
    }

}


// Thank for the answer but with this technique how I remove the "EventListerner" ?