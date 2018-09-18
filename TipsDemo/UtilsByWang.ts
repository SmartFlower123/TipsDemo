

class UtilsByWang {
	public static dictionary: Object;
	public constructor() {

	}
	public static getConfig(): void {
		if (UtilsByWang.dictionary != null)
			return;
		UtilsByWang.dictionary = {};
		let tex: string = RES.getRes("tipsError_xml");
		let datas = egret.XML.parse(tex);
		console.log(datas.children.length);
		for (let i = 0; i < datas.children.length; i++) {
			var tip: egret.XML = <egret.XML><any>datas.children[i];
			UtilsByWang.dictionary[tip["$id"]] = tip;
		}
	}
	/**
	 * 系统错误弹窗提示
	 * @param tipsParent  : tips pareent  承载TIPS的容器
	 * @param errorId     : error id      错误码来自于错误配置
	 * @param callBack	  : on complete function 结束后的回调
	*/
	public static showTips(tipsParent: any, errorId: string, callBack: Function) {
		//初始化数据
		UtilsByWang.getConfig();
		//把tips添加到舞台上
		let tips = new Tips(errorId, callBack, tipsParent);
		tipsParent.addChild(tips);
	}
}