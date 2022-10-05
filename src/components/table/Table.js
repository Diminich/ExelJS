import { defaultStyles } from "../../constants";
import { $ } from "../../core/dom";
import { ExcelComponent } from "../../core/ExcelComponent";
import * as action from "../../redux/action";
import { isCell, matrix, nextSelection, shouldResize } from "./table.functions";
import { resizeHadler } from "./table.resize";
import { createTable } from "./table.template";
import { TableSelection } from "./TableSelection";

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        })
    }

    toHTML() {
        return createTable(50, this.store.getState());
    }

    prepare() {
        this.selection = new TableSelection();
    }

    init() {
        super.init();
        this.selectCell(this.$root.find('[data-id="0:0"]'));
        this.$on('formula: input', (text) => {
            this.updateTextInStore(text);
        });
        this.$on('formula: done', () => {
            this.selection.current.$el.focus();
        });
        this.$on('toolbar: applayStyle', (value) => {
            this.selection.applyStyle(value);
            this.$dispatch(action.applayStyle({
                value,
                ids: this.selection.selectedIds
            }))
        })
    }

    selectCell($cell) {
        this.selection.select($cell);
        this.$emit('table: select', $cell);
        const styles = $cell.getStyles(Object.keys(defaultStyles));
        // console.log('dispatch style', styles);
        this.$dispatch(action.changeStyles(styles));
    }

    async resizeTable(event) {
        try {
            const data = await resizeHadler(this.$root, event);
            this.$dispatch(action.tableResize(data));
        } catch (error) {
            console.warn('Resize error', error.message);
        }

    }

    onMousedown(event) {
        if (shouldResize(event)) {
            this.resizeTable(event);
        } else if (isCell(event)) {
            const $target = $(event.target);
            if (event.shiftKey) {
                const $cells = matrix($target, this.selection.current).map((id) => this.$root.find(`[data-id="${id}"]`));
                this.selection.selectGroup($cells);

            } else {
                this.selectCell($target);
            }
        }
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
        const { key } = event;

        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault();
            const id = this.selection.current.id(true);
            this.selectCell(this.$root.find(nextSelection(key, id)));
        }
    }

    updateTextInStore(value) {
        this.$dispatch(action.changeText({
            id: this.selection.current.id(),
            value
        }));
    }

    onInput(event) {
        this.updateTextInStore($(event.target).text());
    }
}