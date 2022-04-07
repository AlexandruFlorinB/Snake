const table_border = 'black'
const table_background = 'white'
const snake_parts = 'lightblue'
const snake_border = 'darkblue'
let snake = [{x: 200, y: 200}, {x: 190, y: 200}, {x: 180, y: 200}, {x: 170, y: 200}, {x: 160, y: 200}]
let score = 0
let changing_direction = false
let foodPos_x
let foodPos_y
let dx = 10
let dy = 0
const table = document.getElementById("table")
const table_space = table.getContext("2d")

document.addEventListener("keydown", changeDirection)

generateFood()

function main() {
    if (document.getElementById("message").innerHTML == "You lost! Push the button to play again!") {
        document.getElementById("message").innerHTML = ""
        document.getElementById("score").innerHTML = "0"
    }
    if (gameOver()) {
        document.getElementById("message").innerHTML = "You lost! Push the button to play again!"
        snake = [{x: 200, y: 200}, {x: 190, y: 200}, {x: 180, y: 200}, {x: 170, y: 200}, {x: 160, y: 200}]
        score = 0
        foodPos_x
        foodPos_y
        dx = 10
        dy = 0
        return changing_direction = false
    } 
    setTimeout(function onMove() {
        buildTable()
        drawFood()
        moveSnake()
        drawSnake()
        main()
    }, 200)
}

function buildTable() {
    table_space.fillStyle = table_background
    table_space.strokestyle = table_border
    table_space.fillRect(0, 0, table.width, table.height)
}

function drawSnake() {
    snake.forEach(drawSnakePart)
}

function drawFood() {
    table_space.fillStyle = 'lightgreen'
    table_space.strokestyle = 'darkgreen'
    table_space.fillRect(foodPos_x, foodPos_y, 10, 10)
    table_space.strokeRect(foodPos_x, foodPos_y, 10, 10)
}

function drawSnakePart(snakePart) {
    table_space.fillStyle = snake_parts
    table_space.strokestyle = snake_border
    table_space.fillRect(snakePart.x, snakePart.y, 10, 10)
    table_space.strokeRect(snakePart.x, snakePart.y, 10, 10)
}

function gameOver() {
    for (let i = 4; i < snake.length; ++i) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true
        }
    }
    let hitLeftWall = snake[0].x < 0
    let hitRightWall = snake[0].x > table.width - 10
    let hitTopWall = snake[0].y < 0
    let hitDownWall = snake[0].y > table.height - 10
    return hitLeftWall || hitRightWall || hitTopWall || hitDownWall
}

function randomFood(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10
}

function generateFood() {
    foodPos_x = randomFood(0, table.width - 10)
    foodPos_y = randomFood(0, table.height - 10)
    snake.forEach(function snakeHasEaten(part) {
        let hasEaten = part.x == foodPos_x && part.y == foodPos_y
        if (hasEaten) {
            generateFood()
        }
    })
}

function changeDirection(event) {
    const leftButton = 37
    const rightButton = 39
    const upButton = 38
    const downButton = 40

    if (changing_direction) {
        return changing_direction = true
    }
    const buttonPressed = event.keyCode
    const goingUp = dy === -10
    const goingDown = dy === 10
    const goingRight = dx === 10
    const goingLeft = dx === -10
    if (buttonPressed === leftButton && goingRight == 0) {
        dx = -10
        dy = 0
    }
    if (buttonPressed === upButton && goingDown == 0) {
        dx = 0
        dy = -10
    }
    if (buttonPressed === rightButton && goingLeft == 0) {
        dx = 10
        dy = 0
    }
    if (buttonPressed === downButton && goingUp == 0) {
        dx = 0
        dy = 10
    }  
}

function moveSnake() {
    let head = {x: snake[0].x + dx, y: snake[0].y + dy}
    snake.unshift(head)
    let snakeEatenFood = snake[0].x === foodPos_x && snake[0].y === foodPos_y
    if (snakeEatenFood) {
        score += 10
        document.getElementById("score").innerHTML = score
        generateFood()
    } else {
        snake.pop()
    }
}



