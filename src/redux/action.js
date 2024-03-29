import { CHANGE_TEXT, TABLE_RESIZE, CHANGE_STYLES, APPLAY_STYLE, CHANGE_TITLE, UPDATE_DATE } from "./types";

export function tableResize(data) {
    return {
        type: TABLE_RESIZE,
        data
    }
}

export function changeText(data) {
    return {
        type: CHANGE_TEXT,
        data
    }
}

export function changeStyles(data) {
    return {
        type: CHANGE_STYLES,
        data
    }
}

export function applayStyle(data) {
    return {
        type: APPLAY_STYLE,
        data
    }
}

export function changeTitle(data) {
    return {
        type: CHANGE_TITLE,
        data
    }
}

export function updateDate() {
    return {
        type: UPDATE_DATE
    }
}