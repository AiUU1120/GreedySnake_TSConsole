"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Snake = void 0;
var Snake = /** @class */ (function () {
    function Snake(maxX, maxY) {
        this.maxX = maxX;
        this.maxY = maxY;
        this.direction = 'Right';
        this.body = [{ x: 5, y: 5 }];
    }
    Snake.prototype.move = function (grow) {
        if (grow === void 0) { grow = false; }
        var head = this.body[0];
        var newHead = { x: head.x, y: head.y };
        switch (this.direction) {
            case 'Up':
                newHead.y--;
                break;
            case 'Down':
                newHead.y++;
                break;
            case 'Left':
                newHead.x--;
                break;
            case 'Right':
                newHead.x++;
                break;
        }
        if (newHead.x < 0)
            newHead.x = this.maxX - 1;
        else if (newHead.x >= this.maxX)
            newHead.x = 0;
        if (newHead.y < 0)
            newHead.y = this.maxY - 1;
        else if (newHead.y >= this.maxY)
            newHead.y = 0;
        this.body.unshift(newHead);
        if (!grow)
            this.body.pop();
    };
    Snake.prototype.setDirection = function (newDirection) {
        var opposite = {
            'Up': 'Down',
            'Down': 'Up',
            'Left': 'Right',
            'Right': 'Left'
        };
        if (this.direction !== opposite[newDirection]) {
            this.direction = newDirection;
        }
    };
    return Snake;
}());
exports.Snake = Snake;
