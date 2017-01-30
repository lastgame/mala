/**
 * Created by Administrator on 2017/1/30.
 */
"use strict";
const ipc = require('electron').ipcRenderer;
$(()=>{
    //要先通讯取得对象？
    $('#btnTest').on('click',()=>{
        //alert('it is ok!!!');
        console.log('this is a test...');
        ipc.send('get-app-path');
        ipc.send('getBrowserWindow');
        //win && (win = null);
    });
    //版本信息
    $('#msgVersion').html(JSON.stringify(process.versions));
});
ipc.on('get-app-path',(e,path)=>{
    $('#msg').html(path);
}).on('getBrowserWindow',(e,winObj)=>{

});
