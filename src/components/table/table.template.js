const codes = {
    A: 65,
    Z: 90
}

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function toCell(state, row) {
    return function(_, col) {
        const width = getWidth(state.colState, col);
        const id = `${col}:${row}`
        const text = state.dataState[id] || '';
        return /*html*/`
        <div 
            class='cell' 
            contenteditable 
            data-col='${col}'
            data-type='cell'
            data-id='${id}'
            style='width: ${width}'
        >${text}</div>
    `
    }
}


function toColumn({ col, index, width }) {
    return /*html*/`
        <div class='column' data-type='resizable' data-col='${index}' style='width: ${width}'>
            ${col}
            <div class='col-resize' data-resize='col'></div>
        </div>
    `
}

function createRow(index, content, state) {
    const resize = index ? `<div class='row-resize' data-resize='row'></div>` : '';
    const height = getHeight(state, index);
    return /*html*/`
        <div class='row' data-type='resizable' data-row='${index}'style='height: ${height}'>
            <div class='row-info'>
                ${index ? index : ''}
                ${resize}
            </div>
            <div class='row-data'>${content}</div>
        </div>
    `
}

function toChar(_, index) {
    return String.fromCharCode(codes.A + index);
}

function getWidth(state, index) {
    return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
    return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function withWidthFrom(state) {
    return function(col, index) {
        return {
            col, index, width: getWidth(state.colState, index)
        }
    }
}

export function createTable(rowsCount, state = {}) {
    const colsCount = codes.Z - codes.A + 1;
    const rows = [];

    const cols = new Array(colsCount).fill('')
        .map(toChar)
        .map(withWidthFrom(state))
        .map(toColumn)
        .join('');

    rows.push(createRow(null, cols, {}));

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell(state, row))
            .join('');
        rows.push(createRow(row + 1, cells, state.rowState));
    }

    return rows.join('');
}