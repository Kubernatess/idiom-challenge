class GameScene extends eui.Component {
    private answerGrp: eui.Group;
    private wordGrp: eui.Group;
    private questionImg: eui.Image;
    private returnBtn: eui.Button;
    private winGrp: eui.Group;
    private nextBtn: eui.Button;
    private reference: eui.Label;
    private explain: eui.Label;
    private settingBtn: eui.Button;

    private level: number;
    private levelData: LevelDataItem;

    // 单例模式
    private static instance: GameScene;
    public static getInstance() {
        if(GameScene.instance == null) {
            GameScene.instance = new GameScene();
        }
        return GameScene.instance;
    }

    public constructor() {
        super();
        this.skinName = "GameSceneSkin";       
    }

    protected childrenCreated(): void {
        super.childrenCreated();       
    }

    public init(level:number): void {
        this.level = level;
        this.levelData = LevelDataManager.getInstance().getLevel(this.level);
        //将字段接起来
        let str: string = this.levelData.answer + this.levelData.word;
        //随机一个其它题目的字段混合进本题目
        while(str.length < 20){
            let i: number = Math.floor(Math.random() * 400);
            if(i != this.level){
                let temp: LevelDataItem = LevelDataManager.getInstance().getLevel(i);
                str += temp.word + temp.answer;
            }
        }
        //对字段重排
        let wordlist: string[] = [];
        for(let i=0; i<str.length; i++){
            wordlist.push(str.charAt(i));
        }
        wordlist = this.randomlist(wordlist);
        // 初始化问题字
        for(let i=0; i<this.wordGrp.numChildren; i++){
            let word = <Word>this.wordGrp.getChildAt(i);
            word.textLbl.text = wordlist[i];
            word.visible = true;
        }
        // 初始化答案字
        for(let i=0; i<this.answerGrp.numChildren; i++){
            let answerWord = <AnswerWord>this.answerGrp.getChildAt(i);
            answerWord.putItem(null);
        }
        //显示图像
        this.questionImg.source = "resource/assets/"+this.levelData.img;
    }

    $onAddToStage(stage, nest) {
        super.$onAddToStage(stage, nest);
        this.returnBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReturn, this);
        this.wordGrp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchWord, this);
        this.nextBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.gotoNextOne,this);
        this.settingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onSetting,this);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    }

    private onRemoveFromStage() {
        this.returnBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onReturn, this);
        this.wordGrp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchWord, this);
        this.nextBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.gotoNextOne,this);
        this.settingBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onSetting,this);
    }

    //将一个数列随机
    private randomlist(arr: string[]): string[] {
        let array: string[] = [];
        while(arr.length > 0) {
            let i: number = Math.floor(Math.random()*arr.length);
            array.push(arr[i]);
            arr.splice(i,1);
        }
        return array;
    }
    
    private onReturn():void {
        SoundMenager.getInstance().PlayClick();
        this.parent.addChild(GameLevel.getInstance());
        this.parent.removeChild(this);
    }

    private onTouchWord(evt: egret.TouchEvent): void {
        if(!(evt.target instanceof Word)) {
            return;
        }
        let word: Word = <Word>evt.target;
        //找到一个合适的位置添加进答案内容
        for(let i=0; i<this.answerGrp.numChildren; i++){
            let answer: AnswerWord = <AnswerWord>this.answerGrp.getChildAt(i);
            if(answer.item == null){
                answer.putItem(word);
                if(i == 3) {
                    this.showWin();
                }               
                break;
            }
        }
    }

    // 判断是否胜利
    private showWin() {
        let checkStr: string = "";
        for(let i=0; i<this.answerGrp.numChildren; i++) {
            let answer: AnswerWord = <AnswerWord>this.answerGrp.getChildAt(i);
            checkStr += answer.textLbl.text;
        }
        if(checkStr == this.levelData.answer){
            this.winGrp.visible = true;
            this.reference.text = this.levelData.tip;
            this.explain.text = this.levelData.content;
            SoundMenager.getInstance().PlayRight();
        }
        else {
            SoundMenager.getInstance().PlayWrong();
        }
    }

    // 下一个题目
    private gotoNextOne(): void {
        SoundMenager.getInstance().PlayClick();
        this.winGrp.visible = false;
        GameLevel.getInstance().openToLevel(this.level+1);
        this.init(this.level+1);
    }

    private onSetting() {
        SoundMenager.getInstance().PlayClick();
        this.addChild(GameSetting.getInstance());
    }
}