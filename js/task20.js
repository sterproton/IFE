
'use strict'

const app={};

{
    /**
    * 简化版querySelector
    * @param {*} ele
    */
    function $(ele){
        return document.querySelector(ele);
    }

    const storeArr=[];
    const textArea=$("textarea");
    const insertBtn=$("#insertBtn");
    const searchBtn=$("#searchBtn");
    const searchInput=$("#searchInput");
    const container=$("#container");
    const clearBtn=$("#clearBtn");

    function inputToArr(){
        let ProcessedIput=textArea.value.trim().split(/[\n，,、\s+]/);
        for(let item of ProcessedIput){
            if(item!==""){
                storeArr.push(item);
            }
        }
    }

    function search(){
        let searchValue=searchInput.value;
        let divArr=container.children;
        function isMatch(text,item){
            let re=RegExp(text);
            if(re.test(item.innerText)){
                return true;
            }else{
                return false;
            }
        }
        for(let item of divArr){
            if(isMatch(searchValue,item)){
                item.className=item.className+" "+"related";
            }
        }
    }

    function clearNode(){
        while(container.hasChildNodes()){
            container.removeChild(container.firstChild);
        }
    }

    function render(){
        clearNode();
        for(let item of storeArr){
            let newDiv=document.createElement("div");
            newDiv.className="showdiv";
            newDiv.innerText=item;
            container.appendChild(newDiv);
        }
    }

    function addHandler(){
        insertBtn.addEventListener("click",inputToArr);
        insertBtn.addEventListener("click",render);
        searchBtn.addEventListener("click",render);
        searchBtn.addEventListener("click",search);
        clearBtn.addEventListener("click",clearNode);
    }

    function init(){
    addHandler();
    }
    app.init=init;
}

app.init();

