import { _decorator, Component, tween, Node } from 'cc';
import {GameColors, SceneManager} from "db://assets/scripts/SceneManager";
const { ccclass, property } = _decorator;

@ccclass('PlayerView')
export class PlayerView extends Component {
    start() {

    }

    public updatePlayerUI(
        color: GameColors,
        delay: Number,
        cb: Function
    )
    {

    }
    update(deltaTime: number) {

    }
}


