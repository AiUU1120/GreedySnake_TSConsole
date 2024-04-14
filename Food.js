"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Food = void 0;
var Food = /** @class */ (function () {
    function Food(maxX, maxY) {
        this.maxX = maxX;
        this.maxY = maxY;
        this.x = 0;
        this.y = 0;
        this.randomize();
    }
    Food.prototype.randomize = function () {
        this.x = Math.floor(Math.random() * this.maxX);
        this.y = Math.floor(Math.random() * this.maxY);
    };
    return Food;
}());
exports.Food = Food;
