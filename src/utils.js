export const getBoardInitialState = (boardSize) => {
    const board = Array(boardSize).fill(null).map(
        (square, index) => {
            return { value: null, id: index };
        }
    );
    return board;
}

export const calculateWinner = (squares) => {
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