import { defaultStyles, defaultTitle } from "../constants";
import { clone } from "../core/utils";

const defaultState = {
    colState: {},
    rowState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    title: defaultTitle,
    currentStyles: defaultStyles,
    openDate: new Date().toJSON()
}

const normalize = (state) => ({
    ...state,
    currentStyles: defaultState,
    currentText: ''
})

export function normalizeInitialState(state) {
    return state ? normalize(state) : clone(defaultState);
}