var EventUtil = {
        addHandler: function(element, type, handler){
            if (element.addEventListener){
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent){
                element.attachEvent("on" + type, handler);
            } else {
                element["on" + type] = handler;
            }
        },

        getEvent: function(event){
            return event ? event : window.event;
        },

        getTarget: function(event){
            return event.target || event.srcElement;
        },

        preventDefault: function(event){
            if (event.preventDefault){
                event.preventDefault();
            } else {
                event.returnValue = false;
            }   
        },

        removeHandler: function(element, type, handler){
            if (element.removeEventListener){
                element.removeEventListener(type, handler, false);
            } else if (element.detachEvent){
                element.detachEvent("on" + type, handler);
            } else {
                element["on" + type] = null;
            }
        }

        };



function createXHR(){

}
 

var xhr = XMLHttpRequest()
xhr.open('get','example.php',false);
xhr.send(null);

xhr.onreadystatechange=function(){
    if(xhr.onreadystatechange===4){
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
            alert(xhr.responseText);
        }else{
            alert("request was unsuccesful")
        }
    }
}

function test(resolve, reject) {
    var timeOut = Math.random() * 2;
    console.log('set timeout to: ' + timeOut + ' seconds.');
    setTimeout(function () {
        if (timeOut < 1) {
            console.log('call resolve()...');
            resolve('200 OK');
        }
        else {
            console.log('call reject()...');
            reject('timeout in ' + timeOut + ' seconds.');
        }
    }, timeOut * 1000);
}

var p1=new promise(test);
var p2=p1.then(function(result){
    console.log('成功'+result);
});
var p3=p2.catch(function(reason){
    console.log('失败'+reason);
});


function ajax(method,url,data){
    const request=new XMLHttpRequest();
    return new Promise(function(resolve,reject){
        request.onreadystatechange=function(){
            if(request.readyState===4){
                if(request.status===200){
                    resolve(request.responseText);
                }else{
                    reject(request.status);
                }
            }
        };
        request.open(method,url);
        request.send(data);
    });
}
var p=ajax('GET','/api/categories');
p.then(function(text){
    log.innerText=text;
}).catch(function(status){
    log.innerText='ERROR: ' + status;
})

function pms1(){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log('执行任务一');
            resolve('执行任务一成功');
        },2000);
    });
}

function pms2() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            console.log('执行任务2');
            resolve('执行任务2成功');
        }, 2000);
    });
}
function pms3() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            console.log('执行任务3');
            resolve('执行任务3成功');
        }, 2000);
    });
}

Promise.all([pms1(), pms2(), pms3()]).then(function(data){
    console.log(data);
    console.log({}.toString.call(data));
})

function SuperType(name){
    this.name=name;
this.colors = ["red", "blue", "green"];
this.sayHello=function(){
    alert('hello');
}
}
function SubType(){
// 继承了 SuperType
SuperType.call(this);
}


function object(o){
function F(){}
F.prototype = o;
return new F();
}

function inheritPrototype(subType, superType){
var prototype = object(superType.prototype); //创建对象
prototype.constructor = subType; //增强对象
subType.prototype = prototype; //指定对象
}

function SuperType(name){
this.name = name;
this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
alert(this.name);
};
function SubType(name, age){
SuperType.call(this, name);
this.age = age;
}

inheritPrototype(SubType, SuperType);

SubType.prototype.sayAge = function(){
alert(this.age);
};

var instance=new SubType('nic',29);
var insrance2=new SubType('cin',92);

listen('click',handler);

function handler(){

}

function response(err,data){
    if(err){
        console.log(err);
    }
    else{
        console.log(data);
    }
}

function add(getX,getY,cb) {
var x, y;
getX( function(xVal){
x = xVal;
//  两个都准备好了？
if (y != undefined) {
cb( x + y ); //  发送和
}
} );
getY( function(yVal){
y = yVal;
//  两个都准备好了？
if (x != undefined) {
cb( x + y ); //  发送和
}
} );
}

