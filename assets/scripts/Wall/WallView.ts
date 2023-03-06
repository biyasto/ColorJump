import { _decorator, Component,tween,Prefab,Node, Sprite, UITransform,color,Vec3 } from 'cc';
import {BOT_RIGHT_WALL_POSITION, TOP_LEFT_WALL_POSITION} from "db://assets/scripts/Wall/WallData";
import {PlayerModel} from "db://assets/scripts/Player/PlayerModel";
import {ColorMap, hexToRgb} from "db://assets/scripts/ColorsData";
const { ccclass, property } = _decorator;

@ccclass('WallView')
export class WallView extends Component {



    @property([Node])
    wallList: Node[];
   // public wallList: Node[] = new Node[6];
    start(){

    }
    public SetUpWallsView(

        colorMatrix: number[][],
        wallsNumber:number[],
        delay: number = 0,
    ) {
        tween(this)
            .delay(delay)
            .call(() => {
               // this.initWallsView(colorMatrix,wallsNumber);
                this.activeWallsNode(wallsNumber[0],wallsNumber[1]);
                this.setWallNode(wallsNumber[0],wallsNumber[1],colorMatrix);


            })
            .start();
    }

    public UpdateWallView(
        side: number = 0,
        colors: number[],
        wallNumber: number =3,
        delay: number = 0,
    ) {
        tween(this)
            .delay(delay)
            .call(() => {
                this.updateWallView1Side(side,colors,wallNumber);
            })

            .start();
    }


    public IncreaseWallNumber(
        side: number = 0,
        wallNumber: number = 3,
        cb: Function,
        delay: number = 0,
    ) {
        tween(this)
            .delay(delay)
            .call(() => {
                //call something here
                cb();
            })
            .start();
    }

    private updateWallView1Side(side,colors,wallNumber) {
        for (let row = 0; row < wallNumber; row++) {
            //updateUIWall [side][row] = colors[row] ;
            let wallSprite = this.wallList[side*5+row].getComponent(Sprite);
            let newColor = hexToRgb(ColorMap.get(colors[row])[0])
            wallSprite.color = color(newColor.r,newColor.g,newColor.b)
        }
    }

    private initWallsView(colorMatrix:number[][],wallsNumber:number[]) {
        if(wallsNumber.length!=2) return;
        for (let col = 0; col < wallsNumber[0]; col++) {
            for (let row = 0; row < wallsNumber[1]; row++) {
                //updateUIWall [col][row] = colorMatrix[col][row] ;
            }
        }
    }
    private activeWallsNode(left=0,right=0) {

        for(let index = 0; index<10; index++)
        {
            if(index < ( index<5 ? left : right + 5))
            {
                this.wallList[index].active=true;
            }
            else {this.wallList[index].active=false;}
        }

    }
    private setWallNode(left =0, right=0, colorMatrix){
        //left wall
        let wallSize = (TOP_LEFT_WALL_POSITION.y-BOT_RIGHT_WALL_POSITION.y) / left;
        let pos = TOP_LEFT_WALL_POSITION.clone();

        for(let index = 0; index<left; index++) {
            //set Pos
            this.wallList[index].position = pos;
            pos.y-= wallSize;
            //set Size
            let wallTransform = this.wallList[index].getComponent(UITransform);
            wallTransform.setContentSize(200,wallSize);
            wallTransform.setAnchorPoint(1,1);

            //set color
            let wallSprite = this.wallList[index].getComponent(Sprite);
            let newColor = hexToRgb(ColorMap.get(colorMatrix[0][index])[0])
            wallSprite.color = color(newColor.r,newColor.g,newColor.b)
        }

        console.log(colorMatrix)

         wallSize = (TOP_LEFT_WALL_POSITION.y-BOT_RIGHT_WALL_POSITION.y) / right;
         pos = new Vec3(BOT_RIGHT_WALL_POSITION.x,TOP_LEFT_WALL_POSITION.y);

        for(let rightIndex = 5; rightIndex<right+5; rightIndex++) {

            //set Pos
            this.wallList[rightIndex].position = pos;
            pos.y-= wallSize;
            //set Size
            let wallTransform = this.wallList[rightIndex].getComponent(UITransform);
            wallTransform.setContentSize(200,wallSize);
            wallTransform.setAnchorPoint(0,1);

            //set color
            let wallSprite = this.wallList[rightIndex].getComponent(Sprite);
            let newColor = hexToRgb(ColorMap.get(colorMatrix[1][rightIndex-5])[0])
            wallSprite.color = color(newColor.r,newColor.g,newColor.b)
        }

    }

    private increaseWallNumber(side: number = 0, newWallNumber: number = 3) {

    }
    GetWallNode(col=0,row=0){
        return this.wallList[0*6+row];
    }

    private nothing() {

    }
}


