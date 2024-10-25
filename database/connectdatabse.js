class connect_four {
    constructor(player1, gun_man = false) {
      this.boardWidth = 7;
      this.boardHeight = 6;
      this.board = this.createBoard();
      this.players = [{ name: player1, disc: '🟥' }]; 
      if (gun_man) {
        this.players.push({ name: 'Bot', disc: '🟧' }); 
        this.gun_man = true;
      } else {
        this.players.push({ name: 'Player 2', disc: '🟧' }); 
        this.gun_man = false;
      }
      this.currentPlayerIndex = 0;
      this.isGameActive = true;
    }
  
    createBoard() {
      return Array.from({ length: this.boardHeight }, () => Array(this.boardWidth).fill('⬜')); 
    }
    renderBoard() {
      return this.board.map(row => row.join(' ')).join('\n');
    }
    isValidMove(col) {
      return col >= 0 && col < this.boardWidth && this.board[0][col] === '⬜';
    }
    dropDisc(col) {
      for (let row = this.boardHeight - 1; row >= 0; row--) {
        if (this.board[row][col] === '⬜') {
          this.board[row][col] = this.players[this.currentPlayerIndex].disc;
          return row;
        }
      }
      return -1;
    }
  
    checkWin(disc) {
      for (let row = 0; row < this.boardHeight; row++) {
        for (let col = 0; col < this.boardWidth; col++) {
          if (
            (col <= this.boardWidth - 4 && this.board[row][col] === disc && this.board[row][col + 1] === disc && this.board[row][col + 2] === disc && this.board[row][col + 3] === disc) || 
            (row <= this.boardHeight - 4 && this.board[row][col] === disc && this.board[row + 1][col] === disc && this.board[row + 2][col] === disc && this.board[row + 3][col] === disc) ||
            (row <= this.boardHeight - 4 && col <= this.boardWidth - 4 && this.board[row][col] === disc && this.board[row + 1][col + 1] === disc && this.board[row + 2][col + 2] === disc && this.board[row + 3][col + 3] === disc) ||
            (row >= 3 && col <= this.boardWidth - 4 && this.board[row][col] === disc && this.board[row - 1][col + 1] === disc && this.board[row - 2][col + 2] === disc && this.board[row - 3][col + 3] === disc) 
          ) {
            return true;
          }
        }
      }
      return false;
    }
    nextPlayer() {
      this.currentPlayerIndex = this.currentPlayerIndex === 0 ? 1 : 0;
    }
    getCurrentPlayer() {
      return this.players[this.currentPlayerIndex];
    }
    botMove() {
      let col;
      do {
        col = Math.floor(Math.random() * this.boardWidth);
      } while (!this.isValidMove(col));
      return col;
    }
  
    resetGame() {
      this.board = this.createBoard();
      this.currentPlayerIndex = 0;
      this.isGameActive = true;
    }
  }
  
  module.exports = connect_four;
                        