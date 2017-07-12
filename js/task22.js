
'use strict'

function $(ele){
    return document.querySelectorAll(ele);
}
const container=$("#container")[0];
const binaryTreeGenerateBtn=$("button")[0];
const input=$("input")[0];
const BinaryTreeTraverBtn=$("button")[1];
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
function createBinaryTree(node,num){
    clearChildNode(node);
    if(num>1){
        if(num>=6){
            throw Error("宽度不够");
        }
        //elementBinaryTreeAllNodesTraveralFunc(node,createBinaryTree,num-1);
        if (isPair(node)) {
            createBinaryTree(node.firstElementChild,num-1);
            createBinaryTree(node.lastElementChild,num-1);
        }else{
            createChildNode(node);
            createBinaryTree(node.firstElementChild,num-1);
            createBinaryTree(node.lastElementChild,num-1);
        }
    }
}

function isPair(node){
    if(node.children.length>0){
        return true;
    }else{
        return false;
    }
}

let cnt=0;
function elementBinaryTreeLeafTraveralFunc(node,func,param){
    if(isPair(node)){
        elementBinaryTreeLeafTraveralFunc(node.firstElementChild,func,param);
        elementBinaryTreeLeafTraveralFunc(node.lastElementChild,func,param);
    }else{
        func(node,param);
    }
}

function elementBinaryTreeAllNodesTraveralFunc(node,func,param){
    if (isPair(node)) {
        func(node,param);
        elementBinaryTreeAllNodesTraveralFunc(node.firstElementChild,func,param);
        elementBinaryTreeAllNodesTraveralFunc(node.lastElementChild,func,param);
    }else{
        func(node,param);
    }
}
function redBorder(node){
    node.style.borderColor="red";
}
function backgroundToWhite(node){
    node.style.backgroundColor="#fff";
}
function changeBackgroundColor(node){
    elementBinaryTreeAllNodesTraveralFunc(container,backgroundToWhite);
    node.style.backgroundColor="red";
    if(isPair(node)){
        node.firstElementChild.style.backgroundColor="#fff";
        node.lastElementChild.style.backgroundColor="#fff";
    }
}


function btnHandler(){
    createBinaryTree(container,parseInt(input.value));
}
function traveralHandler(){
    elementBinaryTreeAllNodesTraveralFunc(container,function(node){ 
        cnt++;
        function wraper(){
            changeBackgroundColor(node);
        }
        setTimeout(wraper,cnt*150);
    })
    cnt=0;
}
createBinaryTree(container,5);
binaryTreeGenerateBtn.addEventListener("click",btnHandler);
BinaryTreeTraverBtn.addEventListener("click",traveralHandler);

