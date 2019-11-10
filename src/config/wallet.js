import Web3 from "web3";
import HDWalletProvider from "truffle-hdwallet-provider";
import * as marketJSON from "../contracts/Market";
import dotenv from "dotenv";
dotenv.config("../../.env");


const endpoint = process.env.ENDPOINT;
const mnemonic = process.env.MNEMONIC;
export const web3 = new Web3(new HDWalletProvider(mnemonic, endpoint, 0, 2));
const marketAddress = "0x3798B9B9b75A8a5AB589B18FaD9Fc7AcD161892C";
const {abi: abiMarket} = marketJSON;

export const market = new web3.eth.Contract(abiMarket, marketAddress);
export const mainAddress = '0x17d0108b882f45d188748c5ff32ff6f276c8e85e';