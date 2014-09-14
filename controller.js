var config = require('./config/config.json'),
    model = require('./model'),
    fs = require('fs');

var loadAgg = function(req,res) {
    var aggName = req.path.slice(4).replace(/\//g,''),
        aggPath = config.agg_path + aggName + '.json',
        aggContent,
        docName = req.param('doc') || 'gettingstarted',
        docPath,
        docContent = {},
        docTitle;

    aggContent = model.getAggByPath(aggPath);

    if(aggContent){
        docPath = config.doc_path + aggContent[docName];
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
            html:docContent.html,
            content:docContent.content
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