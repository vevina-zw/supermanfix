<template>
    <div class="wrap">
        <!--外框，固定宽度-->
        <div id="box">
            <!--内部滚动框-->

            <!--展示的文字-->
            <ul id="marquee">
                <li v-for="(item,index) in lists" :key="index">
                    {{item}}
                </li>
            </ul>

            <!--文字副本，为了实现无缝滚动-->
            <ul id="copy">
                <li v-for="(item,index) in lists" :key="index">
                    {{item}}
                </li>
            </ul>

        </div>
    </div>
</template>

<script>
    export default {
        name: "MyMarquee",
        props: ['lists'], // 父组件传入数据， 数组形式 [ "连雨不知春去"，"一晴方觉夏深"]
        methods: {
            move () {
                let width = document.getElementById('marquee').getBoundingClientRect().width
                let box = document.getElementById('box')
                let distance = 0 // 位移距离
                //设置位移
                setInterval(function () {
                    distance = distance - 1
                    // 如果位移超过文字宽度，则回到起点
                    if (-distance >= width) {
                        distance = 0
                    }
                    box.style.transform = 'translateX(' + distance + 'px)'
                }, 50)
            }
        },
// 更新的时候运动mounted
        mounted() {
            this.move(this.lists)
        }
    }
</script>

<style scoped>
    .wrap {
        overflow: hidden;
        /*font-size: 0.186rem;*/
        font-size: 0.24rem;
        color: #9b9b9b;
        flex: 1;
    }
    #box {
        width: 80000%;
    }
    #box ul,#box li{
        display: inline-block;
    }
    #box li{
        margin-right:0.2rem;
    }

</style>