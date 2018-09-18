
class Tips extends eui.Component {
	public bg_Img: eui.Image;
	public ok_Btn: eui.Image;
	public close_Btn: eui.Image;
	public title_Lab: eui.Label;
	public value_Lab: eui.Label;


	//外部传入的数据
	private titleName: any;
	private tipsValue: string;
	private callBack: Function;
	private id: string;
	private tipsParent: any;
	private shapMask: egret.Shape;
	private tipsData: tipsData;

	public constructor(id: string, callBack: Function, tipsParent: any) {
		super();
		this.skinName = "resource/eui_skins/skin/TipsSkin.exml";

		this.id = id;
		this.callBack = callBack;
		this.tipsParent = tipsParent;
		this.setShap();
		this.setThisPoint();
		this.init();
	}
	private setShap() {
		//绘制一个矩形遮罩
		this.shapMask = new egret.Shape();
		this.shapMask.graphics.beginFill(0x000000);
		this.shapMask.graphics.drawRect(0, 0, this.tipsParent.width, this.tipsParent.height);
		this.shapMask.graphics.endFill();
		this.shapMask.alpha = 0.5;
		this.shapMask.touchEnabled = true;
		this.tipsParent.addChild(this.shapMask);
	}
	/**
	 * 设置tips居中 (在addchild之后)
	*/
	private setThisPoint() {
		this.x = (this.tipsParent.width - this.width) / 2;
		this.y = (this.tipsParent.height - this.height) / 2;
	}

	private init() {
		let node: egret.XML = UtilsByWang.dictionary[this.id];
		if (node != null) {
			this.tipsData = new tipsData(node["$title"], node["$value"],Number(node["$btnNum"]));// TipsConfig.tipsConfig[this.id];
		}
		else {
		  this.tipsData = new tipsData("错误","errrorid找不到",2);
		}
		this.createChild();
		this.addEvent();
	}
	/**生成当前tips的内容*/
	private createChild() {
		//设置文本的显示
		//标题的长度 为0或者大于0 返回一个bool值
		if (this.tipsData.title.length > 0) {
			//设置标题的内容
			this.title_Lab.visible = true;
			this.title_Lab.text = this.tipsData.title;
			//改变标题的y值
			this.value_Lab.y = this.title_Lab.height;
			console.log("y的值" + this.value_Lab.y);
			this.value_Lab.text = this.tipsData.value;
		}
		else {
			//设置标题的内容
			this.title_Lab.visible = false;
			this.title_Lab.text = "";
			//改变标题的y值
			this.value_Lab.y = 0;
			this.value_Lab.text = this.tipsData.value;
		}
		//设置按钮的显示
		if (this.tipsData.btnNum == 2) {
			this.ok_Btn.x = 46;
			this.close_Btn.touchEnabled = true;
		} else {
			this.ok_Btn.x = 160;
			this.close_Btn.visible = false;
			this.close_Btn.touchEnabled = false;
		}
	}

	//改变图片
	private onOkBtnClick() {
		// this.ok_Btn.source = "OKBTN-OFF_png";
		let _source: string = this.ok_Btn.source.toString();
		this.ok_Btn.source = _source == "OKBTN-OFF_png" ? "OKBTN_png" : "OKBTN-OFF_png";
		if (this.ok_Btn.source.toString() == "OKBTN_png") {
			this.callBack(true);
			this.distroy();
		}
	}

	//点击取消按钮触发的事件
	private onCloseBtnClick(): void {
		let _source: string = this.close_Btn.source.toString();
		this.close_Btn.source = _source == "NOBTN_png" ? "NOBTN-OFF_png" : "NOBTN_png";
		if (this.close_Btn.source.toString() == "NOBTN_png") {
			this.callBack(false);
			this.distroy();
		}
	}

	//为事件添加监听
	private addEvent() {
		this.ok_Btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onOkBtnClick, this);
		this.ok_Btn.addEventListener(egret.TouchEvent.TOUCH_END, this.onOkBtnClick, this);

		this.close_Btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onCloseBtnClick, this);
		this.close_Btn.addEventListener(egret.TouchEvent.TOUCH_END, this.onCloseBtnClick, this);
	}
	//销毁TIPs界面
	private distroy(): void {
		this.ok_Btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onOkBtnClick, this);
		this.ok_Btn.removeEventListener(egret.TouchEvent.TOUCH_END, this.onOkBtnClick, this);
		this.close_Btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onCloseBtnClick, this);
		this.close_Btn.removeEventListener(egret.TouchEvent.TOUCH_END, this.onCloseBtnClick, this);

		this.callBack = null;
		this.tipsData = null;

		if (this.parent) {
			this.parent.removeChild(this);
		}
		if (this.shapMask.parent) {
			this.shapMask.parent.removeChild(this.shapMask);
		}
	}
}

class tipsData {
	/**tips name*/
	public title: string;
	/**tips value*/
	public value: string;
	/**tips button num*/
	public btnNum: number;
	public constructor(tl: string, vl: string, num: number) {
		this.title = tl;
		this.value = vl;
		this.btnNum = num;
	}
}