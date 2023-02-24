import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { SceneManager, GameColors } from '../SceneManager';
@ccclass('WallModel')
export class WallModel extends Component {

     _wallColorMatrix = [
        [1, 2, 3,-1,-1], //wall left
        [3, 2, 1,-1,-1]  // wall right
    ];
    private _wallNumber: [3,3];
     _direction =1;

    start() {

    }

    update(deltaTime: number) {
        this.changeWallColor();
        console.log(this._wallColorMatrix)
    }
    changeWallColor()
    {
        let wallSide;
        if(this._direction>=0) wallSide=0 // left wall
        else wallSide=1 //right wall

        //random 3 value
        for(let row =0; row<this._wallNumber[wallSide]; row++)
        {
            this._wallColorMatrix[wallSide][row]= Math.floor( Math.random() * GameColors.COLOR_NUMBER);
        }

    }

    public GetWallNumber(side= 0)
    {
        let wallNum = this._wallNumber[side];
        if(wallNum <3) return 3; // minimum wall number
        if(wallNum >5) return 5; // maximum wall number
        return wallNum;
    }

}


