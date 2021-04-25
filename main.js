'use strict';

var canvas;
var canvasContext;
var ballX = window.innerWidth / 2;
var ballY = window.innerHeight / 2;
var ballXSpeed = 5;
var ballYSpeed = 5;

var paddle1Y = 250;
var paddle2Y = 250;

var player1Score = 0;
var player2Score = 0;

var fps = 60;

var showWinScreen = false;

const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;
const WINNING_SCORE = 3;

window.onload = () => {
    canvas = document.getElementById('gameCanvas');
    canvas.width = window.innerWidth - 10;
    canvas.height = window.innerHeight - 10;
    canvasContext = canvas.getContext('2d');

    setInterval(() => {
        createElements();
        moveBall();
        computerIA();
    }, 1000 / fps);

    canvas - addEventListener('mousedown', handleMouseClic);

    canvas.addEventListener('mousemove', (evt) => {
        var mousePos = calculateMousePos(evt);
        paddle1Y = mousePos.y;

    });

}



function createElements() {
    createRectangle(0, 0, canvas.width, canvas.height, 'black');

    if (showWinScreen) {
        canvasContext.fillStyle = 'white';
        if (player1Score === WINNING_SCORE) {
            canvasContext.fillText("Left player win", canvas.width / 2, canvas.height / 2);
        } else {
            canvasContext.fillText("Right player win", canvas.width / 2, canvas.height / 2);
        }
    } else {
        drawNet();
        createRectangle(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
        createRectangle(canvas.width - 10, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');

        createBall(ballX, ballY, 10, 'red');

        canvasContext.fillStyle = 'white';
        canvasContext.fillText(player1Score, 100, 100);
        canvasContext.fillText(player2Score, canvas.width - 100, 100);
    }
}

function moveBall() {
    ballX += ballXSpeed;
    ballY += ballYSpeed;

    if (ballX > canvas.width) {
        if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
            ballXSpeed = -(ballXSpeed + (ballXSpeed * 0.1));
            console.log(ballXSpeed);
            ballYSpeed = (ballY - (paddle1Y + PADDLE_HEIGHT / 2)) * 0.35;
        } else {
            player1Score += 1;
            var leftPoint = true;
            ballReset(leftPoint);
        }
    } else if (ballX < 0) {
        if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
            ballXSpeed = -(ballXSpeed + (ballXSpeed * 0.1));
            console.log(ballXSpeed);
            ballYSpeed = (ballY - (paddle1Y + PADDLE_HEIGHT / 2)) * 0.35;

        } else {
            player2Score += 1;
            var leftPoint = false;
            ballReset(leftPoint);
        }

    } else if (ballY > canvas.height) {
        ballYSpeed = -5;
    } else if (ballY < 0) {

        ballYSpeed = 5;
    }
}

function createBall(x, y, radius, color) {
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(x, y, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
}

function createRectangle(x, y, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
}

function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;

    return {
        x: mouseX,
        y: mouseY
    };
}

function ballReset(leftPoint) {
    if (player1Score === WINNING_SCORE || player2Score === WINNING_SCORE) {
        showWinScreen = true;
    }
    if (leftPoint) {
        ballXSpeed = 5;
    } else {
        ballXSpeed = -5;
    }
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
}

function computerIA() {
    var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT / 2);
    if (paddle2YCenter < ballY) {
        paddle2Y += 6;
    } else {
        paddle2Y -= 6;
    }
}

function handleMouseClic(evt) {
    if (showWinScreen) {
        player1Score = 0;
        player2Score = 0;
        showWinScreen = false;
    }
}

function drawNet() {
    for (var i = 0; i < canvas.height; i += 40) {
        createRectangle(canvas.width / 2 - 1, i, 2, 20, 'white');
    }
}