function showLoader() {  
    $.mobile.loading('show', {  
        text: 'loading...', //加载器中显示的文字  
        textVisible: true, //是否显示文字  
        theme: 'a',        //加载器主题样式a-e  
        textonly: false,   //是否只显示文字  
        html: ""           //要显示的html内容，如图片等  
    });
}  
  
function hideLoader() {
    $.mobile.loading('hide');  
}