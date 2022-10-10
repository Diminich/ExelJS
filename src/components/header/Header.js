import { $ } from "../../core/dom";
import { ExcelStateComponent } from "../../core/ExcelStateComponent";
import { ActiveRouting } from "../../core/routes/ActiveRouting";
import * as action from "../../redux/action";

export class Header extends ExcelStateComponent {
    static className = 'excel__header';

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
            subscribe: ['title'],
            ...options
        })
    }

    toHTML() {
        const title = this.store.getState().title;
        return /*html*/`
        <input type = "text" class="input" value="${title}" />
        <div>
            <div class="button" data-button="remove">
                <span class="material-symbols-outlined" data-button="remove"> delete </span>
            </div>
            <div class="button" data-button="exit">
                <span class="material-symbols-outlined" data-button="exit"> exit_to_app </span>
            </div>
        </div>
        `
    }

    onInput(event) {
        const value = $(event.target).text();
        this.$dispatch(action.changeTitle(value));
    }

    onClick(event) {
        const $target = $(event.target);
        
        if ($target.data.button === 'remove') {
            const decision = confirm('Вы действительно хотите удалить эту страницу?');
            if (decision) {
                localStorage.removeItem(`excel:${ActiveRouting.param}`);
                ActiveRouting.navigate('');
            }
        } else if ($target.data.button === 'exit') {
            ActiveRouting.navigate('');
        }
    }
}