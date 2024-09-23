
let bestScore = -Infinity;
let bestMove;
let alpha = -Infinity;
let beta = Infinity;

function findBestMove(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {

            // Loop through all squares to look for AI's pieces (Black in this case)
            // When a piece is found, find all possible moves for that piece
            // if (board[i][j] == Pieces.Empty) continue;
            // if (obligated_captures.length !== 0) {

            //     for (let k = 0; k < obligated_captures.length; k++) {

            //         // Remove the checker from the original position and safe the original value to restore it later on
            //         let original_value = board[obligated_captures[k][obligated_captures.length - 1].y][obligated_captures[k][obligated_captures.length - 1].x]
            //         board[obligated_captures[k][obligated_captures.length - 1].y][obligated_captures[k][obligated_captures.length - 1].x] = Pieces.Empty;

            //         // Change the location of the used black checker tot the last position in the capturing sequence
            //         let y = obligated_captures[k][obligated_captures.length - 2][1];
            //         let x = obligated_captures[k][obligated_captures.length - 2][0];
            //         board[y][x] = original_value

            //         // Remove all the captured pieces and add the previous values to an array to restore the values later on
            //         let remove_arr = getAllCheckersToBeRemoved(obligated_captures[k]);
            //         let previous_values = [];

            //         for (let l = 0; l < remove_arr.length; l++) {
            //             previous_values.push(board[remove_arr[l][1]][remove_arr[l][0]])
            //             board[remove_arr[l][1]][remove_arr[l][0]] = Pieces.Empty;
            //         }

            //         let score = minimax(board, 0, alpha, beta, false);

            //         board[y][x] = Pieces.Empty;                    
            //         for (let l = 0; l < remove_arr.length; l++) {
            //             board[remove_arr[l][1]][remove_arr[l][0]] = previous_values[l];
            //         }
                    
            //         board[obligated_captures[k][obligated_captures.length - 1].y][obligated_captures[k][obligated_captures.length - 1].x] = original_value;

            //         if (score > bestScore) {
            //             bestScore = score                    
            //             let y = obligated_captures[k][obligated_captures.length - 2][1];
            //             let x = obligated_captures[k][obligated_captures.length - 2][0];
            //             // [[Move here], [Previous location]]
            //             bestMove = [[x, y], [obligated_captures[k][obligated_captures.length - 1].x, obligated_captures[k][obligated_captures.length - 1].y]]
            //         }
            //     }
            // }
            // else 
            if (board[i][j] == Pieces.Black) {

                for (let repetitions = -1; repetitions < 2; repetitions += 2) {

                    try {

                        if (board[i + 1][j + repetitions] == Pieces.Empty) {

                            board[i + 1][j + repetitions] = Pieces.Black;
                            board[i][j] = Pieces.Empty;
                            console.table(board)
                            let score = minimax(board, 0, alpha, beta, true);

                            board[i + 1][j + repetitions] = Pieces.Empty;
                            board[i][j] = Pieces.Black;
                            
                            console.log(score)
                            console.table(board)
                            if (score > bestScore) {
                                console.log("Greaters")
                                bestScore = score;
                                // [[Move here], [Previous location]]
                                bestMove = [[i + 1, j + repetitions], [j, i]];
                            }
                        } else {
                            continue
                        }

                    } catch {}
                }

            }
        }
    }
    return bestMove;
}


