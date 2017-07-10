
'use strict'

function $(ele){
    return document.querySelectorAll(ele);
}

const container=document.querySelectorAll("#container")[0]; //$("#container")[0];

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
function clearNode(node){
        while(node.hasChildNodes()){
            node.removeChild(node.firstChild);
        }
    }
function createBinaryTree(node,num){
    clearNode(node);
    if(num>1){
        if(num>=6){
            throw Error("宽度不够");
        }
        if(node.children.length===0){
            createChildNode(node);
            createBinaryTree(node.firstElementChild,num-1);
            createBinaryTree(node.lastElementChild,num-1);
        }else{
            createBinaryTree(node.firstElementChild,num-1);
            createBinaryTree(node.lastElementChild,num-1);
        }
    }
}

let cnt=0;
function elementBinaryTreeTraveralFunc(tree,func){
    func(tree);
    if(tree.children.length>0){
        elementBinaryTreeTraveralFunc(tree.firstElementChild,func);
        elementBinaryTreeTraveralFunc(tree.lastElementChild,func);
    }
}
function redBorder(node){
    node.style.borderColor="red";
}
function backgroundToWhite(node){
    node.style.backgroundColor="#fff";
}
function changeBackgroundColor(node){
    elementBinaryTreeTraveralFunc(container,backgroundToWhite);
    node.style.backgroundColor="red";
    if(node.children.length>0){
        node.firstElementChild.style.backgroundColor="#fff";
        node.lastElementChild.style.backgroundColor="#fff";
    }
}


createBinaryTree(container,5);
elementBinaryTreeTraveralFunc(container,function(node){
    cnt++;
    function wraper(){
        changeBackgroundColor(node);
    }
    (function(num){
        console.log(num);
        setTimeout(wraper,num*150);
    })(cnt);
});

