<script setup>
import { ref , onMounted } from "vue";
import useWeb3 from "../hooks/useWeb3";
const { web3, voteContract, getAccount } = useWeb3();

//看板信息
const board = ref([]);
const getBoardInfo = async() => {
  const result = await voteContract.methods.getBoardInfo().call();
  board.value = result;
};

const account = ref('')

const vote = async(index)=> {
  const account = await getAccount();
  const result = await voteContract.methods.vote(index).send({from: account})
  console.log(result);
};

onMounted (()=> { 
  getBoardInfo();
});

</script>

<template>
  <div class="box3">
    <van-divider>投票看板</van-divider>
    <van-cell v-for="(item, index) in board" :key="index" :title="item.name" icon="shop-o">
      <template #right-icon>
        <!-- 传递当前项的索引给 vote 函数 -->
        <van-button @click="vote(index)">{{ item.totalAmount }}</van-button>
      </template>
    </van-cell>
  </div>
</template>

<style lang="scss" >
    
</style>
    