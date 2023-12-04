/* eslint-disable strict */
/* jshint browser: true, esversion: 6, asi: true */
/* globals uibuilder */
// @ts-nocheck

/** Minimalist code for uibuilder and Node-RED */
'use strict'

// return formatted HTML version of JSON object
var keypad = document.getElementById('node_keypad');
var nodetable = document.getElementById('node_table');
var time = new Date().getTime();
window.syntaxHighlight = function (json) {
    json = JSON.stringify(json, undefined, 4)
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    json = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number'
        if ((/^"/).test(match)) {
            if ((/:$/).test(match)) {
                cls = 'key'
            } else {
                cls = 'string'
            }
        } else if ((/true|false/).test(match)) {
            cls = 'boolean'
        } else if ((/null/).test(match)) {
            cls = 'null'
        }
        return '<span class="' + cls + '">' + match + '</span>'
    })
    return json
} // --- End of syntaxHighlight --- //

// Send a message back to Node-RED
window.fnSendToNR = function fnSendToNR(topic, payload) {
    uibuilder.send({
        'topic': topic,
        'payload': payload,
    })
}

// run this function when the document is loaded
window.onload = function () {

    // Start up uibuilder - see the docs for the optional parameters
    uibuilder.start()
    // uibuilder.send({
    //     'topic': "test",
    //     'payload': "test2",
    // })
    // Listen for incoming messages from Node-RED
    uibuilder.onChange('msg', function (msg) {
        console.info('[indexjs:uibuilder.onChange] msg received from Node-RED server:', msg)
        // dump the msg as text to the "msg" html element
        const Rtank1 = document.getElementById('righttank1');
        const Rtank2 = document.getElementById('righttank2');
        const Rtank3 = document.getElementById('righttank3');
        const Stank1 = document.getElementById('S_Tank1');
        const leftlock = document.getElementById('left_lock');
        const rightlock = document.getElementById('right_lock');
        const sentank1 = document.getElementById('sensingtank1');
        const sentank2 = document.getElementById('sensingtank2');
        const sentank3 = document.getElementById('sensingtank3');
        const sentime= document.getElementById('sensingtime');
        if(msg["topic"] == "r_tank1"){
            Rtank1.innerHTML = msg["payload"]; 
            document.getElementById('righttank1_1').checked = true;
        }else if(msg["topic"] == "r_tank2"){
            Rtank2.innerHTML = msg["payload"]; 
            document.getElementById('righttank1_2').checked = true;
        }else if(msg["topic"] == "r_tank3"){
            Rtank3.innerHTML = msg["payload"]; 
            document.getElementById('righttank1_3').checked = true;
        }else if(msg["topic"] == "stank1"){
            Stank1.innerHTML =msg["payload"]; 
        }else if(msg["topic"] == "left" && msg["payload"] == 'close'){
            leftlock.style.display= 'block';
        }
        else if(msg["topic"] == "right" && msg["payload"] == 'close'){
            rightlock.style.display= 'block';
        }
        else if(msg["topic"] == "sensingtank1"){
            sentank1.innerText = msg["payload"]
        }else if(msg["topic"] == "sensingtank2"){
            sentank2.innerText = msg["payload"]
        }
        else if(msg["topic"] == "sensingtank3"){
            sentank3.innerText = msg["payload"]
        }
        else if(msg["topic"] == "sensingtime"){
            sentime.innerText = msg["payload"]
        }
    })
}

function leftsideclick(){
    const leftlock = document.getElementById('left_lock');
    leftlock.style.display = 'none'
    uibuilder.send({
        'topic': "leftside",
        'payload': "open",
    })
   // const rightlock = document.getElementById('right_lock');

}
function rightsideclick(){
    const rightlock = document.getElementById('right_lock');
    rightlock.style.display = 'none'
    uibuilder.send({
        'topic': "rightside",
        'payload': "open",
    })
   // const rightlock = document.getElementById('right_lock');

}

function is_check() {

    const checkbox = document.getElementById('check_box');
    const is_checked = checkbox.checked;
    if(is_checked == true){
        document.getElementById('pro_li_2').className ='active ing';
        document.getElementById('pro_li_1').className ='';
        checkbox.className = 'next_page_but2'
       // checkbox.style.left = '5px';
        //checkbox.style.right = '0px';
    }else{
        document.getElementById('pro_li_2').className ='';
        document.getElementById('pro_li_1').className ='active ing';
        checkbox.className = 'next_page_but'
    }
}

function moduleon(num){
    if(num == 1){
        document.getElementById("modstate").innerHTML = "Open";
        uibuilder.send({
            'topic': "module",
            'payload': "open",
        })
    }else if(num == 2){
        document.getElementById("modstate").innerHTML = "Close";
        uibuilder.send({
            'topic': "module",
            'payload': "close",
        })
    }
}


function sensoron(num){
    if(num == 1){
        document.getElementById("senstate").innerHTML = "Open";
        uibuilder.send({
            'topic': "sensor",
            'payload': "open",
        })
    }else if(num == 2){
        document.getElementById("senstate").innerHTML = "Close";
        uibuilder.send({
            'topic': "sensor",
            'payload': "close",
        })
    }
}

