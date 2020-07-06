<template>
    <div class="content orderOneCheck">
        <PageTheme imgTitle="order_oneClick" title="一键下单">
            <div class="order_oneClick">
                <form>
                    <div>
                        <label>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;字：</label>
                        <input type="text" v-model="contact" @focus="error=''" @blur.prevent="changeBlur">
                    </div>
                    <div>
                        <label>联系电话：</label>
                        <input type="number" v-model="contactPhone" @focus="error=''" @blur.prevent="changeBlur">
                    </div>
                    <div>
                        <label>验&nbsp;&nbsp;证&nbsp;&nbsp;码：</label>
                        <input type="number" v-model="verifyCode" @focus="error=''" @blur.prevent="changeBlur">
                        <button @click.prevent="getVerifyCode" :disabled="codeDisabled">{{btnTitle}}</button>
                    </div>
                    <p class="errorMsg">{{errors.phone || errors.contact || errors.code}}</p>
                    <p class="agreement" v-if="!userInfo.phone">未注册将创建账号，注册即表明阅读并同意<router-link to="/agreement">《超人修用户协议》</router-link></p>
                    <ButtonBox @buttonClick="buttonClick" buttonName="一键下单"></ButtonBox>
                </form>
            </div>
        </PageTheme>
    </div>
</template>

<script>
    import ButtonBox from '../../components/ButtonBox'
    import PageTheme from  '../../components/PageTheme'
    export default {
        name: "OrderOneCheck",
        components: {
            ButtonBox,
            PageTheme
        },
        data(){
            return{
                contact: '', //名字
                contactPhone: '', //联系电话
                verifyCode: '', //验证码
                errors:'',//提示
                btnTitle: "获取验证码",
                codeDisabled: false,

                token_l:'',//未登录状态，一键下单后（下单即登录），存放接口返回的token和phone
                phone_l:'',
            }
        },
        computed: {
            userInfo(){
                return this.$store.getters.user
            }
        },
        methods: {
            buttonClick(){
                let validatePhone_result = this.$utils.validatePhone(this.contactPhone);
                if(!this.contact){
                    this.errors = {
                        contact : '请输入联系人姓名'
                    };
                    return false;
                }else if(validatePhone_result != true){
                    this.errors = validatePhone_result;
                    return false;
                }else if(!this.verifyCode){
                    this.errors = {
                        code : '验证码不能为空'
                    };
                    return false;
                }

                this.$axios.post('/api/order/quick',{
                    phone: this.userInfo.phone ? this.userInfo.phone : '',//未登录时，phone和token空，一键下单即登录。会返回token
                    token: localStorage.userToken ? localStorage.userToken : '',
                    contact : this.contact,
                    contactPhone : this.contactPhone,
                    verifyCode : this.verifyCode,
                    orderFrom: 1,// 订单来源:0 未知;1 H5;2 小程序;3 后台
                }).then(res => {
                    console.log(res);
                    if(res.data.code == '1'){
                        if(res.data.data && res.data.data.token && res.data.data.phone){//未登录→（一键下单）→登录
                            this.token_l = res.data.data.token;
                            this.phone_l = res.data.data.phone;

                            //存储token
                            const token = res.data.data.token;
                            localStorage.setItem('userToken',token);
                            this.personInfo();
                        }

                        this.$router.push('/orderSuccess');
                    }else{
                        this.errors = {
                            code: res.data.msg
                        };
                    }
                });
            },
            personInfo(){//查询个人信息，并存储
                this.$axios.post('/api/my/personal',{
                    phone: this.phone_l,
                    token: this.token_l,
                }).then(res => {
                    console.log(res);
                    if(res.data.code == '1'){
                        let userData = Object.assign({
                            //token: localStorage.userToken,
                            phone: this.phone_l,
                        },res.data.data);
                        this.$store.dispatch('setUser',userData);
                        //防止页面强行刷新,vuex:store失效，将store存入localStorage
                        localStorage.setItem("store",JSON.stringify(this.$store.state));

                        this.emptyData();
                    }
                });
            },
            getVerifyCode(){//获取验证码
                let validatePhone_result = this.$utils.validatePhone(this.contactPhone);
                if(validatePhone_result != true){
                    this.errors = validatePhone_result;
                    return false;
                }

                //发送网络请求
                this.$axios.post("/api/sms",{
                    phone: this.contactPhone,
                    smsType: 3,//类型:1注册,2登录,3下单
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
                        this.btnTitle = time + "秒后重试";
                        this.codeDisabled = true
                    }
                },1000)
            },
            changeBlur(){
                this.$utils.changeBlur();
            },
            emptyData(){//提交成功后数据置空
                this.phone_l = '';
                this.token_l = '';
                this.contact = '';
                this.contactPhone = '';
                this.verifyCode = '';
            }
        },
        created(){
            //防止页面刷新,vuex:store失效
            //在页面加载时读取localStorage里的状态信息
            if (localStorage.getItem("store") ) {
                this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(localStorage.getItem("store"))));
            }
        }
    }
</script>

<style scoped>
    .orderOneCheck{
        background: #f3f3f3;
    }
    .index_theme{
        width: 7.5rem;
        height: auto;
        background: #f3f3f3 url(../../assets/images/index_bg.png) no-repeat top center;
        background-size: 7.5rem 4.42rem;
        margin-bottom: 0.09rem;
    }
    .order_oneClick{
        width: 7.04rem;
        height: 10.45rem;
        background: url(../../assets/images/order_oneClick_bg.png) no-repeat;
        background-size: 100% 100%;
        margin: 0.65rem auto 0 auto;
        position: relative;
    }
    .order_oneClick form{
        width: 6.16rem;
        position: absolute;
        bottom: 0;
        left: 50%;
        margin-left: -3.08rem;
    }
    .order_oneClick form >div{
        width: 100%;
        height: 0.98rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 0.02rem solid #ececec;
    }
    .order_oneClick form >div label{
        font-size: 0.26rem;
        color: #474747;
        font-weight: 500;
        height: 0.45rem;
        line-height: 0.45rem;
    }
    .order_oneClick form >div input{
        flex: 1;
        font-size: 0.26rem;
        color: #474747;
        font-weight: 500;
        height: 0.45rem;
        line-height: 0.45rem;
    }
    .order_oneClick form >div button{
        width: 1.6rem;
        height: 0.55rem;
        /*padding: 0 0.15rem;*/
        font-size: 0.23rem;
        color: #ec5c54;
        background: #f2f2f2;
        border-radius: 0.08rem;
    }
    .errorMsg{
        height: 0.52rem;
        line-height: 0.52rem;
        font-size: 0.2rem;
        color: red;
    }
    .button_box{
        margin: 0 0 0.52rem 0;
    }
</style>