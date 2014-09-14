var express = require('express')
    ,cons = require('consolidate')
    ,controller = require('./controller');

var app = express();

app.engine('html', cons.ejs);

app.get('/',function(req,res){
	res.send('test');
})

app.get('/agg/*',function(req,res){
    controller.loadAgg(req,res)
})

app.get('/doc/*',function(req,res){
    controller.loadDoc(req,res)
})

app.post('/update/agg',function(req,res){
    controller.updateAgg(req,res);
})

app.post('/update/doc',function(req,res){
    controller.updateDoc(req,res);
})

app.listen(3000)