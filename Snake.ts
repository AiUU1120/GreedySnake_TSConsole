type Direction = 'Up' | 'Down' | 'Left' | 'Right';

export class Snake
{
    private _body: Array<{ x: number; y: number }>;
    private _direction: Direction = 'Right';//设置初始方向为右边

    constructor(private maxX: number, private maxY: number)
    {
        this._body = [{ x: 5, y: 5 }];
    }

    /**贪吃蛇移动 */
    public move(grow: boolean = false): void
    {
        let head = this._body[0];
        let newHead = { x: head.x, y: head.y };

        switch (this._direction)
        {
            case 'Up': newHead.y--; break;
            case 'Down': newHead.y++; break;
            case 'Left': newHead.x--; break;
            case 'Right': newHead.x++; break;
        }
        //边界位置循环
        if (newHead.x < 0)
        {
            newHead.x = this.maxX - 1;
        }
        else if (newHead.x >= this.maxX) 
        {
            newHead.x = 0;
        }
        if (newHead.y < 0)
        {
            newHead.y = this.maxY - 1;
        }
        else if (newHead.y >= this.maxY) 
        {
            newHead.y = 0;
        }

        this._body.unshift(newHead);
        //如果没生长 移除身体最后一个元素
        if (!grow) 
        {
            this._body.pop();
        }
    }

    /**设置贪吃蛇方向 */
    public setDirection(newDirection: Direction): void
    {
        const opposite: { [key in Direction]: Direction } = {
            'Up': 'Down',
            'Down': 'Up',
            'Left': 'Right',
            'Right': 'Left'
        };
        //当新方向为当前方向相反方向时不做改变（不允许原地掉头）
        if (this._direction !== opposite[newDirection])
        {
            this._direction = newDirection;
        }
    }

    public get body()
    {
        return this._body;
    }
}
