import { Excel } from './components/excel/Excel';
import { Formula } from './components/formula/Formula';
import { Header } from './components/header/Header';
import { rootReducer } from './redux/rootReducer';
import { Table } from './components/table/Table';
import { Toolbar } from './components/toolbar/Toolbar';
import { createStore } from './core/createStore';
import './scss/index.scss';
import { debounce, storage } from './core/utils';
import { initialState } from './redux/initilState';

const store = createStore(rootReducer, initialState);

const stateListner = debounce((state) => {
   storage('excel-state', state);
   console.log('App state: ', state);
}, 300);

store.subscribe(stateListner);

const excel = new Excel('#app', {
   components: [Header, Toolbar, Formula, Table],
   store
});

excel.render()