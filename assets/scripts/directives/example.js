export default {
    bind(el, binding, vnode) {
        console.log('bind');
    },
    inserted(el, binding, vnode) {

        console.log('inserted');

        if (el) {
            let elOffsetTop = el.offsetTop;
            let wrapper = document.createElement('div')

            wrapper.classList.add('vue-container-nav-sticky');
            wrapper.style.height = el.offsetHeight + "px";
            el.parentNode.insertBefore(wrapper, el);
            wrapper.appendChild(el);

            window.addEventListener("scroll", function() {
                let top = window.pageYOffset;

                if (top >= elOffsetTop ) {
                    el.classList.add('is-sticky');
                } else {
                    el.classList.remove('is-sticky');
                }
            
            });

        }

    }
}

