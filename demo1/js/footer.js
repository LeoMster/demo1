var footerFun = (function(){
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

    function setUl(result){
        var str = '';
        for(var i = 0;i < result.length;i++){
            str += '<li>'
            +  result[i]
            +'</li>';
        }
        var tag = '<ul class="footer-ul">'
        + str
        +'</ul>';

        return tag;
    }

    function setFooter(url,classname){
        // var result = await getData(url);
        getData(url,function(res){
            var result = res;

            var list1 = setUl(result[0].content);
            var list2 = setUl(result[1].content);
            var list3 = setUl(result[2].content);
            var list4 = setUl(result[3].content);

            var str = list1 + list2 + list3 +list4;

            $('.' + classname).html(str);
        
        });
    }

    return {
        setFooter: setFooter
    }
})();