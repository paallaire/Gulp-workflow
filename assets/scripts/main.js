import { isDev } from './utils/env';

import StickyNav from './modules/StickyNav';
import GridVisualizer from './modules/GridVisualizer';

document.addEventListener('DOMContentLoaded', function () {
  const nav = new StickyNav('.c-nav-sticky', { data: '123' });
  nav.init();

  if (isDev) {
    console.log('isDev:', isDev);
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
  }
});
