import express from "express";
import {mainAddress, market} from "./wallet.js";

const router = express.Router();

router.post('/market', async function (req, res) {
    const {
        name,
        description,
        symbol,
        initialSupply,
        price,
    } = req.body.token;

    await market.methods.createProject(name, description, symbol, initialSupply, price).send({from: mainAddress}, function (error, transactionHash) {
        res.end(JSON.stringify({"Token": name, "txHash": transactionHash}));
    });
});

router.get('/:name/address', async function (req, res) {
    const result = await market.methods.getProject(req.params.name).call();
    res.end(JSON.stringify({"address": result}));
});

router.get('/:name/description', async function (req, res) {
    const result = await market.methods.getProjectInfo(req.params.name).call();
    res.end(JSON.stringify({"description": result}));
});

router.get('/:name/price', async function (req, res) {
    const result = await market.methods.getPrice(req.params.name).call();
    res.end(JSON.stringify({"price": result}));
});

router.get('/:name/shares', async function (req, res) {
    const result = await market.methods.getSharesCount(req.params.name).call();
    res.end(JSON.stringify({"shares": result}));
});

router.post('/buy', async function (req, res) {
    const {
        name,
        amount,
    } = req.body;
    const result = await market.methods.buyProjectShares(name, amount).send({
        from: mainAddress,
        gasLimit: 550000
    });
    res.end(JSON.stringify({"Buy": name, "txHash": result}));

});

router.post('/sell', async function (req, res) {
    const {
        name,
        amount,
    } = req.body;
    const result = await market.methods.sellProjectShares(name, amount).send({
        from: mainAddress,
        gasLimit: 550000
    });
    res.end(JSON.stringify({"Sell": name, "txHash": result}));
});

export default router;