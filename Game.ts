import { Snake } from './Snake';
import { Food } from './Food';
import * as readline from 'readline';

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

let inputW: boolean = false;
let inputA: boolean = false;
let inputS: boolean = false;
let inputD: boolean = false;

let wTimer: NodeJS.Timeout;
let aTimer: NodeJS.Timeout;
let sTimer: NodeJS.Timeout;
let dTimer: NodeJS.Timeout;

class Game
{
    private _snake: Snake;
    private _food: Food;
    constructor(private width: number = 20, private height: number = 10)
    {
        this._snake = new Snake(width, height);
        this._food = new Food(width, height);
        //键盘输入监听 改变贪吃蛇方向
        process.stdin.on('keypress', (str, key) =>
        {
            if (key)
            {
                switch (key.name)
                {
                    case 'w':
                        this._snake.setDirection('Up');
                        break;
                    case 's':
                        this._snake.setDirection('Down');
                        break;
                    case 'a':
                        this._snake.setDirection('Left');
                        break;
                    case 'd':
                        this._snake.setDirection('Right');
                        break;
                }
            }
        });
    }

    //游戏主逻辑
    run(): void
    {
        const interval = setInterval(() =>
        {
            this._snake.move(this.isFoodConsumed());
            if (this.isGameOver())
            {
                console.clear();
                console.log("Game Over!");
                clearInterval(interval);
            } else
            {
                this.draw();
            }
        }, 200);
    }

    /**是否吃到了食物 */
    isFoodConsumed(): boolean
    {
        const head = this._snake.body[0];
        //吃到食物 重新生成食物
        if (head.x === this._food.x && head.y === this._food.y)
        {
            this._food.randomize();
            return true;
        }
        return false;
    }

    /**是否游戏结束 */
    isGameOver(): boolean
    {
        const [head, ...body] = this._snake.body;
        //吃到自己就寄了
        return body.some(part => part.x === head.x && part.y === head.y);
    }

    /**绘制 */
    draw(): void
    {
        console.clear();
        for (let y = 0; y < this.height; y++)
        {
            let gameDraw = '';
            for (let x = 0; x < this.width; x++)
            {
                //绘制贪吃蛇
                if (this._snake.body.some(part => part.x === x && part.y === y))
                {
                    gameDraw += 'o';
                }
                //绘制食物 
                else if (this._food.x === x && this._food.y === y)
                {
                    gameDraw += '♡';
                } 
                //绘制背景
                else
                {
                    gameDraw += '.';
                }
            }
            console.log(gameDraw);
        }
    }
}

const game = new Game();
game.run();

