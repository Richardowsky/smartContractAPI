import express from "express";
import Web3 from "web3";
import HDWalletProvider from "truffle-hdwallet-provider";
import * as marketJSON from '../contracts/Market.json';

const web3 = new Web3(new HDWalletProvider("pen mountain miss mail cage twin trial ancient minute inner slide speed", "https://ropsten.infura.io/v3/8a92441a635d44008ff716723aa78a88"));
const router = express.Router();
const mainAddress = '0x17d0108b882f45d188748c5ff32ff6f276c8e85e';
const marketAddress = "0x3798B9B9b75A8a5AB589B18FaD9Fc7AcD161892C";
const { abi: abiMarket } = marketJSON;
const market = new web3.eth.Contract(abiMarket, marketAddress);


router.post('/market', function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    const name = req.body.token.name;
    const description = req.body.token.description;
    const symbol = req.body.token.symbol;
    const initialSupply = req.body.token.initialSupply;
    const price = req.body.token.price;

    market.methods.createProject(name, description, symbol, initialSupply, price).send({from: mainAddress}, function (error, transactionHash) {
        res.end(JSON.stringify("Token - " + name + " created: " + transactionHash));
    });
});

router.get('/address/:name', function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    market.methods.getProject(req.params.name).call((err, result) => {
        res.end(JSON.stringify("address:" + result));
    });
});

router.get('/description/:name', function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    market.methods.getProjectInfo(req.params.name).call((err, result) => {
        res.end(JSON.stringify("description:" + result));
    });
});

router.get('/price/:name', function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    market.methods.getPrice(req.params.name).call((err, result) => {
        res.end(JSON.stringify("price:" + result));
    });
});

router.get('/shares/:name', function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    market.methods.getSharesCount(req.params.name).call((err, result) => {
        res.end(JSON.stringify("shares_amount:" + result));
    });
});

router.post('/v1/market/:name/:amount', function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    const name = req.params.name;
    const amount = req.params.amount;

    market.methods.buyProjectShares(name, amount).send({
        from: mainAddress,
        gasLimit: 550000
    }, function (error, transactionHash) {
        res.end(JSON.stringify("Buy - " + name + " token: " + transactionHash));
        console.log(error);
        console.log(transactionHash);
    });

});

router.post('/sell/:name/:amount', function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    const name = req.params.name;
    const amount = req.params.amount;

    market.methods.sellProjectShares(name, amount).send({
        from: mainAddress,
        gasLimit: 550000
    }, function (error, transactionHash) {
        res.end(JSON.stringify("Sell - " + name + " token: " + transactionHash));
        console.log(error);
        console.log(transactionHash);
    });

});

export default router;