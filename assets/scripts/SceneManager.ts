import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;


export  enum GameColors {
    PINK=0,
    BLUE=1,
    PURPLE=2,

    COLOR_NUMBER = 3,
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
  
    start() {

    }

    update(deltaTime: number) {
        
    }
}