function minimax(board, depth, alpha, beta, maximizingPlayer) {

    let result = checkWin(board)
    
    if (result !== GameStates.Ongoing) {
        if (result === GameStates.BlackWin) return 1000 - depth; // The maximizing player wins
        if (result === GameStates.WhiteWin) return -1000 + depth; // The minimizing player wins
        if (result === GameStates.Stalemate) return 0; // The game ends in a stalemate
    }

    if (depth >= 1) {
        return evaluatePosition(board); // When the maximum depth is reached, rate the position
    }
    // AI turn
    if (maximizingPlayer) {
        let maxScore = -Infinity
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                // Loop through all squares to look for AI's pieces (Black in this case)
                // When a piece is found, find all possible moves for that piece
                // if (board[i][j] == Pieces.Empty) continue;
                // if (obligated_captures.length !== 0) {
    
                //     for (let k = 0; k < obligated_captures.length; k++) {
    
                //         // Remove the checker from the original position and safe the original value to restore it later on
                //         let original_value = board[obligated_captures[k][obligated_captures.length - 1].y][obligated_captures[k][obligated_captures.length - 1].x]
                //         board[obligated_captures[k][obligated_captures.length - 1].y][obligated_captures[k][obligated_captures.length - 1].x] = Pieces.Empty;
    
                //         // Change the location of the used black checker tot the last position in the capturing sequence
                //         let y = obligated_captures[k][obligated_captures.length - 2][1];
                //         let x = obligated_captures[k][obligated_captures.length - 2][0];
                //         board[y][x] = original_value
    
                //         // Remove all the captured pieces and add the previous values to an array to restore the values later on
                //         let remove_arr = getAllCheckersToBeRemoved(obligated_captures[k]);
                //         let previous_values = [];
    
                //         for (let l = 0; l < remove_arr.length; l++) {
                //             previous_values.push(board[remove_arr[l][1]][remove_arr[l][0]])
                //             board[remove_arr[l][1]][remove_arr[l][0]] = Pieces.Empty;
                //         }
    
                //         console.table(board)
                //         let score = minimax(board, depth + 1, alpha, beta, false);
    
                //         board[y][x] = Pieces.Empty;                    
                //         for (let l = 0; l < remove_arr.length; l++) {
                //             board[remove_arr[l][1]][remove_arr[l][0]] = previous_values[l];
                //         }
                        
                //         board[obligated_captures[k][obligated_captures.length - 1].y][obligated_captures[k][obligated_captures.length - 1].x] = original_value;
  
                //         maxScore = Math.max(maxScore, score);
                //         alpha = Math.max(alpha, maxScore);
                //         if (beta <= maxScore) return maxScore;
                //     }
                    
                // }
                // else 
                if (board[i][j] == Pieces.Black) {
    
                    for (let repetitions = -1; repetitions < 2; repetitions += 2) {
    
                        if (board[i + 1][j + repetitions] == Pieces.Empty) {
    
                            board[i + 1][j + repetitions] = Pieces.Black;
                            board[i][j] = Pieces.Empty;
                            
                            let score = minimax(board, depth + 1, alpha, beta, false);
        
                            board[i + 1][j + repetitions] = Pieces.Empty;
                            board[i][j] = Pieces.Black;
                            
                            if (score > bestScore) {
                                bestScore = score;
                                // [[Move here], [Previous location]]
                                bestMove = [[i + 1, j + repetitions], [j, i]];
                            }
                        }
                    }
    
                }
                else if (board[i][j] == Pieces.BlackKing) {
                    // Handle black king moves
                }
            }
        }

    } else {
        
        let minScore = Infinity;        
        
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                // Loop through all squares to look for AI's pieces (Black in this case)
                // When a piece is found, find all possible moves for that piece
                // if (board[i][j] == Pieces.Empty) continue;
                // if (obligated_captures.length !== 0) {
    
                //     for (let k = 0; k < obligated_captures.length; k++) {
    
                //         // Remove the checker from the original position and safe the original value to restore it later on
                //         let original_value = board[obligated_captures[k][obligated_captures.length - 1].y][obligated_captures[k][obligated_captures.length - 1].x]
                //         board[obligated_captures[k][obligated_captures.length - 1].y][obligated_captures[k][obligated_captures.length - 1].x] = Pieces.Empty;
    
                //         // Change the location of the used black checker tot the last position in the capturing sequence
                //         let y = obligated_captures[k][obligated_captures.length - 2][1];
                //         let x = obligated_captures[k][obligated_captures.length - 2][0];
                //         board[y][x] = original_value
    
                //         // Remove all the captured pieces and add the previous values to an array to restore the values later on
                //         let remove_arr = getAllCheckersToBeRemoved(obligated_captures[k]);
                //         let previous_values = [];
    
                //         for (let l = 0; l < remove_arr.length; l++) {
                //             previous_values.push(board[remove_arr[l][1]][remove_arr[l][0]])
                //             board[remove_arr[l][1]][remove_arr[l][0]] = Pieces.Empty;
                //         }
    
                //         console.table(board)
                //         let score = minimax(board, depth + 1, alpha, beta, true);
    
                //         board[y][x] = Pieces.Empty;                    
                //         for (let l = 0; l < remove_arr.length; l++) {
                //             board[remove_arr[l][1]][remove_arr[l][0]] = previous_values[l];
                //         }
                        
                //         board[obligated_captures[k][obligated_captures.length - 1].y][obligated_captures[k][obligated_captures.length - 1].x] = original_value;
  
                //         minScore = Math.min(minScore, score); 
                //         beta = Math.min(beta, minScore);
                //         if (minScore <= alpha) return minScore;
                //     }
                    
                // }
                // else
                if (board[i][j] == Pieces.White) {
    
                    for (let repetitions = -1; repetitions < 2; repetitions += 2) {
                        
                        if (j + repetitions <= 0 || i + 1 > 7) {
                            console.log("Kefvind")
                            continue
                        }

                        if (board[i + 1][j + repetitions] == Pieces.Empty) {
    
                            board[i + 1][j + repetitions] = Pieces.White;
                            board[i][j] = Pieces.Empty;
        
                            let score = minimax(board, depth + 1, alpha, beta, true);
        
                            board[i + 1][j + repetitions] = Pieces.Empty;
                            board[i][j] = Pieces.White;
                            
                            if (score > bestScore) {
                                bestScore = score;
                                // [[Move here], [Previous location]]
                                bestMove = [[i + 1, j + repetitions], [j, i]];
                            }
                        }
                    }
    
                }
                else if (board[i][j] == Pieces.WhiteKing) {
                    // Handle all possible king moves
                }
            }
        }
    }
}


const Values = Object.freeze({
    King: 20,
    Regular: 5
})


function evaluatePosition(board) {

    let score = 0;

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {

            // Rate the position based on the amount of pieces left on the board
            if (board[i][j] == Pieces.Black) {
                score += Values.Regular
                score += i * 3
            } else if (board[i][j] == Pieces.BlackKing) {
                score += Values.King
                score += i * 3
            } else if (board[i][j] == Pieces.White) {
                score -= Values.Regular
                score -= (7 - i) * 3
            } else if (board[i][j] == Pieces.WhiteKing) {
                score -= Values.King
                score -= (7 - i) * 3
            }
        }
    }
    return score;
}