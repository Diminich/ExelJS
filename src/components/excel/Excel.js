import { $ } from "../../core/dom";

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector);
        this.components = options.components || [];
    }

    getRoor() {
        const $root = $.create('div', 'excel');

        this.components = this.components.map((Component) => {
            const $el = $.create('div', Component.className);
            const component = new Component($el);
            $el.html(component.toHTML());
            $root.append($el);

            return component
        });

        return $root
    }

    render() {
        this.$el.append(this.getRoor());
        this.components.forEach((component) => component.init());
    }
}