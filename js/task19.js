
'use strict'

/**
 * 将所有需要的元素保存在变量里
 */

const input=document.getElementById("input");
const container=document.getElementsByClassName("container")[0];
const leftInBtn=document.getElementById("leftIn");
const rightInBtn=document.getElementById("rightIn");
const leftOutBtn=document.getElementById("leftOut");
const rightOutBtn=document.getElementById("rightOut");
const sortBtn=document.getElementById("sort");
const unSortBtn=document.getElementById("unsort");
const selectSortBtn=document.getElementById("selectSort");
const canvas=document.getElementById("myCanvas");
let queueData=[];//一个队列，存放数据

//初始化Canvas画布
let ctx=canvas.getContext("2d");
ctx.fillStyle="#FF0000";

/**
 * 此函数抽象了所有对队列的操作，比如左入左出，右入右出。
 * @param {*判断操作是添加还是移除数据，如果是1则是添加数据，0则是移除数据} pro 
 * @param {*判断操作是在那个方向，如果是1则是右边，比如pop,push。0则是左边} pos 
 * 比如 processData(1,1)为push processData(1,0)为unshift
 */
function processData(pro,pos){
    if(pro===1){//如果是添加数据，同时又分为左或右

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
        
    }else{//如果是移除数据，同时分为左或右
        if(pos===1){
            queueData.pop();
        }else{
            queueData.shift();

        }
    }

}

/**
 * 渲染，在Canvas画布上画出queueData中每一项数据
 */
function render(){
    ctx.clearRect(0,0,1020,500); //每一此渲染之前都清除Canvas画布
    for(let i=0;i<queueData.length;i++){
        let value=queueData[i]*5;
        ctx.fillRect(i*17,500-value,15,value);
    }
}

/**
 * 这一个函数，负责添加所有按钮的事件处理函数
 */
function addHandler(){

    //以下几个函数是事件处理函数，每一个事件处理函数有大概如下的步骤：1.处理数据 2.渲染 
    //也就是说每按一次按钮，处理完数据后都会重新渲染一次。有些事件处理函数还会判断元素是否过量

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
    function queueSort(){
        queueData.sort(function(a,b){
            return a - b;
        });
        render();
    }

    function unsort(){
        queueData=[];
        for(let i=1;i<=60;i++){
            queueData.push(Math.round(Math.random()*90+10));
        }
        render();
    }
    //给每一个按钮添加事件处理函数
    leftInBtn.addEventListener("click",leftIn);
    leftOutBtn.addEventListener("click",leftOut);
    rightInBtn.addEventListener("click",rightIn);
    rightOutBtn.addEventListener("click",rightOut);
    sortBtn.addEventListener("click",queueSort);
    unSortBtn.addEventListener("click",unsort);
    selectSortBtn.addEventListener("click",seleSort);
}

/**
 * 初始化
 */
function init(){
    addHandler();
}

init();



function seleSort(){
    function selectionSort(queueData) {
        var length = queueData.length,
            i,
            j,
            minIndex,
            minValue,
            temp;
        for (i = 0; i < length - 1; i++) {
            minIndex = i;
            minValue = queueData[minIndex];
            for (j = i + 1; j < length; j++) {
                if (queueData[j] < minValue) {
                    minIndex = j;
                    minValue = queueData[minIndex];
                }
            }
            // 交换位置
            temp = queueData[i];
            queueData[i] = minValue;
            queueData[minIndex] = temp;
            slowlyRender(Array.from(queueData),i+1);
        }
    }
    selectionSort(queueData);
}

/**
 * 此函数用于排序的缓慢渲染，通过定时器实现，可实现排序的动画效果。
 * @param {*这个是队列的一个副本，保存每一次队列操作后的队列} queueCopy 
 * @param {*这个是延迟操作的时间，i是用在setTimeOut那里的} i 
 */
function slowlyRender(queueCopy,i){
    function Render(queueData){
        ctx.clearRect(0,0,1020,500); //每一此渲染之前都清除Canvas画布
        for(let i=0;i<queueData.length;i++){
            let value=queueData[i]*5;
            ctx.fillRect(i*17,500-value,15,value);
        }
        console.log("render complete");
    }
    setTimeout(()=>{
        Render(queueCopy);
    },50*i);//这里可以控制延迟操作的幅度，你可以选择在参数那里改，或者在这里改
}


