import Web3 from 'web3';
import VoteJSON from "../contract/Vote.json";

const useWeb3 = () => {
    const web3 = new Web3(
        Web3.givenProvider || 
        "wss://sepolia.infura.io/ws/v3/3fa59ccfd9444468bafee15063642d77"
    );
    const contractAddress = "0x015C00A3686fe32632B61E054763ebeD9e9d521b";
    const voteContract = new web3.eth.Contract(VoteJSON.abi, contractAddress);
    
    const getAccount = async () => {
        const accounts = await web3.eth.requestAccounts()
        return accounts[0];
    };

    return {
        web3,
        voteContract,
        contractAddress,
        getAccount 
    };
}; 

export default useWeb3;
