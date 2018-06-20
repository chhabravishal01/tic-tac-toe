var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var utils = require('./utils');

var users = [];
var currentUser = "";


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET");
    next();
});

function isLoggedIn (req, res, next) {
    if (req.headers.authorization) {
        let result = utils.verifyToken(req.headers.authorization);

        if (result) {
            currentUser = result.username;
            next();
        }
        else
            res.status(401).json({error: "invalid token"});
    }
    else
        res.status(401).json({error: "token not found"});
}

app.get('/', isLoggedIn, function(req, res){
    res.status(200).send(currentUser);
})



app.post('/login', (req, res) => {

    let record = users.find((user) => {
        return user.username === req.body.username && user.password === req.body.password;
    })

    if (record) {
        var details = {
            username: record.username
        };
    
        let token = utils.generateToken(details);
        
        res.status(200).json({token:token, error:0, message:"Login successful"});
    }

    else {
        res.json({token: "", error: 1, message: "Wrong Credentials"});
    }
})


app.post('/signUp', (req, res) => {

    let record = users.find((user) => {
        return user.username === req.body.username;
    })

    if (record) {
        res.json({token: "", error: 1, message: "Username already exists. Choose another username."});
    }

    else {
        users.push(req.body);
        
        console.log(users);
        
        var details = {
            username: req.body.username
        };
    
        let token = utils.generateToken(details);
    
        res.status(201).json({token: token, error: 0, message: "Account created."});
    }

})

// For checking current data

app.get('/users', function(req, res){
    res.status(200).send(users);;
})

app.listen(5000);