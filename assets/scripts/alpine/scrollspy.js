window.scrollspy = function () {
    return {
        active: -1,
        elNav: null,
        elBlocks: null,
        init: function (selectorBlock) {
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
        onResize: function () {
            this.elBlocks.forEach((item) => {
                item.dataset.minY = `${item.offsetTop}`;
                item.dataset.maxY = `${item.offsetTop + item.clientHeight}`;
            });
        },
        onScroll: function () {
            const top = window.scrollY;
            let find = false;

            this.elBlocks.forEach((item, index) => {
                item.dataset.minY = `${item.offsetTop}`;
                item.dataset.maxY = `${item.offsetTop + item.clientHeight}`;

                if(!find) {

                    if (top >= item.offsetTop && top < item.offsetTop + item.clientHeight) {
                        this.active = index;
                        find = true;
                        this.updateNav();
                    }
                    else {
                        this.active = -1;
                    }

                }
      
            });

            if(!find) {
                this.removeClassActive();
            }
     
        },
        updateNav: function() {
            this.removeClassActive();
            this.addClassActive();
        },
        removeClassActive: function() {
            this.elNav.forEach((item, index) => {
                item.classList.remove('underline');
            });
        },
        addClassActive: function() {
            this.elNav[this.active].classList.add('underline');
        },
    };
};
