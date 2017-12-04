### 介绍
通过原生js-数组结构改变实现的轮播图

### 实现
通过数组json中的各对象 初始化每个图片盒子的初始位置,点击事件触发后只需通过pop，unshift 等操作改各对象位置便可实现图片盒子的位置改变。

### 核心代码
```javascript
1. /*改变对象位置*/
function change(flag) {
    if(flag == true)
    {
        //移除最后一个放到第一
         json.unshift(json.pop());
    }
    else if(flag == false)
    {
        //  移除第一个放到最后
        json.push(json.shift());
    }
    //为空初始化
    else{
        exchange();
    }
   exchange();
}
2. /*各图片位置改变*/
function exchange(){
    for(var i=0;i<json.length; i++)
    {
        animate(lis[i],{
            width: json[i].width,
            top: json[i].top,
            left: json[i].left,
            opacity:json[i].opacity,
            zIndex:json[i].z
        },function(){control = true;})  // 回调函数是等动画执行完毕，控制节流
    }
}
```
