import StickyNav from './modules/StickyNav';

document.addEventListener('DOMContentLoaded', function () {
  let nav = new StickyNav('.c-nav-sticky', { data: '123' });
  nav.init();
});
