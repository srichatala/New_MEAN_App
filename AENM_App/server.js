var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var db = mongojs("mean", ["serviceClients"]);
var app = express();

var port = process.env.port || 1337;

app.use(bodyParser.json());



// to get the data to font-end
app.get('/serviceClients', function (req, res) {
    db.serviceClients.find(function (err, docs) {
        res.json(docs);
    });
});

//to delete data in database
app.delete('/serviceClients/:id', function (req, res) {
    var id = req.params.id;
    db.serviceClients.remove({ _id: mongojs.ObjectId(id) }, function (err, doc) {
        res.json(doc);
    });
});

//to get single record
app.get('/serviceClients/:id', function (req, res) {
    var id = req.params.id;
    db.serviceClients.findOne({ _id: mongojs.ObjectId(id) }, function (err, doc) {
        res.json(doc);
    });
});

app.put('/serviceClients/:id', function (req, res) {
    var id = req.params.id;
    db.serviceClients.findAndModify(
        {
            query: {
                _id: mongojs.ObjectId(id)
            },
            update: {
                _id: mongojs.ObjectId(id),
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                phoneno: req.body.phoneno, 
                lvdate: req.body.lvdate, 
                status: req.body.status
            },
            upsert: true
        },
        function (err, doc) {
            res.json(doc);
        });
});

//to post data from front-end
app.post('/serviceClients', function (req, res) {
    db.serviceClients.insert(req.body, function (err, doc) {
        res.json(doc);
    });
});

app.use(express.static(__dirname + '/public'));

app.get('/', function (request, response) {
    response.sendFile("public/index.html");
});



app.listen(port);