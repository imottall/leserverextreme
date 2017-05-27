/**
 * Created by TB on 5/18/2017.
 */
/**
 * Created by dkroeske on 28/04/2017.
 */

// API - versie 2
var bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';

var express = require('express');
var router = express.Router();
var auth =  require('../auth/authentication');
var user = require('../datasource/user_ds')
var mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : process.env.DB_PASSWORD,
    database: 'userdata'
});

connection.connect();

//
// Login with {"username":"<username>", "password":"<password>"}
//
router.route('/login/:username?/:password?')
    .get( function(req, res) {

        var username = req.params.username || '';
        var password = req.params.password || '';
        console.log(username);
        console.log(password);

        connection.query('SELECT * FROM `user` WHERE username = "' + [username] + '";',
            function (error, rows) {
            if(rows.length > 0){
                if(rows){
                    console.log("username is correct");
                    if(true){
                        if (error) {
                            res.status(400).json({"Login":"declined"});
                        } else {
                            res.status(200).json({"Login":"accepted"});
                        }
                    } else{
                        console.log("password is messed up mannnn");
                        res.status(400).json({"Login":"declined"})
                    }
            }
            else{
                    res.status(400).json({"Login":"declined"})
                }
            } else {
                res.status(400).json({"Login":"declined"})
            }
        });
    });

router.route('/register/:username?/:password?')
    .put(function(req, res){
        //
        // Get body params or ''
        //j;fdalk;jadfjlkjadfslk;
        //FJLKJDSLKJASD
        var username = req.params.username || '';
        var password = req.params.password || '';
        //password = bcrypt.hashSync(password, 1);
        var usernameCheck;
        //Encoding the password
        usernameCheck = connection.query('SELECT * FROM `user` WHERE username = "' + [username] + '";');
        if(usernameCheck.length > 0){
            if(usernameCheck) {
                res.status(200).json({"Error: ":"Username already exists"});
            }
        }
        else{
                console.log("There are no rows");
                connection.query('INSERT INTO user(username, password) VALUES( "' + [username] + '","' + [password] + '");',
                    function (error, rows, fields) {
                        if (error) {
                            res.status(400).json(error);
                        } else {
                            res.status(200).json(rows);
                        }
                    });
            }
        });

module.exports = router;