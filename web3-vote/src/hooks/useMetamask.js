// useMetaMask.js
import { ref, onMounted } from 'vue';

export function useMetaMask() {
  const hasMetaMask = ref(false);
  const isMetaMaskConnected = ref(false);

  async function checkMetaMask() {
    if (window.ethereum) {
      hasMetaMask.value = true;
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' }); // 请求用户授权
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        isMetaMaskConnected.value = accounts.length > 0;
      } catch (error) {
        console.error("Error getting accounts", error);
      }
    } else {
      hasMetaMask.value = false;
    }
  }
  
  onMounted(checkMetaMask);

  return { hasMetaMask, isMetaMaskConnected, checkMetaMask };
}
