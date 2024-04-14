export class Food
{
    private _x: number = 0;
    private _y: number = 0;
    constructor(private maxX: number, private maxY: number)
    {
        this.randomize();
    }

    /**随机生成食物位置 */
    public randomize(): void
    {
        this._x = Math.floor(Math.random() * this.maxX);
        this._y = Math.floor(Math.random() * this.maxY);
    }

    public get x()
    {
        return this._x;
    }
    public get y()
    {
        return this._y;
    }
}
