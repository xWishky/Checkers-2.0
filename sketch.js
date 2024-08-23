let board_size = 800;
let board_arr = [];

// 0 -> White
// 1 -> Black
let current_turn = 0;

let current_x_pos;
let current_y_pos;

let selected_checker = [];
let show_arr = [];

let all_paths = [];
let all_paths_found = false;

let all_removable = [];

const Pieces = {
  Black: "B",
  White: "W",
  BlackKing: "BD",
  WhiteKing: "WD",
  Empty: ""
}


function setup() {

  createCanvas(board_size, board_size);
  instantiateBoard();

  console.table(board_arr);
}


function draw() {
  background(220);
  createBoard();
  spawnPieces();
  checkWin()

  if (!all_paths_found) {

    for (let i = 0; i < board_arr[0].length; i++) {
      for (let j = 0; j < board_arr[i].length; j++) {

        let player = (current_turn == 0) ? Pieces.White : Pieces.Black
        let player_king = (current_turn == 0) ? Pieces.WhiteKing : Pieces.BlackKing

        if (board_arr[i][j] == player) {

          checkCaptures(i, j, player, board_arr, [], j, i, false)

        } else if (board_arr[i][j] == player_king) {
          
          checkCaptures(i, j, player, board_arr, [], j, i, true)
        }

      }
    }

  }

  if (all_paths.length >= 1) {

    let max_length = Math.max(...all_paths.map(arr => arr.length));

    // Collect all elements that have the maximum length
    let longest_elements = all_paths.filter(item => item.length === max_length)
    show_arr = longest_elements

  }

  showAvailableSpots(show_arr)
  mouseHandler()
  
}
