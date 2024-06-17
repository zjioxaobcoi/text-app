import './index.scss'
import ajax from'./ajax'
let data ={}



$("ul",$(".main-top")).addEventListener("click", e =>{
    const target = e.target || window.event.srcElement;
    if(target.nodeName ==='LI'){   //排他
        $(".active").classList.remove("active")
        target.classList.add("active")
    }
    if(target.classList.contains("shopTotal")){  //综合
        //初始
      getData()
      .then(res =>{

       render(data)})
    }
    if(target.classList.contains("sales")){  //销量
       getList()
       .then(res =>{
       render(data)})
    }
    if(target.classList.contains("comNew")){  //上新
      newList()
     .then(res =>{
      render(data)})
     
    }
    if(target.classList.contains("sort")){  //排序
        let cdata =data
    console.log($(".sort").nextElementSibling.firstElementChild)
        if($(".sort").nextElementSibling.firstElementChild.classList.contains("bg")){  //升序
        console.log(111)
        $(".bg") && $('.bg').classList.remove("bg")       
        $(".sort").nextElementSibling.lastElementChild.classList.add("bg")
      
            cdata = data.items.toSorted((a, b) => b.price - a.price)
            render(cdata)
            return
        }
        if($(".sort").nextElementSibling.lastElementChild.classList.contains("bg")){   // 降序
      
            $('.bg').classList.remove("bg")
            render(cdata)
        return
    }
        $(".sort").nextElementSibling.firstElementChild.classList.add("bg")
        cdata = data.items.toSorted((a, b) => a.price - b.price)
        render(cdata)
    }
    // if(target.classList.contains('change')){  //变化列表
    //    $(".change").innerHTML =`<img src="https://img.ixintu.com/download/jpg/202008/f8462833318250e666a757f65eaedb23_610_610.jpg!bg" alt="">`
    //     render(data)
    // }else if(target.className ==='change active'){
    //     $(".change").innerHTML =`<img src="https://img.ixintu.com/download/jpg/202007/703c30aa700c7ad78f9fb2b656c88822_610_556.jpg!bg" alt="">`
    // }
    if(target.classList.contains('change')){
        if($('.change img').src === 'https://img.ixintu.com/download/jpg/202007/703c30aa700c7ad78f9fb2b656c88822_610_556.jpg!bg'){
            $('.change img').src = 'https://img.ixintu.com/download/jpg/202008/f8462833318250e666a757f65eaedb23_610_610.jpg!bg'
        }else{
            $('.change img').src = 'https://img.ixintu.com/download/jpg/202007/703c30aa700c7ad78f9fb2b656c88822_610_556.jpg!bg'
        }
        render(data)
    }
})

document.addEventListener('click' ,e =>{    //跳转详情页
    const target = e.target || window.event.srcElement;
    if (target.nodeName === 'DL') {  
        localStorage.setItem('itemInfo', target.getAttribute('data_id'))
        location.assign('./detail.html')
    }
})
//初始
getData()
.then(res =>{
render(data)})

//请求数据
async function getData(){
     data =await ajax({url:'https://zyxcl.xyz/exam_api/zh'})
   
     localStorage.setItem('itemOrigin','https://zyxcl.xyz/exam_api/zh' )
}
async function getList(){
     data =await ajax({url:'https://zyxcl.xyz/exam_api/xl'})
     localStorage.setItem('itemOrigin','https://zyxcl.xyz/exam_api/xl' )
}
async function newList(){
    data =await ajax({url:'https://zyxcl.xyz/exam_api/sx'})
    localStorage.setItem('itemOrigin','https://zyxcl.xyz/exam_api/sx' )
}

//渲染
function render(data){
    let curData;
    if(Array.isArray(data)){
     curData=data
    }else{
        curData =data.items
    }
    // const curData =data.items
   if($(".change").innerHTML ===`<img src="https://img.ixintu.com/download/jpg/202007/703c30aa700c7ad78f9fb2b656c88822_610_556.jpg!bg" alt="">`){
    $('.con').innerHTML = '<div class="scroll">'+curData.map(item =>
        ` <dl data_id =${item.item_id}>
        <dt><img src="${item.img}" alt=""></dt>
        <dd class="dd-h">${item.title}</dd>
        <dd class="dd-m">月销<b class="num">${item.sold}</b>笔</dd>
        <dd class="dd-p">￥<span class="price">${item.price}</span></dd>
      </dl>`
    ).join("")+"<scroll>"
    }else{
       $(".con").innerHTML ='<ul>' + curData.map((item,i) => `
       <li class="item" data-index="${i}">
           <div class="left">
               <img src="${item.img}" alt="">
           </div>
           <div class="right">
               <p class="dd-h">${item.title}</p>
               <p class="dd-m">月销<b class="num">${item.sold}</b>笔</p>
               <p class="dd-p">￥<span class="price">${item.price}</span></p>
           </div>
       
   `).join("")+'</ul>'
    }

}
// 封装获取函数
function $(el, parent) {
    parent = parent || document;
    return parent.querySelector(el);
}

function gets(el, parent) {
    parent = parent || document;
    return [...parent.querySelectorAll(el)];
}