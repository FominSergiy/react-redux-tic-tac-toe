import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { store } from './reducer.js';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'



const Square = (props) => {
    // props.id is used in the Reducer to access state of each square
    // state is an Arr with 9 obj representing squares
    const squareValue = useSelector(state => state.squares[props.id].value);

    return (
        <button className="square"
            onClick={props.onClick}>
            {squareValue}
        </button>
    );

}

const Board = () => {
    const xIsNext = useSelector(state => state.whoIsNext.xIsNext);
    const dispatch = useDispatch();
    const whoMovesNext = xIsNext ? 'X' : 'O';

    const winner = calculateWinner(
        useSelector(state => state.squares)
    );


    const handleClick = (i) => {
        dispatch({
            type: `SET TO ${whoMovesNext}`,
            id: i
        });

        dispatch({
            type: 'SET NEXT MOVE'
        });
    }

    const renderSquare = (i) => {
        return <Square
            id={i}
            onClick={() => handleClick(i)}
        />;
    }

    let status;

    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = `Next player: ${whoMovesNext}`;
    }

    return (
        <div>
            <div className="status">{status}</div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
}

const Game = () => {
    return (
        <div className="game">
            <div className="game-board">
                <Board />
            </div>
            <div className="game-info">
                <div>{/* status */}</div>
                <ol>{/* TODO */}</ol>
            </div>
        </div>
    );
}

// ========================================

ReactDOM.render(
    <Provider store={store}>
        <Game />
    </Provider>,
    document.getElementById('root')
);


function calculateWinner(squares) {
    // new squares is obj inside the reducer
    // extracting only values for comparison
    const squaresValues = squares.map(sq => sq.value);
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squaresValues[a] && squaresValues[a] === squaresValues[b]
            && squaresValues[a] === squaresValues[c]) {
            return squaresValues[a];
        }
    }
    return null;
}