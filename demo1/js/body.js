var bodyFun = (function(){
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
     * 渲染导航条
     * @param {string} url 数据请求地址
     * @param {string} className 类名
     */
    async function setShopMsg(url,className){
        var result = await getData(url);

        var title,isChuan='',tag,info,price,net,type,color;
        title = `<section class="body-msg-right-title fL">${result[0].name}</section>`;
        if(result[0].isChuan){
            isChuan = '<span class="body-msg-right-isChuan fL mL5">有串号</span>';
        }
        info = `<section class="body-msg-right-info">${result[0].info}</section>`;
        price = `<section class="body-msg-right-price mT10">
            <section class="body-msg-right-price-inner pT20">
                <span class="body-msg-right-price-span mT20">
                    <span>
                        <span class="body-msg-right-price-title">提货价</span><span class="price-color">${result[0].price}</span>
                    </span>
                    <span>
                        <span class="body-msg-right-price-title">市场零售价</span><span class="body-msg-right-price-info mL10">${result[0].originPrice}</span>
                    </span>
                </span>
                
                <span class="body-msg-right-price-span mT20">
                    <span class="body-msg-right-price-title">起批量</span><span class="body-msg-right-price-info mL20">${result[0].beginNum}</span>
                </span>

                <span class="body-msg-right-price-span mT20">
                    <span class="body-msg-right-price-title">&emsp;活动</span><span class="body-msg-right-price-name mL10">${result[0].activity[0].name}</span><span class="body-msg-right-price-info mL10">${result[0].activity[0].content}</span>
                </span>

                <span class="body-msg-right-price-span mT15">
                    <span class="body-msg-right-price-title">&emsp;&emsp;&emsp;</span><span class="body-msg-right-price-name mL10">${result[0].activity[1].name}</span><span class="body-msg-right-price-info mL10">${result[0].activity[1].content}</span>
                </span>
            </section>
        </section>`;
        
        var netStr = setUl(result[0].net,'netUl');
        net = `<section class="net-sec mT20">
            <span class="body-msg-right-price-title mL10 mT10 mR5">终端制式</span>
            <ul class="netUl">${netStr}</ul>
        </section>`;
        
        var diyStr = setUl(result[0].diy,'diyUl');
        diy = `<section class="diy-sec mT20">
            <span class="body-msg-right-price-title mL10 mT10 mR5">定制类型</span>
            <ul class="diyUl">${diyStr}</ul>
        </section>`;
        
        var typeStr = setUl(result[0].type,'diyUl');
        type = `<section class="type-sec mT20">
            <span class="body-msg-right-price-title mL10 mT10 mR5">采购类型</span>
            <ul class="typeUl">${typeStr}</ul>
        </section>`;
        
        var memoryStr = setUl(result[0].memory,'memoryUl');
        memory = `<section class="type-sec mT20">
            <span class="body-msg-right-price-title mL10 mT10 mR5">&emsp;&emsp;内存</span>
            <ul class="memoryUl">${memoryStr}</ul>
        </section>`;
        
        var colorStr = setUl(result[0].color,'memoryUl');
        color = `<section class="color-sec mT20">
            <span class="body-msg-right-price-title mL10 mT10 mR5">&emsp;&emsp;颜色</span>
            <ul class="colorUl">${colorStr}</ul>
        </section>`;
        
        var num = `<section class="color-sec mT20">
            <span class="body-msg-right-price-title mL10 mT10 mR5">选择数量</span>
            <ul class="numUl">
                <li>-</li>
                <li>0</li>
                <li>+</li>
            </ul>
            <span class="num-span mT10 mL10">${result[0].allNum}</span>
        </section>`;

        var care = `<section class="care-sec mT10 mL20">
            <span class="body-msg-right-price-title mL10 mT10 mR5">&emsp;&emsp;&emsp;</span>
            ${result[0].care}
        </section>`
        tag = title + isChuan + info + price + net + diy + type + memory + color + num + care;
        $(`.${className}`).html(tag);
    }
    /**
     * 生成列表
     * @param {array} arr 接口里面的数组数据
     */
    function setUl(arr){
        var str = '';
        for(var i = 0;i < arr.length;i++){
            str += `<li>${arr[i]}</li>`
        }
        return str;
    }

    return {
        setShopMsg: setShopMsg
    };
})();