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
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.skinName = "GameSceneSkin";
        return _this;
    }
    GameScene.getInstance = function () {
        if (GameScene.instance == null) {
            GameScene.instance = new GameScene();
        }
        return GameScene.instance;
    };
    GameScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    GameScene.prototype.init = function (level) {
        this.level = level;
        this.levelData = LevelDataManager.getInstance().getLevel(this.level);
        //将字段接起来
        var str = this.levelData.answer + this.levelData.word;
        //随机一个其它题目的字段混合进本题目
        while (str.length < 20) {
            var i = Math.floor(Math.random() * 400);
            if (i != this.level) {
                var temp = LevelDataManager.getInstance().getLevel(i);
                str += temp.word + temp.answer;
            }
        }
        //对字段重排
        var wordlist = [];
        for (var i = 0; i < str.length; i++) {
            wordlist.push(str.charAt(i));
        }
        wordlist = this.randomlist(wordlist);
        // 初始化问题字
        for (var i = 0; i < this.wordGrp.numChildren; i++) {
            var word = this.wordGrp.getChildAt(i);
            word.textLbl.text = wordlist[i];
            word.visible = true;
        }
        // 初始化答案字
        for (var i = 0; i < this.answerGrp.numChildren; i++) {
            var answerWord = this.answerGrp.getChildAt(i);
            answerWord.putItem(null);
        }
        //显示图像
        this.questionImg.source = "resource/assets/" + this.levelData.img;
    };
    GameScene.prototype.$onAddToStage = function (stage, nest) {
        _super.prototype.$onAddToStage.call(this, stage, nest);
        this.returnBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReturn, this);
        this.wordGrp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchWord, this);
        this.nextBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoNextOne, this);
        this.settingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSetting, this);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    };
    GameScene.prototype.onRemoveFromStage = function () {
        this.returnBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onReturn, this);
        this.wordGrp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchWord, this);
        this.nextBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoNextOne, this);
        this.settingBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSetting, this);
    };
    //将一个数列随机
    GameScene.prototype.randomlist = function (arr) {
        var array = [];
        while (arr.length > 0) {
            var i = Math.floor(Math.random() * arr.length);
            array.push(arr[i]);
            arr.splice(i, 1);
        }
        return array;
    };
    GameScene.prototype.onReturn = function () {
        SoundMenager.getInstance().PlayClick();
        this.parent.addChild(GameLevel.getInstance());
        this.parent.removeChild(this);
    };
    GameScene.prototype.onTouchWord = function (evt) {
        if (!(evt.target instanceof Word)) {
            return;
        }
        var word = evt.target;
        //找到一个合适的位置添加进答案内容
        for (var i = 0; i < this.answerGrp.numChildren; i++) {
            var answer = this.answerGrp.getChildAt(i);
            if (answer.item == null) {
                answer.putItem(word);
                if (i == 3) {
                    this.showWin();
                }
                break;
            }
        }
    };
    // 判断是否胜利
    GameScene.prototype.showWin = function () {
        var checkStr = "";
        for (var i = 0; i < this.answerGrp.numChildren; i++) {
            var answer = this.answerGrp.getChildAt(i);
            checkStr += answer.textLbl.text;
        }
        if (checkStr == this.levelData.answer) {
            this.winGrp.visible = true;
            this.reference.text = this.levelData.tip;
            this.explain.text = this.levelData.content;
            SoundMenager.getInstance().PlayRight();
        }
        else {
            SoundMenager.getInstance().PlayWrong();
        }
    };
    // 下一个题目
    GameScene.prototype.gotoNextOne = function () {
        SoundMenager.getInstance().PlayClick();
        this.winGrp.visible = false;
        GameLevel.getInstance().openToLevel(this.level + 1);
        this.init(this.level + 1);
    };
    GameScene.prototype.onSetting = function () {
        SoundMenager.getInstance().PlayClick();
        this.addChild(GameSetting.getInstance());
    };
    return GameScene;
}(eui.Component));
__reflect(GameScene.prototype, "GameScene");
