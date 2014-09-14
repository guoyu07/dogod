var config = require('./config/config.json'),
    fs = require('fs');

var dataPath = config.dataPath;

var loadAgg = function(req,res) {
    var aggName = req.path.slice(4).replace(/\//g,''),
        aggPath = dataPath + aggName + '.json';



    res.render('index.html',{
        title:'test',
        agg:aggName
    })
}

var loadDoc = function(req,res){
    console.log(req)
}

var updateAgg = function(req,res){

}

var updateDoc = function(req,res){

}


exports.loadAgg = loadAgg;
exports.loadDoc = loadDoc;
exports.updateAgg = updateAgg;
exports.updateDoc = updateDoc;