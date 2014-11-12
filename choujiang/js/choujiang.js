//tappy.js  https://github.com/filamentgroup/tappy/
!function(a,b){var d,e,f,g;a.tapHandling=!1,d=function(c){return c.each(function(){function i(a){b(a.target).trigger("tap",[a,b(a.target).attr("href")]),a.stopImmediatePropagation()}function j(a){var b=a.originalEvent||a,c=b.touches||b.targetTouches;return c?[c[0].pageX,c[0].pageY]:null}function k(a){if(a.touches&&a.touches.length>1||a.targetTouches&&a.targetTouches.length>1)return!1;var b=j(a);f=b[0],e=b[1]}function l(a){if(!g){var b=j(a);b&&(Math.abs(e-b[1])>h||Math.abs(f-b[0])>h)&&(g=!0)}}function m(b){if(clearTimeout(d),d=setTimeout(function(){a.tapHandling=!1,g=!1},1e3),!(b.which&&b.which>1||b.shiftKey||b.altKey||b.metaKey||b.ctrlKey)){if(b.preventDefault(),g||a.tapHandling&&a.tapHandling!==b.type)return g=!1,void 0;a.tapHandling=b.type,i(b)}}var d,e,f,g,c=b(this),h=10;c.bind("touchstart.tappy MSPointerDown.tappy",k).bind("touchmove.tappy MSPointerMove.tappy",l).bind("touchend.tappy MSPointerUp.tappy",m).bind("click.tappy",m)})},e=function(a){return a.unbind(".tappy")},b.event&&b.event.special?b.event.special.tap={add:function(){d(b(this))},remove:function(){e(b(this))}}:(f=b.fn.bind,g=b.fn.unbind,b.fn.bind=function(a){return/(^| )tap( |$)/.test(a)&&d(this),f.apply(this,arguments)},b.fn.unbind=function(a){return/(^| )tap( |$)/.test(a)&&e(this),g.apply(this,arguments)})}(this,jQuery);



var debugMode=true;
var postUrl='';
var sendFormUrl='';
var data;
var globalTimeout=10000;

var simuData=0;



jQuery.fn.stayBottom = function()
{
    $('body').css({height:'auto'});
    var viewport_height=$(window).height();
    var body_height=$('body').height();
    var footer_height=this.height();
    console.log(viewport_height,body_height,footer_height);
    if((body_height)<viewport_height){ 
        $('body').css({height:viewport_height});
        this.addClass('stay_bottom');
    }else{
        $('body').css({height:'auto'});
        this.removeClass('stay_bottom');
    }
}
$('#footer').stayBottom();






function getJiangpin(){
    var url = postUrl;
    var data = {"openid":43434, "appid":43434};
    $('#loading').fadeIn();
    $.ajax({
        type : "POST",
        url : url,
        data : data,
        dataType:'jsonp',
        jsonp:'callback',
        timeout:globalTimeout,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success : function ss(data) {
            if(data.ret==0){

                guaguaka();

            };

            if(debugMode==true){
                console.dir(data);
            }

            $('#loading').fadeOut();
        },
        error: function(a,b,c){
            if(debugMode==true){
                alert("网速不给力啊，请刷新重试！");
            }
            $('#loading').fadeOut();
        }
    });
}
// getJiangpin();



function guaguaka(){
    if(simuData==1){
        jiangpin='images/jp1.jpg';
    }else if(simuData==2){
        jiangpin='images/jp2.jpg';
    }else if(simuData==3){
        jiangpin='images/jp3.jpg';
    }else{
        jiangpin='images/choujiang_sorry.jpg';
    }

    //gua
    $('#guajiangqu').wScratchPad({
        fg: 'images/choujiang_gua.jpg',
        bg: jiangpin,
        scratchMove: function (e, percent) {
            if (percent > 50) {
                this.clear();
                if(simuData==1){
                    $('h1').html('恭喜您中了一等奖！');
                    $('.gua_txt img').attr({"src":"images/txt_hyll.png"});
                    $('#jiangpinList').hide();
                    $('#submitForm').fadeIn();
                    setTimeout( function(){ $('#footer').stayBottom(); },100);
                }else if(simuData==2){
                    $('h1').html('恭喜您中了二等奖！！');
                    $('.gua_txt img').attr({"src":"images/txt_hyll.png"});
                    $('#jiangpinList').hide();
                    $('#submitForm').fadeIn();
                    setTimeout( function(){ $('#footer').stayBottom(); },100);
                }else if(simuData==3){
                    $('h1').html('恭喜您中了三等奖！！');
                    $('.gua_txt img').attr({"src":"images/txt_hyll.png"});
                    $('#jiangpinList').hide();
                    $('#submitForm').fadeIn();
                    setTimeout( function(){ $('#footer').stayBottom(); },100);
                }else{
                    $('h1').html('很遗憾，未中奖！');
                    $('.gua_txt img').attr({"src":"images/txt_znxchy.png"});
                    $('#jiangpinList').hide();
                    $('#btnsRow2').fadeIn();
                    setTimeout( function(){ $('#footer').stayBottom(); },100);
                }
            }
        }
    });
}
guaguaka();


$('#submitForm input[type=submit]').click(function() {
    if( $('#submitForm input').eq(0).val()!='' && $('#submitForm input').eq(1).val()!='' && $('#submitForm input').eq(2).val()!='' ){
        sendInfo();
        return false;
    }else{
        alert('信息不完整哦！怎么能收到奖品呢？');
        return false;
    }
    
});


function sendInfo(){
    var url = sendFormUrl;
    var data = $("#submitForm").serialize();
    $('#loading').fadeIn();
    $.ajax({
        type : "POST",
        url : url,
        data : data,
        dataType:'jsonp',
        jsonp:'callback',
        timeout:globalTimeout,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success : function ss(data) {
            if(data.ret==0){
                $('#submitForm').hide();
                $('.submit_success').fadeIn();
                $('#btnsRow1').fadeIn();
            };

            if(debugMode==true){
                console.dir(data);
            }
            $('#loading').fadeOut();
        },
        error: function(a,b,c){
            if(debugMode==true){
                alert("网速不给力啊，请刷新重试！");
            }
            $('#loading').fadeOut();
        }
    });
}

$( ".reload-trigger" ).bind( "tap", function( e ){ 
    location.reload();
});




//=======================share pop=================================
$( "#share-trigger" ).bind( "tap", function( e ){ 
    $('#pop_share').fadeIn();
});

$( "#close-pop" ).bind( "tap", function( e ){ 
    $( "#pop_share" ).fadeOut();
});