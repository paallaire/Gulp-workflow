export default class GridVisualizer {
    constructor(options) {
        const defaultOptions = {
            numberColumns: 12,
            containerCSsClass: 'mx-auto max-w-5xl',
            rowCssClass: 'flex -mx-2',
            columnsCssClass: 'w-1/12 px-2',
            blockCssClass: 'bg-gray-400',
        };

        this.options = options || defaultOptions;
        console.log('options', this.options);

        this.options.namespace = 'c-grid-visualer';
    }

    init() {
        const $buttonToggle = document.createElement('button');
        const $GridVisualizer = document.createElement('div');
        const $container = document.createElement('div');
        const $row = document.createElement('div');
        const $block = document.createElement('div');

        // buttonToggle
        $buttonToggle.setAttribute('class', 'c-grid-visualer-toggle');
        $buttonToggle.innerHTML = 'Show Grid';
        document.body.appendChild($buttonToggle);
        // bind event
        $buttonToggle.addEventListener('click', e => {
            e.preventDefault();
            $GridVisualizer.classList.toggle('is-active');

            if ($GridVisualizer.classList.contains('is-active')) {
                $buttonToggle.innerHTML = 'Hide grid';
            } else {
                $buttonToggle.innerHTML = 'Show grid';
            }
        });

        // GridVisualizer
        $GridVisualizer.setAttribute('class', 'c-grid-visualer');
        document.body.appendChild($GridVisualizer);

        // container
        $container.setAttribute('class', `c-grid-visualer__container ${this.options.containerCSsClass}`);
        $GridVisualizer.appendChild($container);

        // row
        $row.setAttribute('class', `c-grid-visualer__row ${this.options.rowCssClass}`);
        $container.appendChild($row);

        for (let i = 0; i < this.options.numberColumns; i += 1) {
            const column = document.createElement('div');
            const $block = document.createElement('div');

            column.setAttribute('class', `c-grid-visualer__column ${this.options.columnsCssClass}`);
            $row.appendChild(column);

            $block.setAttribute('class', `c-grid-visualer__block ${this.options.blockCssClass}`);
            column.appendChild($block);
        }
    }
}
