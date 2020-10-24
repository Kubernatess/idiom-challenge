//普通的一个字，用来做问题的字块使用
class Word extends eui.Component {
    public textLbl: eui.Label;
    public constructor() {
          super();
          this.touchChildren = false;
          this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
          this.skinName = "WordSkin";
    }
    protected onTouchTap(){
        SoundMenager.getInstance().PlayWord();
    }
}