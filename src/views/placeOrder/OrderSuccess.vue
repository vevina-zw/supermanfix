<template>
    <div class="content orderSuccess">
        <img src="../../assets/images/order_success.jpg">
        <router-link to="/order"><img src="../../assets/images/icon_fork.png"></router-link>
    </div>
</template>

<script>
    export default {
        name: "OrderSuccess",
        mounted () {
            document.querySelector('html').style.height='100%';//setAttribute会覆盖原来的样式，font-size会没有
            document.querySelector('body').setAttribute('style', 'height:100%;background:#f3f3f3');
            document.querySelector('#app').setAttribute('style', 'height:100%;');
        },
        beforeDestroy () {
            document.querySelector('html').style.height='auto';
            document.querySelector('body').removeAttribute('style');
            document.querySelector('#app').removeAttribute('style');
        }
    }
</script>

<style scoped>
    .fullHeight{
        height:100%;
    }
    .orderSuccess{
        height: 100%;
        position: relative;
    }
    .orderSuccess >img{
        width: 100%;
    }
    .orderSuccess > a,.orderSuccess > a img{
        width: 0.306rem;
        height: 0.306rem;
    }
    .orderSuccess > a{
        position: absolute;
        bottom: 0.53rem;
        left: 50%;
        margin-left: -0.153rem;
    }
</style>