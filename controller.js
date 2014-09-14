var config = require('./config/config.json'),
    model = require('./model'),
    fs = require('fs');

var dataPath = config.dataPath;

var loadAgg = function(req,res) {
    var aggName = req.path.slice(4).replace(/\//g,''),
        aggPath = dataPath + aggName + '.json',
        aggContent,
        docName = req.param('doc') || 'gettingstarted',
        docPath,
        docContent;

    aggContent = model.getAggByPath(aggPath);

    if(aggContent){
        docPath = aggContent[docName];
        docContent = model.getDocByPath(docPath);
    }

    res.render('agg.html',{
        title:'添加聚合页',
        agg:{
            name:aggName,
            path:aggPath,
            content:aggContent
        },
        doc:{
            title:docTitle,
            name:docName,
            path:docPath,
            content:docContent
        }
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