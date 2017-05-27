/**
 * Created by TB on 5/18/2017.
 */
//API version 2
var express = require('express');
var routes = express.Router();
var path = require('path')
var mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : process.env.DB_PASSWORD,
    database: 'testapi'
});

connection.connect();

routes.get('/data', function(req, res){
    res.contentType('application/json');

    connection.query('SELECT * FROM phonedata', function(error, rows, fields){
        if(error){
            res.status(400).json(error);
        } else{
            res.status(200).json(rows);
        }
    });
});

//Voeg een deviceSDK toe
routes.put('/add_device/:deviceSDK?/:device?/:model?/:product?/:error?', function(req,res) {
    var deviceSDK = req.params.deviceSDK || '';
    var device = req.params.device || '';
    var model = req.params.model || '';
    var product = req.params.product || '';
    var error  = req.params.error || '';

    var testvariable = "thisisnotatest";

    connection.query('INSERT INTO phonedata(deviceSDK,device,model,product,error) VALUES( "' + [deviceSDK] + '","' + [device] + '","' + [model] + '","' + [product] + '","' + [error] + '");',
        function (error, rows, fields) {
            if (error) {
                res.status(400).json(error);
            } else {
                res.status(200).json(rows);
            }
        });
});

module.exports = routes;