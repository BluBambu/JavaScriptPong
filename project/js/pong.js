var pong = function(gameWidth, gameHeight, ctx, animFrame) {
    var PaddleBufferSpace = 30;
    var BackgroundColor = '#000000';

    var rightPaddle = paddle(gameWidth, gameHeight,
        gameWidth - PaddleBufferSpace, gameHeight / 2);
    var leftPaddle = paddle(gameWidth, gameHeight, PaddleBufferSpace,
        gameHeight / 2);

    ball = pongBall({
        width: gameWidth,
        height: gameHeight
    }, leftPaddle, rightPaddle);

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
        ctx.fillStyle = BackgroundColor;
        ctx.fillRect(0, 0, gameWidth, gameHeight);

        ball.render(ctx);
        rightPaddle.render(ctx);
        leftPaddle.render(ctx);
    }

    function step() {
        update();
        render();
        animFrame(step);
    }

    // Kick off the first frame
    animFrame(step);
};
