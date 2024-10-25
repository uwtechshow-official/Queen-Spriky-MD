class Battleship {
    constructor(player1, x_astral = false) {
      this.boardSize = 5;
      this.emptyCell = '🌊';
      this.shipCell = '🛳️';
      this.hitCell = '🔥';
      this.missCell = '💨';
  
      this.boards = {
        player1: this.createBoard(),
        player2: this.createBoard()
      };
      this.ships = {
        player1: this.createShips(),
        player2: this.createShips()
      };
      this.isGameOver = false;
      this.players = [{ name: player1 }];
      if (x_astral) {
        this.players.push({ name: 'Bot' });
        this.x_astral = true;
      } else {
        this.players.push({ name: 'Player 2' });
        this.x_astral = false;
      }
  
      this.currentPlayerIndex = 0;
      this.placeShips_R('player1');
      if (x_astral) {
        this.placeShips_R('player2');
      } else {
       }
    }
  
    createBoard() {
      return Array.from({ length: this.boardSize }, () => Array(this.boardSize).fill(this.emptyCell));
    }
    createShips() {
      return [
        { name: 'Destroyer', size: 2, coordinates: [] },
        { name: 'Submarine', size: 3, coordinates: [] },
        { name: 'Battleship', size: 4, coordinates: [] }
      ];
    }
  
    renderBoard(board) {
      return board.map(row => row.join(' ')).join('\n');
    }
    placeShips_R(player) {
      this.ships[player].forEach(ship => {
        let placed = false;
        while (!placed) {
          const direction = Math.random() < 0.5 ? 'H' : 'V'; 
          const row = Math.floor(Math.random() * this.boardSize);
          const col = Math.floor(Math.random() * this.boardSize);
          placed = this.placeShip(player, ship, row, col, direction);
        }
      });
    }
  
    placeShip(player, ship, row, col, direction) {
      if (direction === 'H') {
        if (col + ship.size > this.boardSize) return false; 
        for (let i = 0; i < ship.size; i++) {
          if (this.boards[player][row][col + i] !== this.emptyCell) return false; 
        }
        for (let i = 0; i < ship.size; i++) {
          this.boards[player][row][col + i] = this.shipCell;
          ship.coordinates.push([row, col + i]);
        }
      } else {
        if (row + ship.size > this.boardSize) return false;
        for (let i = 0; i < ship.size; i++) {
          if (this.boards[player][row + i][col] !== this.emptyCell) return false;
        }
        for (let i = 0; i < ship.size; i++) {
          this.boards[player][row + i][col] = this.shipCell;
          ship.coordinates.push([row + i, col]);
        }
      }
      return true;
    }
  
    attack(player, row, col) {
      const opponent = player === 'player1' ? 'player2' : 'player1';
      if (this.boards[opponent][row][col] === this.shipCell) {
        this.boards[opponent][row][col] = this.hitCell;
        this.SunkShip(opponent, row, col);
        return true;
      } else if (this.boards[opponent][row][col] === this.emptyCell) {
        this.boards[opponent][row][col] = this.missCell;
        return false;
      }
      return null;
    }
  
    SunkShip(player, row, col) {
      this.ships[player].forEach(ship => {
        if (ship.coordinates.some(coord => coord[0] === row && coord[1] === col)) {
          ship.coordinates = ship.coordinates.filter(coord => !(coord[0] === row && coord[1] === col));
          if (ship.coordinates.length === 0) {
            this.GameOver_str(player);
          }
        }
      });
    }
  
    GameOver_str(player) {
      if (this.ships[player].every(ship => ship.coordinates.length === 0)) {
        this.isGameOver = true;
      }
    }
    getCurrentPlayer() {
      return this.players[this.currentPlayerIndex];
    }
    nextPlayer() {
      this.currentPlayerIndex = this.currentPlayerIndex === 0 ? 1 : 0;
    }
    botMove() {
      let row, col;
      do {
        row = Math.floor(Math.random() * this.boardSize);
        col = Math.floor(Math.random() * this.boardSize);
      } while (this.boards['player1'][row][col] === this.hitCell || this.boards['player1'][row][col] === this.missCell);
      return [row, col];
    }
  }
  
  module.exports = Battleship;