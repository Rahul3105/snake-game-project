// snake head initially cordinates
let snakeCordinates = [{ x: 10, y: 10 }];

let gameBoard = document.getElementsByClassName("gameBoard")[0];

let currScore = document.querySelectorAll(".currScore")[0];
// food initially cordinate
let food = { x: 20, y: 10 };
//direction changed according to the key type
let inputDir = { x: 0, y: 0 };

// game loop area

let lastTime = 0;
let snakeSpeed = 10;
function print(time) {
  window.requestAnimationFrame(print);
  if ((time - lastTime) / 1000 < 1 / snakeSpeed) {
    return;
  }
  lastTime = time;
  display();
  update();
}
window.requestAnimationFrame(print);

//  displaying the snake on the grid (gameBoard)

function display() {
  gameBoard.innerHTML = "";
  //display the snake
  snakeCordinates.forEach((cordinate) => {
    let snakeElem = document.createElement("div");
    snakeElem.style.gridRowStart = cordinate.y;
    snakeElem.style.gridColumnStart = cordinate.x;
    snakeElem.classList = "snake";
    gameBoard.appendChild(snakeElem);
  });
  ///display the food
  let foodElem = document.createElement("div");
  foodElem.style.gridRowStart = food.y;
  foodElem.style.gridColumnStart = food.x;
  foodElem.classList = "food";
  gameBoard.appendChild(foodElem);
}

// updating the snake cordinates

function update() {
  let myDir = sendInput();
  for (let i = snakeCordinates.length - 2; i >= 0; i--) {
    snakeCordinates[i + 1] = { ...snakeCordinates[i] };
  }

  snakeCordinates[0].x += myDir.x;
  snakeCordinates[0].y += myDir.y;
  if (isCollide(snakeCordinates)) {
    setTimeout(() => {
      alert(`Game over and your max score is ${currScore.innerHTML}`);
    }, 100);

    snakeCordinates = [{ x: 10, y: 10 }];
    inputDir = { x: 0, y: 0 };
    food = { x: 20, y: 10 };
    setTimeout(() => {
      currScore.innerHTML = 0;
    }, 101);
  }

  // when snake eat his food

  if (snakeCordinates[0].x == food.x && snakeCordinates[0].y == food.y) {
    currScore.innerHTML = Number(currScore.innerHTML) + 1;
    food.x = Math.floor(Math.random() * (30 - 1 + 1)) + 1;
    food.y = Math.floor(Math.random() * (25 - 1 + 1)) + 1;
    snakeCordinates.push({
      x: snakeCordinates[snakeCordinates.length - 1].x + myDir.x,
      y: snakeCordinates[snakeCordinates.length - 1].y + myDir.y,
    });
  }
}

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (inputDir.y == 1) break;
      inputDir = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (inputDir.y == -1) break;
      inputDir = { x: 0, y: 1 };
      break;
    case "ArrowRight":
      if (inputDir.x == -1) break;
      inputDir = { x: 1, y: 0 };
      break;
    case "ArrowLeft":
      if (inputDir.x == 1) break;
      inputDir = { x: -1, y: 0 };
      break;
    default:
      break;
  }
});
function sendInput() {
  return inputDir;
}
function isCollide(snakeCordinates) {
  if (
    snakeCordinates[0].x <= 0 ||
    snakeCordinates[0].x >= 31 ||
    snakeCordinates[0].y <= 0 ||
    snakeCordinates[0].y >= 26
  ) {
    return true;
  }
  for (let i = 2; i < snakeCordinates.length; i++) {
    if (
      snakeCordinates[i].x == snakeCordinates[0].x &&
      snakeCordinates[i].y == snakeCordinates[0].y
    ) {
      return true;
    }
  }
}
