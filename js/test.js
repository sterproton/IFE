
"use strict"

const app={};

//隐藏内部的函数与变量
{
    const $=function(ele){
        return document.querySelector(ele);
    }
    const container=$("#container");
    const dataList=[];
    const inputBox=$("#input");
    const pattern=/[,，\s\n]$/;

    /**
     * 遍历dataList，生成div显示在网页上;
     */
    function render(){
        function clearNode(){
            while(container.hasChildNodes()){
                container.removeChild(container.firstChild);
            }
        }
        clearNode();
        for(let item of dataList){
            let newDiv=document.createElement("div");
            newDiv.className="showdiv";
            newDiv.innerText=item;
            container.appendChild(newDiv);
        }
    }

    /**
     * 检查字符串是否已经在dataList中出现
     * @param {string} inputData 
     */
    function isExisted(inputData){
        let result=false;
        for(let item of dataList){
            if(item === inputData){
                result = true;
            }
        }
        return result;
    }

    /**
     * 执行一次即遍历container包含的所有divs,为每一个div添加mouse事件
     */
    function addHandlerToDivs(){
        const eleList=container.children;
        for(let ele of eleList){
            const originText=ele.innerText;
            function deleteHandler(){
                dataList.splice(dataList.indexOf(originText),1);
                render();
                addHandlerToDivs();
            }
            function mouseEnterHandler(){
                ele.style.backgroundColor="red";
                ele.innerText="删除"+ele.innerText;
                ele.removeEventListener("click",deleteHandler);
                ele.addEventListener("click",deleteHandler);
            }
            function mouseLeaveHandler(event){
                ele.innerText=originText;
                ele.style.backgroundColor="blue";
            }
            ele.addEventListener("mouseenter",mouseEnterHandler);
            ele.addEventListener("mouseleave",mouseLeaveHandler);
        }
    }
    /**
     * 监视输入框,这里的逻辑是对于每一次的输入，合法的的数据都将被添加入dataList中，然后渲染成element,每一个ele再添加事件回调。
     */
    function keyUpHandler(){
        const inputValue = inputBox.value.trim();
        if(pattern.test(inputValue)){//符合正则的字符串
            const pureInputValue = inputValue.split(pattern)[0]; //将输入框的字符串转换为纯净的字符串(无标点符号)
            if(!isExisted(pureInputValue)){//只有不重复的字符串才会添加入dataList
                if(dataList.length >= 10){//判断是否超出长度限制
                    dataList.shift();
                }
                dataList.push(pureInputValue);
                render();
                addHandlerToDivs();
            }
            inputBox.value="";
        }
    }

    app.init=function(){
        inputBox.addEventListener("keyup",keyUpHandler);
    }
}

app.init();
Object.freeze(app);