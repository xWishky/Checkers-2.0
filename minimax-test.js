let AI_captures = []

function findBestMove(board) {

    let bestScore = -Infinity;
    let bestMove;
    let alpha = -Infinity;
    let beta = Infinity;

    loopThroughAllMovesAndFindCapturingSequences(board, 1)
    
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {

            // Loop through all squares to look for AI's pieces (Black in this case)
            // When a piece is found, find all possible moves for that piece
            if (AI_captures.length > 0) {
                for (let k = 0; k < AI_captures.length; k++) {

                    let player = board[AI_captures[k][AI_captures[k].length - 1].y][AI_captures[k][AI_captures[k].length - 1].x]

                    // Deep copy of the board
                    let saved_board = JSON.parse(JSON.stringify(board));
                    
                    // Set new player location to last in capturing sequence
                    board[AI_captures[k][AI_captures[k].length - 2][1]][AI_captures[k][AI_captures[k].length - 2][0]] = player

                    // Temporary remove all captured checkers
                    let removed = getAllCheckersToBeRemoved(AI_captures[k])

                    board[AI_captures[k][AI_captures[k].length - 1].y][AI_captures[k][AI_captures[k].length - 1].x] = Pieces.Empty
                    for (let m = 0; m < removed.length - 1; m++) {
                        board[removed[m][1]][removed[m][0]] = Pieces.Empty
                    }

                    let save_if_best = JSON.parse(JSON.stringify(AI_captures[k]));
                    let score = minimax(board, 0, alpha, beta, true);
                    
                    // Restore the board to its original state
                    board = JSON.parse(JSON.stringify(saved_board));

                    
                    if (score > bestScore) {
                        bestScore = score;
                        bestMove = [[save_if_best[save_if_best.length - 2][0], save_if_best[save_if_best.length - 2][1]], [save_if_best[save_if_best.length - 1].x, save_if_best[save_if_best.length - 1].y], removed];
                    }
                }
                return bestMove
            }
            else if (board[i][j] == Pieces.Black) {

                for (let repetitions = -1; repetitions < 2; repetitions += 2) {

                    try {

                        if (board[i + 1][j + repetitions] == Pieces.Empty) {

                        
                            // Deep copy of the board
                            let saved_board = JSON.parse(JSON.stringify(board));

                            board[i + 1][j + repetitions] = Pieces.Black;
                            board[i][j] = Pieces.Empty;

                            let score = minimax(board, 0, alpha, beta, true);

                            board = JSON.parse(JSON.stringify(saved_board));
                            
                            if (score > bestScore) {
                                bestScore = score;
                                bestMove = [[j + repetitions, i + 1], [j, i], []];
                            }
                        } else {
                            continue
                        }

                    } catch {}
                }

            }
            else if (board[i][j] == Pieces.BlackKing) {
                let possibleMoves = getKingMoves(board, j, i);
                
                for (let move of possibleMoves) {
                    let saved_board = JSON.parse(JSON.stringify(board));
                    
                    // Move the king
                    board[move[1]][move[0]] = Pieces.BlackKing;
                    board[i][j] = Pieces.Empty;

                    let score = minimax(board, 0, alpha, beta, true);
                    
                    // Restore the board
                    board = JSON.parse(JSON.stringify(saved_board));

                    if (score > bestScore) {
                        bestScore = score;
                        bestMove = [[move[0], move[1]], [j, i], []];
                    }
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

    if (depth >= 3) {
        return evaluatePosition(board); // When the maximum depth is reached, rate the position
    }
    // AI turn
    if (maximizingPlayer) {
        let maxScore = -Infinity

        loopThroughAllMovesAndFindCapturingSequences(board, 1)
        
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {

                // Loop through all squares to look for AI's pieces (Black in this case)
                // When a piece is found, find all possible moves for that piece
                if (AI_captures.length > 0) {
                    for (let k = 0; k < AI_captures.length; k++) {
    
                        let player = board[AI_captures[k][AI_captures[k].length - 1].y][AI_captures[k][AI_captures[k].length - 1].x]
    
                        // Deep copy of the board
                        let saved_board = JSON.parse(JSON.stringify(board));

                        
                        // Set new player location to last in capturing sequence
                        board[AI_captures[k][AI_captures[k].length - 2][1]][AI_captures[k][AI_captures[k].length - 2][0]] = player
    
                        // Temporary remove all captured checkers
                        let removed = getAllCheckersToBeRemoved(AI_captures[k])
    
                        board[AI_captures[k][AI_captures[k].length - 1].y][AI_captures[k][AI_captures[k].length - 1].x] = Pieces.Empty
                        for (let m = 0; m < removed.length - 1; m++) {
                            board[removed[m][1]][removed[m][0]] = Pieces.Empty
                        }
    
                        let score = minimax(board, depth + 1, alpha, beta, false);

                        maxScore = Math.max(maxScore, score);
                        alpha = Math.max(alpha, score);
                        if (beta <= alpha) break; // Beta cut-off

                        // Restore the board to its original state
                        board = JSON.parse(JSON.stringify(saved_board));

                        
                        if (score > maxScore) {
                            maxScore = score;
                        }
                    }
                }
                else if (board[i][j] == Pieces.Black) {
    
                    for (let repetitions = -1; repetitions < 2; repetitions += 2) {
                        
                        try {
                            if (board[i + 1][j + repetitions] == Pieces.Empty) {
    
                                // Deep copy of the board
                                let saved_board = JSON.parse(JSON.stringify(board));

                                board[i + 1][j + repetitions] = Pieces.Black;
                                board[i][j] = Pieces.Empty;
                                
                                let score = minimax(board, depth + 1, alpha, beta, false);
                                
                                board = JSON.parse(JSON.stringify(saved_board));
                                
                                maxScore = Math.max(maxScore, score);
                                alpha = Math.max(alpha, score);
                                if (beta <= alpha) break; // Beta cut-off

                                if (score > maxScore) {
                                    maxScore = score;
                                }
                                
                            }
                        } catch {
                            return maxScore
                        }

                    }
    
                }
                else if (board[i][j] == Pieces.BlackKing) {
                    let possibleMoves = getKingMoves(board, j, i);
                    
                    for (let move of possibleMoves) {
                        let saved_board = JSON.parse(JSON.stringify(board));
                        
                        // Move the king
                        board[move[1]][move[0]] = Pieces.BlackKing;
                        board[i][j] = Pieces.Empty;
    
                        let score = minimax(board, depth + 1, alpha, beta, false);
                        
                        // Restore the board
                        board = JSON.parse(JSON.stringify(saved_board));
    
                        maxScore = Math.max(maxScore, score);
                        alpha = Math.max(alpha, score);
                        if (beta <= alpha) break; // Beta cut-off

                        if (score > maxScore) {
                            maxScore = score;
                        }
                    }
                }
            }
        }
        return maxScore

    } else {
        
        let minScore = Infinity;        
        
        loopThroughAllMovesAndFindCapturingSequences(board, 0)
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {

                // Loop through all squares to look for AI's pieces (Black in this case)
                // When a piece is found, find all possible moves for that piece
                if (AI_captures.length > 0) {
                    for (let k = 0; k < AI_captures.length; k++) {
    
                        let player = board[AI_captures[k][AI_captures[k].length - 1].y][AI_captures[k][AI_captures[k].length - 1].x]
    
                        // Deep copy of the board
                        let saved_board = JSON.parse(JSON.stringify(board));
                        
                        // Set new player location to last in capturing sequence
                        board[AI_captures[k][AI_captures[k].length - 2][1]][AI_captures[k][AI_captures[k].length - 2][0]] = player
    
                        // Temporary remove all captured checkers
                        let removed = getAllCheckersToBeRemoved(AI_captures[k])
    
                        board[AI_captures[k][AI_captures[k].length - 1].y][AI_captures[k][AI_captures[k].length - 1].x] = Pieces.Empty
                        for (let m = 0; m < removed.length - 1; m++) {
                            board[removed[m][1]][removed[m][0]] = Pieces.Empty
                        }
    
                        let score = minimax(board, depth + 1, alpha, beta, true);
    
                        minScore = Math.min(minScore, score);
                        beta = Math.min(beta, score);
                        if (beta <= alpha) break; // Alpha cut-off
                        
                        // Restore the board to its original state
                        board = JSON.parse(JSON.stringify(saved_board));

                        
                        if (score < minScore) {
                            minScore = score;
                        }

                    }
                }
                else if (board[i][j] == Pieces.White) {
    
                    for (let repetitions = -1; repetitions < 2; repetitions += 2) {
                        
                        if (j + repetitions <= 0 || i + 1 > 7) {
                            continue
                        }

                        if (board[i + 1][j + repetitions] == Pieces.Empty) {
    
                            // Deep copy of the board
                            let saved_board = JSON.parse(JSON.stringify(board));
                            board[i + 1][j + repetitions] = Pieces.White;
                            board[i][j] = Pieces.Empty;
        
                            let score = minimax(board, depth + 1, alpha, beta, true);
        
                            // Deep copy of the board
                            board = JSON.parse(JSON.stringify(saved_board));

                            
                            minScore = Math.min(minScore, score);
                            beta = Math.min(beta, score);
                            if (beta <= alpha) break; // Alpha cut-off

                            if (score < minScore) {
                                minScore = score;
                            }
                            
                        }
                    }
    
                }
                else if (board[i][j] == Pieces.WhiteKing) {
                    let possibleMoves = getKingMoves(board, j, i);
                    
                    for (let move of possibleMoves) {
                        let saved_board = JSON.parse(JSON.stringify(board));
                        
                        // Move the king
                        board[move[1]][move[0]] = Pieces.BlackKing;
                        board[i][j] = Pieces.Empty;
    
                        let score = minimax(board, depth + 1, alpha, beta, false);
                        
                        // Restore the board
                        board = JSON.parse(JSON.stringify(saved_board));
    
                        minScore = Math.min(minScore, score);
                        beta = Math.min(beta, score);
                        if (beta <= alpha) break; // Alpha cut-off

                        if (score < minScore) {
                            minScore = score;
                        }
                    }
                }
            }
        }
        return minScore
    }
}


const Values = Object.freeze({
    King: 20,
    Regular: 5
})


// function evaluatePosition(board, playerTurn) {
//     let score = 0;

//     for (let i = 0; i < board.length; i++) {
//         for (let j = 0; j < board[i].length; j++) {
//             let piece = board[i][j];
            
//             if (piece == Pieces.Black || piece == Pieces.BlackKing) {
//                 // Add score for regular pieces and kings
//                 score += (piece == Pieces.Black) ? Values.Regular : Values.King;

//                 // Add positional bonus for central positioning
//                 score += centerBonus(j);

//                 // Encourage forward movement for Black
//                 score += i * 5;

//                 // Check for capture opportunities for Black
//                 if (playerTurn == 1 && canCapture(board, i, j, piece)) {
//                     score += 100; // A capture opportunity for the AI is highly valued
//                 }

//             } else if (piece == Pieces.White || piece == Pieces.WhiteKing) {
//                 // Subtract score for opponent's pieces
//                 score -= (piece == Pieces.White) ? Values.Regular : Values.King;

//                 // Add positional penalty based on central positioning
//                 score -= centerBonus(j);

//                 // Penalize forward movement for White (opponent)
//                 score -= (7 - i) * 5;

//                 // Check for capture opportunities for White
//                 if (playerTurn == 0 && canCapture(board, i, j, piece)) {
//                     score -= 100; // A capture opportunity for the opponent should be penalized
//                 }
//             }
//         }
//     }
//     return score;
// }

function evaluatePosition(board, playerTurn) {
    let score = 0;

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            let piece = board[i][j];

            if (piece == Pieces.Black || piece == Pieces.BlackKing) {
                // Add score for regular pieces and kings
                score += (piece == Pieces.Black) ? Values.Regular : Values.King;

                // Add positional bonus for central positioning
                score += centerBonus(j);

                // Encourage forward movement for Black
                score += i * 5;

                // Check for capture opportunities for Black
                if (playerTurn == 1 && canCapture(board, i, j, piece)) {
                    score += 100; // A capture opportunity for the AI is highly valued
                }

                // Penalize moves that put AI pieces in danger
                if (isPieceInDanger(board, i, j, piece)) {
                    score -= 250; // Strong penalty for being in a position to be captured
                }

            } else if (piece == Pieces.White || piece == Pieces.WhiteKing) {
                // Subtract score for opponent's pieces
                score -= (piece == Pieces.White) ? Values.Regular : Values.King;

                // Add positional penalty based on central positioning
                score -= centerBonus(j);

                // Penalize forward movement for White (opponent)
                score -= (7 - i) * 5;

                // Check for capture opportunities for White
                if (playerTurn == 0 && canCapture(board, i, j, piece)) {
                    score -= 100; // A capture opportunity for the opponent should be penalized
                }

                // Check if opponent's pieces are in danger
                if (isPieceInDanger(board, i, j, piece)) {
                    score += 250; // Bonus for threatening the opponent's pieces
                }
            }
        }
    }
    return score;
}