function valveon(num){
    if(num == 1){
        document.getElementById("valstate").innerHTML = "Open";
        uibuilder.send({
            'topic': "valve",
            'payload': "Open",
        })
    }else if(num == 2){
        document.getElementById("valstate").innerHTML = "Close";
        uibuilder.send({
            'topic': "valve",
            'payload': "Close",
        })
    }
}

function nextvalve(num){
    if(num == 1){
        document.getElementById("nextvalvename").innerHTML = "Open";
        uibuilder.send({
            'topic': "nextvalvename",
            'payload': "Open",
        })
    }else if(num == 2){
        document.getElementById("nextvalvename").innerHTML = "Close";
        uibuilder.send({
            'topic': "nextvalvename",
            'payload': "Close",
        })
    }
}

function nextvpre(num){
    if(num == 1){
        document.getElementById("nextvprename").innerHTML = "Start";
        uibuilder.send({
            'topic': "nextvprename",
            'payload': "Start",
        })
    }else if(num == 2){
        document.getElementById("nextvprename").innerHTML = "Stop";
        uibuilder.send({
            'topic': "nextvprename",
            'payload': "Stop",
        })
    }
}

function righttank1(num){
    if(num == 1){
        document.getElementById("righttank1").innerHTML = "Open";
        uibuilder.send({
            'topic': "righttank1",
            'payload': "open",
        })
    }else if(num == 2){
        document.getElementById("righttank1").innerHTML = "Close";
        uibuilder.send({
            'topic': "righttank1",
            'payload': "close",
        })
    }
}

function righttank2(num){
    if(num == 1){
        document.getElementById("righttank2").innerHTML = "Open";
        uibuilder.send({
            'topic': "righttank2",
            'payload': "open",
        })
    }else if(num == 2){
        document.getElementById("righttank2").innerHTML = "Close";
        uibuilder.send({
            'topic': "righttank2",
            'payload': "close",
        })
    }
}

function righttank3(num){
    if(num == 1){
        document.getElementById("righttank3").innerHTML = "Open";
        uibuilder.send({
            'topic': "righttank3",
            'payload': "open",
        })
    }else if(num == 2){
        document.getElementById("righttank3").innerHTML = "Close";
        uibuilder.send({
            'topic': "righttank3",
            'payload': "close",
        })
    }
}

function tank(num){
    
    var stank1 = document.getElementById('S_Tank1');
    var stank2 = document.getElementById('S_Tank2');
    var stank3 = document.getElementById('S_Tank3');
    var stank4 = document.getElementById('S_Tank4');
    var stank5 = document.getElementById('S_Tank5');
    var stank6 = document.getElementById('S_Tank6');
    var stime = document.getElementById('S_time');
  
    if(num == 1){
        var inputString = prompt('용량을 입력하세요.','ex) 120');
        stank1.innerText = inputString + 'ml';
        uibuilder.send({
            'topic': "tank1",
            'payload': inputString,
        })
        if(stime.innerText == '30'){
            stank4.innerText = (inputString * 60) / 30;
        }else{
            var first = (stime.innerText * 60)
            stank4.innerText = inputString / first;
        }
    }else if(num == 2){
        var inputString = prompt('용량을 입력하세요.','ex) 120');
        stank2.innerText = inputString + 'ml';
        uibuilder.send({
            'topic': "tank2",
            'payload': inputString,
        })
        if(stime.innerText == '30'){
            stank5.innerText =(inputString * 60) / 30;
        }else{
            var first = (stime.innerText * 60)
            stank5.innerText = inputString / first;
        }
    }else if(num == 3){
        var inputString = prompt('용량을 입력하세요.','ex) 120');
        stank3.innerText = inputString;
        uibuilder.send({
            'topic': "tank3" + 'ml',
            'payload': inputString,
        })
        if(stime.innerText == '30'){
            stank6.innerText = (inputString * 60) / 30; ;
        }else{
            
            var first = (stime.innerText * 60)
            stank6.innerText = inputString / first;
        }
    }else if(num == 4){
        var inputString2 = prompt('시간을 입력하세요.','ex) 1min = 60sec');
        stime.innerText = inputString2;
        uibuilder.send({
            'topic': "time",
            'payload': inputString,
        })
        if(stank4.innerText != ''){
            var stank7 = stank1.innerText.split('ml')
        
            var first = (stime.innerText / 60)
            stank4.innerText = stank7[0] / first;
        }else if(stank4.innerText == '' ){
      
            stank4.innerText = ''
        }
        if(stank5.innerText != ''){
            var stank8 = stank2.innerText.split('ml')
      
            var first = (stime.innerText / 60)
            stank5.innerText = stank8[0] / first;
        }else if(stank4.innerText == '' ){
    
            stank5.innerText = ''
        }
        if(stank6.innerText != ''){
            var stank9 = stank3.innerText.split('ml')
   
            var first = (stime.innerText / 60)
            stank6.innerText = stank9[0] / first;
        }else if(stank6.innerText == '' ){
           
            stank6.innerText = ''
        }
    }
}
 
// function stime(){
//     var inputString = prompt('시간을 입력하세요.','ex) 120');
//     var stime = document.getElementById('S_time');
//     stime.innerText = inputString;
//     uibuilder.send({
//         'topic': "time",
//         'payload': inputString,
//     })
// }