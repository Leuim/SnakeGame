// --- Load images ---
const snakeHeadImage = new Image();
const snakeBodyImage = new Image();
const fruitImage = new Image();
snakeHeadImage.src = "images/h.png"; // Path to snake head image
snakeBodyImage.src = "images/w.png"; // Path to snake body image
fruitImage.src = "images/fruit.png"; // Path to fruit image

// --- Canvas Setup ---
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Enable anti-aliasing for smoother images
ctx.imageSmoothingEnabled = true;

// Make canvas size with higher resolution
const scaleFactor = 2; // Double resolution for less pixelation
const box = 30; // Grid size in game logic
const gridWidth = 15;  // 15 columns
const gridHeight = 15; // 15 rows
canvas.width = box * gridWidth * scaleFactor; // Higher internal resolution
canvas.height = box * gridHeight * scaleFactor;
canvas.style.width = `${box * gridWidth}px`; // CSS size remains the same
canvas.style.height = `${box * gridHeight}px`;

// --- Game Variables ---
let snake = [{ x: 9 * box, y: 9 * box }];
let fruit;
let direction = null;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let gameOverState = false; // Track game over state
let isGameRunning = false; // Track if game loop is active
let animationFrameId; // Store requestAnimationFrame ID
let lastRenderTime = 0;  // For controlling FPS
let gameSpeed = 700;     // Time in ms between snake updates
let timeToUpdate = gameSpeed;  // Track when to update game state

// --- Function to Spawn Fruit Not on Snake ---
const spawnFruit = () => {
  let newFruit;
  do {
    newFruit = {
      x: Math.floor(Math.random() * gridWidth) * box,
      y: Math.floor(Math.random() * gridHeight) * box
    };
  } while (snake.some(segment => segment.x === newFruit.x && segment.y === newFruit.y));
  fruit = newFruit;
};

// Initialize fruit position
spawnFruit();

// --- Draw Functions ---
// Draw grid background
const drawField = () => {
  for (let row = 0; row < gridHeight; row++) {
    for (let col = 0; col < gridWidth; col++) {
      ctx.fillStyle = (row + col) % 2 === 0 ? "#82e85d" : "#66b549"; // Light Lime and Very Light Green
      ctx.fillRect(col * box * scaleFactor, row * box * scaleFactor, box * scaleFactor, box * scaleFactor);
    }
  }
};

// Draw snake (use images for head and body)
const drawSnake = () => {
  for (let i = 0; i < snake.length; i++) {
    if (i === 0) {
      // Draw the head
      ctx.drawImage(snakeHeadImage, snake[i].x * scaleFactor, snake[i].y * scaleFactor, box * scaleFactor, box * scaleFactor);
    } else {
      // Draw the body
      ctx.drawImage(snakeBodyImage, snake[i].x * scaleFactor, snake[i].y * scaleFactor, box * scaleFactor, box * scaleFactor);
    }
  }
};

// Draw fruit
const drawFruit = () => {
  ctx.drawImage(fruitImage, fruit.x * scaleFactor, fruit.y * scaleFactor, box * scaleFactor, box * scaleFactor);
};

// --- Game Logic Functions ---
const moveSnake = () => {
  let head = { x: snake[0].x, y: snake[0].y };

  if (direction === "LEFT") head.x -= box;
  if (direction === "UP") head.y -= box;
  if (direction === "RIGHT") head.x += box;
  if (direction === "DOWN") head.y += box;

  snake.unshift(head);

  if (head.x === fruit.x && head.y === fruit.y) {
    score++;
    highScore = Math.max(score, highScore);
    localStorage.setItem("highScore", highScore);
    spawnFruit(); // Spawn new fruit not on snake
  } else {
    snake.pop();
  }
};

const checkCollision = () => {
  if (gameOverState) return; // Skip collision check if game is over

  let collided = false;

  if (
    snake[0].x < 0 ||
    snake[0].x >= gridWidth * box ||
    snake[0].y < 0 ||
    snake[0].y >= gridHeight * box
  ) {
    collided = true;
  }

  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      collided = true;
    }
  }

  if (collided) {
    gameOver();
  }
};

// Game Over Function
const gameOver = () => {
  if (gameOverState) return; // Prevent multiple game over triggers
  gameOverState = true;
  isGameRunning = false;
  cancelAnimationFrame(animationFrameId); // Stop the game loop

  drawField(); // Redraw the field
  drawSnake(); // Redraw the snake
  drawFruit(); // Redraw the fruit

  setTimeout(() => {
    alert(`Game Over! Your score: ${score}. High Score: ${highScore}`);
  }, 50); // Slight delay before alert
};

// --- Main Game Loop ---
const gameLoop = (currentTime) => {
  if (gameOverState || !isGameRunning) return; // Stop loop if game is over or not running

  const deltaTime = currentTime - lastRenderTime;
  timeToUpdate -= deltaTime;

  if (timeToUpdate <= 0) {
    lastRenderTime = currentTime;
    timeToUpdate = gameSpeed;

    drawField();
    drawSnake();
    drawFruit();
    moveSnake();
    checkCollision();

    // Update score
    document.getElementById("score").textContent = score;
    document.getElementById("highScore").textContent = highScore;
  }

  animationFrameId = requestAnimationFrame(gameLoop); // Store the ID
};

// --- Controls ---
document.addEventListener("keydown", event => {
  // Start game on first arrow key press if not running
  if (!isGameRunning && ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"].includes(event.key)) {
    isGameRunning = true;
    gameOverState = false;
    snake = [{ x: 9 * box, y: 9 * box }];
    direction = null;
    score = 0;
    // Do not reset fruit here to keep the preview position
    animationFrameId = requestAnimationFrame(gameLoop);
  }

  // Set direction only if game is running
  if (isGameRunning) {
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  }
});

// --- Buttons ---
document.getElementById("pauseButton").addEventListener("click", () => {
  if (isGameRunning) {
    isGameRunning = false;
    cancelAnimationFrame(animationFrameId); // Stop the game loop
  }
});

document.getElementById("restartButton").addEventListener("click", () => {
  cancelAnimationFrame(animationFrameId); // Cancel existing loop
  isGameRunning = true;
  gameOverState = false;
  snake = [{ x: 9 * box, y: 9 * box }];
  direction = null;
  score = 0;
  spawnFruit(); // Spawn new fruit not on snake for restart
  animationFrameId = requestAnimationFrame(gameLoop);
});

// --- Disable Scroll with Mouse Wheel ---
window.addEventListener('wheel', function(event) {
  event.preventDefault();
}, { passive: false });

// --- Disable Scroll when using Arrow Keys ---
window.addEventListener("keydown", function(e) {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
    e.preventDefault();
  }
}, { passive: false });

// --- Draw Initial Game Preview ---
const drawInitialPreview = () => {
  drawField();
  drawSnake();
  drawFruit();
};

// Wait for images to load before drawing preview
Promise.all([
  new Promise(resolve => snakeHeadImage.onload = resolve),
  new Promise(resolve => snakeBodyImage.onload = resolve),
  new Promise(resolve => fruitImage.onload = resolve)
]).then(() => {
  drawInitialPreview();
}).catch(() => {
  // Fallback in case images fail to load
  drawField();
  ctx.fillStyle = "green"; // Draw snake as rectangles
  snake.forEach(segment => ctx.fillRect(segment.x * scaleFactor, segment.y * scaleFactor, box * scaleFactor, box * scaleFactor));
  ctx.fillStyle = "red"; // Draw fruit as rectangle
  ctx.fillRect(fruit.x * scaleFactor, fruit.y * scaleFactor, box * scaleFactor, box * scaleFactor);
});