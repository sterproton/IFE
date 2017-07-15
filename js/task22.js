'use strict'

function $(ele){
    return document.querySelectorAll(ele);
}

const container=$("#container")[0];
const input=$("input")[0];
const TreeGenerateBtn=$("button")[0];
const preOrderBtn=$("button")[1];
const inOrderBtn=$("button")[2];
const postOrderBtn=$("button")[3];

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
        Array.prototype.map.call(node.children,(childNode)=>{
            preOrderTraveral(childNode,func);
        });
    }else{
        func(node);
    }
}

function inOrderTraveral(node,func){
    if(isPair(node)){
        inOrderTraveral(node.firstElementChild,func);
        func(node);
        inOrderTraveral(node.lastElementChild,func);

    }else{
        func(node);
    }
}

function postOrderTraveral(node,func){
    if (isPair(node)) {
        Array.prototype.map.call(node.children,(childNode)=>{
            postOrderTraveral(childNode,func);
        });
        func(node);
    }else{
        func(node);
    }
}

function createBinaryTree(node,num){
    if(num>1){
        if(isPair(node)) {
            Array.prototype.map.call(node.children,(childNode)=>{
                createBinaryTree(childNode,num-1);
            });
        }else{
            createChildNode(node);
            Array.prototype.map.call(node.children,(childNode)=>{
                createBinaryTree(childNode,num-1);
            });
        }
    }
}


function getChildWidth(parent){
    return (parent.offsetWidth-22)/2-12;
}

function getChildHeight(parent){
    return parent.offsetHeight-44;
}

function createChildNode(parent){
    let leftNode=document.createElement("div");
    let rightNode=document.createElement("div");
    leftNode.className="left node";
    rightNode.className="right node";
    parent.appendChild(leftNode);
    parent.insertBefore(rightNode,null);
    leftNode.style.width=rightNode.style.width=getChildWidth(parent)+'px';
    leftNode.style.height=rightNode.style.height=getChildHeight(parent)+'px';
}

function clearChildNode(node){
    while(node.hasChildNodes()){
        node.removeChild(node.firstChild);
    }
}

function backgroundToWhite(node){
    node.style.backgroundColor="#fff";
}

function changeBackgroundColor(node){
    preOrderTraveral(container,backgroundToWhite);
    node.style.backgroundColor="red";
}

function checkInput(inputValue){
    let value=Number.parseInt(inputValue);
    return /^\d$/.test(inputValue)&&value>0&&value<6;
}

function treeGenerate(){
    if(checkInput(input.value)){
        clearChildNode(container);
        preOrderTraveral(container,backgroundToWhite);
        createBinaryTree(container,parseInt(input.value));
    }else{
        alert("非法输入 或者\n二叉树层数必须>0or<6");
    }
}

function btnActive(flag){
    let btns=$("button");
    Array.from(btns).map((btn)=>{
        btn.disabled=!flag;
    })
}

function handlerGenerate(traveraFunc){
    return ()=>{
        btnActive(false);
        let cnt=0;
        traveraFunc(container,(node)=>{
            setTimeout(()=>{
                changeBackgroundColor(node);
            } ,(++cnt)*200);
        });
        setTimeout(()=>{
            preOrderTraveral(container,backgroundToWhite);
            btnActive(true);
        },(++cnt)*200);
    }
}

createBinaryTree(container,5);
TreeGenerateBtn.addEventListener("click",treeGenerate); 
preOrderBtn.addEventListener("click",handlerGenerate(preOrderTraveral));
inOrderBtn.addEventListener("click",handlerGenerate(inOrderTraveral));
postOrderBtn.addEventListener("click",handlerGenerate(postOrderTraveral));



