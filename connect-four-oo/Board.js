const WIDTH = 7;
const HEIGHT = 6;

export default class Board {
  constructor(width = WIDTH, height = HEIGHT, player1, player2) {
    this.width = width;
    this.height = height;
    this.board = [];
    this.htmlBoard = document.getElementById('board');
    this.players = [0, player1.color, player2.color];
    this.currPlayer = 1;
  }

  makeBoard() {
    for (let y = 0; y < this.height; y++) {
      const emptyRow = Array.from({ length: this.width }).fill(null);
      this.board.push(emptyRow);
    }
  }
  removeBoard() {
    this.htmlBoard.innerHTML = '';
  }

  makeHtmlBoard() {
    const top = document.createElement('tr');
    top.setAttribute('id', 'column-top');

    for (let x = 0; x < this.width; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', `top-${x}`);
      headCell.addEventListener('click', e => this.handleClick(e));
      top.append(headCell);
    }
    this.htmlBoard.append(top);

    for (let y = 0; y < this.height; y++) {
      const row = document.createElement('tr');

      for (let x = 0; x < this.width; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `c-${y}-${x}`);
        row.append(cell);
      }
      this.htmlBoard.append(row);
    }
  }

  findSpotForCol(x) {
    for (let y = this.height - 1; y >= 0; y--) {
      if (this.board[y][x] === null) {
        return y;
      }
    }
    return null;
  }

  placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.style.backgroundColor = this.players[this.currPlayer];
    const spot = document.getElementById(`c-${y}-${x}`);
    spot.append(piece);
  }

  endGame(msg) {
    alert(msg);
    setTimeout(() => this.removeBoard(), 1000);
  }
  _win(cells) {
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        this.board[y][x] === this.currPlayer
    );
  }
  checkForWin() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const horiz = [
          [y, x],
          [y, x + 1],
          [y, x + 2],
          [y, x + 3],
        ];
        const vert = [
          [y, x],
          [y + 1, x],
          [y + 2, x],
          [y + 3, x],
        ];
        const diagDR = [
          [y, x],
          [y + 1, x + 1],
          [y + 2, x + 2],
          [y + 3, x + 3],
        ];
        const diagDL = [
          [y, x],
          [y + 1, x - 1],
          [y + 2, x - 2],
          [y + 3, x - 3],
        ];

        if (
          this._win(horiz) ||
          this._win(vert) ||
          this._win(diagDR) ||
          this._win(diagDL)
        ) {
          return true;
        }
      }
    }
    return false;
  }

  handleClick(evt) {
    const x = Number(evt.target.id.slice('top-'.length));

    const y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }

    this.board[y][x] = this.currPlayer;
    this.placeInTable(y, x);

    if (this.checkForWin()) {
      return this.endGame(`Player ${this.currPlayer} won!`);
    }

    if (this.board[0].every(cell => cell !== null)) {
      return this.endGame('Tie!');
    }

    this.currPlayer = this.currPlayer === 1 ? 2 : 1;
  }
  start() {
    this.makeBoard();
    this.makeHtmlBoard();
  }
}
