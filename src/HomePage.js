//Homepage.js
import { useEffect, useState } from "react";
import Chat from "./Chat.js";
import "./HomePage.css";
import {ethers} from "ethers";
import ABI from './ABI.json';

function Homepage(props) {

    const [message, setMessage] = useState("");
    const [allChats, setAllChats] = useState([]);
    const [pagination, setPagination] = useState([0]);
    const [NFT, setNFT] = useState(0);
    const [NFTList, setNFTList] = useState([]);

    const sendMessage = async() =>{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract("0x2823FcA3Bf738F7ab879B809ec03BD40819260Ea", ABI, signer);
        
        const tryToSend = await contract.addMessage(message,NFT);
        
    }

   

    const getMessages = async () =>{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract("0x2823FcA3Bf738F7ab879B809ec03BD40819260Ea", ABI, signer);
        
        const currentAddress = provider.getSigner().getAddress();
        const amountOfNFTs = await contract.balanceOf(currentAddress);
        //console.log(amountOfNFTs);

        for(var i=0;i<amountOfNFTs;i++){
            var currentNFT = await contract.tokenOfOwnerByIndex(currentAddress,i);
            setNFTList(oldNFT =>[...oldNFT,currentNFT]);
            //console.log(currentNFT);

        }
        const totalMessages = await contract.totalMessages();
        const page = 2;

        const starting = totalMessages - (page * pagination)-1;
        setAllChats([]);
        for(var i=starting; i> starting - page; i--){
        
            if(i>=0){
            const currentMessage = await contract.messages(i);
            console.log(currentMessage);
            setAllChats(prevChats =>[...prevChats,currentMessage]);
            }
            
        }
        
    }

    useEffect(()=>{
        getMessages();
    },[pagination]);

    const back = async() =>{
        setPagination(old => old + 1);
        //getMessages();
    }

    const forward = async() =>{
        if(pagination!=0)
        setPagination(old => old - 1);
        //getMessages();
    }

    return (
        
                <section>
                  <div className="hero">

                  <button className="header-cta"><a href="#" onClick={back}>Back</a></button>
                  <button className="header-cta"><a href="#" onClick={forward}>Forward</a></button>

                        <div className="chatMessage">
                            {allChats.map((item=>(<Chat text={item.sentMessage} data = {item.sender +":"+ item.nftID}/>)))}
                        </div>

                      <div className="Send">
                        <select name = "NFT" id="nftID" onChange={(e)=>setNFT(e.target.value)}>
                            {NFTList.map((item)=>
                             (<option key={item.toString()} value={item.toString()}>{item.toString()}</option>))};
                            
                            
                        </select>
                          <input
                              className="textInput"
                              type="text"
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                          />
                          <button className="header-cta"><a href="#" onClick={sendMessage}>Send</a></button>
                      </div>
    
                  </div>
                </section> 

    );

}

export default Homepage;
