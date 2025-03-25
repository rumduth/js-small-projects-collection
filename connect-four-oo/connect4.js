import Board from './Board.js';
import Player from './Player.js';

const WIDTH = 7;
const HEIGHT = 6;

let button = document.querySelector('button');
let input1 = document.querySelector('#color-1');
let input2 = document.querySelector('#color-2');

button.addEventListener('click', () => {
  let color1 = input1.value;
  let color2 = input2.value;
  if (!color1 || !color2) return;
  let player1 = new Player(color1);
  let player2 = new Player(color2);
  let board = new Board(WIDTH, HEIGHT, player1, player2);
  board.start();
});
