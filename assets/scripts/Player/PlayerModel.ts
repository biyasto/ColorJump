import { _decorator, Component, Node, Vec3 } from 'cc';
import { SceneManager, GameColors } from '../SceneManager';
const { ccclass, property } = _decorator;

@ccclass('BallModel')
export class BallModel extends Component {
    private _direction: number;
    public _color: number;
    private _pos: Vec3;
    private timer: number = 0.1;
    start() {
        this._color = GameColors.BLUE;
    }


    public GetBallDirection() {
        return this._direction>0 ? 1 : -1;
    }
    private changeColor()//blue: boolean, pink: boolean,purple: boolean)
    {
        var newColor
       do{
          newColor= Math.floor(Math.random() * GameColors.COLOR_NUMBER+1);
        }
        while(false) //todo: check opposite wall have this color

        console.log(this._color + " - :" +newColor);
        this._color = newColor;

    }
    private randomColor()
    {
        return
    }
    update(deltaTime: number) {
        var timer;
        if(timer <= 0){
            this.changeColor();
            timer = 3.1;
        }
        else{
            timer -= deltaTime;
        }
    }
}


