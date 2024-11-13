"use client"

import React,{useContext, useState}from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button} from "@nextui-org/react";
import { WalletContext } from "@/context/wallet";
import { BrowserProvider } from "ethers";


export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {
    isConnected,
    setIsConnected, 
    userAddress, 
    setUserAddress, 
    signer,
    setSigner 
  } = useContext(WalletContext)

  // function to connect to wallet 

  const connectWallet = async() => {
    // if no etherium installed as extension in browser or windows // 
    if(!window.etherium){
      throw new Error("Metamask is not installed")
    }

    try{
      // need ether js library here // 
      const provider = new BrowserProvider(window.etherium); 
      const signer = await provider.getSigner();
      setSigner(signer);
      // getting the accounts 
      const accounts = await provider.send("eth_requestAccounts",[]);
      // after getting the account the user is connected // so == true // 
      setIsConnected(true); 
      // taking the account from the first index // 
      setUserAddress(accounts[0]);

      // checking the network  eg : sepolia // 

      const network = await provider.getNetwork(); 
      const chainID = network.chainId; 
      const sepoliaNetworkId = '11155111'

      if(chainID.toString !== sepoliaNetworkId){
        alert("Please switch your MetaMask to sepolia network");
        return;
      }



      



    }catch(error){
      console.error("connection error ",error)
    }
  }

  

  const menuItems = [
    "Profile",
    "Sellings", 
    "Auctioned Listed"
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="mt-3 lg:relative lg:absolute lg:left-0">
        
          <p className=" text-inherit font-custom text-4xl mx-auto font-medium ">BlackmetA.nft</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            NFT listing
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Sellings
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Create
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Sign Up</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Connect to MetaMask
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
