var express = require('express')
    ,cons = require('consolidate')
    ,model = require('./model');

var app = express();

app.engine('html', cons.ejs);

app.get('/',function(req,res){
	res.send('test');
})

app.get('/agg/*',function(req,res){
    model.loadAgg(req,res)
})

app.get('/doc/*',function(req,res){
    model.loadDoc(req,res)
})

app.post('/agg/update',function(req,res){
    model.updateAgg(req,res);
})

app.post('/doc/update',function(req,res){
    model.updateDoc(req,res);
})

app.listen(3000)