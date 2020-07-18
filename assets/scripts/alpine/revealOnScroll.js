import { debounce } from '../utils/misc'

window.revealOnScroll = function () {
    return {
        isActive: false,
        lastTop: 9999,
        top: 0,
        ticking: false,
        init: function () {
            console.log('revealOnScroll loaded');

            window.addEventListener(
                'scroll',
                debounce((e) => {
        
                    if (!this.ticking) {
                        window.requestAnimationFrame(() => {
                            this.top = window.pageYOffset;
                            this.updateState();
                            this.ticking = false;
                            this.lastTop = window.pageYOffset;
                        });
                    }

                    this.ticking = true;
                }, 100),
            );

        },
        updateState: function () {
            if (this.top < this.lastTop) {
                this.isActive = true;
            } else {
                this.isActive = false;
            }
        },
    };
};
