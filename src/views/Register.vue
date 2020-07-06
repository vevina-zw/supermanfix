<template>
    <div class="content login">
        <PageHeader headerTitle="注册" :isBorderBottom="false" :isWhite="false" :isGoBack="false"></PageHeader>
        <div class="login_box">
            <h1>超人修</h1>
            <h2>手机快修 超人铸就</h2>

            <!--手机号输入-->
            <InputGroup type="text" placeholder="请输入手机号" v-model="user.phone" :error="errors.phone" @focus="errors.phone=''"></InputGroup>
            <!--密码输入-->
            <InputGroup type="text" placeholder="请输入密码" v-model="user.password" :error="errors.password" @focus="errors.password=''"></InputGroup>
            <!--验证码输入-->
            <InputGroup type="number" placeholder="短信验证码" v-model="user.verifyCode" :btnTitle="btnTitle" :disabled="codeDisabled" :error="errors.code"  @focus="errors.code=''"
                        @btnClick="getVerifyCode"></InputGroup>


            <p class="agreement">未注册将创建账号，注册即表明阅读并同意<a>《超人修用户协议》</a></p>

            <ButtonBox @buttonClick="registerClick" buttonName="注册"></ButtonBox>

            <div class="linkBtn_box">
                <router-link to="/login">立即登录</router-link>
                <!--<a>忘记密码</a>-->
            </div>
        </div>

    </div>
</template>

<script>
    import PageHeader from '../components/PageHeader'
    import ButtonBox from '../components/ButtonBox'
    import InputGroup from '../components/InputGroup'
    export default {
        name: "Register",
        components: {PageHeader,ButtonBox,InputGroup},
        data(){
            return{
                user: {
                    phone: "",
                    password: "",
                    verifyCode: ""
                },
                errors: {},//提示
                btnTitle: "获取验证码",
                codeDisabled: false,
            }
        },
        methods: {
            registerClick(){
                let validatePhone_result = this.$utils.validatePhone(this.user.phone);
                if(validatePhone_result != true){
                    this.errors = validatePhone_result;
                    return false;
                }else if(!this.user.password){
                    this.errors = {
                        password : '请输入密码'
                    };
                    return false;
                }else if(!this.user.verifyCode){
                    this.errors = {
                        code : '验证码不能为空'
                    };
                    return false;
                }

                this.$axios.post("/api/auth/regist",{
                    phone: this.user.phone,
                    password: this.user.password,
                    validCode: this.user.verifyCode
                }).then(res => {
                    console.log(res);
                    if(res.data.code == '1'){//注册成功
                        this.$router.push('/login')
                    }
                })
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
                    smsType: 1,//类型:1注册,2登录,3下单，4密码重置
                }).then(res=>{
                    console.log(res);
                    if(res.data.code == '1'){//获取验证码成功
                        this.validateBtn();
                        this.errors = {
                            phone: ''
                        };
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
/*            validatePhone(){//验证手机号码
                if(!this.user.phone){
                    this.errors = {
                        phone: "手机号码不能为空"
                    };
                    return false
                }else if(!(/^1[34578]\d{9}$/.test(this.user.phone))){
                    this.errors = {
                        phone: "请输入正确的手机号"
                    };
                    return false
                }else{
                    this.errors = {};
                    return true
                }
            }*/
        },
        mounted () {
            document.querySelector('html').style.height='100%';//setAttribute会覆盖原来的样式，font-size会没有
            document.querySelector('body').setAttribute('style', 'height:100%;background:#f5f5f5');
            document.querySelector('#app').setAttribute('style', 'height:100%;');
        },
        beforeDestroy () {
            document.querySelector('html').style.height='auto';
            document.querySelector('body').removeAttribute('style');
            document.querySelector('#app').removeAttribute('style');
        },
    }
</script>

<style scoped>
    .pageHeader{
        color: #424242;
        font-size: 0.28rem;
    }
</style>