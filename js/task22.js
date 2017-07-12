
'use strict'

const app={};
{

}
function $(ele){
    return document.querySelectorAll(ele);
}

const container=$("#container")[0];
const binaryTreeGenerateBtn=$("button")[0];
const input=$("input")[0];
const binaryTreeTraveralBtn=$("button")[1];

function isPair(node){
    if(node.children.length>0){
        return true;
    }else{
        return false;
    }
}

function NodesTraversing(node,func,param){
    if (isPair(node)) {
        func(node,param);
        NodesTraversing(node.firstElementChild,func,param);
        NodesTraversing(node.lastElementChild,func,param);
    }else{
        func(node,param);
    }
}

function LeafTraversing(node,func,param){
    if(isPair(node)){
        LeafTraversing(node.firstElementChild,func,param);
        LeafTraversing(node.lastElementChild,func,param);
    }else{
        func(node,param);
    }
}

function PairNodeTraversingByNum(node,num,func){
    if(num>1){
        if (isPair(node)) {
            PairNodeTraversingByNum(node.firstElementChild,num-1,func);
            PairNodeTraversingByNum(node.lastElementChild,num-1,func);
        }else{
            func(node);
            PairNodeTraversingByNum(node.firstElementChild,num-1,func);
            PairNodeTraversingByNum(node.lastElementChild,num-1,func);
        }
    }
}

function createBinaryTree(node,num){
    PairNodeTraversingByNum(node,num,createChildNode);
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
    NodesTraversing(container,backgroundToWhite);
    node.style.backgroundColor="red";
    if(isPair(node)){
        node.firstElementChild.style.backgroundColor="#fff";
        node.lastElementChild.style.backgroundColor="#fff";
    }
}

function checkInput(inputValue){
    let value=Number.parseInt(inputValue)
    return !Number.isNaN(value)&&(0<value&&value<6);
}

function generaetHandler(){
    if(checkInput(input.value)){
        clearChildNode(container);
        createBinaryTree(container,parseInt(input.value));
    }else{
        alert("非法输入或者0<二叉树层数<6");
        return false;
    }
}
function traverallHandler(){
    let cnt=0;
    NodesTraversing(container,function(node){ 
        cnt++;
        function wrap(){
            changeBackgroundColor(node);
        }
        setTimeout(wrap,cnt*300);
    });
}
createBinaryTree(container,5);
binaryTreeGenerateBtn.addEventListener("click",generaetHandler);
binaryTreeTraveralBtn.addEventListener("click",traverallHandler);


