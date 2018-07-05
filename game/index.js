import { Map } from "immutable";

export function move(player, position) {
  return {
    type: "MOVE",
    position,
    player
  };
}

export function winner (state) {
  let player = state.turn;
  let counter1 = 0;
  let counter2 = 0;
  let counter3 = 0;
  let counter4 = 0;

  for (let i = 0; i < 3; i++) {
    if (state.board.getIn([0, i]) === player)counter1++;
    if (state.board.getIn([i, 0])  === player) counter2++;
    if (state.board.getIn([i, i]) === player) counter3++;
    if (state.board.getIn([i, 2 - i]) === player) counter4++;
  }

  if (counter1 === 3 || counter2 === 3 || counter3 === 3 || counter4 === 3) {
    return true;
  } else {
    return false;
  }
}

const turnReducer = (state = {turn: "X"}, action = {type: 'default'}) => {
  switch (action.type){
    case 'MOVE':
      state === "X" ? (state = "O") : (state = "X");
      return state;
    case 'default':
      return state.turn;
    default:
      return state;
  }
}

const boardReducer = (board = Map(), action = {type: 'default'}) => {
  switch (action.type) {
    default:
      return board;
    case "MOVE":
      board = board.setIn(action.position, action.player);
      return board;
    case 'default':
      return board;
  }
}

export default function reducer(state = { board: boardReducer(), turn: turnReducer(), winner}, action) {
  switch (action.type) {
    default:
      return state;
    case "MOVE":
      state.board = boardReducer(state.board, action)
      if (state.winner(state)){
        console.log(`Player ${state.turn} Won!`)
        return state;
      }
      state.turn = turnReducer(state.turn, action)
      return state;
    }
}
