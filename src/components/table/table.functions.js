import { range } from "../../core/utils";

export function shouldResize(event) {
    return event.target.dataset.resize;
}

export function isCell(event) {
    return event.target.dataset.type === 'cell';
}

export function matrix($target, $current) {
    const target = $target.id(true);
    const current = $current.id(true);
    const cols = range(target.coll, current.coll);
    const rows = range(target.row, current.row);
    return cols.reduce((acc, coll) => {
        rows.forEach((row) => acc.push(`${row}:${coll}`));
        return acc;
    }, []);
}

export function nextSelection(key, { row, coll }) {
    const minValue = 0;

    switch (key) {
        case 'Enter':
        case 'ArrowDown':
            row++;
            break;
        case 'Tab':
        case 'ArrowRight':
            coll++;
            break;
        case 'ArrowLeft':
            coll = coll - 1 < minValue ? minValue : coll - 1;
            break;
        case 'ArrowUp':
            row = row - 1 < minValue ? minValue : row - 1;
            break;
    }

    return `[data-id="${row}:${coll}"]`;
}