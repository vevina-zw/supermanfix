<template>
    <div class="index_theme">
        <p class="title">
            <font v-if="isGoBack" @click="back()"><i class="fa fa-angle-left"></i></font>
            <!--<img :src="imgPath">-->
            <span>{{title}}</span>
        </p>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "PageTheme",
        props: {
            imgTitle: String,
            title: String,
            isGoBack: {//是否有返回按钮
                type:Boolean,
                default: true
            }
        },
        computed: {
            /*imgPath: function(){
                return require(`../assets/images/theme_${this.imgTitle}_title.png`)
            }*/
        },
        methods: {
            back(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>
    .index_theme{
        width: 7.5rem;
        height: auto;
        background:url(../assets/images/index_bg.png) no-repeat top center;
        background-size: 7.5rem 4.42rem;
        margin-bottom: 0.09rem;
    }
    .index_theme .title{
        text-align: center;
        padding-top:0.5rem;
        position: relative;
    }
    .index_theme .title img{
        height:0.26rem;
    }
    .index_theme .title span{
        font-size: 0.28rem;
        font-weight: 500;
        color: #fff;
        line-height: 0.26rem;
    }
    .index_theme .title font{
        position: absolute;
        left: 0.3rem;
        top: 0.4rem;
        font-size: 0.31rem;
        color: #fff;
    }
</style>