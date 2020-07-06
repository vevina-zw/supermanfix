<template>
    <div class="index">
        <router-view></router-view>
        <TabBar :data="tabBarData"></TabBar>
    </div>
</template>

<script>
    import TabBar from '../components/TabBar'
    export default {
        name: "index",
        components: {
            TabBar
        },
        data(){
            return{
                tabBarData:[
                    {title: '首页',class: 'home',path: '/home'},
                    {title: '订单',class: 'order',path: '/order'},
                    {title: '我的',class: 'my',path: '/my'},
                ]
            }
        }
    }
</script>

<style scoped>
    .index .content{
        margin-bottom: 0.88rem;
    }
</style>