// 笔触
var pencil = getId("pencil");
var pen = getId("pen");
var tuya = getId("tuya");


// 线类型
var line = getId("line");
var square = getId("square");
var circular = getId("circular");
var poly = getId("poly");
var squareFill = getId("squareFill");
var circularFill = getId("circularFill");
var polyFill = getId("polyFill");

// 线宽类型 1 3 5 8
var lineW_1 = getId("lineW_1");
var lineW_3 = getId("lineW_3");
var lineW_5 = getId("lineW_5");
var lineW_8 = getId("lineW_8");

// 颜色风格
var color = getId("color");
var frontColor =getId("frontColor");
var straw = getId("straw");//吸管
var font = getId("font");
var eraser =getId("eraser");
var magnifier = getId("magnifier");

// 功能
var cancelPrev =getId("cancelPrev");
var redo = getId("redo");
var clearSceen = getId("clearSceen");
var download =getId("download");
var saveImg = getId("saveImg");

// 笔触类型数组
var penType = [pencil,pen,tuya];

// 线类型数组
var lineType = [line,square,circular,poly,squareFill,circularFill,polyFill];

// 颜色等数组
var colorType = [color,frontColor,straw,font,eraser,magnifier];

// 功能函数数组
var funcType = [cancelPrev,redo,clearSceen,download,saveImg];

// 线宽类型数组
var lineWidths = [lineW_1,lineW_3,lineW_5,lineW_8,];

// canvas绘图环境
var canvas = getId("canvas");
var ctx = canvas.getContext("2d");

// 矩形
var rectX = 0;
var rectY = 0;

// 三角形
var polyX = 0;
var polyY = 0;

// 圆形
var arcX = 0;
var arcY = 0;

// Eraser
var eraserFlag = 0;// 设置橡皮檫的状态标志位

// 颜色选择
var color = "#000";

// 撤销的array
var cancelList = new Array();

// 撤销的次数
var cancelIndex = 0;


// 铅笔函数
function Pencil(){

	var flag = 0;// 设置标志位 检测鼠标是否按下
	canvas.onmousedown = function(e){

	 var e = window.event || e;
 	 var startX = e.pageX - this.offsetLeft;
 	 var startY = e.pageY - this.offsetTop;
	
	  ctx.beginPath();
	  ctx.moveTo(startX,startY);
	  flag = 1;
	}
	
	// 鼠标移动的时候 不断的绘图（获取鼠标的位置）
	canvas.onmousemove = function(e){
	  e = window.event || e;
	  var endX = e.pageX - this.offsetLeft;
	  var endY = e.pageY - this.offsetTop;
	  // 判断鼠标是否按下
	  if(flag){
	     // 移动的时候设置路径并画图
	    ctx.lineTo(endX,endY);
	    ctx.stroke();
	  }
	  
	 
	}
	// 鼠标抬起的时候结束绘图
	canvas.onmouseup = function(){
	  flag = 0;
	}
	
	// 鼠标移出canvas取消画图操作
	canvas.onmouseout = function(){
	  flag = 0;
	}
}

// 钢笔函数
function Pen(){
	setLineWidth(0);
}
var color = "#000000";

// 涂鸦
function Tuya(){
	setLineWidth(4);
}

// 线宽函数
function setLineWidth(num){
	switch (num){
		case 0:
			ctx.lineWidth = 1;
			break;
		case 1:
			ctx.lineWidth = 3;
			break;
		case 2:
			ctx.lineWidth = 5;
			break;
		case 3:
			ctx.lineWidth = 8;
			break;
		case 4:
			ctx.lineWidth = 30;
			break;
		default:
			ctx.lineWidth = 1;
			break;
	}

}