function createXHR(){
    if (typeof XMLHttpRequest != "undefined"){
        createXHR = function(){
            return new XMLHttpRequest();
        };
    } else if (typeof ActiveXObject != "undefined"){
        createXHR = function(){
            if (typeof arguments.callee.activeXString != "string"){
                var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"],i, len;
                for (i=0,len=versions.length; i < len; i++){
                    try {
                        new ActiveXObject(versions[i]);
                        arguments.callee.activeXString = versions[i];
                        break;
                    } catch (ex){
                        //skip
                    }
                }
            }
            return new ActiveXObject(arguments.callee.activeXString);
        };
    } else {
        createXHR = function(){
            throw new Error("No XHR object available.");
        };
    }
    return createXHR();
}


var a=100;
function test(){
    var a=10;
    setTimeout(function(){
        console.log(a);
    },2000);
}
test();
console.log(a);

function foo(x){
    var temp=3;
    return function(y){
        alert(x+y+(++temp));
    }
}


setTimeout(function(){
    //processing
    setTimeout(argument.callee, interval);
},interval);

setTimeout(function(){
    var div=document.get
})

setTimeout(function() {
    var item=array.shift();
    
}, 100);




setTimeout(function(){
    console.log('settime 4')
},0);

console.log('start');

new Promise(function(resolve){
    console.log('promise1')
    for( var i=0 ; i<10000 ; i++ ){
        i==9999 && resolve()
    }
    console.log('promise2')
}).then(function(){
    setTimeout(function() {
        console.log('callback print from promise');
    }, 1000);
}).then(function(){
    console.log('promise3')
}).then(function(){
    console.log('promise4')
})


for(var i=0;i<10;i++){
    console.log('in macrotask!');
}

new Promise(function(resolve){
    console.log('-promise1')
    for( var i=0 ; i<10000 ; i++ ){
        i==9999 && resolve()
    }
    console.log('-promise2')
}).then(function(){
    console.log('-promise3')
}).then(function(){
    console.log('-promise4')    
}).then(function(){
    setTimeout(function() {
        console.log('-callback print from promise');
    }, 0);
});


setTimeout(function(){
    console.log('settime 4')
},0);

function test(resolve, reject) {
    var timeOut = 0.5
    console.log('set timeout to: ' + timeOut + ' seconds.');
    setTimeout(function () {
        if (timeOut < 1) {
            console.log('call resolve()...');
            resolve('200 OK');
        }
        else {
            console.log('call reject()...');
            reject('timeout in ' + timeOut + ' seconds.');
        }
    }, timeOut * 1000);
}

new Promise(test).then(function(){
    console.log('promise2');
}).then(function(){
    console.log('promise3');
})



new Promise(function(){
    console.log('promise start');
    setTimeout(function(){
        console.log('timeout');
    },1000);
}).then(function(){
    console.log('promise 2');
}).then(function(){
    console.log('promise3')
}).then(function(){
    console.log('promise4')
})

new Promise(function(resolve){
    console.log('promise1');
    console.log('promise2');
    resolve();
}).then(function(){
    setTimeout(function() {
        console.log('timeout callback');
    }, 1000);       
}).then(function(){
    console.log('promise3')
}).then(function(){
    console.log('promise4')
})

new Promise(function(resolve){
    console.log('1');
    console.log('2');
    return 10;
}).then(function(resolve){
    console.log(resolve);
    setTimeout(function() {
        console.log('timeout callback');
    }, 1000);       
}).then(function(){
    console.log('3')
}).then(function(){
    console.log('4')
})


function doubleUp(value) {
    return value * 2;
}
function increment(value) {
    console.log(value + 1);
    return 10;
}
function output(value) {
    console.log(value);// => (1 + 1) * 2
}

var promise = Promise.resolve(1);
promise.then(increment).then(doubleUp)
    .then(output)
    .catch(function(error){
        // promise chain中出现异常的时候会被调用
        console.error(error);
    });

var preloadImage=function(path){
    return new Promise(function(resolve,reject){
        var img=new Image();
        image.onload=resolve;
        image.onerro=reject;
        image.src=path;
    })
}

function *generator(){
    yield 1;
    yield 2;
    yield 3;

}


function delay(time,callback){
    setTimeout(function(){
        callback("Slept for "+time);
    },time);
}


var p1=new Promise(function(resolve,reject){
    delay(1000,function(msg){
    console.log(msg);
    resolve();
    });
})
p1.then(function(){
    delay(1200,function(msg){
        console.log(msg);
        throw Error('new error!')
    });
}).catch(function(err){
    console.log(err);
})

