import { $ } from "../../core/dom";

export class Excel {
    constructor(selector, options) {
        this.$el = document.querySelector(selector);
        this.components = options.components || [];
    }

    getRoor() {
        const $root = $.create('div', 'excel');

        this.components.forEach((Component) => {
            const $el = $.create('div', Component.className);
            const component = new Component($el);
            $el.innerHTML = component.toHTML();
            $root.append($el)
        });
        return $root
    }

    render() {
        this.$el.append(this.getRoor());
    }
}