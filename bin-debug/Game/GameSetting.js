var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
//使用一个全局通用的设置界面
var GameSetting = (function (_super) {
    __extends(GameSetting, _super);
    function GameSetting() {
        var _this = _super.call(this) || this;
        _this.skinName = "GameSettingSkin";
        return _this;
    }
    GameSetting.getInstance = function () {
        if (GameSetting.instance == null)
            GameSetting.instance = new GameSetting();
        return GameSetting.instance;
    };
    GameSetting.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.musicForbidden.visible = !SoundMenager.getInstance().IsMusic;
        this.soundForbidden.visible = !SoundMenager.getInstance().IsSound;
    };
    GameSetting.prototype.$onAddToStage = function (stage, nest) {
        _super.prototype.$onAddToStage.call(this, stage, nest);
        this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirm, this);
        this.musicBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapMusicBtn, this);
        this.soundBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapSoundBtn, this);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    };
    GameSetting.prototype.onRemoveFromStage = function () {
        this.confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirm, this);
        this.soundBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapSoundBtn, this);
        this.musicBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapMusicBtn, this);
    };
    GameSetting.prototype.onConfirm = function () {
        SoundMenager.getInstance().PlayClick();
        this.parent.removeChild(this);
    };
    GameSetting.prototype.onTapMusicBtn = function () {
        SoundMenager.getInstance().PlayClick();
        SoundMenager.getInstance().IsMusic = !SoundMenager.getInstance().IsMusic;
        this.musicForbidden.visible = !SoundMenager.getInstance().IsMusic;
    };
    GameSetting.prototype.onTapSoundBtn = function () {
        SoundMenager.getInstance().PlayClick();
        SoundMenager.getInstance().IsSound = !SoundMenager.getInstance().IsSound;
        this.soundForbidden.visible = !SoundMenager.getInstance().IsSound;
    };
    return GameSetting;
}(eui.Component));
__reflect(GameSetting.prototype, "GameSetting");
