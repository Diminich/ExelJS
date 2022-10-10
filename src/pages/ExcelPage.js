import { Page } from "../core/Page";
import { debounce, storage } from './../core/utils';
import { rootReducer } from './../redux/rootReducer';
import { normalizeInitialState } from './../redux/initilState';
import { Excel } from './../components/excel/Excel';
import { Formula } from './../components/formula/Formula';
import { Header } from './../components/header/Header';
import { Table } from './../components/table/Table';
import { Toolbar } from './../components/toolbar/Toolbar';
import { createStore } from './../core/createStore';

function storageName(param) {
    return `excel:${param}`;
}

export class ExcelPage extends Page {
    getRoot() {
        const params = this.params ? this.params : Date.now().toString();

        const state = storage(storageName(params));
        const store = createStore(rootReducer, normalizeInitialState(state));

        const stateListner = debounce((state) => {
            storage(storageName(params), state);
        }, 300);

        store.subscribe(stateListner);

        this.excel = new Excel({
            components: [Header, Toolbar, Formula, Table],
            store
        });

        return this.excel.getRoor();
    }

    afterRender() {
        this.excel.init();
    }

    destoy() {
        this.excel.destroy();
    }
}