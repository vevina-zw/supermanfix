//封装公共方法，全局使用

/*
  验证手机号码
*/
function validatePhone(phone){
    let errors = {};
    if(!phone){
        errors = {
            phone: "手机号码不能为空"
        };
        return errors;
    }else if(!(/^1[3456789]\d{9}$/.test(phone))){
        errors = {
            phone: "请输入正确的手机号"
        };
        return errors;
    }else{
        return true
    }
}

/*
 arr→string,用逗号隔开。
 [a,b,5]→a,b,5
 */
function getStringByArr(arr) {
        var str = "";
        for (var i = 0; i < arr.length; i++) {
                str += arr[i]+ ",";
             }
        //去掉最后一个逗号(如果不需要去掉，就不用写)
        if (str.length > 0) {
                str = str.substr(0, str.length - 1);
            }
        return str;
 }

/*
  精度-加减法
*/
function accAdd(arg1,arg2){//精度--加法
    var r1,r2,m;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2));
    return (arg1*m+arg2*m)/m
}
function Subtr(arg1,arg2){//精度--减法
    var r1,r2,m,n;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2));
    n=(r1>=r2)?r1:r2;
    return ((arg1*m-arg2*m)/m).toFixed(n);
}

/*
  input失去焦点后键盘回弹
*/
function changeBlur(){
    // let u = navigator.userAgent, app = navigator.appVersion;
    // let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    // if(isIOS){
        setTimeout(() => {
            const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
            window.scrollTo(0, Math.max(scrollHeight - 1, 0))
        }, 200)
    // }
}

export default {
    validatePhone,getStringByArr,accAdd,Subtr,changeBlur
}