// lineW_1
function LineW1(){
	setLineWidth(0);
}
// lineW_3
function LineW3(){
	setLineWidth(1);
}
// lineW_5
function LineW5(){
	setLineWidth(2);
}
// lineW_8
function LineW8(){
	setLineWidth(3);
}
// 画直线
function Line(){

	canvas.onmousedown = function(e){
		var e = e || window.event;
		
		// 计算当前鼠标相对于canvas画布的距离
		var startX = e.pageX - this.offsetLeft;
		var startY = e.pageY - this.offsetTop;
		// 设置直线的开始点
		ctx.beginPath();
		ctx.moveTo(startX,startY);

	}
	canvas.onmousemove = null;// 注销其他工具注册的事件
	canvas.onmouseout = null;
	
	// 鼠标抬起的时候
	canvas.onmouseup = function(e){
		// 计算鼠标抬起时鼠标相对画布的坐标
		var endX = e.pageX - this.offsetLeft;
		var endY = e.pageY - this.offsetTop;
		
		// 设置路径链接开始和结束点 进行绘图
		ctx.lineTo(endX,endY);
		ctx.closePath();
		ctx.stroke();
	}

}

// 矩形
function Square(){

	canvas.onmousedown = function(e){
		e = e || window.event;
		// 获取矩形左上角（对角线的开始点）
		rectX = e.pageX - this.offsetLeft;
		rectY = e.pageY - this.offsetTop;
	}
	canvas.onmouseup = function(e){
		// 获取鼠标当前坐标 画出矩形
		e = e || window.event;
		var endX = e.pageX - this.offsetLeft;
		var endY = e.pageY - this.offsetTop;
		
		// 计算矩形宽高
		var rectW = endX - rectX;
		var rectH = endY - rectY;
		// 画出矩形
		ctx.strokeRect(rectX,rectY,rectW,rectH);// 开始坐标点 宽高
	}
	canvas.onmousemove = null;
	canvas.onmouseout = null;
}

// 画矩形填充
function SquareFill(){

	canvas.onmousedown = function(e){
		e = e || window.event;
		// 获取矩形左上角（对角线的开始点）
		rectX = e.pageX - this.offsetLeft;
		rectY = e.pageY - this.offsetTop;
	}
	canvas.onmouseup = function(e){
		// 获取鼠标当前坐标 画出矩形
		e = e || window.event;
		var endX = e.pageX - this.offsetLeft;
		var endY = e.pageY - this.offsetTop;
		
		// 计算矩形宽高
		var rectW = endX - rectX;
		var rectH = endY - rectY;

		// 画出矩形
		ctx.fillRect(rectX,rectY,rectW,rectH);//开始坐标点 宽高
	}
	canvas.onmousemove = null;
	canvas.onmouseout = null;
}

// 画三角形
function Poly(e){
	var e = e || window.event;
	canvas.onmousedown = function(e){
		var e = e || window.event;
		// 获取矩形左上角（对角线的开始点）
		polyX = e.pageX - this.offsetLeft;
		polyY = e.pageY - this.offsetTop;
	}
	canvas.onmouseup = function(e){
		var e = e || window.event;
		var endX = e.pageX - this.offsetLeft;
		var endY = e.pageY - this.offsetTop;
		
		// 将画笔移动到右下角的定点
		ctx.beginPath();
		ctx.moveTo(endX,endY);
		// 三角形左边的坐标点
		var lbX = 2 * polyX - endX;
		var lbY = endY;
		ctx.lineTo(lbX,lbY);
		// 三角形第三个顶点坐标
		var tempC = 2 * (endX - polyX);
		var tempA = endX - polyX;
		var tempB = Math.sqrt(tempC*tempC - tempA*tempA);
		// 计算顶点坐标
		// endY - tempB;顶点y坐标
		ctx.lineTo(polyX,endY-tempB);
		ctx.closePath();
		ctx.stroke();
	}
	canvas.onmousemove = null;
	canvas.onmouseout = null;
}

