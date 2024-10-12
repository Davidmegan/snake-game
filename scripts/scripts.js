const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const canvasSize = 400
const gridSize = 20

let snake = [{x:200,y:200},{x:180,y:200},{x:160,y:200}]
let food = {x:getRandomPosition(),y:getRandomPosition()}
let direction = "RIGHT"
let score = 0

function getRandomPosition() {
    return Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
}

function draw() {
    
    ctx.clearRect(0, 0, canvasSize, canvasSize)
    
    ctx.fillStyle = 'blue'                                      
    ctx.fillRect(snake[0].x, snake[0].y, gridSize, gridSize)
    
    ctx.fillStyle = 'green'
    for(let i = 1; i < snake.length; i++) {
        ctx.fillRect(snake[i].x, snake[i].y, gridSize, gridSize)
    }
    
    ctx.fillStyle = 'red'
    ctx.fillRect(food.x, food.y, gridSize, gridSize)
    
    move()

    if(checkCollision()) {
            reset()
    }

}

function move() {
    let head = {x:snake[0].x, y:snake[0].y}
    switch(direction) {
        case "UP":
            head.y-=gridSize
            break
        case "RIGHT":
            head.x+=gridSize
            break
        case "DOWN":
            head.y+=gridSize
            break
        case "LEFT":
            head.x-=gridSize
            break
    }

    snake.unshift(head)

    if(head.x==food.x && head.y==food.y) {
        score+=100
        food = {x:getRandomPosition(),y:getRandomPosition()}
        document.getElementById('score').textContent = score
    }
    else {
        snake.pop()    
    }
}

function checkCollision() {
    let head = snake[0]
    if(head.x<0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        // reset()
        return true
    }
    for(let i = 1; i < snake.length; i++) {
        if(head.x == snake[i].x && head.y == snake[i].y) {
            return true
        }
    }
    return false
}

function reset() {
    const result = document.querySelector('.result')
    const scoreDisplay = document.getElementById('score')
    scoreDisplay.innerHTML = score
    result.style.display = 'flex'
    clearInterval(startGame)
    snake = [{x:200,y:200},{x:180,y:200},{x:160,y:200}]
    food = {x:getRandomPosition(),y:getRandomPosition()}
    direction = "RIGHT"
    score = 0
    
}

document.addEventListener('keydown',(event) => {
    switch(event.key) {
        case "ArrowUp":
            if(direction != "DOWN") direction = "UP"
            break
        case "ArrowRight":
            if(direction != "LEFT") direction = "RIGHT"
            break
        case "ArrowDown":
            if(direction != "UP") direction = "DOWN"
            break
        case "ArrowLeft":
            if(direction != "RIGHT") direction = "LEFT"
            break
    }
})

let startGame = setInterval(draw,100)