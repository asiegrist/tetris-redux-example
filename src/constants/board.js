export const origin = 0
export const width = 260
export const height = 500

export const squareEdge = 20

//export const middle = (width / 2) - (width / 2) % squareEdge
export const middle = ((width / 2) - (width / 2) % squareEdge) / squareEdge
export const maxTop = height / squareEdge
export const maxLeft = width / squareEdge