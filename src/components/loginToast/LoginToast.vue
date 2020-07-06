<template>
    <div v-if="visible" class="login_wrap">
        <div class="login_box">
            <em @click="closeClick"><i class="fa fa-times fa-lg"></i></em>
            <p>注册/登录</p>
            <h1>超人修</h1>
            <h2>手机快修 超人铸就</h2>
            <!--手机号输入-->
            <InputGroup type="text" placeholder="请输入手机号" v-model="user.phone" :error="errors.phone" @focus="errors.phone=''"></InputGroup>
            <!--验证码输入-->
            <InputGroup type="number" placeholder="短信验证码" v-model="user.verifyCode" :btnTitle="btnTitle" :disabled="codeDisabled" :error="errors.code"  @focus="errors.code=''"
                        @btnClick="getVerifyCode"></InputGroup>

            <p class="agreement">未注册将创建账号，注册即表明阅读并同意<router-link to="/agreement">《超人修用户协议》</router-link></p>

            <ButtonBox @buttonClick="registOrLoginClick" buttonName="注册/登录"></ButtonBox>
        </div>
    </div>
</template>

<script>
    import InputGroup from '../InputGroup'
    import ButtonBox from '../ButtonBox'
    import Vue from 'vue'
    export default {
        name: "LoginToast",
        components: {InputGroup,ButtonBox},
        data() {
            return {
                visible: false,
                user: {
                    phone: "",
                    verifyCode: ""
                },
                errors: {},//提示
                btnTitle: "获取验证码",
                codeDisabled: false,

                fromPath: '',
                nextPath: '',
            };
        },
        methods: {
            registOrLoginClick(){
                let validatePhone_result = this.$utils.validatePhone(this.user.phone);
                if(validatePhone_result != true){
                    this.errors = validatePhone_result;
                    return false;
                }else if(!this.user.verifyCode){
                    this.errors = {
                        code : '验证码不能为空'
                    };
                    return false;
                }

                this.$axios.post("/api/auth/quickRegistOrlogin",{
                    phone: this.user.phone,
                    validCode: this.user.verifyCode
                }).then(res => {
                    console.log(res);
                    if(res.data.code == '1'){//注册/登录成功
                        //存储token
                        const { token } = res.data.data;
                        localStorage.setItem('userToken',token);
                        this.personInfo();
                        this.visible = false;
                    }
                })
            },
            personInfo(){//查询个人信息，并存储
                this.$axios.post('/api/my/personal',{
                    phone: this.user.phone,
                    token: localStorage.userToken,
                }).then(res => {
                    console.log(res);
                    if(res.data.code == '1'){
                        let userData = Object.assign({
                            //token: localStorage.userToken,
                            phone: this.user.phone,
                        },res.data.data);
                        this.$store.dispatch('setUser',userData);
                        //防止页面强行刷新,vuex:store失效，将store存入localStorage
                        localStorage.setItem("store",JSON.stringify(this.$store.state));

                        this.user.phone = '';
                        this.user.verifyCode = '';

                        /*调用父组件方法，待优化（回调实现？？）↓*/
                        if((this.fromPath=='/selectFault' || this.fromPath=='/orderUpgrade') && this.nextPath=='/perfectInfo'){
                            // 调用SelectFault.vue组件的方法
                            console.log(this.$parent);
                            let children = this.$parent.$children;
                            let aimContent =children.filter(item=>{
                                return item.$el.className == 'content selectFault' || item.$el.className == 'content orderUpgrade';
                            });
                            console.log(aimContent);
                            let aimContentVC = aimContent[0];
                            aimContentVC.goToPerfectInfo();
                        }
                        /*待优化↑*/
                    }
                });
            },
            getVerifyCode(){//获取验证码
                let validatePhone_result = this.$utils.validatePhone(this.user.phone);
                if(validatePhone_result != true){
                    this.errors = validatePhone_result;
                    return false;
                }

                //发送网络请求
                this.$axios.post("/api/sms",{
                    phone: this.user.phone,
                    smsType: 5,//类型:1注册,2登录,3下单，4密码重置，5快速注册登录
                }).then(res=>{
                    console.log(res);
                    if(res.data.code == '1'){//获取验证码成功
                        this.validateBtn();
                        if(this.errors.phone){
                            this.errors = {
                                phone: ''
                            };
                        }
                    }else{
                        this.errors = {
                            code: res.data.msg
                        };
                    }
                })
            },
            validateBtn(){ //验证码倒计时
                let time = 60;
                let timer = setInterval(()=>{
                    if(time == 0){
                        clearInterval(timer);
                        this.btnTitle = "获取验证码";
                        this.codeDisabled = false
                    }else{
                        //倒计时
                        time --;
                        this.btnTitle = time + "秒后重试"
                        this.codeDisabled = true
                    }
                },1000)
            },
            closeClick(){//关闭弹窗
                this.visible = false
            }
        },
        created(){
            //定义全局方法
            Vue.$login =Vue.prototype.$login = (toP,fromP) => {
                this.visible = true;

                this.fromPath = fromP;
                this.nextPath = toP;
            }
        }
    };
</script>

<style scoped>
    .login_wrap{
        width: 7.5rem;
        height: 100%;
        position: fixed;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0,0,0,0.6);
        z-index: 998;
    }
    .login_box{
        position: absolute;
        top: 50%;
        left: 50%;
        bottom: auto;
        transform: translate(-50%,-50%);
        width: 6rem;
        height: auto;
        background-color: #fff;
        border-radius: 0.1rem;

        font-size: 0.26rem;
        padding: 0.4rem 0.4rem;
    }
    .login_box h1{
        margin-top: 0;
        font-size: 0.34rem;
    }
    .login_box h2{
        margin: 0.2rem 0 0.4rem;
    }
    .login_box .agreement{
        font-size: 0.21rem;
    }
    .login_box >p{
        color: #636363;
        text-align: center;
        position: relative;
    }
    .login_box >em{
        -webkit-text-stroke: 0.09rem white;
        color: #c0c0c0;
        font-size: 0.42rem;
        position: absolute;
        right:0.1rem;
        top:0;
    }
    .button_box{
        width: 100%;
    }
</style>
