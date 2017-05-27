/**
 * Created by TB on 5/10/2017.
 */
//API version 2
var express = require('express');
var routes = express.Router();
var path = require('path');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : process.env.DB_PASSWORD,
    database: 'userdata'
});

connection.connect();

routes.get('/data', function(req, res){
    res.contentType('application/json');

    connection.query('SELECT * FROM user', function(error, rows, fields){
        if(error){
            res.status(400).json(error);
        } else{
            res.status(200).json(rows);
        };
    });
});

routes.post('/register',function(req, res){
        //res.contentType('application/json');

        //get body params
        var username = req.body.username || '';
        var password = req.body.password || '';

        connection.query('INSERT INTO user(username) VALUES(',[username],');', function(error, rows, fields){
            if(error){
                res.status(400).json(error);
            } else{
                res.status(200).json(rows);
            };
        });

        // connection.query('INSERT INTO user(*){ ADD(', [ username ], [password],') };',
        //     function(error, rows, fields){
        //         if(error){
        //             res.status(400).json(error);
        //         } else {
        //             res.status(200).json(rows);
        //         };
        //     });
    });

module.exports = routes;