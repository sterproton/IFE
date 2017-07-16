'use strict'

function $(ele){
    return document.querySelectorAll(ele);
}

const container=$("#divs")[0];
const preOrderBtn=$("#btnContainer>button")[0];
const inOrderBtn=$("#btnContainer>button")[1];
const postOrderBtn=$("#btnContainer>button")[2];
const operateBtns=$("#operateBtns>button");
const addNodeBtn=operateBtns[0];
const deleteNodeBtn=operateBtns[1];
const searchBtn=$("#btnContainer>button")[3];
const searchInput=$("input")[0];
const body=document.body;

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

function getText(){
    let text=searchInput.value;
    if(text.match(/[a-zA-Z]+/)){
        return text;
    }else{
        alert("输入不合法");
        return false;
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
    let text=getText();
    if(!text){
        return false;
    }
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

preOrderTraveral(container,(node)=>{
    changeHeight(node);
    backgroundToWhite(node);
});
preOrderBtn.addEventListener("click",handlerGenerate(preOrderTraveral));
inOrderBtn.addEventListener("click",handlerGenerate(inOrderTraveral));
postOrderBtn.addEventListener("click",handlerGenerate(postOrderTraveral));
searchBtn.addEventListener("click",searchHandler);
preOrderTraveral(container,nodeClick);
function nodeClick(node){
    node.addEventListener("click",(event)=>{
        event.stopPropagation();
        let color=node.style.backgroundColor;
        if(color==="rgb(255, 255, 255)"){
           changeBackgroundColor(node,"yellow"); 
        }else{
            changeBackgroundColor(node,"white");
        }
    });
}

function selectNode(){
    let selectNode=null;
    preOrderTraveral(container,(node)=>{
        if(node.style.backgroundColor==="yellow"){
            selectNode=node;
        }
    });
    return selectNode;
}

function addNode(node){
    let text=getText();
    if(!text){
        return false;
    }
    let newDiv=document.createElement("div");
    newDiv.innerText=text;
    newDiv.style.backgroundColor="white";
    node.appendChild(newDiv);
}

addNodeBtn.addEventListener("click",()=>{
    let node=selectNode();
    if(!node){
        alert("请先选择一个节点");
        return false;
    }else{
        addNode(node);
    }
})

deleteNodeBtn.addEventListener("click",()=>{
    let node=selectNode();
    if(!node){
        alert("请先选择一个节点");
        return false;
    }else{
        node.parentNode.removeChild(node);
    }
})