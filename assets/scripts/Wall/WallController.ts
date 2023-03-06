import { _decorator, Component, Node } from 'cc';
import {PlayerModel} from "db://assets/scripts/Player/PlayerModel";
import {WallModel} from "db://assets/scripts/Wall/WallModel";
const { ccclass, property } = _decorator;

@ccclass('WallController')
export class WallController extends Component {
    private _wallModel: WallModel | null = null;


    private static instance: WallController = null;
    public static getInstance(): WallController {
        if (!WallController.instance) {
            WallController.instance = new WallController();
        }
        return WallController.instance;
    }
    start() {
        this._wallModel = this.getComponent(WallModel);

    }

    public WallSetUp()
    {
        this._wallModel.setup(3,3);
    }


    update(deltaTime: number) {

    }
}


