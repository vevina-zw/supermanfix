/*
import LoginComponent from './LoginToast'

const Login = {};

// 注册Login
Login.install = function (Vue) {
    // 生成一个Vue的子类
    // 同时这个子类也就是组件
    const LoginConstructor = Vue.extend(LoginComponent);
    // 生成一个该子类的实例
    const instance = new LoginConstructor();

    // 将这个实例挂载在我创建的div上
    // 并将此div加入全局挂载点内部
    instance.$mount(document.createElement('div'));
    document.body.appendChild(instance.$el);

    // 通过Vue的原型注册一个方法
    // 让所有实例共享这个方法
    Vue.$login = Vue.prototype.$login = () => {
        instance.visible = true;
    }
};

export default Login
*/



import LoginComponent from './LoginToast'

const Login={
    install:function (Vue) {
        //定义全局组件
        Vue.component('Login',LoginComponent);
    }
}

export default Login
