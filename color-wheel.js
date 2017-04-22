var canvas = document.getElementById("picker");
var context = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height / 2;
var radius = 150;
var counterClockwise = false;
var colorSelected;
var answer = document.getElementById('answers');
var questionNo = 1;
var correctAnswers = 0;
let colorsList = [
    {
        rgba: 'rgba(255,0,0,1)',
        name: 'red'
    }, {
        rgba: 'rgba(0,255,0,1)',
        name: 'green'
    }, {
        rgba: 'rgba(0,0,255,1)',
        name: 'blue'
    }, {
        rgba: 'rgba(255,20,147,1)',
        name: 'pink'
    }, {
        rgba: 'rgba(0,0,0,1)',
        name: 'black'
    }, {
        rgba: 'rgba(165,42,42,1)',
        name: 'brown'
    }, {
        rgba: 'rgba(176,48,96,1)',
        name: 'maroon'
    }, {
        rgba: 'rgb(160,32,240)',
        name: 'purple'
    }, {
        rgba: 'rgb(190,190,190)',
        name: 'gray'
    }, {
        rgba: 'rgb(255,255,0)',
        name: 'yellow'
    }, {
        rgba: 'rgb(255,165,0)',
        name: 'orange'
    }, {
        rgba: 'rgb(238,130,238)',
        name: 'violet'
    }, {
        rgba: 'rgb(255,255,255)',
        name: 'white'
    }

];
let colors;
let COLOR_COUNT = 6;

function initialize() {
    // 5 is the min no of colors for the Array, for every next question 1 color gets added
    colors = getRandomColors(COLOR_COUNT);
    let count = colors.length;

    for (var index = 0; index <= count; index += 1) {
        let step = 360 / count;
        let angle = index * step;
        var startAngle = (angle - 1) * Math.PI / 180;
        var endAngle = (angle + step) * Math.PI / 180;
        let color = colors[Math.round((angle / step) % colors.length)].rgba;
        drawArc(radius, startAngle, endAngle, color, 1, 'black')
    }
    drawArc(10, 0, 360, 'white', 3, 'black');
    playGame();
}

function drawArc(radius, startAngle, endAngle, fillColor, strokeWidth, strokColor) {
    context.beginPath();
    context.moveTo(x, y);
    context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
    context.closePath();
    context.fillStyle = fillColor;
    context.lineWidth = strokeWidth;
    context.strokeStyle = strokColor;
    context.stroke();
    context.fill();
}

function playGame() {
    canvas.removeAttribute('style');
    var deg = (360 / colors.length) * Math.round((Math.random() * 100));
    var css = '-webkit-transform: rotate(' + deg + 'deg);-webkit-transition-duration: 1.5s;';
    canvas.setAttribute('style', css);
    // Adding 90 to degree , because our pointer is at y axis while angle starts from x axis
    var colorPartsmoved = Math.ceil(((deg + 90) % 360) / (360 / colors.length));
    colorSelected = colors[colors.length - colorPartsmoved].name;
    askQuestion();
}

function resetGame() {
    canvas.removeAttribute('style');
}

function getRandomColors(maxColor) {
    return colorsList.sort(() => 0.5 - Math.random()).slice(0, maxColor);
}

function askQuestion() {
    answer.innerHTML = '';
    colors.forEach(color => {
        var btnElement = document.createElement('button');
        btnElement.textContent = color.name;
        btnElement.onclick = e => checkAnswer(color.name);
        answer.appendChild(btnElement);
    });
}
function checkAnswer(answer) {
    if (answer === colorSelected) {
        if (confirm("Correct Answer. Do you want to Move to next level?")) {
            initialize();
        }
    } else {
        alert("Incorrect Answer:" + answer);
    }
}
