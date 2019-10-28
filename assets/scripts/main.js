import Toggle from './modules/Toggle';
import StickyNav from './modules/StickyNav';
import Tabs from './modules/Tabs';
import NavCanvas from './modules/NavCanvas';

document.addEventListener(
    'DOMContentLoaded',
    () => {
        const toggle = new Toggle('.c-toggle');
        // toggle.destroy();

        const stickyNav = new StickyNav('#header', {
            style: 'up-and-down',
        });

        const tabs = new Tabs('.c-tabs');
        // tabs.destroy();

        const navCanvas = new NavCanvas('.c-nav-canvas');
    },
    false,
);
