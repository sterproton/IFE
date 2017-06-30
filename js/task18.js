
'use strict'

const input=document.getElementById("input");
const queueData=[];
const container=document.getElementsByClassName("container")[0];
const leftInBtn=document.getElementById("leftIn");
const rightInBtn=document.getElementById("rightIn");
const leftOutBtn=document.getElementById("leftOut");
const rightOutBtn=document.getElementById("rightOut");

/**
 * 此函数抽象了所有对队列的操作，比如左入左出，右入右出
 * @param {*判断操作是添加还是移除数据，如果是1则是添加数据，0则是移除数据} pro 
 * @param {*判断操作是在那个方向，如果是1则是右边，比如pop,push。0则是左边} pos 
 * 
 */
function processData(pro,pos){
    if(pro===1){//如果是添加数据

        //这里进行数据校验
        let value=input.value;
        if(isNaN(value)||value.replace(/(^\s*)|(\s*$)/g, "").length ==0){
            alert("输入数据仅限数字");
            return false;
        }
        value=Number(value);
        if(value<10||value>100){
            alert("限制输入的数字在10-100");
            return false;
        }
        if(pos===1){
            queueData.push(value);
        }else{
            queueData.unshift(value);
        }
    }else{//如果是移除数据
        if(pos===1){
            let value=queueData.pop();
            alert(value);
        }else{
            let value=queueData.shift();
            alert(value);
        }
    }

}

/**
 * 清除节点以便重新渲染
 */
function clearQueue(){
    while(container.hasChildNodes()){
        container.removeChild(container.firstChild);
    }
}
/**
 * 添加节点
 * @param {*对于队列中的数据，生成一个节点，并添加入container元素中} text 
 */
function addQueue(text){
    let div=document.createElement('div');
    div.className="queue"
    div.innerText=text;
    container.appendChild(div); 
}
/**
 * 渲染
 */
function render(){
    clearQueue();
    for(let value of queueData){
        addQueue(value);
    }
}

function addHandler(){
    /**
     * 这里是给所有按钮添加事件。
     */
    function leftIn(){
        if(queueData.length>=60){
            alert("队列中只能有60个元素，请移除多余的元素");
            return false;
        }
        processData(1,0);
        render();
    }
    function leftOut(){
        processData(0,0);
        render();
    }
    function rightIn(){
        if(queueData.length>=60){
            alert("队列中只能有60个元素，请移除多余的元素");
            return false;
        }
        processData(1,1);
        render();
    }
    function rightOut(){
        processData(0,1);
        render();
    }
    leftInBtn.addEventListener("click",leftIn);
    leftOutBtn.addEventListener("click",leftOut);
    rightInBtn.addEventListener("click",rightIn);
    rightOutBtn.addEventListener("click",rightOut);
}

/**
 * 初始化
 */
function init(){
    addHandler();
}

init();
