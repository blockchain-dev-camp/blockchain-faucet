const express = require("express");
const app = express();

module.exports = {
    index: (req, res) => {
        res.render('home/index');
    },
    postTransaction: (req, res) => {
        let faucetAddress = "39jzjt85tcRkqki6BeRzsD4FfF6BZKYQnR";
        let faucetPublicKey = "";
        let faucetPrivateKey = "";
        let userAddres = req.body;

        const http = require('http');

        var postData = JSON.stringify({
            "from": faucetAddress,
            "to": userAddres,
            "value": 5,
            "senderPubKey": faucetPublicKey,
            "senderSignature": ["e20c…a3c29d3370f79f", "cf92…0acd0c132ffe56"]
        });

        const options = {
            hostname: 'http://http://localhost:',
            port: 5555,
            path: '/transactions/new',
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            }
        };

        const request = http.request(options, (res) => {
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                console.log(`BODY: ${chunk}`);
            });
            res.on('end', () => {
                console.log('No more data in response.');
            });
        });

        request.on('error', (e) => {
            console.error(`problem with request: ${e.message}`);
        });

        // write data to request body
        request.write(postData);
        request.end();
        res.redirect('/');
    }
};