var express = require('express')
    ,cons = require('consolidate')
    ,controller = require('./controller');

var app = express();

app.use(express.static(__dirname + '/static',{
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html','less'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path) {
    res.set('x-timestamp', Date.now())
  }
}))

app.engine('html', cons.swig);

app.get('/',function(req,res){
	res.send('test');
})

app.get('/agg/*',function(req,res){
    controller.loadAgg(req,res)
})

app.post('/agg/edit',function(req,res){
    controller.editAgg(req,res)
})

app.get('/doc/*',function(req,res){
    controller.loadDoc(req,res)
})

app.get('/update/agg',function(req,res){
    controller.updateAgg(req,res);
})

app.get('/update/doc',function(req,res){
    controller.updateDoc(req,res);
})

try{

  app.listen(3000)

  console.log('server started!')

}catch(e){

  console.log(e)

}