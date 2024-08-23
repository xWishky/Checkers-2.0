function instantiateBoard() {
    let black_amount = 12
    let white_amount = 12
    for (let i = 0; i < 8; i++) {
      let temp = []
      for (let j = 0; j < 8; j++) {
        if (((i + j) % 2 == 1) && black_amount !== 0) {
          temp.push("B")
          black_amount--
        }
        else if (i >= 5 && ((i + j) % 2 == 1) && white_amount !== 0) {
          temp.push("W")
          white_amount--
        }
        else {
          temp.push("")
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
  

function spawnPieces() {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board_arr[j][i] == "B") {
        push()
        fill(15)
        stroke(0)
        strokeWeight(2)
        ellipse(i * 100 + 50, j * 100 + 50, 75)
        strokeWeight(0)
        fill("#1B1212")
        ellipse(i * 100 + 50, j * 100 + 50, 50)
        pop()
      } 
      else if (board_arr[j][i] == "BD") {
        push()
        fill("#eb4034")
        ellipse(i * 100 + 50, j * 100 + 50, 85)
        fill(15)
        stroke(0)
        strokeWeight(2)
        ellipse(i * 100 + 50, j * 100 + 50, 75)
        strokeWeight(0)
        fill("#1B1212")
        ellipse(i * 100 + 50, j * 100 + 50, 50)
        pop()
      }
      else if (board_arr[j][i] == "W") {
        push()
        fill("#a7812f")
        stroke(0)
        strokeWeight(2)
        ellipse(i * 100 + 50, j * 100 + 50, 75)
        strokeWeight(0)
        fill("#c99340")
        ellipse(i * 100 + 50, j * 100 + 50, 50)
        pop()
      } 
      else if (board_arr[j][i] == "WD") {
        push()
        fill("#eb4034")
        ellipse(i * 100 + 50, j * 100 + 50, 85)
        stroke(0)
        strokeWeight(2)
        fill("#a7812f")
        ellipse(i * 100 + 50, j * 100 + 50, 75)
        strokeWeight(0)
        fill("#c99340")
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


function checkWin() {
  let black_amount = 12
  let white_amount = 12

  for (let i = 0; i < board_arr.length; i++) {
    for (let j = 0; j < board_arr[i].length; j++) {
      if (board_arr[i][j] == "W" || board_arr[i][j] == "WD") {
        white_amount--
      }
      else if (board_arr[i][j] == "B" || board_arr[i][j] == "BD") {
        black_amount--
      }
    }
  }

  if (white_amount == 12) {
    console.log("Black wins!")
  } else if (black_amount == 12) {
    console.log("White wins!")
  }
}