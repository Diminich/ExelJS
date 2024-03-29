import { $ } from "../../core/dom";
import { ExcelComponent } from "../../core/ExcelComponent";

export class Formula extends ExcelComponent {
    static className = 'excel__formula';

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            subscribe: ['currentText'],
            ...options
        })
    }

    toHTML() {
        return /*html*/`
        <div class="info">fx</div>
        <div id="formulaInput" class="input" contenteditable spellcheck="false"></div>
        `
    }


    init() {
        super.init();
        this.$formula = this.$root.find('#formulaInput');
        this.$on('table: select', ($cell) => {
            this.$formula.text($cell.data.value);
        });
    }

    storeChanged({currentText}) {
        this.$formula.text(currentText);
    }

    onInput(event) {
        this.$emit('formula: input', $(event.target).text());
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab'];
        if (keys.includes(event.key)) {
            event.preventDefault();
            this.$emit('formula: done');
        }
    }
}