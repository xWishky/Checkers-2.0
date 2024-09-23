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

let allowed_to_move = true

const Pieces = Object.freeze({
  Black: "B",
  White: "W",
  BlackKing: "BD",
  WhiteKing: "WD",
  Empty: ""
})

const GameStates = Object.freeze({
  WhiteWin: "White",
  BlackWin: "Black",
  Stalemate: "Stalemate",
  Ongoing: "Ongoing"
})

function setup() {

  createCanvas(board_size, board_size);
  instantiateBoard();

}

let AI_thinks = false;
function draw() {
  background(220);
  createBoard();
  spawnPieces();

  // If there aren't any capturing paths found, loop over all the pieces on the board to check for captures
  if (!all_paths_found) {

    all_paths = []
    for (let i = 0; i < board_arr[0].length; i++) {
      for (let j = 0; j < board_arr[i].length; j++) {

        let player = (current_turn == 0) ? Pieces.White : Pieces.Black
        let player_king = (current_turn == 0) ? Pieces.WhiteKing : Pieces.BlackKing

        if (board_arr[i][j] == player) {

          let paths = checkCaptures(i, j, player, board_arr, [], j, i, false);
          all_paths.push(...paths);

        } else if (board_arr[i][j] == player_king) {

          let paths = checkCaptures(i, j, player, board_arr, [], j, i, true);
          all_paths.push(...paths);
        }

      }
    }
    all_paths_found = true
  }

  // Filter out all the paths with the maximum length since you have to take the longest capturing path
  if (all_paths.length >= 1) {

    let max_length = Math.max(...all_paths.map(arr => arr.length));

    // Collect all elements that have the maximum length
    let longest_elements = all_paths.filter(item => item.length === max_length)
    
    show_arr = longest_elements

  }


  if (current_turn == 0 && allowed_to_move) {

    showAvailableSpots(show_arr);
    mouseHandler();
  } else if (AI_thinks == false && allowed_to_move) {

    AI_thinks = true
    let best = findBestMove(JSON.parse(JSON.stringify(board_arr)))
    makeMove(best[0], best[1], best[2])
    
    current_turn = 0
    AI_thinks = false
    selected_checker = []
    show_arr = []
  }

}
