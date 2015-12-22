var bodyload = function() {
    var FramesPerSecond = 30;

    // ===== Main Logic =====
    function restart() {
        ball.restart();
    }

    function update() {
        ball.update();
        rightPaddle.update();
        leftPaddle.update();
    }

    function render() {
        context.fillStyle = "#EFEFEF"
        context.fillRect(0, 0, getWidth(), getHeight());

        ball.render();
        rightPaddle.render();
        leftPaddle.render();
    }

    function step() {
        update();
        render();
        animationFrame(step);
    }

    var canvas = document.getElementById("pong_canvas");
    canvas.style.width = "500px";
    canvas.style.height = "500px";
    var context = canvas.getContext('2d');

    var animationFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / FramesPerSecond)
        };

    // Kick off the first frame
    animationFrame(step);

    // ===== Objects =====

    var paddle = function(x) {
        var Width = 10;
        var Height = 40;

        var y = getHeight() / 2;

        return {
            render: function() {
                context.fillStyle = "#ff0000";
                context.fillRect(x - Width / 2, y - Height / 2,
                    Width, Height);
            },
            getY: function() {
                return y;
            },
            moveY: function(amount) {
                y += amount;
            },
            ballCollide: function(ball) {
                return x + Width > ball.getX() &&
                    x - Width < ball.getX() &&
                    y + Height > ball.getY() &&
                    y - Height < ball.getY()
            }
        }
    }

    var rightPaddle = paddle(getWidth() - 10);
    var leftPaddle = paddle(10);
    rightPaddle.update = function() {
        rightPaddle.moveY(ball.getY() - rightPaddle.getY());
    }

    leftPaddle.update = function() {
        leftPaddle.moveY(ball.getY() - leftPaddle.getY());
    }

    var ball = function() {
        var StartX = getWidth() / 2;
        var StartY = getHeight() / 2;
        var StartVelX = 2;
        var StartVelY = 2;

        var posX = StartX;
        var posY = StartY
        var velX = StartVelX;
        var velY = StartVelY;

        return {
            update: function() {
                posX += velX;
                posY += velY;
                if (posX < 0 || posX > getWidth()) {
                    velX *= -1;
                    restart();
                } else if (posY < 0 || posY > getHeight()) {
                    velY *= -1;
                    update();
                } else if (rightPaddle.ballCollide(this)) {
                    velX *= -1;
                } else if (leftPaddle.ballCollide(this)) {
                    velX *= -1;
                }
            },
            render: function() {
                context.beginPath();
                context.arc(posX, posY, 2, 1 * Math.PI, false);
                context.fillStyle = "#000000";
                context.fill();
            },
            restart: function() {
                posX = StartX;
                posY = StartY;
                velX = StartVelX;
                velY = StartVelY;
            },
            getX() {
                return posX;
            },
            getY() {
                return posY;
            }
        }
    }();

    // ===== Utility =====

    function getWidth() {
        return canvas.width;
    }

    function getHeight() {
        return canvas.height;
    }
};
