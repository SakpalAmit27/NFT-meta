"use client"

import {createContext, useState } from "react"

export const WalletContext = createContext({children}) =>{

    const [isConnected,setIsConnected] = useState(false); 
    const [userAddress,setUserAddress] = useState(null);
    const [signer,setSigner] = useState();


    return(
        <WalletContext.Provider
        
        value={{
            isConnected,
            setIsConnected, 
            userAddress, 
            setUserAddress, 
            signer,
            setSigner 
        }}
        
        >

        </WalletContext.Provider>
    )

} 

