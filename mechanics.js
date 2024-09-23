function makeMove(coords_to_move_to, coords_to_move_from, remove_arr) {

    for (let i = 0; i < remove_arr.length; i++) {
      board_arr[remove_arr[i][1]][remove_arr[i][0]] = Pieces.Empty
    }
    
    let prev_value = board_arr[coords_to_move_from[1]][coords_to_move_from[0]]
    board_arr[coords_to_move_from[1]][coords_to_move_from[0]] = Pieces.Empty;

    if (prev_value == Pieces.WhiteKing || prev_value == Pieces.BlackKing) {

        board_arr[coords_to_move_to[1]][coords_to_move_to[0]] = (current_turn == 1) ? Pieces.BlackKing : Pieces.WhiteKing;

    } else if (current_turn == 0 && coords_to_move_to[1] == 0) {

        board_arr[coords_to_move_to[1]][coords_to_move_to[0]] = Pieces.WhiteKing
    } 
    else if (current_turn == 1 && coords_to_move_to[1] == 7) {
        
        board_arr[coords_to_move_to[1]][coords_to_move_to[0]] = Pieces.BlackKing

    } else {

        board_arr[coords_to_move_to[1]][coords_to_move_to[0]] = (current_turn == 1) ? Pieces.Black : Pieces.White;

    }
  
    current_turn = (current_turn == 1) ? 0 : 1;
    all_paths_found = false;
    show_arr = [];
    all_paths = []
    selected_checker = [];

    allowed_to_move = false

    setTimeout(() => {
        allowed_to_move = true;
    }, 150);
    
}
  
  
function checkCaptures(y, x, isWhite, board, path = [], start_x, start_y, is_king) {
    const directions = [
        { dx: -1, dy: -1 }, // Forward-left
        { dx: -1, dy: 1 },  // Forward-right
        { dx: 1, dy: -1 },  // Backward-left
        { dx: 1, dy: 1 }    // Backward-right
    ];

    let opponent = isWhite === Pieces.White ? [Pieces.Black, Pieces.BlackKing] : [Pieces.White, Pieces.WhiteKing];
    let player = isWhite === Pieces.White ? (is_king ? Pieces.WhiteKing : Pieces.White) : (is_king ? Pieces.BlackKing : Pieces.Black);

    let foundPath = false;
    let all_paths_with_captures = []; // Initialize an array to hold the paths for this checker

    for (const dir of directions) {
        try {
            if (opponent.includes(board[y + dir.dy][x + dir.dx]) && board[y + (2 * dir.dy)][x + (2 * dir.dx)] === Pieces.Empty) {
                foundPath = true;
                let capturedPiece = board[y + dir.dy][x + dir.dx];
                board[y + dir.dy][x + dir.dx] = Pieces.Empty;
                board[y + (2 * dir.dy)][x + (2 * dir.dx)] = player;

                const newPath = [...path, [x + (2 * dir.dx), y + (2 * dir.dy)]];
                const subPaths = checkCaptures(y + (2 * dir.dy), x + (2 * dir.dx), isWhite, board, newPath, start_x, start_y, is_king);

                all_paths_with_captures.push(...subPaths);

                board[y + dir.dy][x + dir.dx] = capturedPiece;
                board[y + (2 * dir.dy)][x + (2 * dir.dx)] = Pieces.Empty;
            }
        } catch {
            continue;
        }
    }

    if (!foundPath && path.length > 0) {
        path.push({ x: start_x, y: start_y });
        all_paths_with_captures.push(path);
    }

    return all_paths_with_captures;
}

  
function getAllCheckersToBeRemoved(safe_squares) {

    let starting_pos = [safe_squares[safe_squares.length - 1].x, safe_squares[safe_squares.length - 1].y]
    let remove = []
    safe_squares.unshift(starting_pos)

    for (let i = 0; i < safe_squares.length - 1; i++) {
        // X1-coord > X2-coord
        if (safe_squares[i][0] > safe_squares[i + 1][0]) {

        // Y1-coord > Y2-coord
        if (safe_squares[i][1] > safe_squares[i + 1][1]) {
            remove.push([safe_squares[i][0] - 1, safe_squares[i][1] - 1])
        }
        else {
            remove.push([safe_squares[i][0] - 1, safe_squares[i][1] + 1])
        }
        }
        // X1-coord < X2-coord
        else if (safe_squares[i][0] < safe_squares[i + 1][0]) {
        
        // Y1-coord > Y2-coord
        if (safe_squares[i][1] > safe_squares[i + 1][1]) {
            remove.push([safe_squares[i][0] + 1, safe_squares[i][1] - 1])
        }
        else {
            remove.push([safe_squares[i][0] + 1, safe_squares[i][1] + 1])
        }
        }
    }

    return remove

}


function getKingMoves(board, current_x_pos, current_y_pos) {
    let show_arr = [];

    let blocked = {
        left_down: false,
        left_up: false,
        right_up: false,
        right_down: false
    };
    
    for (let k = 1; k <= current_x_pos; k++) {
        // Check bounds and left_down
        if ((current_y_pos + k < board.length) && !blocked.left_down && (current_x_pos - k >= 0) && board[current_y_pos + k][current_x_pos - k] == Pieces.Empty) {
            show_arr.push([current_x_pos - k, current_y_pos + k]);
        } else {
            blocked.left_down = true;
        }

        // Check bounds and left_up
        if ((current_y_pos - k >= 0) && !blocked.left_up && (current_x_pos - k >= 0) && board[current_y_pos - k][current_x_pos - k] == Pieces.Empty) {
            show_arr.push([current_x_pos - k, current_y_pos - k]);
        } else {
            blocked.left_up = true;
        }
    }

    for (let k = 1; current_x_pos + k <= 7; k++) {
        // Check bounds and right_up
        if ((current_y_pos - k >= 0) && !blocked.right_up && (current_x_pos + k < board.length) && board[current_y_pos - k][current_x_pos + k] == Pieces.Empty) {
            show_arr.push([current_x_pos + k, current_y_pos - k]);
        } else {
            blocked.right_up = true;
        }

        // Check bounds and right_down
        if ((current_y_pos + k < board.length) && !blocked.right_down && (current_x_pos + k < board.length) && board[current_y_pos + k][current_x_pos + k] == Pieces.Empty) {
            show_arr.push([current_x_pos + k, current_y_pos + k]);
        } else {
            blocked.right_down = true;
        }
    }
    
    return show_arr;
}
