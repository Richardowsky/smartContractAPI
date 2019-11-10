import express from "express";
import {mainAddress, market, web3} from "../config/wallet.js";
import * as projectJSON from "../contracts/Project";

const router = express.Router();

router.post('/market', async function (req, res) {
    const {
        name,
        description,
        symbol,
        initialSupply,
        price,
    } = req.body.token;

    const transactionHash = await market.methods.createProject(name, description, symbol, initialSupply, price).send({from: mainAddress});
    res.json(transactionHash);
});

router.get('/market/:name/address', async function (req, res) {
    const result = await market.methods.getProject(req.params.name).call();
    res.json(result);
});

router.get('/market/:name/description', async function (req, res) {
    const result = await market.methods.getProjectInfo(req.params.name).call();
    res.json(result);
});

router.get('/market/:name/price', async function (req, res) {
    const result = await market.methods.getPrice(req.params.name).call();
    res.json(result);
});

router.get('/market/:name/shares', async function (req, res) {
    const result = await market.methods.getSharesCount(req.params.name).call();
    res.json(result);
});

router.post('/market/:name/buy', async function (req, res) {
    const name = req.params.name;
    const {
        amount,
        address,
    } = req.body;
    const price = await market.methods.getPrice(name).call();
    const result = await market.methods.buyProjectShares(name, amount).send({
        from: address,
        value: price * amount,
        gasLimit: 550000,
    });
    res.json(result);
});

router.post('/market/:name/sell', async function (req, res) {
    const name = req.params.name;
    const {
        amount,
        address,
    } = req.body;
    const projectAddress = await market.methods.getProject(name).call();
    const { abi: abiProject } = projectJSON;

    const project = new web3.eth.Contract(abiProject, projectAddress);
    const { address: marketAddress } = market.options;
    await project.methods.approve(marketAddress, amount).send({from: address});
    const result = await market.methods.sellProjectShares(name, amount).send({
        from: address,
        gasLimit: 5500000
    });
    res.json(result);
});

export default router;