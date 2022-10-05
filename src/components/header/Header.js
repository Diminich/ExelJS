import { $ } from "../../core/dom";
import { ExcelStateComponent } from "../../core/ExcelStateComponent";
import * as action from "../../redux/action";

export class Header extends ExcelStateComponent {
    static className = 'excel__header';

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input'],
            subscribe: ['title'],
            ...options
        })
    }

    toHTML() {
        const title = this.store.getState().title;
        return /*html*/`
        <input type = "text" class="input" value="${title}" />
        <div>
            <div class="button">
                <span class="material-symbols-outlined"> delete </span>
            </div>
            <div class="button">
                <span class="material-symbols-outlined"> exit_to_app </span>
            </div>
        </div>
        `
    }

    onInput(event) {
        const value = $(event.target).text();
        this.$dispatch(action.changeTitle(value));
    }
}