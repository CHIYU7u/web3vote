<script setup >
import useWeb3 from "../hooks/useWeb3";
import { ref , onMounted } from 'vue';
import { useMetaMask } from '../hooks/useMetamask';

/*
const { hasMetaMask, isMetaMaskConnected } = useMetaMask();
console.log("MetaMask Installed:", hasMetaMask.value);
console.log("MetaMask Connected:", isMetaMaskConnected.value);
*/

const { web3, voteContract, getAccount } = useWeb3();

//定義主持人信息
const host = ref("")
//獲取主持人信息
const getHost = async () => {
  host.value = await voteContract.methods.host().call(); //智能合約裡 簡單值的地址可以直接調用
}; 

//選民地址
const voterAddress = ref("");

//分發票權
const mandate = async () => {
  const arr = eval(voterAddress.value); //字符串 eval转换
  const account = await getAccount(); // 现在这里是正确的
  console.log(account)
  voteContract.methods.mandate(arr).send({from: account})
  .on('transactionHash', hash => {
    console.log('交易哈希:', hash);
  })
  .on('confirmation', (confirmationNumber, receipt) => {
    console.log('交易确认:', confirmationNumber);
    if (confirmationNumber >= 10) {
    transaction.off('confirmation');
  }
  })
  .on('receipt', receipt => {
    console.log('选票分发成功', receipt);
  })
  .on('error', error => {
    console.error('交易失败:', error);
  });

};

/*
0xeF73fbE503932bA32009Bf26F600F1125aEE2305 錢包1地址
0x6dEFC59E0e281Aa6b816be08Cd9164F4e9B4c20B
0xD9cdCAab7877AAcf5941E7063E5ABf3A955aB735
0xa9C8d5f7e649ace75Ea7713dA411fd2753D02D89
["0x6dEFC59E0e281Aa6b816be08Cd9164F4e9B4c20B","0xD9cdCAab7877AAcf5941E7063E5ABf3A955aB735","0xa9C8d5f7e649ace75Ea7713dA411fd2753D02D89"]
*/

onMounted(async() => {
  await getHost();
});
</script>

<template>
  <div class="box1">
    <van-divider>分發票權</van-divider>
    <div class="host">
      <van-space>
        <p class="label"><van-icon name="manager" /> 主持人地址</p>
        <p class="address">{{ host }}</p>
      </van-space>
    </div>
    <div class="voters-container">
      <van-space>
        <p class="label"><van-icon name="friends-o" /> 投票人地址</p>
        <textarea class="voters" v-model="voterAddress"></textarea>
      </van-space>
    </div>
    <div class="btn">
      <van-button block @click="mandate" >開始分發選票</van-button>
    </div>
  </div>
</template>



<style scoped>
.voters {
  width: 100%; /* 或者您可以使用具体的像素值，例如 width: 300px; */
  height: 300px; /* 根据需要调整高度 */
  /* 可以添加更多的样式，比如边框、内边距、字体大小等 */
  border: 1px solid #ddd; /* 示例边框样式 */
  padding: 10px; /* 内边距 */
  font-size: 16px; /* 字体大小 */
}

.voters-container {
  margin-bottom: 20px; /* 根据您的设计需求调整这个值 */
}

.box1 {
  margin: 20px; /* 根据您的设计需求调整这个值 */
}
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
    