Game = {
    start: function(gameWidth, gameHeight) {
        var FramesPerSecond = 30;
        var GameWidth = 400;
        var GameHeight = 400;

        var canvas = document.getElementById("pong_canvas");
        canvas.width =  GameWidth;
        canvas.height = GameHeight;

        var animFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / FramesPerSecond)
            };

        var newGame = pong(canvas.width, canvas.height, canvas.getContext('2d'),
            animFrame);
    }
}
