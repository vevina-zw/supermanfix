<template>
    <button class="button_box" @click.prevent="$emit('buttonClick')">
        {{buttonName}}
    </button>
</template>

<script>
    export default {
        name: "ButtonBox",
        props: {
            buttonName: String
        }
    }
</script>

<style scoped>
.button_box{
    width: 6.16rem;
    height: 0.83rem;
    margin: 0 auto;
    background: url(../assets/images/btn_bg.png) no-repeat;
    background-size: 100% 100%;
    font-size: 0.27rem;
    color: #fff;
    line-height: 0.83rem;
    text-align: center;
    display: block;
}
</style>