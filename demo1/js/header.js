var headerFun = (function(){
    /**
     * 对fetch请求的封装用于获取数据
     * @param {string} url 数据请求地址
     * @returns {object} 返回一个promise对象
     */
    function getData(url,callback){
        return $.get(url, function(result){
            callback(result);
        });
        // return new Promise((resolve,reject) => {
        //     fetch(url)
        //         .then(res => res.json())
        //         .then(data => {
        //             resolve(data);
        //         })
        // })
    }
    /**
     * 渲染导航条
     * @param {string} url 数据请求地址
     * @param {string} className 类名
     */
    function setNavList(url,className){
        // var result = await getData(url);
        getData(url,function(res){
        var result = res;
        
        
        var str = '';
        for(var i = 0;i < result.length;i++){
            var tmpStr = '';
            if(result[i].isLeftIcon){
                tmpStr += '<i class="iconfont ' + result[i].icon + ' ' + 'icon-style' + ' ' + 'mR5' + '"></i>'
            } 
            tmpStr += '<span class="cursor">' + result[i].title + '</span>';
            if(result[i].isRightIcon){
                tmpStr += '<i class="iconfont icon-keyboard-arrow-down mL5"></i>'
            }
            
            str += '<li class="header-nav-font">' + tmpStr + '</li>'
        }

        $('.' + className).html(str);

        });
    }

    return {
        setNavList: setNavList
    };
})();