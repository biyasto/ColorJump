import { _decorator, Component, Node, systemEvent, SystemEventType, macro, EventKeyboard } from 'cc';
import {PlayerModel} from "db://assets/scripts/Player/PlayerModel";
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {

    private _playerModel: PlayerModel | null = null;
    //singleton

    private input_timer = 0;
    private INPUT_CD = 0.15;

    //singleton
    private static instance: PlayerController = null;
    public static getInstance(): PlayerController {
        if (!PlayerController.instance) {
            PlayerController.instance = new PlayerController();
        }
        return PlayerController.instance;
    }

    start() {
        this._playerModel = this.getComponent(PlayerModel);
        systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this);
    }

    update(deltaTime: number) {
            if(this.input_timer>0) this.input_timer-= deltaTime;

    }

    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case macro.KEY.space:
                //console.log('Press space key');
                if(this.input_timer<=0) {
                    this.input_timer = this.INPUT_CD;
                    this._playerModel.Jump();
                }

                break;
            case macro.KEY.a:
                //console.log('Press A key');
                this._playerModel.Jump();
                this._playerModel.SwitchDirection();
                break;
        }
    }
}



