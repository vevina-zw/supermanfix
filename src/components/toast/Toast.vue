<template>
    <!-- 全局提示框 -->
    <div v-show="visible" class="wrap">
        <div>{{message}}</div>
    </div>
</template>
<script>
    export default {
        name: "Toast",
        data() {
            return {
                visible: false,
                message: ""
            };
        }
    };
</script>
<style scoped>
    .wrap{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 10000;
        max-width: 5rem;
        background: rgba(0,0,0,0.6);
        border-radius: 0.2rem;
        font-size: 0.26rem;
        color: #fff;
        text-align: center;
        line-height: 0.4rem;
        padding: 0.2rem 0.5rem;
    }
</style>
