import R from "ramda";

import * as patterns from "../constants/patterns";
import * as BOARD from "../constants/board";

export const START_GAME = "START_GAME";
export const STOP_GAME = "STOP_GAME";
export const CREATE_PIECE = "CREATE_PIECE";
export const MOVE_PIECE = "MOVE_PIECE";
export const ROTATE_PIECE = "ROTATE_PIECE";
export const VALIDATE_ROW = "VALIDATE_ROW";

export const createPiece = pattern => ({
  type: CREATE_PIECE,
  composition: pattern.map(part => ({
    ...part,
    top: part.top,
    left: part.left + BOARD.middle
  }))
});

export const movePiece = (piece, top, left) => ({
  type: MOVE_PIECE,
  top,
  left,
  piece
});

export const rotatePiece = piece => ({
  type: ROTATE_PIECE,
  piece
});

export const validateRow = (pieces, row) => ({
  type: VALIDATE_ROW,
  pieces,
  row
});

export const startGame = () => ({
  type: START_GAME
});

export const stopGame = () => ({
  type: STOP_GAME
});

export const launchGame = () => dispatch => {
  dispatch(createPiece(generatePiece()));
  dispatch(startGame());
  dispatch(createPiece(generatePiece()));
};

export const moveIfPossible = ({ top = 0, left = 0 }) => (
  dispatch,
  getState
) => {
  let pieces = R.dropLast(4)(getState().pieces);
  let [grid, piece] = R.splitAt(-4)(pieces);

  const isPositionEmpty = piece
    .map(
      square =>
        inRange(BOARD.origin, BOARD.maxLeft, square.left + left) &&
        inRange(BOARD.origin, BOARD.maxTop, Math.max(square.top + top, 0))
          ? findSquare(Math.max(square.top + top, 0), square.left + left)(grid)
          : true
    )
    .every(v => !v);

  if (isPositionEmpty) {
    return dispatch(movePiece(piece, top, left));
  }

  if (top) {
    const rowImpacted = piece.reduce((uniqTop, square) => {
      uniqTop.includes(square.top) ? uniqTop : uniqTop.push(square.top);
      return uniqTop;
    }, []);

    if (rowImpacted.includes(-1)) {
      return dispatch(stopGame());
    }

    rowImpacted.forEach(row => {
      const linePieces = R.filter(R.propEq("top", row))(pieces);
      const isLineComplete = linePieces.length === BOARD.maxLeft;

      if (isLineComplete) {
        dispatch(validateRow(linePieces, row));
      }
    });

    dispatch(createPiece(generatePiece()));
  }
};

export const rotateIfPossible = () => (dispatch, getState) => {
  let pieces = R.dropLast(4)(getState().pieces);
  let [grid, piece] = R.splitAt(-4)(pieces);

  const center = R.find(R.prop("isCenter"), piece);
  if (!center) {
    return;
  }

  const isPositionEmpty = R.all(square => {
    const { top, left } = rotate(center, square);
    return inRange(BOARD.origin, BOARD.maxLeft, left) &&
      inRange(BOARD.origin, BOARD.maxTop, Math.max(top, 0))
      ? !findSquare(Math.max(top, 0), left)(grid)
      : false;
  })(piece);

  if (isPositionEmpty) {
    dispatch(rotatePiece(piece));
  }
};

const findSquare = (top, left) =>
  R.find(
    R.whereEq({
      top,
      left
    })
  );

const rotate = (center, square) => {
  const top = square.left - center.left + center.top;
  const left = center.top - square.top + center.left;
  return { top, left };
};

const generatePiece = () => {
  const patternsList = Object.values(patterns);

  const patternIndex = getRandomInt(patternsList.length);
  return patternsList[patternIndex];
};

const getRandomInt = max => {
  return Math.floor(Math.random() * max);
};

const inRange = (min, max, value) => {
  return min <= value && value < max;
};
