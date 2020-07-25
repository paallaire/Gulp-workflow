import { isIE } from '../utils/browsers';

window.alertBrowser = function alertBrowser() {
    return {
        isActive: false,
        init() {
            console.log('alertBrowser loaded', this.isActive);

            // demo only
            setTimeout(() => {
                this.isActive = true;
            }, 1000);

            // if (isIE) {
            //     setTimeout(() => {
            //         this.isActive = true;
            //     }, 1000);
            // }
        },
        toggle() {
            this.isActive = !this.isActive;
        },
        open() {
            this.isActive = true;
        },
        close() {
            this.isActive = false;
        },
    };
};
