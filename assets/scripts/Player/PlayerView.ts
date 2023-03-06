import { _decorator, Component, tween, Node, Vec3, SpriteRenderer, Sprite, color } from 'cc';
import {ColorMap, hexToRgb} from "db://assets/scripts/ColorsData";
const { ccclass, property } = _decorator;

@ccclass('PlayerView')
export class PlayerView extends Component {
    @property(Sprite)
    background: Sprite = null;
    colors = [color(37,138,37), color(153,0,153), color(153,76,0), color(102,204,0)];


    start() {
        this.background.color = this.randomColor();

    }

    public updatePlayerUI(
        //color: GameColors,
        pos: Vec3,
        cb: Function,
        delay: number = 0,
    )
    {
        tween(this)
            .delay(delay)
            .call(() => {
                this.updatePlayerPos(pos);
                cb(pos);
            })
            .start();
    }

    public updatePlayerColor(
        playerColor:number = 0,
    )
    {
        tween(this)

            .call(() => {
                let newColor = hexToRgb(ColorMap.get(playerColor)[0])

                this.background.color = color(newColor.r,newColor.g,newColor.b) //this.randomColor();

            })
            .start();
    }
    update(deltaTime: number) {

    }
    private updatePlayerPos(pos: Vec3 ) {
        this.node.position = pos
    }
    randomColor()
    {
        const random = Math.floor(Math.random() * color.length);
        return this.colors[random];
    }


}


