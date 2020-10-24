class LevelIcon extends eui.Button{

    private levelLbl: eui.Label;

    public constructor() {
          super();
          this.skinName = "LevelIconSkin";
    }

    public get level():number{
        return parseInt(this.levelLbl.text);
    }
    
    public set level(value:number){
        this.levelLbl.text = value.toString();
    }
}