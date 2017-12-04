### 介绍
通过原生js实现的单个图片控制轮播图

### 实现
利用css进行布局，将承载图片的盒子都用绝对定位，除第一张外都定位到slider-main的右侧，距离为slider-main.clientWidth.
在触发点击事件时，首先判断点击左右按钮还是小点(通过className)
在进行向右击时，当前图片移动到slider-main的左侧(使用animate函数)，下一要展示张图片移动到slider-main的右侧(使用obj.style进行定位),然后在移动到slider-main中(使用animate函数)。自动播放类似向右点击，封装在autoplay函数中。
当点击小点 首先判断点击按钮对应图片盒子与当前图片盒子的左右关系即that(span.innerHTML)与iNow,若that>iNow则相当于点击了右按钮(点击后应将that赋值给iNow保存)
### 核心代码
```javascript
1.  /*生成小点span*/
    var span;
    for(var i=0;i<imgs.length; i++) {

        span = document.createElement("span");// 创建 span
        span.className = "slider-ctrl-con"; // 添加类名
        span.innerHTML = imgs.length-i;  //  6 - 0    // 实现 倒序 的方式插入
        slider_ctrl.insertBefore(span,slider_ctrl.children[1]);  // 在父盒子倒数第二个盒子的前面插入
    }
2. /*向左点击*/
    if(this.className == 'slider-ctrl-prev'){
    animate(imgs[iNow--],{left:scrollWidth});//当前这张走到右边
    iNow < 0 ? iNow = imgs.length - 1 : iNow;//下一张立马到左边准备进入
    imgs[iNow].style.left = -scrollWidth+'px';
    animate(imgs[iNow],{left:0});
    setSpan();
}
3. /*点击小点*/
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
```
