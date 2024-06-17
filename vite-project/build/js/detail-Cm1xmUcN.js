import"./modulepreload-polyfill-B5Qt9EMX.js";import{a as s}from"./axios-B4uVmeYG.js";async function n(){const i=(await s.get(localStorage.getItem("itemOrigin"))).data.items.find(o=>o.item_id.toString()===localStorage.getItem("itemInfo"));console.log(i),t("img").src=i.img,t(".info").innerHTML=`
            <p class="price">￥${i.price}</p>
            <p><span>价格：<i>￥999</i></span></p>
            <p>${i.title}</p>
            <div class="express">
                <p>快递：00.00</p>
                <p>月销量:${i.sold}件</p>
                <p>北京</p>
            </div>`}n();function t(e,i){return i=i||document,i.querySelector(e)}
