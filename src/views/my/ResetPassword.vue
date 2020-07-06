<template>
    <div class="content login">
        <PageHeader headerTitle="找回登录密码" :isBorderBottom="false" :isWhite="false" :isGoBack="false"></PageHeader>
        <div class="login_box">
            <h1>超人修</h1>
            <h2>手机快修 超人铸就</h2>

            <!--手机号输入-->
            <InputGroup type="text" placeholder="请输入账号" v-model="user.phone" :error="errors.phone" @focus="errors.phone=''"></InputGroup>
            <!--验证码输入-->
            <InputGroup type="number" placeholder="短信验证码" v-model="user.verifyCode" :btnTitle="btnTitle" :disabled="codeDisabled" :error="errors.code" @focus="errors.code=''"
                        @btnClick="getVerifyCode"></InputGroup>
            <!--密码输入-->
            <InputGroup type="text" placeholder="请输入新密码" v-model="user.password" :error="errors.password"  @focus="errors.password=''"></InputGroup>
            <!--密码输入-->
            <InputGroup type="text" placeholder="再次输入新密码" v-model="user.rePassword" :error="errors.rePassword"  @focus="errors.rePassword=''"></InputGroup>

            <!--<p class="agreement">未注册将创建账号，注册即表明阅读并同意<a>《超人修用户协议》</a></p>-->

            <ButtonBox @buttonClick="resetClick" buttonName="重置密码"></ButtonBox>

        </div>

    </div>
</template>

<script>
    import PageHeader from '../../components/PageHeader'
    import ButtonBox from '../../components/ButtonBox'
    import InputGroup from '../../components/InputGroup'
    export default {
        name: "ResetPassword",
        components: {PageHeader,ButtonBox,InputGroup},
        data(){
            return{
                user: {
                    phone: "",
                    password: "",
                    rePassword: "",
                    verifyCode: ""
                },
                errors: {},//提示
                btnTitle: "获取验证码",
                codeDisabled: false,
            }
        },
        methods: {
            resetClick(){
                let validatePhone_result = this.$utils.validatePhone(this.user.phone);
                if(validatePhone_result != true){
                    this.errors = validatePhone_result;
                    return false;
                }else if(!this.user.verifyCode){
                    this.errors = {
                        code : '验证码不能为空'
                    };
                    return false;
                }else if(!this.user.password){
                    this.errors = {
                        password : '请输入密码'
                    };
                    return false;
                }else if(this.user.rePassword != this.user.password){
                    this.errors = {
                        rePassword : '密码不一致'
                    };
                    return false;
                }

                this.$axios.post("/api/auth/changePwd",{
                    phone: this.user.phone,
                    password: this.user.password,
                    rePassword: this.user.rePassword,
                    validCode: this.user.verifyCode
                }).then(res => {
                    console.log(res);
                    if(res.data.code == '1'){//重置成功
                        this.$router.push('/login')
                    }
                })
            },
            getVerifyCode(){
                let validatePhone_result = this.$utils.validatePhone(this.user.phone);
                if(validatePhone_result != true){
                    this.errors = validatePhone_result;
                    return false;
                }

                //发送网络请求
                this.$axios.post("/api/sms",{
                    phone: this.user.phone,
                    smsType: 4,//类型:1注册,2登录,3下单，4密码重置
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