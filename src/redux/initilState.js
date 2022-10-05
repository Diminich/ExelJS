import { defaultStyles, defaultTitle } from "../constants";
import { storage } from "../core/utils"

const defaultState = {
    colState: {},
    rowState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    title: defaultTitle,
    currentStyles: defaultStyles
}

const normalize = (state) => ({
    ...state,
    currentStyles: defaultState,
    currentText: ''
})
export const initialState = storage('excel-state') ? normalize(storage('excel-state')) : defaultState;