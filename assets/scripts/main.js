import Toggle from './modules/Toggle';
import StickyNav from './modules/StickyNav';
import Tabs from './modules/Tabs';

document.addEventListener(
    'DOMContentLoaded',
    () => {
        const toggle = new Toggle('.c-toggle');
        const stickyNav = new StickyNav('#header', {
            style: 'up-and-down',
        });
        const tabs = new Tabs('.c-tabs');
        tabs.destroy();
    },
    false,
);
