const express = require('express');
const logger = require('morgan');
const errorHandler = require('errorhandler');
const bodyParser = require('body-parser');

let store = {};
store.accounts = [];

let app = express();

//add middleware
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(errorHandler());

//accounts
app.get('/accounts', (req, res) => {
    res.status(200);
    res.send(store.accounts);
});

app.post('/accounts', (req, res) => {
    let newAccount = req.body;
    let id = store.accounts.length;
    store.accounts.push(newAccount);
    res.status(201);
    res.send({id: id}); //send back the new ID
});

//update using parameter
app.put('/accounts/:id', (req, res) => {
    let idToUpdate = req.params.id;

    //only update if there is a first name and a last name
    if (!req.body.first_name || !req.body.last_name) {
        res.status(400).send();
    }
    else {
        //update the account, only updating the required fields
        var account = store.accounts[idToUpdate];
        account.first_name = req.body.first_name;
        account.last_name = req.body.last_name;

        res.status(200);
        res.send(store.accounts[idToUpdate]);
    }
});

//delete using query string
app.delete('/accounts', (req, res) => {
    let idToDelete = req.query.idToDelete;
    store.accounts.splice(idToDelete, 1);
    res.status(204).send();
});

app.listen(3000);