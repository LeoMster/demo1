$(function(){
    headerFun.setNavList('data/navData.json','header-nav-right');
    bodyFun.setShopMsg('data/shopData.json','body-msg-right-container');
    tabFun.setTabNav('data/msgData.json','body-tab-nav','body-tab-content');
    footerFun.setFooter('data/footerData.json','footer-part2-left');
    mirror.setMirror('body-msg-left-big','big','small','mask','big-img','small-img');
    mirror.changeImg('small-img','big-img','bo-small-img');
    mirror.leftBtnClick('left-icon','small-img','big-img','bo-small-img');
    bodyFun.getShop('body-btn2');
    $('body').css('width',window.screen.width);

    var nav = $("#body-tab-nav-id");   
    var maxTop = $('.body-tab-nav').offset().top;   

    $(window).on('scroll',function(){
        var top = $(window).scrollTop();
        if(top >= maxTop){
            nav.css({
                'position':'fixed',
                'top':0
            });
            $(".body-tab-content").css('padding-top','42px');
        }
        if(top < maxTop){
            nav.css('position','static');
            $(".body-tab-content").css('padding-top','0');
        }
    });
});