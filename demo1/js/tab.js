var tabFun = (function(){
    // 第一次进入页面不进行自动定位
    var login = false;
    /**
     * 对fetch请求的封装用于获取数据
     * @param {string} url 数据请求地址
     * @returns {object} 返回一个promise对象
     */
    function getData(url){
        return new Promise((resolve,reject) => {
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    resolve(data);
                })
        })
    }
    /** 
     * 拿到数据后渲染导航条及相对应的内容
     * @param {string} url 数据请求地址
     * @param {string} className1 导航条容器的类名
     * @param {string} className2 每一个页的内容的容器的类名
    */
    async function setTabNav(url,className1,className2){
        var result = await getData(url);
        var str = '';
        for(var i = 0;i < result.length;i++){
            str += `<li class="tab-nav-li cursor" id="${i}">${result[i].name}</li>`;
        }
        // 渲染导航条
        $(`.${className1}`).html(str);
        // 初始化第一项为选中状态
        $($('.tab-nav-li')[0]).addClass('active').css('color','#FFFFFF');
        // 初始化渲染第一项的内容
        setTab(result,className2,0);
        // 每一项点击时状态和内容切换
        for(var j = 0;j < $('.tab-nav-li').length;j++){
            (function(k){
                $($('.tab-nav-li')[k]).on('click',function(){
                    if(k === 0){
                        login = true;
                    }
                    for(var n = 0;n < $('.tab-nav-li').length;n++){
                        $($('.tab-nav-li')[n]).removeClass('active').css('color','#555555');
                    }
                    $(this).addClass('active').css('color','#FFFFFF');
                    setTab(result,className2,k);
                })
            })(j);
        }
    }

    function setUl0(introduct){
        var content = '';
        for(var i = 0;i < introduct.length;i++){
            content += `<li><span class="body-tab-sp1 fL">${introduct[i].name}</span><span class="body-tab-sp2 fL">${introduct[i].info}</span></li>`
        }
        tag = `<ul class="mT20">
            ${content}
        </ul>`;

        return tag;
    }

    function setUl1(content){
        var str = '',title = '',tag = '',strTmp = '';
        for(var i = 0;i < content.length;i++){
            title = `<span class="tab-msg-title">${content[i].name}</span><br/>`;
            (function(k){
                for(var j = 0;j < content[k].list.length;j++){
                    strTmp += `<li class="tab-msg-li">
                        <span class="tab-msg-name fL">${content[k].list[j].name}</span>
                        <span class="tab-msg-content fL">${content[k].list[j].content}</span>
                    </li>`;
                }
            })(i)
            str = strTmp;
            strTmp = '';
            tag += '<section class="tab-li-container">' + title + str + '</section>';
        }

        return tag;
    }

    function setUl2(content){
        var title = `<section class="tab-title-sec mT20" id="youhui">优惠政策</section>`;
        var str = '';

        for(var i = 0;i < content.length;i++){
            str += `<li class="setUl2-li mT15">
                <span class="setUl2-span-name mL20">${content[i].name}</span>
                <span class="setUl2-span-content mL20">${content[i].content}</span>
            </li>`;
        }
        return '<section class="setUl2-container">' + title + str + '</section>';
    }

    function setUl3(content){
        var title1 = `<section class="tab-title-sec mT20" id="fuwu">售后信息</section>`;
        var title2 = `<section class="tab-title-sec mT20">物流说明</section>`;
        var str1 = '';

        for(var i = 0;i < content[0].list.length;i++){
            str1 += content[0].list[i].content.join('');
        }
        var str2 = `${content[1].content}`;

        return '<section class="setUl2-container setUl3-container">' + title1 + str1 + '</section>' + '<section class="setUl2-container setUl3-container setUl3-container2">' + title2 + str2 + '</section>';
    }
    
    function setUl4(content){
        var title = `<section class="tab-title-sec mT20" id="baozhuang">包装清单</section>`;
        var str = `<p class="setUl4-p">${content}</p>`;

        return '<section class="setUl2-container">' + title + str + '</section>';
    }

    function setUl5(content){
        var title = `<section class="tab-title-sec mT20" id="baojia">报价</section>`;
        var str = `<section id="echarts-container" style="height: 300px;width: 1200px;"></section>`;

        return '<section class="setUl2-container">' + title + str + '</section>';
    }
    
    function setUl6(content){
        var title = `<section class="tab-title-sec mT20" id="pingjia">评论</section>`;
        var content = `<section class="user-content"></section>`
        var pageStr = `<section class="page"></section>`;
        
        return '<section class="setUl2-container page-container">' + title + content + pageStr + '</section>';
    }


    function setEcharts(id){
        var myEchars = echarts.init(document.getElementById(id));
        var option = {
    
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['7-30', '8-17', '9-02', '9-18', '10-04', '10-20', '11-05'],
                axisLine:{
                    lineStyle:{
                        color:'#999999'
                    }
                } 
            },
            yAxis: {
                type: 'value',
                min: 800,
                max: 1300,
                axisLine:{
                    lineStyle:{
                        color:'#999999'
                    }
                } 
            },
            series: [
                {
                    name: 'Step Start',
                    type: 'line',
                    step: 'start',
                    data: [1250,1250,1080,1100,1020,1020,1020,999],
                    itemStyle: {
                        normal: {
                            color:'#1890FF',
                            label: {
                                color:'red',
                                borderColor: '#FFF',
                            },
                            lineStyle:{
                              color:'#31B3EC'
                            }
                        }
                    }
                }
            ]
        };
        
        if(option && typeof option === "object"){
            myEchars.setOption(option,true);
        }
    }

    async function setTab(result,className,id){
        var tag;
        switch(id){
            case 0:
                var intro1 = setUl0(result[0].msg.introduct1);
                var intro2 = setUl0(result[0].msg.introduct2);
                var intro3 = setUl0(result[0].msg.introduct3);
                var intro4 = setUl0(result[0].msg.introduct4);
        
                tag = intro1 + intro2 + intro3 + intro4 + `<span class="body-content-right-bottom mR5">更多参数><span>`;
                $('.body-tab-img').css('display','block');
                $('.body-tab-content').css('height','190px');
                $('.body-tab-content').css('border','1px solid #EEEEEE');
                $(`.${className}`).html(tag);
                if(login){
                    scrollTop(0);
                }
                break;
            case 1:
                var tag1 = setUl1(result[1].content);
                $('.body-tab-img').css('display','none');
                $('.body-tab-content').css('height','auto');
                $('.body-tab-content').css('border','none');

                var tag2 = setUl2(result[2].content);
                var tag3 = setUl3(result[3].content);
                var tag4 = setUl4(result[4].content);
                var tag5 = setUl5(result[5].content);
                var tag6 = setUl6(result[6].content);

                var tag = tag1 + tag2 + tag4 + tag3 + tag5 + tag6;
                $(`.${className}`).html(tag);
                scrollTop(0);
                initPage(
                    {
                        prev: '<|>',
                        count: 10,
                        selector: '.page',
                        current: 1,
                        page_len: 5,
                        color: '#1E9FFF',
                        callBack: function(page){
                            callBackFun(page,result[6].content);
                        }
                    }
                );
                setEcharts('echarts-container');
                callBackFun(1,result[6].content);
                break;
            case 2:
                var tag1 = setUl1(result[1].content);
                $('.body-tab-img').css('display','none');
                $('.body-tab-content').css('height','auto');
                $('.body-tab-content').css('border','none');

                var tag2 = setUl2(result[2].content);
                var tag3 = setUl3(result[3].content);
                var tag4 = setUl4(result[4].content);
                var tag5 = setUl5(result[5].content);
                var tag6 = setUl6(result[6].content);

                var tag = tag1 + tag2 + tag4 + tag3 + tag5 + tag6;

                $(`.${className}`).html(tag);
                scrollTop(2);
                initPage(
                    {
                        prev: '<|>',
                        count: 10,
                        selector: '.page',
                        current: 1,
                        page_len: 5,
                        color: '#1E9FFF',
                        callBack: function(page){
                            callBackFun(page,result[6].content);
                        }
                    }
                );
                setEcharts('echarts-container');
                callBackFun(1,result[6].content);
                break;
            case 3:
                var tag1 = setUl1(result[1].content);
                $('.body-tab-img').css('display','none');
                $('.body-tab-content').css('height','auto');
                $('.body-tab-content').css('border','none');

                var tag2 = setUl2(result[2].content);
                var tag3 = setUl3(result[3].content);
                var tag4 = setUl4(result[4].content);
                var tag5 = setUl5(result[5].content);
                var tag6 = setUl6(result[6].content);

                var tag = tag1 + tag2 + tag4 + tag3 + tag5 + tag6;

                $(`.${className}`).html(tag);
                scrollTop(3);
                initPage(
                    {
                        prev: '<|>',
                        count: 10,
                        selector: '.page',
                        current: 1,
                        page_len: 5,
                        color: '#1E9FFF',
                        callBack: function(page){
                            callBackFun(page,result[6].content);
                        }
                    }
                );
                setEcharts('echarts-container');
                callBackFun(1,result[6].content);
                break;
            case 4:
                var tag1 = setUl1(result[1].content);
                $('.body-tab-img').css('display','none');
                $('.body-tab-content').css('height','auto');
                $('.body-tab-content').css('border','none');

                var tag2 = setUl2(result[2].content);
                var tag3 = setUl3(result[3].content);
                var tag4 = setUl4(result[4].content);
                var tag5 = setUl5(result[5].content);
                var tag6 = setUl6(result[6].content);

                var tag = tag1 + tag2 + tag4 + tag3 + tag5 + tag6;

                $(`.${className}`).html(tag);
                scrollTop(4);
                initPage(
                    {
                        prev: '<|>',
                        count: 10,
                        selector: '.page',
                        current: 1,
                        page_len: 5,
                        color: '#1E9FFF',
                        callBack: function(page){
                            callBackFun(page,result[6].content);
                        }
                    }
                );
                setEcharts('echarts-container');
                callBackFun(1,result[6].content);
                break;
            case 5:
                var tag1 = setUl1(result[1].content);
                $('.body-tab-img').css('display','none');
                $('.body-tab-content').css('height','auto');
                $('.body-tab-content').css('border','none');

                var tag2 = setUl2(result[2].content);
                var tag3 = setUl3(result[3].content);
                var tag4 = setUl4(result[4].content);
                var tag5 = setUl5(result[5].content);
                var tag6 = setUl6(result[6].content);

                var tag = tag1 + tag2 + tag4 + tag3 + tag5 + tag6;

                $(`.${className}`).html(tag);
                scrollTop(5);
                initPage(
                    {
                        prev: '<|>',
                        count: 10,
                        selector: '.page',
                        current: 1,
                        page_len: 5,
                        color: '#1E9FFF',
                        callBack: function(page){
                            callBackFun(page,result[6].content);
                        }
                    }
                );
                setEcharts('echarts-container');
                callBackFun(1,result[6].content);
                break;
            case 6:
                var tag1 = setUl1(result[1].content);
                $('.body-tab-img').css('display','none');
                $('.body-tab-content').css('height','auto');
                $('.body-tab-content').css('border','none');

                var tag2 = setUl2(result[2].content);
                var tag3 = setUl3(result[3].content);
                var tag4 = setUl4(result[4].content);
                var tag5 = setUl5(result[5].content);
                var tag6 = setUl6(result[6].content);

                var tag = tag1 + tag2 + tag4 + tag3 + tag5 + tag6;

                $(`.${className}`).html(tag);
                initPage(
                    {
                        prev: '<|>',
                        count: 10,
                        selector: '.page',
                        current: 1,
                        page_len: 5,
                        color: '#1E9FFF',
                        callBack: function(page){
                            callBackFun(page,result[6].content);
                        }
                    }
                );
                setEcharts('echarts-container');
                callBackFun(1,result[6].content);
                scrollTop(6);
                break;
        }  
    }

    function callBackFun(page,data){
        var min = (page-1)*10 + 1,str = '';
        if(data.length < min){
            var arr = [];
        }else{
            var arr = data.slice((page-1)*10,(page-1)*10 + 10);
        }

        for(var i = 0;i < arr.length;i++){
            str += `<li class="user-li">
                <section class="fL user-left">
                    <span><img class="user-img mL10" src="${arr[i].head}" width="25" height="25"/></span>
                    <span class="user-pick">${arr[i].pickName}</span>
                </section>
                <section class="fL user-mid">
                    <p>
                        <span class="star-container">
                            <span class="user-star">物流速度</span>
                            <span class="stars ${arr[i].star[0]}">
                                <i class="iconfont icon-starpx fL"></i>
                                <i class="iconfont icon-starpx fL"></i>
                                <i class="iconfont icon-starpx fL"></i>
                                <i class="iconfont icon-starpx fL"></i>
                                <i class="iconfont icon-starpx fL"></i>
                            </span>
                        </span>
                        <span class="star-container">
                            <span class="user-star">商品质量</span>
                            <span class="stars ${arr[i].star[1]}">
                                <i class="iconfont icon-starpx fL"></i>
                                <i class="iconfont icon-starpx fL"></i>
                                <i class="iconfont icon-starpx fL"></i>
                                <i class="iconfont icon-starpx fL"></i>
                                <i class="iconfont icon-starpx fL"></i>
                            </span>
                        </span>
                        <span class="star-container">
                            <span class="user-star">售后服务</span>
                            <span class="stars ${arr[i].star[2]}">
                                <i class="iconfont icon-starpx fL"></i>
                                <i class="iconfont icon-starpx fL"></i>
                                <i class="iconfont icon-starpx fL"></i>
                                <i class="iconfont icon-starpx fL"></i>
                                <i class="iconfont icon-starpx fL"></i>
                            </span>
                        </span>
                        <span >
                            <span class="user-star">督导服务</span>
                            <span class="stars ${arr[i].star[3]}">
                                <i class="iconfont icon-starpx fL"></i>
                                <i class="iconfont icon-starpx fL"></i>
                                <i class="iconfont icon-starpx fL"></i>
                                <i class="iconfont icon-starpx fL"></i>
                                <i class="iconfont icon-starpx fL"></i>
                            </span>
                        </span>
                    </p>
                    <p class="user-text">
                        ${arr[i].text}
                    </p>
                </section>
                <section class="fR user-right">
                    <p class="user-time">${arr[i].time}</p>
                </section>
            </li>`
        }

        $('.user-content').html(str);
    }

    /**
     * 通过scollTop的更改来定位内容
     * @param {id} 该按钮的id
     */
    function scrollTop(id){
        switch(id){
            case 0:
                $("html,body").animate(
                    {scrollTop: $(".body-tab-content").offset().top - 42},{duration: 500,easing: "swing"}
                );
                break;
            case 2:
                $("html,body").animate(
                    {scrollTop: $("#youhui").offset().top - 42},{duration: 500,easing: "swing"}
                );
                break;
            case 3:
                $("html,body").animate(
                    {scrollTop: $("#fuwu").offset().top - 42},{duration: 500,easing: "swing"}
                );
                break;
            case 4:
                $("html,body").animate(
                    {scrollTop: $("#baozhuang").offset().top - 42},{duration: 500,easing: "swing"}
                );
                break;
            case 5:
                $("html,body").animate(
                    {scrollTop: $("#baojia").offset().top - 42},{duration: 500,easing: "swing"}
                );
                break;
            case 6:
                $("html,body").animate(
                    {scrollTop: $("#pingjia").offset().top - 42},{duration: 500,easing: "swing"}
                );
                break;
        }
    }

    function initPage(options){
        var opt = options;
        var str = createTemplate(opt);
        var s = `
            <section class="zui-page">
                ${str}
            </section>
        `;
        $(`${options.selector}`).html(s);
        pagingClick(opt);
    }   

    function createTemplate(options){
        var t_arr = options.prev.split('|');
        var f     = options.page_len,i,b = '',c,str;

        if(f - options.current <= 2 && options.count - options.current >= (f - 3)){
            c = (f - 1 - 2) / 2,i = -c;
            while(i <= c){
                i == 0 ? b += '<a data-page="curr" style="background-color: '+ options.color +';" class="zui-page-curr">' + (options.current) + '</a>' : b += '<a data-page=' + (+options.current + i) + '>' + (+options.current + i) + '</a>';
                i++;
            }
            str = `
                <a data-page="prev">${t_arr[0]}</a>
                <a data-page="1">1</a>
                <a data-page="mid" class="zui-page-spr">…</a>
                ${b}
                <a data-page="mid" class="zui-page-spr">…</a>
                <a data-page="${options.count}">${options.count}</a>
                <a data-page="next">${t_arr[1]}</a>
            `;
        }else if(0 < options.current && options.current <= (f - 3)){
            i = 1;
            while(i <= (f - 2)){
                i == +options.current ? b += '<a data-page="curr" style="background-color: '+ options.color +';" class="zui-page-curr">' + (i) + '</a>' : b += '<a  data-page=' + (i) + '>' + (i) + '</a>';
                i++;
            }
            str = `
                <a data-page="prev" class="zui-page-noallow">${t_arr[0]}</a>
                ${b}
                <a data-page="mid" class="zui-page-spr">…</a>
                <a data-page="${options.count}">${options.count}</a>
                <a  data-page="next">${t_arr[1]}</a>
            `;
        }else if((options.count - (f - 3)) < options.current && options.current <= options.count){
            i = (f - 2) - 1;
            while (i >= 0) {
                options.count - i == options.current ? b += '<a  style="background-color: '+ options.color +';" class="zui-page-curr">' + (options.count - i) + '</a>' : b += '<a  data-page=' + (options.count - i) + '>' + (options.count - i) + '</a>';
                i--;
            }
            str = `
                <a data-page="prev">${t_arr[0]}</a>
                <a data-page="1">1</a>
                <a data-page="mid" class="zui-page-spr">…</a>
                ${b}
                <a data-page="next" class="zui-page-noallow">${t_arr[1]}</a>
            `;
        }

        return str;
    }

    function pagingClick(options){
        $(`${options.selector}`).on('click','a',function(e){
            var page = $(this).attr('data-page');
            if(page != 'curr' && page != 'mid'){
                if(page == 'prev'){
                    if(!$(this).attr('class')){
                        options.current--;
                        options.callBack(options.current);
                        $(`${options.selector}`).find('.zui-page').html(createTemplate(options));
                    }else if($(this).attr('class').indexOf('zui-page-noallow') != -1){
                        return;
                    }
                }else if(page == 'next'){
                    if(!$(this).attr('class')){
                        options.current++;
                        options.callBack(options.current);
                        $(`${options.selector}`).find('.zui-page').html(createTemplate(options));
                    }else if($(this).attr('class').indexOf('zui-page-noallow') != -1){
                        return;
                    }
                }else{
                    options.callBack(page);
                    options.current = page;
                    $(`${options.selector}`).find('.zui-page').html(createTemplate(options));
                }
            }

            scrollTop(6);
        });
    }

    return {
        setTabNav: setTabNav,
        setTab: setTab
    }
}
)();