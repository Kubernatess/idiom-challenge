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
//继承自"问题字"，"答案字"是放在上面回答区域，
//由于当答案字点击的时候，答案字会消失并将对应的问题字还原显示
var AnswerWord = (function (_super) {
    __extends(AnswerWord, _super);
    function AnswerWord() {
        var _this = _super.call(this) || this;
        _this.item = null;
        return _this;
    }
    AnswerWord.prototype.$onAddToStage = function (stage, nest) {
        _super.prototype.$onAddToStage.call(this, stage, nest);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    };
    AnswerWord.prototype.onRemoveFromStage = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    AnswerWord.prototype.onTouchTap = function () {
        if (this.item != null) {
            SoundMenager.getInstance().PlayWord();
            this.item.visible = true;
            this.item = null;
            this.textLbl.text = "";
        }
    };
    //当一个问题字被选择添加到回答的时，设置不可见，并保存到本对象中以后使用
    AnswerWord.prototype.putItem = function (word) {
        if (word == null) {
            this.textLbl.text = "";
        }
        else {
            this.textLbl.text = word.textLbl.text;
            word.visible = false;
        }
        this.item = word;
    };
    return AnswerWord;
}(Word));
__reflect(AnswerWord.prototype, "AnswerWord");
