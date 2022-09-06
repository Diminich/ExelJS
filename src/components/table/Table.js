import { ExcelComponent } from "../../core/ExcelComponent";
import { shouldResize } from "./table.functions";
import { resizeHadler } from "./table.resize";
import { createTable } from "./table.template";

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown']
        })
    }

    toHTML() {
        return createTable(50)
    }

    // onClick(e) {
    //     if (e.target.dataset.resize) {
    //         console.log('Start');
    //     }
    // }

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHadler(this.$root, event)
        }
    }

    // onMousemove() {
    //     console.log('mousemove');
    // }

    // onMouseup() {
    //     console.log('mouseup');
    // }
}