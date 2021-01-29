// polyfills
import 'svgxuse';

import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfigFile from '../../tailwind.config';

import { initScrollPage } from './utils/scrollPage';
import GridVisualizer from './modules/GridVisualizer';

window.tailwindConfig = resolveConfig(tailwindConfigFile);
console.log('window.tailwindConfig:', window.tailwindConfig);

document.addEventListener('DOMContentLoaded', () => {
    initScrollPage();
    const websiteGrid = new GridVisualizer({
        numberColumns: 12,
        containerCSsClass: 'mx-auto box-content w-full max-w-6xl',
        rowCssClass: 'flex -mx-2',
        columnsCssClass: 'px-2',
        columnsCssClassCustom: [
            'lg:w-1/12 w-1/4',
            'lg:w-1/12 w-1/4',
            'lg:w-1/12 w-1/4',
            'lg:w-1/12 w-1/4',
            'lg:w-1/12 hidden | lg:block',
            'lg:w-1/12 hidden | lg:block',
            'lg:w-1/12 hidden | lg:block',
            'lg:w-1/12 hidden | lg:block',
            'lg:w-1/12 hidden | lg:block',
            'lg:w-1/12 hidden | lg:block',
            'lg:w-1/12 hidden | lg:block',
            'lg:w-1/12 hidden | lg:block',
        ],
    });
    websiteGrid.init();
});
