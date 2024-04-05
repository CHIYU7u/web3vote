<script setup>
import { ref } from 'vue';
const active = ref(0);
</script>

<template>
  <div>
    <nav class = 'header'>去中心化投票app</nav>
    <main>
      <router-view></router-view>
    </main>
    <van-tabbar route v-model="active" active-color="#ee742f">
    <van-tabbar-item to="/" icon="gem-o">分發票權</van-tabbar-item>
    <van-tabbar-item to="/account" icon="balance-list-o">帳戶信息</van-tabbar-item>
    <van-tabbar-item to="/board" icon="orders-o">投票看板</van-tabbar-item> 
</van-tabbar> 
    <!-- route + to 掛路由 -->
  </div>
</template>

<style lang="less" >
.header {
  height: 44px;
  background: #ee742f ;
  color: #fff;
  text-align: center;
  line-height: 44px;
}
</style>

<style lang="less" >
html,
body{
  margin:0;
  padding:0;
  overflow: hidden;
}
</style>
  