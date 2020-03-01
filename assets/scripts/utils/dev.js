import { isDev } from './env';
import GridVisualizer from '../modules/GridVisualizer';

function devMode() {
    console.log('isDev', isDev);

    if (isDev) {
        const websiteGrid = new GridVisualizer({
            numberColumns: 12,
            // columnsCssClassCustom: [
            //     'lg:w-1/12 md:w-1/8 w-1/4 visible',
            //     'lg:w-1/12 md:w-1/8 w-1/4 visible',
            //     'lg:w-1/12 md:w-1/8 w-1/4 visible',
            //     'lg:w-1/12 md:w-1/8 w-1/4 visible',
            //     'lg:w-1/12 md:w-1/8 hidden md:block',
            //     'lg:w-1/12 md:w-1/8 hidden md:block',
            //     'lg:w-1/12 md:w-1/8 hidden md:block',
            //     'lg:w-1/12 md:w-1/8 hidden md:block',
            //     'lg:w-1/12 hidden lg:block',
            //     'lg:w-1/12 hidden lg:block',
            //     'lg:w-1/12 hidden lg:block',
            //     'lg:w-1/12 hidden lg:block',
            // ],
        });
        websiteGrid.init();
    }
}

export { devMode as default };
