"use client";

import React, { useContext, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button } from "@nextui-org/react";
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
  } = useContext(WalletContext);

  // function to connect to wallet
  const connectWallet = async () => {
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
    }

    try {
      const provider = new BrowserProvider(window.ethereum); 
      const signer = await provider.getSigner();
      setSigner(signer);
      
      const accounts = await provider.send("eth_requestAccounts", []);
      setIsConnected(true); 
      setUserAddress(accounts[0]);

      const network = await provider.getNetwork(); 
      const chainID = network.chainId; 
      const sepoliaNetworkId = '11155111';

      if (chainID.toString() !== sepoliaNetworkId) {
        alert("Please switch your MetaMask to the Sepolia network");
        return;
      }
    } catch (error) {
      console.error("Connection error", error);
    }
  };

  const menuItems = [
    "Profile",
    "MarketPlace", 
    "Listed NFTs"
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="lg:relative lg:absolute lg:left-0">
          <p className="font-nftvault text-2xl mx-auto font-medium md:text-4xl">NftVault</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/marketplace" className="font-mono text-xl font-bold">
            Marketplace
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/sellNFT" aria-current="page" className="font-nftvault text-xl font-light text-red-700">
            Listed NFTs
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/profile" className="font-mono text-xl font-bold">
            Profile
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Sign Up</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat" onClick={connectWallet} className="connect-wallet-btn">
            Connect to MetaMask
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"}
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
