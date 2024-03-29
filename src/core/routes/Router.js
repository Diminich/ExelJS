import { $ } from './../dom';
import { ActiveRouting } from './ActiveRouting';

export class Router {
    constructor(selector, routes) {
        if (!selector) {
            throw new Error('Selector is not provided in Router');
        }

        this.$placeholder = $(selector);
        this.routes = routes;
        this.page = null;

        this.changePageHandler = this.changePageHandler.bind(this);
        this.init();
    }

    init() {
        window.addEventListener('hashchange', this.changePageHandler);
        this.changePageHandler();
    }

    changePageHandler() {
        if (this.page) {
            this.page.destroy();
        }

        this.$placeholder.clear();

        const Page = ActiveRouting.path.includes('excel') ? this.routes.excel : this.routes.dashboard;
        this.page = new Page(ActiveRouting.param);

        this.$placeholder.append(this.page.getRoot());

        this.page.afterRender();
    }

    destroy() {
        window.removeEventListener('hashchange', this.changePageHandler);
    }
}