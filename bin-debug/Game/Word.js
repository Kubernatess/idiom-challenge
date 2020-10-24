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
//普通的一个字，用来做问题的字块使用
var Word = (function (_super) {
    __extends(Word, _super);
    function Word() {
        var _this = _super.call(this) || this;
        _this.touchChildren = false;
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouchTap, _this);
        _this.skinName = "WordSkin";
        return _this;
    }
    Word.prototype.onTouchTap = function () {
        SoundMenager.getInstance().PlayWord();
    };
    return Word;
}(eui.Component));
__reflect(Word.prototype, "Word");
