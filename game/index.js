import { Map } from "immutable";

let board = Map();

export function move(position, player) {
  return {
    type: "MOVE",
    position,
    player,
    turn: "X"
  };
}

export default function reducer(state = { board, turn: "X" }, action) {
  switch (action.type) {
    default:
      return state;
    case "MOVE":
      state.turn === "X" ? (state.turn = "O") : (state.turn = "X");
      state = state.board.setIn(action.position, action.player);
      return state;
  }
}
