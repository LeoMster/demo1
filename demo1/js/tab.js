var tabFun = (function(){
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

    async function setTabNav(url,classname){
        var result = await getData(url);
        
        var str = '';
        for(var i = 0;i < result.length;i++){
            str += `<li>${result[i].name}</li>`;
        }

        $(`.${classname}`).html(str);
    }

    function setUl(introduct){
        var content = '';
        for(var i = 0;i < introduct.length;i++){
            content += `<li><span class="body-tab-sp1 fL">${introduct[i].name}</span><span class="body-tab-sp2 fL">${introduct[i].info}</span></li>`
        }
        tag = `<ul class="mT20">
            ${content}
        </ul>`;

        return tag;
    }

    async function setTab(url,classname){
        var result = await getData(url);

        var intro1 = setUl(result[0].msg.introduct1);
        var intro2 = setUl(result[0].msg.introduct2);
        var intro3 = setUl(result[0].msg.introduct3);
        var intro4 = setUl(result[0].msg.introduct4);

        var tag = intro1 + intro2 + intro3 + intro4 + `<span class="body-content-right-bottom mR5">更多参数><span>`;
        $(`.${classname}`).html(tag);
    }

    return {
        setTabNav: setTabNav,
        setTab: setTab
    }
}
)();