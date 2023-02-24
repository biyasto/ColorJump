import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { PlayerController } from './Player/PlayerController';
import { WallController } from './Wall/WallController';

export  enum GameColors {
    PINK=0,
    BLUE=1,
    PURPLE=2,
    YELLOW,

    COLOR_NUMBER = 4,
  }

export  enum WallPosition {

  //         top
  //     -------------
  //     |           |
  //    ----line_top----
  // left|           |  right
  //    ----line_bot----
  //     |           |
  //     -------------
  //          bot

    TOP=150,    //y
    BOTTOM=-150,//y
    LEFT=-50,   //x
    RIGHT=50,   //x

    LINE_TOP = 50,//y
    LINE_BOT =-50,//y

    WALL_NUMBER=3
  }

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