// 三角形填充
function PolyFill(e){
	canvas.onmousedown = function(e){
		e = e || window.event;
		// 获取矩形左上角（对角线的开始点）
		polyX = e.pageX - this.offsetLeft;
		polyY = e.pageY - this.offsetTop;
	}
	canvas.onmouseup = function(e){
		e = e || window.event;
		var endX = e.pageX - this.offsetLeft;
		var endY = e.pageY - this.offsetTop;
		
		// 将画笔移动到右下角的定点
		ctx.beginPath();
		ctx.moveTo(endX,endY);
		// 三角形左边的坐标点
		var lbX = 2 * polyX - endX;
		var lbY = endY;
		ctx.lineTo(lbX,lbY);
		// 三角形第三个顶点坐标
		var tempC = 2 * (endX - polyX);
		var tempA = endX - polyX;
		var tempB = Math.sqrt(tempC*tempC - tempA*tempA);
		// 计算顶点坐标
		// endY - tempB;顶点y坐标
		ctx.lineTo(polyX,endY-tempB);
		ctx.closePath();
		ctx.fillStyle = color;
		ctx.fill();
	}
	canvas.onmousemove = null;
	canvas.onmouseout = null;
}

// 画圆圈
function Circular(){
	canvas.onmousedown = function(e){
		// 获取圆心位置
		e = e || window.event;
		arcX = e.pageX - this.offsetLeft;
		arcY = e.pageY - this.offsetTop;
		
	}
	canvas.onmouseup = function(e){
		// 获取半径
		// 实际获取的是一个坐标
		e = e || window.event;
		var endX = e.pageX - this.offsetLeft;
		var endY = e.pageY - this.offsetTop;
		
		// 计算半径
		var a = endX - arcX;
		var b = endY - arcY;
		var c = Math.sqrt(a*a+b*b);// c 计算半径
		
		// 画图
		ctx.beginPath();
		ctx.arc(arcX,arcY,c,0,360,false);
		ctx.closePath();
		ctx.stroke();
	}
	
	// 注销不需要的事件
	canvas.onmousemove = null;
	canvas.onmouseout = null;
}

// 画圆形(填充)
function CircularFill(){
	canvas.onmousedown = function(e){
		// 获取圆心位置
		e = e || window.event;
		arcX = e.pageX - this.offsetLeft;
		arcY = e.pageY - this.offsetTop;
		
	}
	canvas.onmouseup = function(e){
		// 获取半径
		// 实际获取的是一个坐标
		e = e || window.event;
		var endX = e.pageX - this.offsetLeft;
		var endY = e.pageY - this.offsetTop;
		
		// 计算半径
		var a = endX - arcX;
		var b = endY - arcY;
		var c = Math.sqrt(a*a+b*b);//c 计算半径
		
		// 画图

		ctx.beginPath();
		ctx.arc(arcX,arcY,c,0,360,false);
		ctx.closePath();
		ctx.fillStyle = color;
		ctx.fill();
	}
	
	// 注销不需要的事件
	canvas.onmousemove = null;
	canvas.onmouseout = null;
}

// 颜色选择
function Color(){

	$(".showColor").bigColorpicker(function(el,icolor){
		color = icolor;
		ctx.strokeStyle = color;
	});
	$("#f333").bigColorpicker("f3","L",6);
	
}

// 填充前景
function FrontColor(){
	canvas.onmousedown = function(e){
		// 填充画布指定颜色 画一个填充颜色的矩形
		ctx.fillStyle = color;
		ctx.fillRect(0,0,1100,550);
	}
	
	//注销事件
	canvas.onmouseup = null;
	canvas.onmouseout = null;
	canvas.onmousemove = null;
}

// 吸管函数
function Straw(){
	canvas.onmousedown =function(e){
		var e = e || window.event;
		var strawX = e.pageX - this.offsetLeft;
		var strawY = e.pageY - this.offsetTop;
		// 获取该点颜色信息
		// 获取图像信息的方法 getImageData(开始点x,开始点y,宽度,高度)
		// obj.data = [红,绿,蓝,透明度] 取值范围都是 0-255
		var obj = ctx.getImageData(strawX,strawY,1,1);
		var color = 'rgb('+obj.data[0]+','+obj.data[1]+','+obj.data[2]+')';
		ctx.strokeStyle = color;
		ctx.fillStyle = color;
		
		//颜色吸取完后 调用画笔工具
		Pencil();
	}
	canvas.onmousemove = null;
	canvas.onmouseout = null;
	canvas.onmouseup = null;
	
}
// 放大镜功能
function Magnifier(){
	// 用户输入数据的大小
	var scale = window.prompt("请输入要放大的百分比(只接受整型)",'100');
	
	// 把数据转换成canvas画布的大小
	var scaleW = 1090 * scale / 100;
	var scaleH = 550 * scale / 100;
	// 将数据设置到HTML标签上
	canvas.style.width = parseInt(scaleW) + "px";
	canvas.style.height = parseInt(scaleH) + "px"; 
}

