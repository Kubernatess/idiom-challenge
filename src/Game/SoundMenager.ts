class SoundMenager {
    private static instance: SoundMenager;
    public static getInstance(): SoundMenager {
        if(SoundMenager.instance == null)
            SoundMenager.instance = new SoundMenager();
        return SoundMenager.instance;
    }
    private _click: egret.Sound;//点击声音
    private _word: egret.Sound;//点击字块的声音
    private _right: egret.Sound;//如果正确
    private _wrong: egret.Sound;//如果错误
    private _bgm: egret.Sound;//背景音乐
    private _bgm_channel: egret.SoundChannel;//保存用来静音用
    public constructor() {
        this._click = RES.getRes("buttonclick_mp3");
        this._bgm = RES.getRes("Music_mp3");
        this._right = RES.getRes("right_mp3");
        this._wrong = RES.getRes("wrong_mp3");
        this._word = RES.getRes("type_word_mp3");
    }

    public PlayBGM() {
        if(this.IsMusic) {
            this._bgm_channel = this._bgm.play(0,0);
        }
    }
    public StopBGM() {
        if(this._bgm_channel != null) {
            this._bgm_channel.stop();
        }
    }
    public PlayClick() {
        if(this.IsSound) {
            this._click.play(0,1);
        }
    }
    public PlayRight() {
        if(this.IsSound) {
            this._right.play(0,1);
        }
    }
    public PlayWrong() {
        if(this.IsSound) {
            this._wrong.play(0,1);
        }
    }
    public PlayWord() {
        if(this.IsSound) {
            this._word.play(0,1);
        }
    }
    // 是否播放背景音乐,保存设置
    public set IsMusic(value) {
        if(value) {
            egret.localStorage.setItem("ismusic","1");
            this.PlayBGM();
        } 
        else {
            egret.localStorage.setItem("ismusic","0");
            this.StopBGM();
        }
    }
    public get IsMusic(): boolean {
        let b = egret.localStorage.getItem("ismusic");
        if(b == null || b == "") {
            return true;
        }
        else {
            return b == "1";
        }
    }

    // 是否播放音效,保存设置
    public set IsSound(value) {
        if(value) {
            egret.localStorage.setItem("isSound","1");
        } else {
            egret.localStorage.setItem("isSound","0");
        }
    }
    public get IsSound(): boolean {
        var b = egret.localStorage.getItem("isSound");
        if(b == null || b == "") {
            return true;
        }
        else {
            return b == "1";
        }
    }
}