
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
              return makeMove(show_arr[i], selected_checker, [])
            } 
            else if (current_x_pos == show_arr[i][j][0] && current_y_pos == show_arr[i][j][1]) {
              
              return makeMove( show_arr[i][show_arr[i].length - 2], [show_arr[i][show_arr[i].length - 1].x, show_arr[i][show_arr[i].length - 1].y], getAllCheckersToBeRemoved(show_arr[i]))
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
            show_arr = getKingMoves(board_arr, current_x_pos, current_y_pos)

            
          }
          else if (board_arr[current_y_pos][current_x_pos] == Pieces.BlackKing && current_turn == 1) {
    
            selected_checker = [current_x_pos, current_y_pos];

            show_arr = getKingMoves(board_arr, current_x_pos, current_y_pos)
        }
        
        }
        catch {}
    }
}