// 文本工具函数
function Font(){
	canvas.onmousedown = function(e){
		var e = e || window.event;
		var textPosX = e.pageX - this.offsetLeft;
		var textPosY = e.pageY - this.offsetTop;
		// window.prompt()提示
		var userVal = window.prompt("请输入文字","");
		if (userVal != null) {
			ctx.fillStyle = color;
			ctx.fillText(userVal, textPosX, textPosY);
		} 
		
	}
	canvas.onmousemove = null;
	canvas.onmouseup = null;
	canvas.onmouseout = null;
}

function Eraser(){
	
	canvas.onmousedown = function(e){
		var e = e || window.event;
		// 获取鼠标相对canvas的坐标
		var eraserX = e.pageX - this.offsetLeft;
		var eraserY = e.pageY - this.offsetTop;
		// canvas 擦除方法
		ctx.clearRect(eraserX-ctx.lineWidth,eraserY-ctx.lineWidth,ctx.lineWidth*2,ctx.lineWidth*2);// 擦除点开始位置
		eraserFlag = 1;
		
	}
	//随鼠标移动不停擦除
	canvas.onmousemove = function(e){
		var e = e || window.event;
		var eraserX = e.pageX - this.offsetLeft;
		var eraserY = e.pageY - this.offsetTop;
		
		
		// 擦除方法
		if(eraserFlag){// 判断鼠标左键是否按下
			ctx.clearRect(eraserX-ctx.lineWidth,eraserY-ctx.lineWidth,ctx.lineWidth*3,ctx.lineWidth*3);//擦除
			saveImageToAry();
		}
		
	}
	canvas.onmouseup = function(e){
		eraserFlag = 0;//清除擦除状态位
	}
	canvas.onmouseout = function(e){
		eraserFlag = 0;
	}
}
// 保存历史 用于撤销
var saveImageToAry = function (){
	cancelIndex = 0;
	var dataUrl =  canvas.toDataURL();
	cancelList.push(dataUrl);
}

// 撤销
function CancelPrev(){
	cancelIndex--;
	ctx.clearRect(0,0,canvas.width,canvas.height);
	var  image = new Image();
	var index = cancelList.length-1 - cancelIndex  ;
	var url = cancelList[index];
	image.src = url;
	image.onload = function(){
		ctx.drawImage(image , 0 ,0 , image.width , image.height , 0 ,0 , canvas.width , canvas.height);
	}
}


//重做上一个操作
function Redo(){

	cancelIndex++;
	ctx.clearRect(0,0,canvas.width,canvas.height);
	var  image = new Image();
		var index = cancelList.length-1 - cancelIndex  ;
		var url = cancelList[index];
		image.src = url;
		image.onload = function(){
			ctx.drawImage(image , 0 ,0 , image.width , image.height , 0 ,0 , canvas.width , canvas.height);
	}
}


// 清空画布
function ClearSceen(){
	ctx.clearRect(0,0,1100,550);
}
// 下载图片
function Download(){
	/**
	 * 分析：js不能操作本地文件 
	 */
	//var imgdata = canvas.toDataURL();
	//var b64 = imgdata.substring(22);
	
	 var DataURL= canvas.toDataURL("image/png");// 转换图片信息
  
	var saveFile = function(data, filename){
	    var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
	    save_link.href = data;
	    save_link.download = filename;
	  
	    var event = document.createEvent('MouseEvents');
	    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	    save_link.dispatchEvent(event);
	};
	
	
	  saveFile(DataURL,"canvas.png");
	
}

//保存图片
function Saveimg(){
	save();
}

