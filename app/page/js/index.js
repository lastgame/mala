/**
 * Created by Administrator on 2017/1/30.
 */
"use strict";
const ipc = require('electron').ipcRenderer;
const dialog = require('electron').remote;
var MSG_COUNT = 0;
var MSG_COUNT_CUR = 0;
$(()=>{
    //要先通讯取得对象？
    $('#btnTest').on('click',()=>{
        //alert('it is ok!!!');
        console.log('this is a test...');
        ipc.send('get-app-path');
        ipc.send('closeWindow');
        //win && (win = null);
    });
    //关闭窗口
    $('#btnClose').on('click',()=>{
       if(confirm('确定关闭窗口？','提示')){
           ipc.send('closeWindow');
       }
    });
    //版本信息
    $('#msgVersion').html(JSON.stringify(process.versions));
    //打开选择文件窗口
    $('#btnFile').on('click',()=>{

    });
    //弹出信息
    $('#btnMsg').on('click',()=>{
        ipc.send('showMsg',{type:1,msg:'这是错误消息！'});
    });
    //socket io
    let socket = io('http://localhost:3000');
    socket.on('connect',()=>{
        console.info('Server连接成功');
    }).on('disconnect',()=>{
        console.info('服务断开链接');
    }).on('msg', function (data) {
        console.info(data);
        //$('#msgSocket').append(data+'\n');
        //$('#msgSocket').append('<option style="color:blue">'+data+'</option>');
        addLog('msgSocket',data);
    });
    $('#btnSendMsg').on('click',()=>{
        socket.emit('msg', { 'this is a test':'bsbs' });
        console.log('发送成功！');
    });
    //清空日志
    $('#btnClean').on('click',()=>{
        $('#msgSocket').empty();
    });
    //调试工具
    $('#btnOpenDev').on('click',()=>{
        ipc.send('openDev');
    });
    //Test
    $('#msgOne').css({'background':'blue',color:'white'});
});
ipc.on('get-app-path',(e,path)=>{
    $('#msg').html(path);
});
/**
 * 日志填充
 * @param id
 * @param msg String
 */
let addLog = (id,msg)=>{
    let msgStock = document.querySelector('#msgSocket');
    if(MSG_COUNT_CUR>1000){
        msgStock.innerHTML='';
        MSG_COUNT_CUR = 0;
        exportLog();//导出日志
    }
    switch (id){
        case 'msgSocket':
            //$('#'+id).append(msg);
            //$('#'+id).append('<div class="msgRow">'+msg+'</div>');
            $('<div class="msgRow">'+msg+'</div>').appendTo('#msgSocket');
            break;
    }
    document.querySelector('#msgCount').innerText = ++MSG_COUNT;
    document.querySelector('#msgCountCur').innerText = ++MSG_COUNT_CUR;

    if(document.querySelector('#isStopScroll').checked){
        msgStock.scrollTop=msgStock.scrollHeight;
    }
};
let exportLog = ()=>{

};