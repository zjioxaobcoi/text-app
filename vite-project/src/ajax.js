// 封装ajax

export default function ajax( { url ,method = 'get' , data = {} }){
    return new Promise((resolve , reject) => {
        // 1 创建对象
        const xhr =  new XMLHttpRequest();
        // 处理get请求的参数信息
        if(method.toUpperCase() === "GET"){
            // {a : 300 , b : 200} => a=300&b=200
            let [originUrl , str = ''] = url.split("?");
            str = str.length > 0 ? str + "&" : str;
            Object.entries(data).forEach(item => {
                const [key , val] = item
                str += `${key}=${val}&`
            })
            str = str.slice(0,str.length - 1)
            url = str.length > 0 ? `${originUrl}?${str}` : originUrl
        }
        // 2 建立链接
        xhr.open(method , url )
        // 4 监听状态
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    const data = JSON.parse(xhr.responseText)
                    resolve(data)
                }else{
                    reject(xhr.status)
                }
            }
        }
        // 3 发送请求
        // 判断请求类型  GET  or  POST
        if(method.toUpperCase() === "POST"){
            xhr.setRequestHeader('Content-Type','application/json;charset=utf-8')
            xhr.send( JSON.stringify(data) )
        }else{
            xhr.send()
        }
    }) 
}