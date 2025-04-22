Snake Game
A classic Snake game built with HTML, CSS, and JavaScript, featuring a vibrant lime green checkerboard, custom snake and fruit images, and a responsive game-over overlay. Developed by Jassim Algallaf.
Table of Contents 

Features
Demo
Installation
Usage
Project Structure
Dependencies
Contributing
License

Features

Classic Snake Gameplay: Control the snake to eat fruit, grow longer, and avoid collisions with walls or its own body.
Responsive Design: Canvas-based game with a high-resolution display (anti-aliased for smooth visuals).
Custom Assets: Snake head, body, and fruit images for a personalized look.
Vibrant Checkerboard: Light lime green and very light green alternating grid.
Game-Over Overlay: Displays "You Lost!" with final score and high score, plus a "Play Again" button.
Start on Key Press: Game begins when an arrow key is pressed, with a preview shown on load.
Pause and Restart: Buttons to pause the game or restart with a fresh state.
High Score Tracking: Persists across sessions using localStorage.
Favicon: Custom icon for browser tabs and bookmarks.
Scroll Prevention: Disables mouse wheel and arrow key scrolling for better gameplay focus.


Demo
Run the game locally using Live Server in VS Code or deploy it to a web server. Open index.html in a browser to see the game in action. Use arrow keys to control the snake, collect fruit to increase your score, and avoid collisions.
Installation

Clone or Download:
Clone the repository: git clone <repository-url> or download the project files.


Project Setup:
Ensure the following structure is maintained (see Project Structure).
Place image assets (h.png, w.png, fruit.png, logo.png, snake.png, favicon.ico) in the images/ folder.


Install VS Code and Live Server:
Install Visual Studio Code.
Install the Live Server extension in VS Code.


Run the Game:
Open the project in VS Code.
Right-click index.html and select "Open with Live Server" to launch the game in your default browser.



Usage

Start the Game: Press any arrow key (Left, Up, Right, Down) to begin. The canvas shows a preview of the snake and fruit on page load.
Controls:
Arrow Keys: Move the snake left, up, right, or down.
Pause Button: Click "Pause Game" to pause; press an arrow key to resume.
Restart Button: Click "Restart Game" to start a new game.
Play Again Button: Click "Play Again" in the game-over overlay to restart after losing.


Objective: Collect fruit to grow the snake and increase your score. Avoid hitting the walls or the snake's own body.
Game Over: When the snake collides, a centered overlay displays "You Lost!" with your score and high score.

Project Structure
snake-game/
├── css/
│   └── style.css           # Styles for layout, game-over overlay, and UI
├── images/
│   ├── h.png              # Snake head image
│   ├── w.png              # Snake body image
│   ├── fruit.png          # Fruit image
│   ├── logo.png           # Logo for navigation bar
│   ├── snake.png          # Snake image for game info
│   └── favicon.ico        # Favicon for browser tab
├── app.js                 # Game logic (canvas, snake movement, collision, overlay)
├── index.html             # Main HTML file with game canvas and UI
└── README.md              # Project documentation

Dependencies

None (pure HTML, CSS, JavaScript; no external libraries).
Requires a modern web browser (Chrome, Firefox, Edge, etc.) for canvas and localStorage support.
Uses Live Server for local development in VS Code.

Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Make your changes and commit (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a pull request.

Please ensure your code follows the existing style and includes comments for clarity.
License
© 2025 Jassim Algallaf. All rights reserved.
This project is for personal use and educational purposes. Contact the developer for permission to use or distribute.
