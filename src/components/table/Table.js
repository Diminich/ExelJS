import { $ } from "../../core/dom";
import { ExcelComponent } from "../../core/ExcelComponent";
import { isCell, matrix, nextSelection, shouldResize } from "./table.functions";
import { resizeHadler } from "./table.resize";
import { createTable } from "./table.template";
import { TableSelection } from "./TableSelection";

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown'],
            ...options
        })
    }

    toHTML() {
        return createTable(50);
    }

    prepare() {
        this.selection = new TableSelection();
    }

    init() {
        super.init();
        const $cell = this.$root.find('[data-id="0:0"]');
        this.selection.select($cell);
        this.emitter.subscribe('it is working', (text) => this.selection.current.text(text));
        
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHadler(this.$root, event);
        } else if (isCell(event)) {
            const $target = $(event.target);
            if (event.shiftKey) {
                const $cells = matrix($target, this.selection.current).map((id) => this.$root.find(`[data-id="${id}"]`));
                this.selection.selectGroup($cells);

            } else {
                this.selection.select($target);
            }
        }
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

        const { key } = event;

        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault();
            const id = this.selection.current.id(true);
            const $next = this.$root.find(nextSelection(key, id));
            this.selection.select($next)
        }
    }
}