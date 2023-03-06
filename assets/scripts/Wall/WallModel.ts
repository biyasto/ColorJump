import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

import {WallView} from "db://assets/scripts/Wall/WallView";
import {ColorMap} from "db://assets/scripts/ColorsData";
import {BOT_RIGHT_WALL_POSITION, TOP_LEFT_WALL_POSITION} from "db://assets/scripts/Wall/WallData"

@ccclass('WallModel')
export class WallModel extends Component {


    private _direction =1;
    private _wallView: WallView | null = null;


    public _wallColorMatrix = [
        [0, 1, 0,-1,-1,-1], //wall left
        [1, 2, 0,-1,-1,-1]  // wall right
    ];
    public _wallNumber = [5,4];


    //singleton
    private static instance: WallModel = null;
    public static getInstance(): WallModel {
        if (!WallModel.instance) {
            WallModel.instance = new WallModel();
        }
        return WallModel.instance;
    }

    start() {
        WallModel.instance = this;
        this._wallView = this.getComponent(WallView);
        this.InitRandomColor();
        this._wallView.SetUpWallsView(this._wallColorMatrix,this._wallNumber);

        //TODO:// un-cmt upper line + delete debug below

        /*this.changeWallColor(0);
        console.log(this._wallColorMatrix);*/
    }
    setup(left=3,right=3){
     this._wallNumber = [left,right];
     for(let col = 0; col < 2; col++)
     {
         for(let row = 0; row < 6; row++)
         {
             if(row < (col == 0? left : right))
             {
                 this._wallColorMatrix[col][row] = Math.floor(Math.random() * (ColorMap.size));
             }
             else
             {
                 this._wallColorMatrix[col][row] = -1;
             }
         }
     }
     console.log(this._wallColorMatrix);
    }
    update(deltaTime: number) {
        //this.changeWallColor();
        //console.log(this._wallColorMatrix)

       //Debug
        /*this.posY-= deltaTime*200;
        console.log("pos:"+this.posX+":"+this.posY);
        this.CheckWallHit(new Vec3(this.posX,this.posY));*/
        //


    }
    InitRandomColor(){
        for(let col=0; col<2; col++)
        for(let row =0; row<this._wallNumber[col]; row++)
        {
            if(row<this._wallNumber[col]){
            this._wallColorMatrix[col][row]= Math.floor( Math.random() * ColorMap.size);
            }
        }
    }
    CheckWallHit(playerPos :Vec3)
    {
        //out of bound
        if(playerPos.y >= TOP_LEFT_WALL_POSITION.y  || playerPos.y <= BOT_RIGHT_WALL_POSITION.y){
            console.log("out of bound")
            return -1;
        }

        let side = -1;
        if(playerPos.x>= BOT_RIGHT_WALL_POSITION.x) {side = 1;}
        else if(playerPos.x<= TOP_LEFT_WALL_POSITION.x) {side =0;}
        else {
            //console.log("not hit wall");
            return null
        }

        //length of 1 color wall
        let wallLength = (TOP_LEFT_WALL_POSITION.y - BOT_RIGHT_WALL_POSITION.y)/this._wallNumber[side];

        let row = 0;
        while(playerPos.y < TOP_LEFT_WALL_POSITION.y - wallLength*(row+1))
        {
            row++
        }
        console.log("Hit Wall #:"+side + ":" + row + " color:" +this.ColorNumberToString(this._wallColorMatrix[side][row]) );

        //validate row and side
        /*if(side<0 || side>1 || row <0 || row >= this._wallNumber[side])
        {
            console.log("ERROR: SIDE or ROW invalid");
            return null;

        }*/
        return this.GetWallColor(side,row);
    }
    GetWallColor(col, row){
        return this._wallColorMatrix[col][row];
    }
    ColorNumberToString(num){
       /* switch (num){
            case 0: return "pink"; break;
            case 1: return "blue"; break;
            case 2: return "purple"; break;
            case 3: return "yellow"; break;
            case 0: return "green"; break;
        }*/
        return ColorMap.get(num)[1]
    }
    public ChangeWallColor(side =0)
    {

        let wallSide = side;
        if(wallSide>1 || wallSide<0) wallSide =0;

        for(let row =0; row<this._wallNumber[wallSide]; row++)
        {
            this._wallColorMatrix[wallSide][row]= Math.floor( Math.random() * ColorMap.size);
        }
        console.log("matrix update: "+this._wallColorMatrix);
       if(this._wallView==null) console.log("wall view null:")
        this._wallView.UpdateWallView(wallSide,this._wallColorMatrix[wallSide],this._wallNumber[wallSide],0);


    }

    public GetWallNumber(side= 0)
    {
        let wallNum = this._wallNumber[side];
        if(wallNum <3) return 3; // minimum wall number
        if(wallNum >5) return 5; // maximum wall number
        return wallNum;
    }

}


