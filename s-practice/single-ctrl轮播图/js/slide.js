window.onload = function() {
    // 获取元素
    function $(id) {return document.getElementById(id);}
    var js_slider = $("js_slider");  // 获取最大盒子
    var slider_main_block = $("slider_main_block");  // 滚动图片父盒子
    var imgs = slider_main_block.children;  // 获得所有的图片组 需要滚动的部分
    var slider_ctrl = $("slider_ctrl");  // 获得 控制span 的 父盒子
    // 操作元素
    // 生成小span
    var span;
    for(var i=0;i<imgs.length; i++) {

        span = document.createElement("span");// 创建 span
        span.className = "slider-ctrl-con"; // 添加类名
        span.innerHTML = imgs.length-i;  //  6 - 0    // 实现 倒序 的方式插入
        slider_ctrl.insertBefore(span,slider_ctrl.children[1]);  // 在父盒子倒数第二个盒子的前面插入
    }

    var spans = slider_ctrl.children;   // 得到所有的 span
    spans[1].setAttribute("class","slider-ctrl-con current");  // 初始化默认currentsapn

    var scrollWidth = js_slider.clientWidth; // 得到大盒子的宽度 也就是  后面动画走的距离  310
    //  第一张图片 留下   其余的人走到 310 的位置上
    for(var i = 1; i<imgs.length; i++) { // 从1 开始 因为第一张不需要计算

        imgs[i].style.left =  scrollWidth + "px";  // 其他人 先右移动到 310 的位置
    }
    var iNow = 0;
    for(var k in spans){
    	spans[k].onclick = function(){
    		if(this.className == 'slider-ctrl-prev'){
    			animate(imgs[iNow--],{left:scrollWidth});//当前这张走到右边
    			iNow < 0 ? iNow = imgs.length - 1 : iNow;//下一张立马到左边准备进入
    			imgs[iNow].style.left = -scrollWidth+'px';
    			animate(imgs[iNow],{left:0});
    			setSpan();
    		}
			else if(this.className == 'slider-ctrl-next'){
    			autoplay();
    		}
    		else{
    			var that = this.innerHTML-1; //innerHTMl从1开始 要-1

    			if(that>iNow){  //相当于点击右按钮
    				animate(imgs[iNow],{left:-scrollWidth});
    				imgs[that].style.left = scrollWidth+'px';
    			}
    			//相当于点击左按钮
    			else if(that<iNow){
    				animate(imgs[iNow],{left:scrollWidth});
    				imgs[that].style.left = -scrollWidth + "px";
    			}
    		iNow = that;
    		animate(imgs[that],{left:0});
    		setSpan();
    		}

    		}

    }
    // 控制span的移动样式
    function setSpan(){
    	for(var i=1;i<spans.length-1;i++){
    		spans[i].className = 'slider-ctrl-con';
    	}
    	spans[iNow+1].className = 'slider-ctrl-con current';
    }
    var timer = null;
    timer = setInterval(autoplay,1500);
    //自动播放效果与点击右按钮相同，封装在autoplay中
    function autoplay(){
    	animate(imgs[iNow++],{left:-scrollWidth});//当前这张走到左边
    			//最后一张图片走完，iNow置0
    			iNow > imgs.length-1 ? iNow=0 : iNow;
    			//下一张立马到右边准备进入
    			imgs[iNow].style.left = scrollWidth+'px';
    			animate(imgs[iNow],{left:0});
    			setSpan();
    }
    js_slider.onmousemove = function(){
    	clearInterval(timer);
    }
    js_slider.onmouseout = function(){
    	clearInterval(timer);
    	timer = setInterval(autoplay,1500);
    }
}
