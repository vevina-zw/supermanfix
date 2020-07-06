<template>
    <div :class="['pageHeader',{borderBottom:isBorderBottom},{backgroundColor1:isWhite}]">
        <font v-if="isGoBack" @click="back()"><i class="fa fa-angle-left"></i></font>
        <span>{{headerTitle}}</span>
    </div>
</template>

<script>
    export default {
        name: "PageHeader",
        props: {
            headerTitle: String,//标题名
            isBorderBottom: {//是否有底部border
                type: Boolean,
                default: true
            },
            isWhite: {//背景颜色
                type: Boolean,
                default: true
            },
            isGoBack: {//是否有返回按钮
                type:Boolean,
                default: true
            }
        },
        methods: {
            back(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>
    .pageHeader{
        width: 7.5rem;
        height: 0.91rem;
        box-sizing: border-box;
        padding: 0 0.35rem;
        margin: 0 auto;
        font-size: 0.31rem;
        color: #000;
        line-height: 0.91rem;
        text-align: center;
    }
    .borderBottom{
        border-bottom: 0.0267rem solid #f1f1f1;
    }
    .backgroundColor1{
        background: #fff;
    }
    .backgroundColor2{
        background: transparent;
    }
    .pageHeader font{
        float: left;
    }
</style>