<template>
    <div class="content feedback">
        <PageHeader headerTitle="意见反馈" :isBorderBottom="false" :isWhite="false"></PageHeader>
        <div class="feedback_box">
            <textarea placeholder="在这里写下您的意见和建议，您的感受对我们来说十分重要！ （限输入100字）" v-model="feedback" @blur.prevent="changeBlur"></textarea>
            <input type="text" placeholder="留下您的联系方式" v-model="phone" @blur.prevent="changeBlur">

            <ButtonBox @buttonClick="buttonClick" buttonName="提交" :disabled="isClick"></ButtonBox>
        </div>

    </div>
</template>

<script>
    import PageHeader from '../../components/PageHeader'
    import ButtonBox from '../../components/ButtonBox'
    import InputGroup from '../../components/InputGroup'
    export default {
        name: "Feedback",
        components: {PageHeader,ButtonBox,InputGroup},
        data(){
            return{
                feedback: "",
                phone: ""
            }
        },
        computed: {
            isClick(){
                if(!this.phone || !this.feedback) return true;
                else return false;
            },
            userInfo(){
                return this.$store.getters.user
            }
        },
        methods: {
            buttonClick(){
                this.$axios.post('/api/feedback/post',{
                    phone: this.userInfo.phone,
                    token: localStorage.userToken,
                    content : this.feedback,
                }).then(res => {
                    console.log(res);
                    if(res.data.code == '1'){
                        this.$toast('意见反馈成功！');
                        this.$router.go(-1);
                    }
                });
            },
            changeBlur(){
                this.$utils.changeBlur();
            }
        },
        created(){
            //防止页面刷新,vuex:store失效
            //在页面加载时读取localStorage里的状态信息
            if (localStorage.getItem("store") ) {
                this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(localStorage.getItem("store"))));
            }
        },
        mounted () {
            document.querySelector('html').style.height='100%';//setAttribute会覆盖原来的样式，font-size会没有
            document.querySelector('body').setAttribute('style', 'height:100%;');
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
    .feedback{
        height: 100%;
        position: relative;
    }
    .feedback_box{
        width: 6.8rem;
        padding: 0 0.35rem;
        position: absolute;
        left:0;
        top: 0.91rem;
        bottom: 0;
        overflow: hidden;
    }
    .feedback_box textarea,.feedback_box input{
        width: 100%;
        box-sizing: border-box;
        padding: 0.1rem 0.28rem;
        margin: 0.25rem 0;
        background: #fff;
        border-radius: 0.067rem;
        font-size: 0.25rem;
    }
    .feedback_box textarea{
        height: 3.65rem;
    }
    .feedback_box input{
        height: 0.82rem;
        line-height: 0.62rem;
    }
    .button_box{
        position: absolute;
        bottom: 1.86rem;
        left:50%;
        transform: translateX(-50%);
    }
</style>