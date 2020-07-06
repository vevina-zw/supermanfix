<template>
    <div :class="['right_my',{right_all:isAll}]">
        <div class="right_head" :class="{active: isActive}">
            {{listTitle}}
            <router-link v-if="listLink" :to="listLink.linkPath">{{listLink.title}}
                <!--<img class="arrow_right" src="../../assets/images/icon_arrow_right.png">-->
                <span class="arrow">
                    <i class="fa fa-angle-right"></i>
                </span>
            </router-link>
        </div>
        <ul class="right_body">
            <li v-for="(item,index) in listData" :key="index">
                <div class="right_img_box">
                    <img :src="item.listImg">
                </div>
                <h1>{{item.listH1}}</h1>
                <h2>{{item.listH2}}</h2>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "RightList",
        props: {
            listTitle: String,
            listLink: Object,
            listData: Array,
            isAll: {//是否是全部特权
                type: Boolean,
                default: true
            },
            isActive: {//是否高亮
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style scoped>
    .right_my{
        width:7.5rem;
        margin-top: 0.2rem;
        background: #fff;
    }
    .right_head{
        width:6.8rem;
        padding:0 0.35rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.25rem;
        color: #4b4b4b;
        font-weight: 500;
        height: 0.8rem;
        border-bottom: 1px solid #f6f6f6;
    }
    .right_head a{
        color: #4b4b4b;
    }
    .right_body{
        width: 7.5rem;
        display: flex;
        flex-wrap: wrap;
    }
    .right_body li{
        width:2.5rem;
        height: 2.23rem;
        box-sizing: border-box;
        border-right:1px solid #f6f6f6;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #f6f6f6;
    }
    .right_img_box{
        height:1rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .right_img_box img{
        max-width: 0.5rem;
        max-height: 0.5rem;
    }
    .right_body h1{
        font-size: 0.25rem;
        color: #4b4b4b;
        line-height: 0.43rem;
        font-weight: 500;
    }
    .right_body h2{
        font-size: 0.22rem;
        color: #a2a2a2;
        line-height: 0.27rem;
        font-weight: 500;
        height: 0.27rem;
    }

    .right_all{
        margin-top:0.33rem;
    }
    .right_all:first-child{
        margin-top:0;
    }
    .right_all .right_head.active{
        color: #d8645a;
    }
</style>