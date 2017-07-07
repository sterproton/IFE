
'use strict'

const app={}

{
    const $=function(ele){
        return document.querySelector(ele);
    }

    const tag1Ipunt=$("#tags1");
    const tag2Input=$("#tags2");
    const container1=$("#container1");
    const container2=$("#container2");
    const container3=$("#container3");
    const dataList_1=[];
    const dataList_2=[];
    const dataList_3=[];
    
    function render(){
        function clearNode(){
            while(container.hasChildNodes()){
                container.removeChild(container.firstChild);
            }
        }
        clearNode();
        for(let item of dataList){
            let newDiv=document.createElement("div");
            newDiv.className="showdiv";
            newDiv.innerText=item;
            container.appendChild(newDiv);
        }
    }
}

