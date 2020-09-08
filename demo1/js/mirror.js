var mirror = (function(){
    var index = 1;

    function setMirror(container,big,small,mask,bigImg,smallImg){
        var container   = $(`.${container}`),
            big         = $(`.${big}`),
            small       = $(`.${small}`),
            mask        = $(`.${mask}`),
            bigImg      = $(`.${bigImg}`),
            smallImg    = $(`.${smallImg}`);

        // 移动距离
        var maxW = smallImg.innerWidth() - mask.outerWidth(),
            maxH = smallImg.innerHeight() - mask.outerHeight();
        
        // 鼠标移入移动移出效果
        small.on('mouseenter',function(){
            mask.css('left','0');
            big.css('left','450px');
        }).on('mouseleave',function(){
            mask.css('left','-10000px')
            big.css('left','-10000px');
        }).on('mousemove',function(e){
            e = e || window.event;
            var eLeft   = e.pageX - container.offset().left - container[0].clientLeft - mask.outerWidth() / 2,
                eTop    = e.pageY - container.offset().top - container[0].clientTop - mask.outerHeight() / 2;

            eLeft = Math.min(maxW,Math.max(0,eLeft)),
            eTop = Math.min(maxH,Math.max(0,eTop));
            
            // 遮罩位置
            mask.css('left',eLeft + 'px');
            mask.css('top',eTop + 'px');

            var bLeft = -(bigImg.outerWidth() - big.innerWidth())*(eLeft / (smallImg.innerWidth() - mask.outerWidth())) + 'px',
                bTop = -(bigImg.outerHeight() - big.innerHeight())*(eTop / (smallImg.innerHeight() - mask.outerHeight())) + 'px';
            // 大图移动
            bigImg.css('left',bLeft);
            bigImg.css('top',bTop);
        })
    }

    function changeImg(bigClassName,biggerClassName,smallClassName){
        $($(`.${smallClassName}`)[1]).css('border','1px solid #31B3EC');
        for(var i = 0;i < $(`.${smallClassName}`).length;i++){
            (function(n){
                var smallImg = $($(`.${smallClassName}`)[n]);

                smallImg.on('click',function(){
                    index = n;
                    for(var j = 0;j < $(`.${smallClassName}`).length;j++){
                        $($(`.${smallClassName}`)[j]).css('border','1px solid white');
                    }
                    $(this).css('border','1px solid #31B3EC');
                    $(`.${bigClassName}`).attr('src',`${$(this).attr('src')}`);
                    $(`.${biggerClassName}`).attr('src',`${$(this).attr('src')}`);
                })
            })(i);
        }
    }

    function leftBtnClick(iconClassName,bigClassName,biggerClassName,smallClassName){
        $(`.${iconClassName}`).on('click',function(){
            if(index === 0){
                index = 4;
            }else{
                index--;
            }

            for(var j = 0;j < $(`.${smallClassName}`).length;j++){
                $($(`.${smallClassName}`)[j]).css('border','1px solid white');
            }
            $($(`.${smallClassName}`)[index]).css('border','1px solid #31B3EC');
            $(`.${bigClassName}`).attr('src',`${$($(`.${smallClassName}`)[index]).attr('src')}`);
            $(`.${biggerClassName}`).attr('src',`${$($(`.${smallClassName}`)[index]).attr('src')}`);
        })
    }

    return {
        setMirror: setMirror,
        changeImg: changeImg,
        leftBtnClick: leftBtnClick
    }
})();