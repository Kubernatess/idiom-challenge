//使用一个全局通用的设置界面
class GameSetting extends eui.Component {

    private static instance: GameSetting;
    public static getInstance(): GameSetting {
        if(GameSetting.instance == null)
            GameSetting.instance = new GameSetting();
        return GameSetting.instance;
    }

    private confirmBtn:eui.Button;
    private musicForbidden: eui.Image; // 音乐静音显示
    private soundForbidden: eui.Image; // 音效静音显示
    private soundBtn: eui.Button; // 音效按钮
    private musicBtn: eui.Button; // 音乐按钮

    public constructor() {
        super();
        this.skinName = "GameSettingSkin";
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        this.musicForbidden.visible = !SoundMenager.getInstance().IsMusic;
        this.soundForbidden.visible = !SoundMenager.getInstance().IsSound;        
    }

    $onAddToStage(stage, nest) {
        super.$onAddToStage(stage, nest);
        this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onConfirm,this);
        this.musicBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTapMusicBtn,this);
        this.soundBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTapSoundBtn,this);     
        this.once(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    }

    private onRemoveFromStage() {
        this.confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onConfirm,this);
        this.soundBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTapSoundBtn,this);
        this.musicBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTapMusicBtn,this);
    }

    private onConfirm(){
        SoundMenager.getInstance().PlayClick();
        this.parent.removeChild(this);
    }
    private onTapMusicBtn(){
        SoundMenager.getInstance().PlayClick();
        SoundMenager.getInstance().IsMusic = !SoundMenager.getInstance().IsMusic;
        this.musicForbidden.visible = !SoundMenager.getInstance().IsMusic;       
    }
    private onTapSoundBtn(){
        SoundMenager.getInstance().PlayClick();     
        SoundMenager.getInstance().IsSound = !SoundMenager.getInstance().IsSound;
        this.soundForbidden.visible = !SoundMenager.getInstance().IsSound;
    }   
}