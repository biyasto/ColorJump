import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { SceneManager, GameColors } from './SceneManager';
@ccclass('WallModel')
export class WallModel extends Component {
    
     wallColorMatrix = [
        [1, 2, 3], //wall left
        [3, 2, 1]  // wall right
    ];
     _direction =1;

    start() {

    }

    update(deltaTime: number) {
        this.changeWallColor();
        console.log(this.wallColorMatrix)
    }
    changeWallColor()
    {
        var wallIndex;
        if(this._direction>=0) wallIndex=0 // left wall
        else wallIndex=1 //right wall
        
        //random 3 value
        this.wallColorMatrix[wallIndex]= [Math.floor(Math.random() * GameColors.COLOR_NUMBER+1),Math.floor(Math.random() * GameColors.COLOR_NUMBER+1),Math.floor(Math.random() * GameColors.COLOR_NUMBER+1)]
        
    }
    
}


