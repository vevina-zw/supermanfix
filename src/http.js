//封装axios

import Vue from 'vue'
import axios from 'axios'
import router from './router'

//设置请求baseURL——开发时注释，测试/线上环境打包时放开
// axios.defaults.baseURL = 'https://www.supermanfix.com/smf';//正式
axios.defaults.baseURL = 'http://47.100.111.188:83/smf';//测试

//设置axios请求发送的是form-data格式数据
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = [function (data) {
    if(data && (data.constructor == FormData || data instanceof FormData)){ //如果数据是form-data格式，则不处理（文件上传接口）
        return data
    }else{//否则，将数据转化为form-data格式
        let ret = ''
        for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
    }
}];

//请求拦截
axios.interceptors.request.use(config => {
    if(localStorage.userToken){
        config.headers.Authorization = localStorage.userToken;
    }
    return config;
},error => {
    return Promise.reject(error);
});

//响应拦截
axios.interceptors.response.use(response => {
    /**
     * 1    成功
     *
     * -100 未登录; -101 无权限; -102 此手机号已注册;-103 短信发送次数超过限制,-104 验证码失效;-105 验证码错误;-106 token无效; -107 密码错误;-110 此手机号码未注册
     *
     * -200
     *
     * -300  参数错误
     *
     * -400 业务错误
     *
     * -500 系统异常
     */
        if(response.data.code=='-100' || response.data.code=='-106'){
            console.log('未登录');
            //清除token
            localStorage.removeItem('userToken');
            // router.push('/login');
            Vue.$login();
        }else if(response.data.code == '-400' && response.data.msg=='优惠券已使用'){
            Vue.$toast('请重新选择优惠方式');
        }else if(response.data.code !='1'){
            Vue.$toast(response.data.msg);
        }
        return response
    },error => {
    //错误统一处理，后面用axios请求就不用逐个catch错误了
        Vue.$toast(error);
        return Promise.reject(error);
    }
);

export default axios