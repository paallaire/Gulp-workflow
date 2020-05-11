import Toggle from './modules/Toggle';
import StickyNav from './modules/StickyNav';
import Tabs from './modules/Tabs';
import NavCanvas from './modules/NavCanvas';
import StickyElement from './modules/StickyElement';

export default function () {
    const toggle = new Toggle('.c-toggle');
    toggle.init();

    const totot = 123;

    function test(dsadasdas, dsadsadsadddddddddddddddddddddddddddddddddddddddddddddddddddddddd) {
        console.log('object');
    }

    // const stickyNav = new StickyNav('#header', {
    //     style: 'up-and-down',
    // });
    // stickyNav();

    // const tabs = new Tabs('.c-tabs');
    // tabs();

    // const navCanvas = new NavCanvas('.c-nav-canvas');
    // const $navCanvasButton = document.querySelector('#nav-canvas-button');

    // if ($navCanvasButton) {
    //     $navCanvasButton.addEventListener('click', (e) => {
    //         e.preventDefault();
    //         navCanvas.toggle();
    //     });
    // }

    // const stickyElement = new StickyElement('#sticky-element', {
    //     style: 'up-and-down ou default',
    // });
    // stickyElement();
}
