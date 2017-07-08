
'use strict'

const app={};
const $=function(ele){
    return document.querySelector(ele);
}

function createTag(input,container){
    this.input=input;
    this.container=container;
    this.dataList=[];
}

const tag1=new createTag($("#tags1"),$("#container1"));
const tag2=new createTag($("#tags2"),$("#container2"));
const tag3=new createTag($("textarea"),$("#container3"));
const pattern=/[,，\s\n]$/;

function render(container,dataList){
    function clearNode(){
        while(container.hasChildNodes()){
            container.removeChild(container.firstChild);
        }
    }
    clearNode();
    for(let item of dataList){
        let newDiv=document.createElement("div");
        newDiv.innerText=item;
        container.appendChild(newDiv);
    }
}

function isExisted(dataList,inputData){
        let result=false;
        for(let item of dataList){
            if(item === inputData){
                result = true;
            }
        }
        return result;
    }

/**
 * 
 * @param {{}} tagInput 
 * @param {[]} dataList 
 */
function keyUpHandler(tagInput,dataList,container){
    const inputValue = tagInput.value.trim();
    if(pattern.test(inputValue)){//符合正则的字符串
        const pureInputValue = inputValue.split(pattern)[0]; //将输入框的字符串转换为纯净的字符串(无标点符号)
        if(!isExisted(dataList,pureInputValue)){//只有不重复的字符串才会添加入dataList
            if(dataList.length >= 10){//判断是否超出长度限制
                dataList.shift();
            }
            dataList.push(pureInputValue);
            render(container,dataList);
            addHandlerToDivs(container,dataList);
        }
        tagInput.value="";
    }
}

function addHandlerToDivs(container,dataList){
        const eleList=container.children;
        for(let ele of eleList){
            const originText=ele.innerText;
            function deleteHandler(){
                dataList.splice(dataList.indexOf(originText),1);
                render(container,dataList);
                addHandlerToDivs(container,dataList);
            }
            function mouseEnterHandler(){
                ele.style.backgroundColor="red";
                ele.innerText="点击删除"+ele.innerText;
                ele.removeEventListener("click",deleteHandler);
                ele.addEventListener("click",deleteHandler);
            }
            function mouseLeaveHandler(event){
                ele.innerText=originText;
                ele.style.backgroundColor="#33adff";
            }
            ele.addEventListener("mouseenter",mouseEnterHandler);
            ele.addEventListener("mouseleave",mouseLeaveHandler);
        }
    }
function tag1KeyUpHandler(){
    keyUpHandler(tag1.input,tag1.dataList,tag1.container);
}
function tag2KeyUpHandler(){
    keyUpHandler(tag2.input,tag2.dataList,tag2.container);
}

tag1.input.addEventListener("keyup",tag1KeyUpHandler);
tag2.input.addEventListener("keyup",tag2KeyUpHandler);




