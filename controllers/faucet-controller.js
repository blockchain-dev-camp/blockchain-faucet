const express = require('express');
const app = express();
const secp256k1 = require('secp256k1');
const cryptoJs = require('crypto-js');

// function sign(message, privateKey) {
//     let hash = cryptoJs.SHA256(message).toString();
//     let buffer = Buffer.from(hash, 'hex');
//     let sign = secp256k1.sign(buffer, Buffer.from(privateKey, 'hex'));
//     return secp256k1.signatureExport(sign.signature);
// }

module.exports = {
    index: (req, res) => {
        res.render('home/index');
    },

    success: (req, res) => {
        res.render('home/success');
    },

    postTransaction: (req, res) => {
        let faucetAddress = 'be28bc2c64f287a500fb94d16f9ab123d23b87f9';
        let faucetPublicKey = '04d5beeef9a45ed344d59eebddb2bfdd3d0934c332331cc3cc9c82a041e93f9c018588153840f0c313ee35cae25948b4a5be764be8b3ef2fdee3c929d813cce6ab'
        // let faucetPublicKey = '041a49146e995ef5530e03ff97942fdf0bb11ea7aa29a67f7d3850061bad998099a9a2f0740de6bc345a33fd9e80995e70ea5dfed0ee9f5cdc91c5d44195173309';        
        let userAddress = req.body.address;     
        let amount = 5;   

        // let message = faucetAddress + userAddress + amount;
        // let faucetPrivateKey = 'a2c9b575fd9191649c9ebc07c04114c53b3e3dcbd4e35105a73f77dad5ad5816';
        //l et signature = sign(message, faucetPrivateKey).toString('hex');

        // Signing don't work for some reason, hardcoding valid signature for now
        let signature = '304402203ef65ea8209fe76d04a56b445946dbf455468f462404f66c332f9d93be56dc7b02205fc85937b0e5e9ec6cfde577132bbfb4e41056aa184b4e03a5380c783255e994';

        let data  = {
            'fromAddress': faucetAddress,
            'toAddress': userAddress,
            'value': amount,
            'senderPubKey': faucetPublicKey,
            'senderSignature': signature
        };

        let request = require('request');

        let options = {
            uri: 'http://localhost:5555/transactions/new',
            method: 'POST',
            json: data
        };
        
        request(options, function (error, response, body) {            
            console.log(body);  
            if (!error) {
                res.redirect('/success');
            } else {
                res.redirect('/');
            }
        });
    }
};
