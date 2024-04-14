"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Snake_1 = require("./Snake");
var Food_1 = require("./Food");
var readline = require("readline");
var Game = /** @class */ (function () {
    function Game(width, height) {
        if (width === void 0) { width = 20; }
        if (height === void 0) { height = 10; }
        var _this = this;
        this.width = width;
        this.height = height;
        this.snake = new Snake_1.Snake(width, height);
        this.food = new Food_1.Food(width, height);
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.rl.on('keypress', function (chunk, key) {
            if (key) {
                switch (key.name) {
                    case 'w':
                        _this.snake.setDirection('Up');
                        break;
                    case 's':
                        _this.snake.setDirection('Down');
                        break;
                    case 'a':
                        _this.snake.setDirection('Left');
                        break;
                    case 'd':
                        _this.snake.setDirection('Right');
                        break;
                }
            }
        });
        readline.emitKeypressEvents(process.stdin);
        if (process.stdin.isTTY) {
            process.stdin.setRawMode(true);
        }
    }
    Game.prototype.run = function () {
        var _this = this;
        var interval = setInterval(function () {
            _this.snake.move(_this.isFoodConsumed());
            if (_this.isGameOver()) {
                console.clear();
                console.log("Game Over!");
                clearInterval(interval);
                _this.rl.close();
            }
            else {
                _this.draw();
            }
        }, 200);
    };
    Game.prototype.isFoodConsumed = function () {
        var head = this.snake.body[0];
        if (head.x === this.food.x && head.y === this.food.y) {
            this.food.randomize();
            return true;
        }
        return false;
    };
    Game.prototype.isGameOver = function () {
        var _a = this.snake.body, head = _a[0], body = _a.slice(1);
        return body.some(function (part) { return part.x === head.x && part.y === head.y; });
    };
    Game.prototype.draw = function () {
        console.clear();
        var _loop_1 = function (y) {
            var line = '';
            var _loop_2 = function (x) {
                if (this_1.snake.body.some(function (part) { return part.x === x && part.y === y; })) {
                    line += 'O';
                }
                else if (this_1.food.x === x && this_1.food.y === y) {
                    line += 'F';
                }
                else {
                    line += '.';
                }
            };
            for (var x = 0; x < this_1.width; x++) {
                _loop_2(x);
            }
            console.log(line);
        };
        var this_1 = this;
        for (var y = 0; y < this.height; y++) {
            _loop_1(y);
        }
    };
    return Game;
}());
var game = new Game();
game.run();
