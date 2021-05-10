import { createStore, combineReducers } from 'redux';
import { getBoardInitialState } from './utils.js';
import { BOARD_SIZE } from './constants.js';

const boardState = getBoardInitialState(BOARD_SIZE);

// each square calls this and gets updated state
const squaresReducer = (state = boardState, action) => {
    switch (action.type) {
        case "SET_TO_X":
        case "SET_TO_O":
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    value: action.value
                }
            }
        default:
            return state;
    }
}

const whoIsNextReducer = (state = { xIsNext: true }, action) => {
    switch (action.type) {
        case "SET_NEXT_MOVE":
            return {
                ...state,
                xIsNext: !state.xIsNext
            };
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    squares: squaresReducer,
    whoIsNext: whoIsNextReducer
});

const store = createStore(rootReducer);
export { store };