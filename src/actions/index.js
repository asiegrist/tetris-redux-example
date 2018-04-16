import R from "ramda";

import * as patterns from "../constants/patterns";
import * as BOARD from "../constants/board";

export const START_GAME = "START_GAME"
export const CREATE_PIECE = "CREATE_PIECE";
export const MOVE_PIECE_DOWN = "MOVE_PIECE_DOWN";
export const MOVE_PIECE = "MOVE_PIECE";
export const ROTATE_PIECE = "ROTATE_PIECE";
export const IMMOBILIZE_PIECE = "IMMOBILIZE_PIECE";
export const VALIDATE_ROW = "VALIDATE_ROW";

export const createPiece = (pattern, color) => ({
  type: CREATE_PIECE,
  composition: pattern.map(part => ({
    ...part,
    top: part.top,
    left: part.left + BOARD.middle
  })),
  color
});

export const movePieceDown = () => ({
  type: MOVE_PIECE_DOWN
});

export const movePiece = left => ({
  type: MOVE_PIECE,
  left: left
});

export const rotatePiece = () => ({
  type: ROTATE_PIECE
});

export const immobilizePiece = piece => ({
  type: IMMOBILIZE_PIECE,
  piece
});

export const validateRow = row => ({
  type: VALIDATE_ROW,
  row
});

export const startGame = () => ({
  type: START_GAME,
});

export const moveIfPossible = ({ top = 0, left = 0 }) => (
  dispatch,
  getState
) => {
  let { piece, grid } = getState();
  if (!piece.length) {
    return dispatch(createPiece(...generatePieceStyle()));
  }

  const isPositionEmpty = piece
    .map(
      square =>
        inRange(BOARD.origin, BOARD.maxLeft, square.left + left) &&
        inRange(BOARD.origin, BOARD.maxTop, Math.max(square.top + top, 0))
          ? grid[Math.max(square.top + top, 0)][square.left + left]
          : true
    )
    .every(v => !v);

  if (isPositionEmpty) {
    return top ? dispatch(movePieceDown()) : dispatch(movePiece(left));
  }

  if (top) {
    dispatch(immobilizePiece(piece));
    dispatch(createPiece(...generatePieceStyle()));

    const rowImpacted = piece.reduce((uniqTop, square) => {
      uniqTop.includes(square.top) ? uniqTop : uniqTop.push(square.top);
      return uniqTop;
    }, []);

    grid = getState().grid;

    rowImpacted.forEach(row => {
      const isLineComplete = R.none(R.isNil)(grid[Math.max(row, 0)]);
      if (isLineComplete) {
        return dispatch(validateRow(row));
      }
    });
  }
};

export const rotateIfPossible = () => (dispatch, getState) => {
  let { piece, grid } = getState();

  const center = R.find(R.prop("isCenter"), piece);
  const isPositionEmpty = R.all(square => {
    const { top, left } = rotate(center, square);
    return inRange(BOARD.origin, BOARD.maxLeft, left) &&
      inRange(BOARD.origin, BOARD.maxTop, Math.max(top, 0))
      ? !grid[Math.max(top, 0)][left]
      : false;
  })(piece);

  if (isPositionEmpty) {
    dispatch(rotatePiece());
  }
};

const rotate = (center, square) => {
  const top = square.left - center.left + center.top;
  const left = center.top - square.top + center.left;
  return { top, left };
};

const generatePieceStyle = () => {
  const patternsList = Object.values(patterns);
  const colors = [
    "red",
    "lightskyblue",
    "gold",
    "coral",
    "orange",
    "green",
    "violet"
  ];

  const patternIndex = getRandomInt(patternsList.length);
  const colorIndex = getRandomInt(colors.length);
  return [patternsList[patternIndex], colors[colorIndex]];
};

const getRandomInt = max => {
  return Math.floor(Math.random() * max);
};

const inRange = (min, max, value) => {
  return min <= value && value < max;
};
