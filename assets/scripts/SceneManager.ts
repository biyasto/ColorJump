import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { PlayerController } from './Player/PlayerController';
import { WallController } from './Wall/WallController';







@ccclass('SceneManager')
export class SceneManager extends Component {
    static WallPosition: any;


    private static instance: SceneManager;

    public static getInstance(): SceneManager {
        if (!SceneManager.instance) {
            SceneManager.instance = new SceneManager();
        }

        return SceneManager.instance;
    }
    start() {

    }


    update(deltaTime: number) {

    }
}


