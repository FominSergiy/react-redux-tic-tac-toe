import { createStore } from 'redux';
import { combineReducers } from 'redux';

const boardState = [];

for (let i = 0; i < 9; i++) {
    boardState.push({
        value: null,
        id: i
    });
}

// this function is called to set each individual square value
const setSquare = (state, action) => {
    switch (action.type) {
        case "SET TO X":
            if (state.id !== action.id) {
                return state;
            }

            return {
                ...state,
                value: 'X'
            };
        case "SET TO O":
            if (state.id !== action.id) {
                return state;
            }

            return {
                ...state,
                value: 'O'
            };
        default:
            return state;
    }
}

// each square calls this and gets updated state
const squareReducer = (state = boardState, action) => {
    switch (action.type) {
        case "SET TO X":
            return state.map(t => setSquare(t, action));
        case "SET TO O":
            return state.map(t => setSquare(t, action));
        default:
            return state;
    }
}

const whoIsNextReducer = (state = { xIsNext: true }, action) => {
    switch (action.type) {
        case "SET NEXT MOVE":
            return {
                ...state,
                xIsNext: !state.xIsNext
            };
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    square: squareReducer,
    whoIsNext: whoIsNextReducer
});

const store = createStore(rootReducer);
export { store };