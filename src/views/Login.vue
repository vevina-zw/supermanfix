<template>
    <div class="content login">
        <PageHeader headerTitle="登录" :isBorderBottom="false" :isWhite="false" :isGoBack="false"></PageHeader>
        <div class="login_box">
            <h1>超人修</h1>
            <h2>手机快修 超人铸就</h2>

            <!--手机号输入-->
            <InputGroup type="text" placeholder="请输入手机号" v-model="user.phone" :error="errors.phone" @focus="errors.phone=''"></InputGroup>
            <!--密码输入-->
            <InputGroup type="text" placeholder="请输入密码" v-model="user.password" :error="errors.password" @focus="errors.password=''"></InputGroup>


            <p class="agreement">未注册将创建账号，注册即表明阅读并同意<a>《超人修用户协议》</a></p>

            <ButtonBox @buttonClick="loginClick" buttonName="登录"></ButtonBox>

            <div class="linkBtn_box">
                <router-link to="/register">立即注册</router-link>
                <router-link to="/reset">忘记密码</router-link>
            </div>
        </div>

    </div>
</template>

<script>
    import PageHeader from '../components/PageHeader'
    import ButtonBox from '../components/ButtonBox'
    import InputGroup from '../components/InputGroup'
    export default {
        name: "Login",
        components: {PageHeader,ButtonBox,InputGroup},
        data(){
            return{
                user: {
                    phone: "",
                    password: "",
                },
                errors: {},
                disabled: false
            }
        },
        methods: {
            buttonClick(){
                this.$router.push('/home')
            },
            loginClick(){
                let validatePhone_result = this.$utils.validatePhone(this.user.phone);
                if(validatePhone_result != true){
                    this.errors = validatePhone_result;
                    return false;
                }else if(!this.user.password){
                    this.errors = {
                        password : '请输入密码'
                    };
                    return false;
                }

                sessionStorage.clear();
                localStorage.clear();
                //实现登录
                this.$axios.post('/api/auth/login',this.user)
                    .then(res => {
                        if(res.data.code == '1'){
                            //登录成功
                            console.log(res)
                            //存储token
                            const { token } = res.data.data;
                            localStorage.setItem('userToken',token);
/*                            //用token获取到用户信息存储到vuex中
                            let userData = {
                                token: token,
                                phone: this.user.phone,

                                //...其他：头像等
                            };
                            this.$store.dispatch('setUser',userData);
                            //防止页面强行刷新,vuex:store失效，将store存入localStorage
                            localStorage.setItem("store",JSON.stringify(this.$store.state));*/

                            this.personInfo();
                            //页面跳转
                            this.$router.push('/my');
                        }
                    });
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
                    }
                });
            },
/*            validatePhone(){
                //验证手机号码
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