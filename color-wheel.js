var canvas = document.getElementById("picker");
var context = canvas.getContext("2d");
let colors = ['red', 'green', 'blue', 'maroon', 'magenta', 'pink'];
let count = 6;
var x = canvas.width / 2;
var y = canvas.height / 2;
var radius = 100;
var counterClockwise = false;

for (var index = 0; index <= count; index += 1) {
    let step = 360 / count;
    let angle = index * step;
    var startAngle = (angle - 1) * Math.PI / 180;
    var endAngle = (angle + step) * Math.PI / 180;
    context.beginPath();
    context.moveTo(x, y);
    context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
    context.closePath();
    let color = (angle / 10) * 10;
    context.fillStyle = colors[(angle / 60) % colors.length];
    //context.fillStyle = 'hsl('+color+', 100%, 50%)';
    context.fill();
}

// var img = document.querySelector('img');
canvas.addEventListener('click', onClick, false);

function onClick() {
    var deg = 0;
    setInterval(() => {
        this.removeAttribute('style');
        deg = deg + 5; // 500 + Math.round(Math.random() * 500);
        var css = '-webkit-transform: rotate(' + deg + 'deg);';
        this.setAttribute(
            'style', css
        );
    }, 50);

}