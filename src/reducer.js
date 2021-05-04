import { createStore, combineReducers } from 'redux';
import { getBoardInitialState } from './utils.js';

const boardState = getBoardInitialState(9);


// this function is called to set each individual square value
const setElementInArr = (state, action) => {
    switch (action.type) {
        case "SET TO X":
        case "SET TO O":
            const leftSide = state.slice(0, action.id);
            const rightSide = state.slice(action.id + 1, state.length);

            let setOnIndex = state[action.id];
            console.log(setOnIndex);

            setOnIndex = {
                ...setOnIndex,
                'value': action.value
            };

            console.log(leftSide.concat(setOnIndex, rightSide));
            return leftSide.concat(setOnIndex, rightSide);

        default:
            return state;
    }
}

// each square calls this and gets updated state
const squaresReducer = (state = boardState, action) => {
    switch (action.type) {
        case "SET TO X":
        case "SET TO O":
            return setElementInArr(state, action);
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
    squares: squaresReducer,
    whoIsNext: whoIsNextReducer
});

const store = createStore(rootReducer);
export { store };