/**
 * Created by Administrator on 2017/1/30.
 */
"use strict";
const ipc = require('electron').ipcRenderer;
const dialog = require('electron').remote;
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
    var socket = io('http://localhost:3000');
    socket.on('msg', function (data) {
        console.error(data);
    });
    $('#btnSendMsg').on('click',()=>{
        socket.emit('msg', { my: 'data' });
        console.log('发送成功！')
    });
});
ipc.on('get-app-path',(e,path)=>{
    $('#msg').html(path);
});