function *myDelayedMessages(){
    console.log(yield delay(1000,function(){}));

}

function run(generatorFunction){
    var generatorItr = generatorFunction(resume);
    function resume(callbackValue){
        generatorItr.next(callbackValue); 
    }
    generatorItr.next();
}


function *genFn(){
    var a=2;

    yield a;

    while(true){
        yield b=a / (2 * a + 1);
    }

}

const gen=genFn();

setTimeout(function() {
    console.log('timeout1');
},0)

new Promise(function(resolve) {
    console.log('promise1');
    for(var i = 0; i < 1000; i++) {
        i == 99 && resolve();
    }
}).then(function() {
    console.log('then1');
})

console.log('global1');

setTimeout(function() {
    console.log('time out 2 and set a promise!');
    new Promise(function(resolve,reject){
        console.log('promise2');
        resolve();
    }).then(function(){
        console.log('then2');
        console.log('设置一个回调');
        setTimeout(function(){
            new Promise(function(resolve,reject){
                console.log('inner promise');
                resolve();
            }).then(function(){
                console.log(' inner then!')
            })
            console.log('time out');
        },0);
    }).then(function(){
        console.log('then 3');
    })
},0)

console.log('global2');

new Promise(function(resolve) {
    console.log('promise1');
    for(var i = 0; i < 1000; i++) {
        i == 99 && resolve();
    }
}).then(function() {
    console.log(' outer then1');
    new Promise(function(resolve){
        console.log('inner promise');
        resolve();
    }).then(function(){
        console.log(' inner then2');
    }).then(function(){
        console.log(' inner then3');
    })
    setTimeout(function(){
        console.log('time out : macrotask');
    })
}).then(function(){
    console.log('outer then2');
})

console.log('global');



setTimeout(function() {
    console.log('timeout1');
},0)

new Promise(function(resolve) {
    console.log('promise1');
    for(var i = 0; i < 1000; i++) {
        i == 99 && resolve();
    }
}).then(function() {
    console.log('then1');
})

console.log('global1');

setTimeout(function() {
    console.log('time out 2 and set a promise!');
    new Promise(function(resolve,reject){
        console.log('promise2');
        resolve();
    }).then(function(){
        console.log('then2');
        console.log('设置一个回调');
        setTimeout(function(){
            new Promise(function(resolve,reject){
                console.log('inner promise');
                resolve();
            }).then(function(){
                console.log(' inner then!')
            })
            console.log('time out');
        },0);
    }).then(function(){
        console.log('then 3');
    })
},0)

console.log('global2');




var a=1;
var b=2;
function *foo(){
    a++;
    yield;
    b=b*a;
    a=(yield b)+3;
}

function *bar(){
    b--;
    yield;
    a=(yield 8)+b;
    b=a*(yield 2);
}

function step(gen) {
    var it=gen();
    var last;
    return function(){
        last=it.next(last).value;
    };
}

a=1;
b=2;
var s1=step(foo);
var s2=step(bar);

s2();//b--
s2();//yield 8
s1();//a++
s2();//a=8+b   yield2
s1();// yile b
s1();// a=b+3;
s2();//b=a*2


var something=(function(){
    var nextVal;

    return {
        [Symbol.iterator]: function(){return this;},

        next: function(){
            if(nextVal ==='undefined'){
                nextVal=1;
            }else{
                nextVal=(3*nextVal)+6;
            }

            return { done:false, value:nextVal };
        }
    };
})();


function *something(){
    var nextVal;

    while(true){
        if(nextVal===undefined){
            nextVal=1;
        }
        else{
            nextVal=(3*nextVal)+6;
        }
        yield nextVal;
        return 10;
    }
}


function foo(x,y){
    return request(
        "http://some/url.1/?x="+x+"&y="+y
    );
}

function *main(){
    try{
        var text=yield foo(11,31);
        console.log(text);
    }catch(err){
        console.log(err);
    }
}

var it=main();

var p=it.next().value;

p.then(function(text){
    it.next(text);
},function(err){
    it.throw(err);
})


function foo(x,y){
    return request(
        "http://some/url.1/?x="+x+"&y="+y
    );
}

async function main(){
    try{
        var text=await foo(11,31);
        console.log(text);
    }catch(err){
        console.log(err);
    }
}
 main();


 