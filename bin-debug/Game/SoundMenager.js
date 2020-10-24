var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SoundMenager = (function () {
    function SoundMenager() {
        this._click = RES.getRes("buttonclick_mp3");
        this._bgm = RES.getRes("Music_mp3");
        this._right = RES.getRes("right_mp3");
        this._wrong = RES.getRes("wrong_mp3");
        this._word = RES.getRes("type_word_mp3");
    }
    SoundMenager.getInstance = function () {
        if (SoundMenager.instance == null)
            SoundMenager.instance = new SoundMenager();
        return SoundMenager.instance;
    };
    SoundMenager.prototype.PlayBGM = function () {
        if (this.IsMusic) {
            this._bgm_channel = this._bgm.play(0, 0);
        }
    };
    SoundMenager.prototype.StopBGM = function () {
        if (this._bgm_channel != null) {
            this._bgm_channel.stop();
        }
    };
    SoundMenager.prototype.PlayClick = function () {
        if (this.IsSound) {
            this._click.play(0, 1);
        }
    };
    SoundMenager.prototype.PlayRight = function () {
        if (this.IsSound) {
            this._right.play(0, 1);
        }
    };
    SoundMenager.prototype.PlayWrong = function () {
        if (this.IsSound) {
            this._wrong.play(0, 1);
        }
    };
    SoundMenager.prototype.PlayWord = function () {
        if (this.IsSound) {
            this._word.play(0, 1);
        }
    };
    Object.defineProperty(SoundMenager.prototype, "IsMusic", {
        get: function () {
            var b = egret.localStorage.getItem("ismusic");
            if (b == null || b == "") {
                return true;
            }
            else {
                return b == "1";
            }
        },
        // 是否播放背景音乐,保存设置
        set: function (value) {
            if (value) {
                egret.localStorage.setItem("ismusic", "1");
                this.PlayBGM();
            }
            else {
                egret.localStorage.setItem("ismusic", "0");
                this.StopBGM();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundMenager.prototype, "IsSound", {
        get: function () {
            var b = egret.localStorage.getItem("isSound");
            if (b == null || b == "") {
                return true;
            }
            else {
                return b == "1";
            }
        },
        // 是否播放音效,保存设置
        set: function (value) {
            if (value) {
                egret.localStorage.setItem("isSound", "1");
            }
            else {
                egret.localStorage.setItem("isSound", "0");
            }
        },
        enumerable: true,
        configurable: true
    });
    return SoundMenager;
}());
__reflect(SoundMenager.prototype, "SoundMenager");
