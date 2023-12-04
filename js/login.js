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
var checkname = '';
// run this function when the document is loaded
window.onload = function () {

    // Start up uibuilder - see the docs for the optional parameters
    uibuilder.start()
    uibuilder.send({
        'topic': "info",
        'payload': "helo",
    })
    // Listen for incoming messages from Node-RED
    uibuilder.onChange('msg', function (msg) {
        console.info('[indexjs:uibuilder.onChange] msg received from Node-RED server:', msg)
        // dump the msg as text to the "msg" html element
        const admin = document.getElementById('id_list');
        // const li = document.createElement("li");
        // li.setAttribute('id',msg["topic"]+locount);
        // locount = locount+1;
        document.getElementById("chname").innerHTML =msg["payload"]["result"][0]["name"];
        document.getElementById('loimg').src = msg["payload"]["result"][0]["img"]
        if(msg["topic"] == "admin"){
            for(var z = 0; z<Object.keys(msg["payload"]["result"]).length; z++){
                if(z == 0){
            admin.innerHTML += "<li><input type='radio' name='id' value=" +msg["payload"]["result"][z]["name"]+" checked onclick="+
            "change(this.value)>"+
            msg["payload"]["result"][z]["name"]+
            "</li>"
                }else{
                    admin.innerHTML += "<li><input type='radio' name='id' value=" +msg["payload"]["result"][z]["name"]+"  onclick="+
                    "change(this.value)>"+
                    msg["payload"]["result"][z]["name"]+
                    "</li>"
                }
            }
            // // admin.innerHTML =msg["payload"]["result"][0]["name"]; 
            // for(var i=0; i<Object.keys(msg["payload"]["result"]).length; i++){
            // const li = document.createElement("li");
            // li.setAttribute('id',msg["topic"]+locount);
            // locount = locount+1;
            // const textNode = document.createTextNode(msg["payload"]["result"][i]["name"]);
            // li.appendChild(textNode);
            // document.getElementById('id_list').appendChild(li);
            // }
        }

    })
}
function check(){
    var checkpw = '';
    if(checkname == ''){
        checkname = msg["payload"]["result"][0]["name"]
    }
    for(var z = 0; z<Object.keys(msg["payload"]["result"]).length; z++){
        if(checkname == msg["payload"]["result"][z]["name"] ){
            checkpw = msg["payload"]["result"][z]["password"];
        }
    }
    if(document.getElementById("pwd").value != checkpw) {
        alert('비밀번호가 틀렸습니다.')
    }else if(document.getElementById("pwd").value == checkpw){
        alert('로그인에 성공하셨습니다.')
    }
}
function  change(chname){
    checkname = chname
    var chimg = ''
    document.getElementById("chname").innerHTML =chname;
    for(var z = 0; z<Object.keys(msg["payload"]["result"]).length; z++){
        if(checkname == msg["payload"]["result"][z]["name"] ){
            chimg = msg["payload"]["result"][z]["img"] 
        }
    }
    document.getElementById('loimg').src = chimg;

}

