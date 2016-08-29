var pong = function (gameWidth, gameHeight, ctx, animFrame) {
    var stopped = false;
    var BackgroundColor = '#000000';
    var MaxPaddleBufferSpace = 15;
    var MinPaddleBufferRatio = 20;

    var PaddleBufferSpace = ((gameWidth / MinPaddleBufferRatio) < MaxPaddleBufferSpace) ?
        (gameWidth / MinPaddleBufferRatio) : MaxPaddleBufferSpace;
    var rightPaddle = paddle(gameWidth, gameHeight,
        gameWidth - PaddleBufferSpace, gameHeight / 2);
    var leftPaddle = paddle(gameWidth, gameHeight, PaddleBufferSpace,
        gameHeight / 2);

    this.ball = pongBall({
        width: gameWidth,
        height: gameHeight
    }, leftPaddle, rightPaddle);

    // ===== Main Logic =====

    this.stop = function () {
        stopped = true;
    };

    function update() {
        this.ball.update();
        rightPaddle.update(this.ball);
        leftPaddle.update(this.ball);
    }

    function render() {
        ctx.fillStyle = BackgroundColor;
        ctx.fillRect(0, 0, gameWidth, gameHeight);

        this.ball.render(ctx);
        rightPaddle.render(ctx);
        leftPaddle.render(ctx);
    }

    function step() {
        if (!stopped) {
            update();
            render();
            animFrame(step);
        }
    }

    // Kick off the first frame
    animFrame(step);

    return this;
};
