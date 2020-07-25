window.scrollspy = function scrollspy() {
    return {
        active: -1,
        elNav: null,
        elBlocks: null,
        init(selectorBlock) {
            this.elNav = this.$refs.navScrollspy.querySelectorAll('li');
            this.elBlocks = document.querySelectorAll(selectorBlock);

            window.addEventListener('scroll', () => {
                this.onScroll();
            });
            this.onScroll();

            window.addEventListener('resize', () => {
                this.onResize();
            });
            this.onResize();

            console.log('scrollspy loaded');
        },
        onResize() {
            this.elBlocks.forEach((item, index) => {
                this.elBlocks[index].dataset.minY = `${item.offsetTop}`;
                this.elBlocks[index].dataset.maxY = `${item.offsetTop + item.clientHeight}`;
            });
        },
        onScroll() {
            const top = window.scrollY;
            let find = false;

            this.elBlocks.forEach((item, index) => {
                this.elBlocks[index].dataset.minY = `${item.offsetTop}`;
                this.elBlocks[index].dataset.maxY = `${item.offsetTop + item.clientHeight}`;

                if (!find) {
                    if (top >= item.offsetTop && top < item.offsetTop + item.clientHeight) {
                        this.active = index;
                        find = true;
                        this.updateNav();
                    } else {
                        this.active = -1;
                    }
                }
            });

            if (!find) {
                this.removeClassActive();
            }
        },
        updateNav() {
            this.removeClassActive();
            this.addClassActive();
        },
        removeClassActive() {
            this.elNav.forEach((item, index) => {
                item.classList.remove('underline');
            });
        },
        addClassActive() {
            this.elNav[this.active].classList.add('underline');
        },
    };
};
