//继承自"问题字"，"答案字"是放在上面回答区域，
//由于当答案字点击的时候，答案字会消失并将对应的问题字还原显示
class AnswerWord extends Word{
    public item:Word = null;
    public constructor() {
        super();
    }

    $onAddToStage(stage, nest) {
        super.$onAddToStage(stage, nest);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    }

    private onRemoveFromStage() {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    }

    protected onTouchTap() {
        if(this.item != null){
            SoundMenager.getInstance().PlayWord();
            this.item.visible = true;
            this.item = null;
            this.textLbl.text = "";
        }
    }
    
    //当一个问题字被选择添加到回答的时，设置不可见，并保存到本对象中以后使用
    public putItem(word:Word): void {
        if(word == null) {
            this.textLbl.text = "";
        }      
        else {
            this.textLbl.text = word.textLbl.text;
            word.visible = false;
        } 
        this.item = word;
    }
}