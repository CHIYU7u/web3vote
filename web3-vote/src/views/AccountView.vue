<script setup>
import { ref , onMounted } from "vue";
import useWeb3 from "../hooks/useWeb3";
const { web3, voteContract, getAccount } = useWeb3();

const account = ref('')
//選民訊息
const  voterInfo = ref({});

const getVoteInfo = async () => {
  account.value = await getAccount()
  voterInfo.value = await voteContract.methods.voters(account.value).call();
}

onMounted( async ()=>{
  await getVoteInfo();
  console.log(voterInfo.value);
})
</script>

<template>
  <div class="box2">
  <van-divider>帳戶信息</van-divider>
  <br/>
  <van-space>
    <p class="label">當前帳戶</p>
    <p class="address">
      {{account}}
    </p>
  </van-space>
  <br/>
  <van-space>
    <p class="label">帳戶票数</p>
    <p class="address">
      {{voterInfo.amount }}
    </p>
  </van-space>
  <br/>
  <van-space>
    <p class="label">是否已投票</p>
    <p class="address">
     {{ voterInfo.isVoted}}
    </p>
  </van-space>
  <br />
  <van-space>
    <p class="label">投票ID</p>
    <p class="address">
      {{voterInfo.targetId}}
    </p>
  </van-space>
</div>

</template>

<style lang="scss" >
    .address {
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal;
}

.label {
  white-space: nowrap;
}
</style>
    