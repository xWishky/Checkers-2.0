function instantiateBoard() {
    let black_amount = 12
    let white_amount = 12
    for (let i = 0; i < 8; i++) {
      let temp = []
      for (let j = 0; j < 8; j++) {
        if (((i + j) % 2 == 1) && black_amount !== 0) {
          temp.push(Pieces.Black)
          black_amount--
        }
        else if (i >= 5 && ((i + j) % 2 == 1) && white_amount !== 0) {
          temp.push(Pieces.White)
          white_amount--
        }
        else {
          temp.push(Pieces.Empty)
        }
      }
      board_arr.push(temp)
    }
  
}


function createBoard() {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      noStroke()
      fill(((i + j) % 2 == 1) ? "#739552" : "#ebecd0")
      rect(i * 100, j * 100, 100, 100)
    }
  }
}

const Colors = Object.freeze({
  BlackInner: "#1B1212",
  BlackOuter: 15,
  WhiteOuter: "#a7812f",
  WhiteInner: "#c99340",
  KingOutline: "#eb4034"
})
  

function spawnPieces() {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board_arr[j][i] == Pieces.Black) {
        push()
        fill(Colors.BlackOuter)
        stroke(0)
        strokeWeight(2)
        ellipse(i * 100 + 50, j * 100 + 50, 75)
        strokeWeight(0)
        fill(Colors.BlackInner)
        ellipse(i * 100 + 50, j * 100 + 50, 50)
        pop()
      } 
      else if (board_arr[j][i] == Pieces.BlackKing) {
        push()
        fill(Colors.KingOutline)
        ellipse(i * 100 + 50, j * 100 + 50, 85)
        fill(Colors.BlackOuter)
        stroke(0)
        strokeWeight(2)
        ellipse(i * 100 + 50, j * 100 + 50, 75)
        strokeWeight(0)
        fill(Colors.BlackInner)
        ellipse(i * 100 + 50, j * 100 + 50, 50)
        pop()
      }
      else if (board_arr[j][i] == Pieces.White) {
        push()
        fill(Colors.WhiteOuter)
        stroke(0)
        strokeWeight(2)
        ellipse(i * 100 + 50, j * 100 + 50, 75)
        strokeWeight(0)
        fill(Colors.WhiteInner)
        ellipse(i * 100 + 50, j * 100 + 50, 50)
        pop()
      } 
      else if (board_arr[j][i] == Pieces.WhiteKing) {
        push()
        fill(Colors.KingOutline)
        ellipse(i * 100 + 50, j * 100 + 50, 85)
        stroke(0)
        strokeWeight(2)
        fill(Colors.WhiteOuter)
        ellipse(i * 100 + 50, j * 100 + 50, 75)
        strokeWeight(0)
        fill(Colors.WhiteInner)
        ellipse(i * 100 + 50, j * 100 + 50, 50)
        pop()
      } 
    }
  }
}


function showAvailableSpots(to_show) {
  push()
  fill(170, 74, 68, 200)
  noStroke()
  for (let i = 0; i < to_show.length; i++) {
    if (!to_show[i][0][0]) {

      if (to_show[i][0][0] == 0) {

        rect(to_show[i][0][0], to_show[i][0][1] * 100, 100, 100)

      } else {
        
      rect(to_show[i][0] * 100, to_show[i][1] * 100, 100, 100)
      }

    } else {

      for (let j = 0; j < to_show[i].length; j++) {
        rect(to_show[i][j][0] * 100, to_show[i][j][1] * 100, 100, 100)
      }
    }
  }
  pop()
}


function checkWin(board) {
  let black_amount = 12
  let white_amount = 12

  let player = (current_turn == 0) ? Pieces.White : Pieces.Black
  let move_direction = (current_turn == 0) ? -1 : +1
  let has_move = 12;

  // Loop over all the spaces on the board to count all the pieces of each player
  // If there are no pieces of one color left, a winner is selected
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] == Pieces.White || board[i][j] == Pieces.WhiteKing) {
        white_amount--
      }
      else if (board[i][j] == Pieces.Black || board[i][j] == Pieces.BlackKing) {
        black_amount--
      }

      // Get the amount of pieces owned by the current player that aren't able to move
      if (board[i][j] == player) {
        try {
          if (board[i + move_direction][j + 1] == Pieces.Empty || board[i + move_direction][j - 1] == Pieces.Empty) {
            has_move--
          }
        } catch {}
      }
    }
  }

  // Return the current state of the game
  if (white_amount == 12) {
    return GameStates.BlackWin
  } 
  else if (black_amount == 12) {
    return GameStates.WhiteWin
  } 
  else if (show_arr.length == 0 && has_move == 12) {
    return GameStates.Stalemate
  } 
  else {
    return GameStates.Ongoing
  }
}