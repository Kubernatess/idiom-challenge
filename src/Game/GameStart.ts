class GameStart extends eui.Component {
    //单例模式
    private static instance: GameStart;
    public static getInstance() {
        if(GameStart.instance == null) {
            GameStart.instance = new GameStart();
        }
        return GameStart.instance;
    }

    private startBtn: eui.Button;
    private settingBtn: eui.Button;

    public constructor() {
          super();
          this.skinName = "GameStartSkin";
          SoundMenager.getInstance().PlayBGM();
    }

    protected childrenCreated(): void {
        super.childrenCreated();
    }

    $onAddToStage(stage, nest) {
        super.$onAddToStage(stage, nest);
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onStartGame,this);
        this.settingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onSetting,this);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    }

    private onRemoveFromStage() {
        this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onStartGame,this);
        this.settingBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onSetting,this);
    }

    private onStartGame(){
        SoundMenager.getInstance().PlayClick();
        this.parent.addChild(GameLevel.getInstance());
        this.parent.removeChild(this);
    }

    private onSetting() {
        SoundMenager.getInstance().PlayClick();
        this.addChild(GameSetting.getInstance());
    }
}