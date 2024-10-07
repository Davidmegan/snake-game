const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

let snake = [{x:200},{y:200}]
let food = [{x:100},{y:100}]
let direction = [{x:20},{y:0}]