function canCapture(board, row, col, piece) {
    let opponent = (piece == Pieces.Black || piece == Pieces.BlackKing) ? [Pieces.White, Pieces.WhiteKing] : [Pieces.Black, Pieces.BlackKing];
    
    // Diagonal directions to check for a capture (up-right, up-left, down-right, down-left)
    let directions = [[1, 1], [1, -1], [-1, 1], [-1, -1]];

    for (let [dr, dc] of directions) {
        let newRow = row + dr;
        let newCol = col + dc;
        let afterRow = row + 2 * dr;
        let afterCol = col + 2 * dc;

        if (isValidPos(newRow, newCol) && isValidPos(afterRow, afterCol)) {
            // Check if the diagonal has an opponent piece and the next square is empty
            if (opponent.includes(board[newRow][newCol]) && board[afterRow][afterCol] == Pieces.Empty) {
                return true; // Capture opportunity found
            }
        }
    }
    return false;
}


function isPieceInDanger(board, row, col, piece) {
    let opponent = (piece == Pieces.Black || piece == Pieces.BlackKing) ? [Pieces.White, Pieces.WhiteKing] : [Pieces.Black, Pieces.BlackKing];
    let directions = [[1, 1], [1, -1], [-1, 1], [-1, -1]];

    for (let [dr, dc] of directions) {
        let opponentRow = row + dr;
        let opponentCol = col + dc;
        let afterRow = row + 2 * dr;
        let afterCol = col + 2 * dc;

        if (isValidPos(opponentRow, opponentCol) && isValidPos(afterRow, afterCol)) {
            // If there is an opponent's piece adjacent and an empty spot behind the AI piece, it can be captured
            if (opponent.includes(board[opponentRow][opponentCol]) && board[afterRow][afterCol] == Pieces.Empty) {
                return true; // The piece can be captured
            }
        }
    }
    return false;
}


function isValidPos(row, col) {
    // Check if the position is inside the board boundaries
    return row >= 0 && row < 8 && col >= 0 && col < 8;
}


function centerBonus(column) {
    switch (column) {
        case 0:
        case 7:
            return 10; // Edge positions are less valuable
        case 1:
        case 6:
            return 30;
        case 2:
        case 5:
            return 50;
        case 3:
        case 4:
            return 70; // Central positions are the most valuable
        default:
            return 0;
    }
}


function loopThroughAllMovesAndFindCapturingSequences(board, turn) {
    AI_captures = []
    let player = (turn == 0) ? Pieces.White : Pieces.Black
    let player_king = (turn == 0) ? Pieces.WhiteKing : Pieces.BlackKing

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            
    
            if (board[i][j] == player) {
    
              let paths = checkCaptures(i, j, player, board, [], j, i, false);
              AI_captures.push(...paths);
    
            } else if (board[i][j] == player_king) {
    
              let paths = checkCaptures(i, j, player, board, [], j, i, true);
              AI_captures.push(...paths);
            }
        }
    }
}