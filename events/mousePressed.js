
// This function handles mouseClicks during the game
function mouseHandler() {

    if (mouseIsPressed) {
        current_x_pos = Math.floor(mouseX / 100);
        current_y_pos = Math.floor(mouseY / 100);
        
        // Check if a displayed square is clicked
        // If so, make the associated move
        for (let i = 0; i < show_arr.length; i++) {
    
          for (let j = 0; j < show_arr[i].length; j++) {
    
            if (current_x_pos == show_arr[i][0] && current_y_pos == show_arr[i][1] && !show_arr[i][0][0]) {
              return makeMove(show_arr[i], selected_checker)
            } 
            else if (current_x_pos == show_arr[i][j][0] && current_y_pos == show_arr[i][j][1]) {
              getAllCheckersToBeRemoved(show_arr[i])
              return makeMove( show_arr[i][show_arr[i].length - 2], [show_arr[i][show_arr[i].length - 1].x, show_arr[i][show_arr[i].length - 1].y])
            }
          }
    
        }
    
        // Using a try statement here to make sure the code won't crash when checking for
        // positions outside the board/out of boundaries
        try {
          // Every mouseclick we check for available moves and display those
          // This code will only run when there is no obligated capture to perform
          if (board_arr[current_y_pos][current_x_pos] == Pieces.Empty) {
    
            selected_checker = []
            show_arr = []
          }
          else if (board_arr[current_y_pos][current_x_pos] == Pieces.White && current_turn == 0) {
    
            selected_checker = [current_x_pos, current_y_pos]
            show_arr = []
            
            // MAY USE THIS CODE ->
            if (board_arr[current_y_pos - 1][current_x_pos - 1] == Pieces.Empty) {
              show_arr.push([current_x_pos - 1, current_y_pos - 1])
            }
            if (board_arr[current_y_pos - 1][current_x_pos + 1] == Pieces.Empty) {
              show_arr.push([current_x_pos + 1, current_y_pos - 1])
            }
    
          } 
          else if (board_arr[current_y_pos][current_x_pos] == Pieces.Black && current_turn == 1) {  
    
            selected_checker = [current_x_pos, current_y_pos]
            show_arr = []
    
            // MAY USE THIS CODE ->
            if (board_arr[current_y_pos + 1][current_x_pos + 1] == Pieces.Empty) {
              show_arr.push([current_x_pos + 1, current_y_pos + 1])
            }
            if (board_arr[current_y_pos + 1][current_x_pos - 1] == Pieces.Empty) {
              show_arr.push([current_x_pos - 1, current_y_pos + 1])
            }
          }
          else if (board_arr[current_y_pos][current_x_pos] == Pieces.WhiteKing && current_turn == 0) {
            
            selected_checker = [current_x_pos, current_y_pos]
            show_arr = []
    
            let blocked = {
              left_down: false,
              left_up: false,
              right_up: false,
              right_down: false
            };
          
            // Handle left-side movements
            for (let k = 1; k <= current_x_pos; k++) {
                if (!blocked.left_down && board_arr[current_y_pos + k][current_x_pos - k] == Pieces.Empty) {
                    show_arr.push([current_x_pos - k, current_y_pos + k]);
                } else {
                    blocked.left_down = true;
                }
            
                if (current_y_pos - k >= 0 && !blocked.left_up && board_arr[current_y_pos - k][current_x_pos - k] == Pieces.Empty) {
                    show_arr.push([current_x_pos - k, current_y_pos - k]);
                } else {
                    blocked.left_up = true;
                }
            }
            
            // Handle right-side movements
            for (let k = 1; current_x_pos + k <= 7; k++) {
                if (current_y_pos - k >= 0 && !blocked.right_up && board_arr[current_y_pos - k][current_x_pos + k] == Pieces.Empty) {
                    show_arr.push([current_x_pos + k, current_y_pos - k]);
                } else {
                    blocked.right_up = true;
                }
            
                if (!blocked.right_down && board_arr[current_y_pos + k][current_x_pos + k] == Pieces.Empty) {
                    show_arr.push([current_x_pos + k, current_y_pos + k]);
                } else {
                    blocked.right_down = true;
                }
            }
            
          }
          else if (board_arr[current_y_pos][current_x_pos] == Pieces.BlackKing && current_turn == 1) {
    
            selected_checker = [current_x_pos, current_y_pos];
            show_arr = [];
        
            let blocked = {
                left_down: false,
                left_up: false,
                right_up: false,
                right_down: false
            };
            
            // Handle left-side movements
            for (let k = 1; k <= current_x_pos; k++) {
                // Check bounds and left_down
                if ((current_y_pos + k < board_arr.length) && !blocked.left_down && (current_x_pos - k >= 0) && board_arr[current_y_pos + k][current_x_pos - k] == Pieces.Empty) {
                    show_arr.push([current_x_pos - k, current_y_pos + k]);
                } else {
                    blocked.left_down = true;
                }
        
                // Check bounds and left_up
                if ((current_y_pos - k >= 0) && !blocked.left_up && (current_x_pos - k >= 0) && board_arr[current_y_pos - k][current_x_pos - k] == Pieces.Empty) {
                    show_arr.push([current_x_pos - k, current_y_pos - k]);
                } else {
                    blocked.left_up = true;
                }
            }
        
            // Handle right-side movements
            for (let k = 1; current_x_pos + k <= 7; k++) {
                // Check bounds and right_up
                if ((current_y_pos - k >= 0) && !blocked.right_up && (current_x_pos + k < board_arr.length) && board_arr[current_y_pos - k][current_x_pos + k] == Pieces.Empty) {
                    show_arr.push([current_x_pos + k, current_y_pos - k]);
                } else {
                    blocked.right_up = true;
                }
        
                // Check bounds and right_down
                if ((current_y_pos + k < board_arr.length) && !blocked.right_down && (current_x_pos + k < board_arr.length) && board_arr[current_y_pos + k][current_x_pos + k] == Pieces.Empty) {
                    show_arr.push([current_x_pos + k, current_y_pos + k]);
                } else {
                    blocked.right_down = true;
                }
            }
        
        }
        
        }
        catch {}
    }
}
