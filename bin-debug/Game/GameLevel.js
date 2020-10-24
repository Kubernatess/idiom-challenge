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
var GameLevel = (function (_super) {
    __extends(GameLevel, _super);
    function GameLevel() {
        var _this = _super.call(this) || this;
        _this.currentLevel = 1;
        _this.LevelIcons = [];
        _this.skinName = "GameLevelSkin";
        return _this;
    }
    GameLevel.getInstance = function () {
        if (GameLevel.instance == null) {
            GameLevel.instance = new GameLevel();
        }
        return GameLevel.instance;
    };
    GameLevel.prototype.createChildren = function () {
        _super.prototype.childrenCreated.call(this);
        //创建地图选项
        var row = 20;
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        var spany = stageH / row; //计算列y间隔
        var group = new eui.Group(); //地图背景
        group.width = stageW;
        group.height = (spany * 400); //算出最大尺寸
        //填充背景
        for (var i = 0; i < (group.height / stageH); i++) {
            var img = new eui.Image();
            img.source = RES.getRes("GameBG2_jpg");
            img.y = i * stageH;
            this.levelGrp.addChild(img);
        }
        //以正弦曲线绘制关卡图标的路径
        for (var i = 0; i < 400; i++) {
            var icon = new LevelIcon();
            icon.level = i + 1;
            icon.y = spany * i;
            icon.x = Math.sin(icon.y / 360 * Math.PI) * 200 + group.width / 2;
            icon.y = group.height - icon.y - spany;
            group.addChild(icon);
            icon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_level, this);
            //依据进度设置关卡显示
            icon.enabled = i < LevelDataManager.getInstance().milestone;
            //保存到一个列表中
            this.LevelIcons.push(icon);
        }
        //开启位图缓存模式
        group.cacheAsBitmap = true;
        this.levelGrp.addChild(group);
        //卷动到最底层
        this.levelGrp.scrollV = group.height - stageH;
        //跟踪箭头
        this.img_arrow = new eui.Image();
        this.img_arrow.source = RES.getRes("PageDownBtn_png");
        this.img_arrow.anchorOffsetX = 124 / 2 - group.getChildAt(0).width / 2;
        this.img_arrow.anchorOffsetY = 76;
        this.img_arrow.touchEnabled = false;
        this.img_arrow.x = group.getChildAt(0).x;
        this.img_arrow.y = group.getChildAt(0).y;
        group.addChild(this.img_arrow);
    };
    GameLevel.prototype.$onAddToStage = function (stage, nest) {
        _super.prototype.$onAddToStage.call(this, stage, nest);
        this.returnBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReturn, this);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    };
    GameLevel.prototype.onRemoveFromStage = function () {
        this.returnBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onReturn, this);
    };
    GameLevel.prototype.onReturn = function () {
        SoundMenager.getInstance().PlayClick();
        this.parent.addChild(GameStart.getInstance());
        this.parent.removeChild(this);
    };
    GameLevel.prototype.onclick_level = function (e) {
        SoundMenager.getInstance().PlayClick();
        var icon = e.currentTarget;
        if (this.currentLevel != icon.level) {
            this.img_arrow.x = icon.x;
            this.img_arrow.y = icon.y;
            this.currentLevel = icon.level;
        }
        else {
            //进入并开始游戏
            this.parent.addChild(GameScene.getInstance());
            GameScene.getInstance().init(icon.level);
            this.parent.removeChild(this);
        }
    };
    // 开放指定的关卡，如果大于最远关卡，则保存数据也跟着调整
    GameLevel.prototype.openToLevel = function (level) {
        var icon = this.LevelIcons[level - 1];
        icon.enabled = true;
        if (level > LevelDataManager.getInstance().milestone) {
            LevelDataManager.getInstance().milestone = level;
        }
        //同时将选定标记置于其上
        this.img_arrow.x = icon.x;
        this.img_arrow.y = icon.y;
        this.currentLevel = icon.level;
    };
    return GameLevel;
}(eui.Component));
__reflect(GameLevel.prototype, "GameLevel");
