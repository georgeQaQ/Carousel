### 使用
**function animate(obj,json,fn
){}** &nbsp;&nbsp;&nbsp;多属性运动函数
* obj 运动函数作用对象
* json 属性及目标值 如{left:0}
* fn 回调函数 动画结束后执行

### 实现
遍历json中的属性 直到所有json[attr]满足条件停止函数中定时器，结束函数执行。

### 核心代码
```Javascript
1. current = parseInt(getStyle(obj,attr)) //获取当前状态 并保存在current中

2. var step = ( json[attr] - current) / 10;  // 步长  用目标位置 - 现在的位置 / 10
step = step > 0 ? Math.ceil(step) : Math.floor(step); //实现取整

3. obj.style[attr] = current  + step //改变对象状态

4. /*获取对象属性函数 */
function getStyle(obj,attr) {  //  对象，属性
    if(obj.currentStyle)  // ie 等
    {
        return obj.currentStyle[attr];  // 返回传递过来的某个属性
    }
    else
    {
        return window.getComputedStyle(obj,null)[attr];  // w3c 浏览器
    }
}
```
