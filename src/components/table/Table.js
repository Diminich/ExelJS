import { $ } from "../../core/dom";
import { ExcelComponent } from "../../core/ExcelComponent";
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
        if (event.target.dataset.resize) {
            const $resizer = $(event.target);
            const $parent = $resizer.closest('[data-type="resizable"]');
            const coords = $parent.getCoords();

            console.log($parent.getCoords());
            document.onmousemove = (e) => {
                const delta = e.pageX - coords.right;
                const value = coords.width + delta;
                $parent.$el.style.width = value + 'px';
            }
        }

        document.onmouseup = () => {
            document.onmousemove = null;
        }
    }

    // onMousemove() {
    //     console.log('mousemove');
    // }

    // onMouseup() {
    //     console.log('mouseup');
    // }
}