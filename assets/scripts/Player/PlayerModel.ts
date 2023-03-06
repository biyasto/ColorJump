import { _decorator, Component, Node, Vec3, systemEvent, SystemEventType, macro, EventKeyboard, } from 'cc';
import { SceneManager } from '../SceneManager';
import {PlayerView} from "db://assets/scripts/Player/PlayerView";
import {WallModel} from "db://assets/scripts/Wall/WallModel";
import {ColorMap} from "db://assets/scripts/ColorsData";
const { ccclass, property } = _decorator;

const DEFAULT_SPEED = -1500;
const MAX_SPEED = -4500;
const JUMP_SPEED = 2000;
const MOVING_SPEED = 800;
const ACCELERATE = -6000;
const FALL_VELOCITY = new Vec3(0,-DEFAULT_SPEED,0);
const DEFAULT_POSITION = new Vec3(-450,-200,0);

@ccclass('PlayerModel')
export class PlayerModel extends Component {


    private _playerView: PlayerView | null = null;
    private _wallModel: WallModel | null = null;

    //properties
    private _color: number;
    private _pos: Vec3;
    private _velocity: Vec3;
    private _accelerate: Vec3 = new Vec3(0,ACCELERATE,0);
    private  colorsList : [0,0,0];

    private BoundTimer: number = 0;



    start() {
        this._playerView = this.getComponent(PlayerView);
        this._wallModel= WallModel.getInstance();

        this.ResetPlayer();
        this.Jump();
    }

    public Jump()
    {
        this._velocity.y = JUMP_SPEED;
       // console.log("PlayerModel: jumped")
    }
    public Bound()
    {
        //bounce CD
        if(this.BoundTimer>0) return;
        this.BoundTimer = 0.2;

        //set new color
        let newColor = this.findNewColor();
        this._color=newColor;
        this._playerView.updatePlayerColor(newColor);

        //set player velocity
        if(this._velocity.y < 0) this._velocity.y = 1/3*JUMP_SPEED;
        else this._velocity.y = 2/3*JUMP_SPEED;


       // console.log("PlayerModel: bounced")
    }

    findNewColor()
    {
        let col = this._velocity.x > 0 ? 1 : 0;
        let row = Math.floor(Math.random() * (this._wallModel._wallNumber[col]));
        return this._wallModel._wallColorMatrix[col][row];
    }

    update(deltaTime: number) {

        if(this.BoundTimer>0)
        {
            this.BoundTimer-=deltaTime;
        }

        this.updatePosition(deltaTime)
        this.checkHitWall();
        this.checkResetPlayer();


        this._playerView.updatePlayerUI(this._pos,this.cbUpdateUResult)


    }
    private updatePosition(deltaTime: number)
    {

        //set new velocity
        let velocity = this._velocity.clone().add(this._accelerate.clone().multiplyScalar(deltaTime));

        if(velocity.y<MAX_SPEED) velocity.y=MAX_SPEED;
        this._velocity= velocity;

        //this._velocity.add(this._accelerate.clone().multiplyScalar(deltaTime));

        //set new pos
        this._pos.add(this._velocity.clone().multiplyScalar(deltaTime))
    }
    private checkResetPlayer()
    {
        //out of bound
        if( this._pos.y <-1000 || this._pos.y >1000 ) {this.ResetPlayer(); this.Jump()}

    }
    private checkHitWall()
    {

        //Check wall hit
        let wallColor=this._wallModel.CheckWallHit(this._pos);

        if(wallColor != null && wallColor != -1) {
            console.log("player:"+ColorMap.get(this._color)[1] + ", wall:" + ColorMap.get(wallColor)[1]);

            //Todo: check wall color in here
            if(this._color == wallColor) {
                this.HitWall();
                this._wallModel.ChangeWallColor(this._velocity.x>0?0:1);
                //Todo: update score
            }
            else
            {
                this.ResetPlayer();
                this.Jump();

            }
        }
    }

    public ResetPlayer()
    {
        //reset pos
        this._pos = DEFAULT_POSITION.clone();
        //reset vel
        this._velocity = new Vec3(MOVING_SPEED,DEFAULT_SPEED,0);

        //set new color
        let newColor = this.findNewColor();
        this._color=newColor;
        this._playerView.updatePlayerColor(newColor);


        //console.log("reset player success")
    }
    private cbUpdateUResult(pos)
    {
        //console.log("Player Update Success " +pos)
    }

    public SwitchDirection()
    {
        this._velocity.x*=-1;
        // console.log("PlayerModel: switch direction")
    }
    public HitWall()
    {

            //= this._wallModel._wallColorMatrix[this._velocity>0?1:0]
        //console.log("PlayerModel: player hit wall")

       // this._pos.x = (500 - 20)*(this._velocity.x>0?1:-1);
            //Todo:check wall color to switch to

        this.SwitchDirection();
        this.Bound();

    }



}


