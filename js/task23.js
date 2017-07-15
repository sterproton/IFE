'use strict'

function $(ele){
    return document.querySelectorAll(ele);
}

const container=$("#divs")[0];
const preOrderBtn=$("button")[0];
const inOrderBtn=$("button")[1];
const postOrderBtn=$("button")[2];
const searchInput=$("input")[0];
const searchBtn=$("button")[3];

function isPair(node){
    if(node.children.length>0){
        return true;
    }else{
        return false;
    }
}

function preOrderTraveral(node,func){
    if (isPair(node)) {
        func(node);
        Array.prototype.map.call(Array.from(node.children).reverse(),(childNode)=>{
            preOrderTraveral(childNode,func);
        });
    }else{
        func(node);
    }
}

function inOrderTraveral(node,func){
    if(isPair(node)){
        let childNodes=Array.from(node.children).reverse();
        childNodes.shift();
        inOrderTraveral(node.lastElementChild,func);
        func(node);
        Array.prototype.map.call(childNodes,(childNode)=>{
            inOrderTraveral(childNode,func);
        })
    }else{
        func(node);
    }
}

function postOrderTraveral(node,func){
    if (isPair(node)) {
        Array.prototype.map.call(Array.from(node.children).reverse(),(childNode)=>{
            postOrderTraveral(childNode,func);
        });
        func(node);
    }else{
        func(node);
    }
}

function backgroundToWhite(node){
    node.style.backgroundColor="#fff";
}

function getText(node){
    if(node.firstChild.data.match(/\w+/)){
        return node.firstChild.data.match(/\w+/)[0];
    }
}

function changeBackgroundColor(node,color){
    preOrderTraveral(container,backgroundToWhite);
    node.style.backgroundColor=color;
}

function handlerGenerate(traveraFunc){
    return ()=> {
        btnActive(false);
        let cnt=0;
        traveraFunc(container,(node)=>{
            setTimeout(()=>{changeBackgroundColor(node,"red");},(++cnt)*400);
        });
        setTimeout(()=>{
            preOrderTraveral(container,backgroundToWhite);
            btnActive(true);
        },(++cnt)*400);
    }
}

function searchHandler() {
    btnActive(false);
    let cnt=0;
    let isFound=false;
    preOrderTraveral(container,(node)=>{
        let match=node.firstChild.data.match(/\w+/);
        if (match&&searchInput.value===match[0]) {
            isFound=true;
            setTimeout(()=>{changeBackgroundColor(node,"blue");},(++cnt)*400);
        } else {
            setTimeout(()=>{changeBackgroundColor(node,"red");},(++cnt)*400);
        }
    });
    setTimeout(()=>{
        preOrderTraveral(container,backgroundToWhite);
        if (Object.is(isFound,false)) {
            alert("未找到所查找的内容");
        }
        btnActive(true);
    },(++cnt)*400);
}

function btnActive(flag){
    let btns=$("button");
    Array.from(btns).map((btn)=>{
        btn.disabled=!flag;
    })
}
function changeHeight(node){
    node.style.height=node.parentNode.offsetHeight-44+"px";
}
preOrderTraveral(container,changeHeight);
preOrderBtn.addEventListener("click",handlerGenerate(preOrderTraveral));
inOrderBtn.addEventListener("click",handlerGenerate(inOrderTraveral));
postOrderBtn.addEventListener("click",handlerGenerate(postOrderTraveral));
searchBtn.addEventListener("click",searchHandler);


