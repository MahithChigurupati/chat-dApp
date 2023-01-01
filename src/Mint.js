import './mint.css';
import {ethers} from "ethers";
import ABI from './ABI.json';

function Mint(props){

    const mint = async() =>{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        provider.send("eth_requestAccounts")
        const signer = provider.getSigner();
        const contract = new ethers.Contract("0x2823FcA3Bf738F7ab879B809ec03BD40819260Ea", ABI, signer);
        const price = await contract.price();

        const tryToMint = await contract.safeMint({value: price});
    }
    return(
        <div>
            <button class="mint-button"><a href="#" onClick={mint}>Mint</a></button>
        </div>
    );
}

export default Mint;