import { _decorator, Component,tween, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('WallView')
export class WallView extends Component {

    public SetUpWallsView(
        cb: Function,
        colorMatrix: number[][],
        wallsNumber:number[],
        delay: number = 0,
    ) {
        tween(this)
            .delay(delay)
            .call(() => {
                this.initWallsView(colorMatrix,wallsNumber);
                cb();
            })
            .start();
    }

    public UpdateWallView(
        side: number = 0,
        colors: number[],
        wallNumber: number =3,
        cb: Function,
        delay: number = 0,
    ) {
        tween(this)
            .delay(delay)
            .call(() => {
                this.updateWallView1Side(side,colors,wallNumber);
                cb();
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

    private increaseWallNumber(side: number = 0, newWallNumber: number = 3) {

    }
}


