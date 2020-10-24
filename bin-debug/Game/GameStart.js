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
var GameStart = (function (_super) {
    __extends(GameStart, _super);
    function GameStart() {
        var _this = _super.call(this) || this;
        _this.skinName = "GameStartSkin";
        SoundMenager.getInstance().PlayBGM();
        return _this;
    }
    GameStart.getInstance = function () {
        if (GameStart.instance == null) {
            GameStart.instance = new GameStart();
        }
        return GameStart.instance;
    };
    GameStart.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    GameStart.prototype.$onAddToStage = function (stage, nest) {
        _super.prototype.$onAddToStage.call(this, stage, nest);
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartGame, this);
        this.settingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSetting, this);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    };
    GameStart.prototype.onRemoveFromStage = function () {
        this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartGame, this);
        this.settingBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSetting, this);
    };
    GameStart.prototype.onStartGame = function () {
        SoundMenager.getInstance().PlayClick();
        this.parent.addChild(GameLevel.getInstance());
        this.parent.removeChild(this);
    };
    GameStart.prototype.onSetting = function () {
        SoundMenager.getInstance().PlayClick();
        this.addChild(GameSetting.getInstance());
    };
    return GameStart;
}(eui.Component));
__reflect(GameStart.prototype, "GameStart");
