<template>
    <div class="tabbar">
        <router-link class="tab-item"
                     v-for="(item,index) in data"
                     :key="index"
                     :to="item.path"
                     active-class="is-selected"
        >
            <div class="tab-item-icon">
                <i :class="item.class"></i>
                <div class="tab-item-label">{{item.title}}</div>
            </div>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "TabBar",
        props: {
            data: Array
        }
    }
</script>

<style scoped>
.tabbar{
    width: 7.5rem;
    height: 0.88rem;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: fixed;
    bottom: 0;
    left: 50%;
    margin-left: -3.75rem;
    z-index: 99;
    -moz-box-shadow:0px -5px 10px #F1F1F1;
    -webkit-box-shadow:0px -5px 10px #F1F1F1;
    box-shadow:0px -5px 10px #F1F1F1;
}

.tab-item {
    height: 0.88rem;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}

.tab-item-label {
    color: inherit;
    font-size: 0.22rem;
    line-height: 1;
}
a {
    color: #999;
}
.tab-item-icon {
    height: 0.88rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.tab-item-icon i{
    margin-bottom: 0.05rem;
    width: 0.427rem;
    height: 0.44rem;
}
.tab-item-icon i.home{
    background: url(../assets/images/tabBar_icon1_d.png) no-repeat;
    background-size: 100% 100%;
}
.tab-item-icon i.order{
    background: url(../assets/images/tabBar_icon2_d.png) no-repeat;
    background-size: 100% 100%;
}
.tab-item-icon i.my{
    background: url(../assets/images/tabBar_icon3_d.png) no-repeat;
    background-size: 100% 100%;
}
.is-selected {
    color: #ce5249;
}
.is-selected i.home{
    background: url(../assets/images/tabBar_icon1_l.png) no-repeat;
    background-size: 100% 100%;
}
.is-selected i.order{
    background: url(../assets/images/tabBar_icon2_l.png) no-repeat;
    background-size: 100% 100%;
}
.is-selected i.my{
    background: url(../assets/images/tabBar_icon3_l.png) no-repeat;
    background-size: 100% 100%;
}
</style>