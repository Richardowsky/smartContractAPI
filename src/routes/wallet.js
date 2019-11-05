import Web3 from "web3";
import HDWalletProvider from "truffle-hdwallet-provider";
import * as marketJSON from "../contracts/Market";

const web3 = new Web3(new HDWalletProvider("pen mountain miss mail cage twin trial ancient minute inner slide speed", "https://ropsten.infura.io/v3/8a92441a635d44008ff716723aa78a88"));
export const mainAddress = '0x17d0108b882f45d188748c5ff32ff6f276c8e85e';
const marketAddress = "0x3798B9B9b75A8a5AB589B18FaD9Fc7AcD161892C";
const {abi: abiMarket} = marketJSON;
export const market = new web3.eth.Contract(abiMarket, marketAddress);

