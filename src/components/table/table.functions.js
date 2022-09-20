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