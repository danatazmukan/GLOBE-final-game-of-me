let img1, img2, img3, img4, img5, img6, img7, img8, img9;
let currentPage = 1;
let startButton, floodingButton, scientistButton, JAYIQButton;
let platformX = 0;
let platformWidth = 200;

// Variables for game elementы page 8
let circle, score, isGameOver;
const winScore = 8;
let initialFallingSpeed = 3;
let fallingSpeed = initialFallingSpeed;
let nextCircleDelay = 10; // Delay between each new circle drop
let frameCountForNextCircle = 0;
let pageChangeTimer = 0; // Timer for auto page changes
const pageTime = 300; // Time to stay on each page
const extendedPageTime = 500; // Extended time for page 4

function preload() {
  img1 = loadImage('1.png');
  img2 = loadImage('2.png');
  img3 = loadImage('3.png');
  img4 = loadImage('4.png');  
  img5 = loadImage('5.png');
  img6 = loadImage('6.png');
  img7 = loadImage('7.png');
  img8 = loadImage('8.png');
  img9 = loadImage('9.png');
}

function setup() {
  createCanvas(650, 650);
  
  nextButton = createButton('Next');
  nextButton.size(100, 50);
  nextButton.position(475, 600);
  nextButton.mousePressed(() => {
    if (currentPage === 4) {
      currentPage = 5;
    }
  });
  nextButton.hide();
  
  startButton = createButton('Start');
  startButton.size(100, 50); // Larger button size
  startButton.position(300, 450);
  startButton.mousePressed(() => {
    if (currentPage === 1) {
      currentPage = 2;
    }
  });

  floodingButton = createButton('Flooding');
  floodingButton.size(100, 50);
  floodingButton.position(420, 200);
  floodingButton.mousePressed(() => {
    if (currentPage !== 3) {
      currentPage = 3;
    }
  });
  floodingButton.hide();

  scientistButton = createButton('Scientist');
  scientistButton.size(107, 100);
  scientistButton.position(291, 330);
  scientistButton.mousePressed(() => {
    if (currentPage !== 4) {
      currentPage = 4;
    }
  });
  scientistButton.hide();

  JAYIQButton = createButton('JAYIQ RIVER');
  JAYIQButton.size(100, 92);
  JAYIQButton.position(292, 330);
  JAYIQButton.mousePressed(() => {
    if (currentPage === 5) {
      currentPage = 6;
    }
  });
  JAYIQButton.hide();

  // Game variables for page 8
  score = 0;
  isGameOver = false;
  circle = null;
}

function draw() {
  background(220);
  changeImagesAndButtons();
  
  if (currentPage === 8) {
    handlePageEightGameLogic();
    if (isGameOver) {
      // Show game over message and continue button
      fill(0);
      textSize(32);
      textAlign(CENTER);
      text("Congratulations! Click anywhere to continue", width/2, height/2);
      if (mouseIsPressed) {
        currentPage = 9;
      }
    }
  }
}

function changeImagesAndButtons() {
  if (currentPage === 1) {
    image(img1, 0, 0, 650, 650);
    startButton.show();
    floodingButton.hide();
    scientistButton.hide();
    JAYIQButton.hide();
  } else if (currentPage === 2) {
    image(img2, 0, 0, 650, 650);
    startButton.hide();
    floodingButton.show();
    scientistButton.hide();
    JAYIQButton.hide();
  } else if (currentPage === 3) {
    image(img3, 0, 0, 650, 650);
    startButton.hide();
    floodingButton.hide();
    scientistButton.show();
    JAYIQButton.hide();
  } else if (currentPage === 4) {
    image(img4, 0, 0, 650, 650);
    startButton.hide();
    floodingButton.hide();
    scientistButton.hide();
    JAYIQButton.hide();
    nextButton.show();
  } else if (currentPage === 5) {
    nextButton.hide();
    image(img5, 0, 0, 650, 650);
    startButton.hide();
    floodingButton.hide();
    scientistButton.hide();
    JAYIQButton.show();
  } else if (currentPage === 6) {
    image(img6, 0, 0, 650, 650);
    startButton.hide();
    floodingButton.hide();
    scientistButton.hide();
    JAYIQButton.hide();
  } else if (currentPage === 7) {
    image(img7, 0, 0, 650, 650);
    startButton.hide();
    floodingButton.hide();
    scientistButton.hide();
    JAYIQButton.hide();
  } else if (currentPage === 9) {
    image(img9, 0, 0, 650, 650);
  }
}

function handlePageEightGameLogic() {
  if (currentPage === 8) {
    // Page 8: Collection game
    image(img8, 0, 0, 650, 650);
    startButton.hide();
    floodingButton.hide();
    scientistButton.hide();
    JAYIQButton.hide();

    if (!isGameOver) {
      platformX = mouseX - platformWidth / 2;
      fill(255);  // Set platform color to white
      rect(platformX, height - 75, platformWidth, 10); // Draw the platform

      // Manage falling circles
      if (circle) {
        circle.fall();
        circle.show();

        if (catchCircle(circle)) {
          score++;
          circle = null; // Remove the circle when caught
          fallingSpeed += 0.5; // Increase the falling speed for the next ball
        }

        if (circle && circle.offScreen()) {
          circle = null;
          fallingSpeed += 0.5; // Even if missed, the next ball is faster
        }
      }

      if (!circle && frameCountForNextCircle <= 0) {
        circle = new Circle(); // Create a new circle after delay
        frameCountForNextCircle = nextCircleDelay;
      } else {
        frameCountForNextCircle--;
      }

      displayScore();
      checkGameOver();
    }
  }
}

function handleGameOverLogic() {
  if (isGameOver) {
    if (currentPage === 8) {
      currentPage = 9; // Transition to final page when game is over
    }
  }
}

function mousePressed() {
  if (currentPage === 6) {
    currentPage = 7;
  } else if (currentPage === 7) {
    currentPage = 8;
    // Reset game state when starting
    score = 0;
    isGameOver = false;
    fallingSpeed = initialFallingSpeed;
    circle = null;
  }
}

// Circle class
class Circle {
  constructor() {
    this.x = random(50, width-50);
    this.y = 0;
    this.size = 30;
    this.speed = fallingSpeed;
    this.color = color(72, 170, 173);
  }

  fall() {
    this.y += this.speed;
  }

  show() {
    fill(72, 170, 173); // Set circle color to teal #48AAAD
    noStroke();
    ellipse(this.x, this.y, this.size);
  }

  offScreen() {
    return this.y > height;
  }
}

// Catching logic using the platform
function catchCircle(circle) {
  return circle.x > platformX &&
         circle.x < platformX + platformWidth &&
         circle.y + circle.size / 2 > height - 75;
}

// Display score
function displayScore() {
  fill(0);
  textSize(24);
  text("Score: " + score, 10, 30);
}

// Check if the game is over
function checkGameOver() {
  if (score >= winScore) {
    isGameOver = true;
  }
}