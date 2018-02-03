const express = require("express");
const app = express();

module.exports = {
    index: (req, res) => {
        res.render('home/index');
    },
    postTransaction: (req, res) => {
        let faucetAddress = "39jzjt85tcRkqki6BeRzsD4FfF6BZKYQnR";
        let faucetPublicKey = "2a1d79fb8743d0a4a8501e0028079bcf82a4eae1";
        let faucetPrivateKey = "3a1f79fb8d743qd0ag4vrta850hhg1en00528gj0h79bfcf82ja4ea5eh";
        let userAddres = req.body.address;

        var request = require('request');

        let postData  = {
            "from": faucetAddress,
            "to": userAddres,
            "value": 5,
            "senderPubKey": faucetPrivateKey,
            "senderSignature": ["e20c…a3c29d3370f79f", "cf92…0acd0c132ffe56"]
          };
        request.post('http://localhost:5555/transactions/new', {form:postData});

        res.redirect('/');
    }
};