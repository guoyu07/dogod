var config = require('./config/config.json'),
    model = require('./model'),
    fs = require('fs');

var loadAgg = function(req,res) {
    var aggName = req.path.slice(4).replace(/\//g,''),
        aggPath = config.agg_path + aggName + '.json',
        aggContent,
        docName = req.param('doc') || 'gettingstarted',
        docPath,
        docContent = {};

    aggContent = model.getAggByPath(aggPath);

    if(aggContent){
        docPath = config.doc_path + aggContent[docName];
        docContent = model.getDocByPath(docPath);
    }

    res.render('agg.html',{
        title:'添加聚合页',
        agg:{
            name:aggName,
            url:'/agg/' + aggName,
            path:aggPath,
            content:aggContent
        },
        doc:{
            name:docName,
            url:'/doc/' + aggContent[docName],
            path:docPath,
            html:docContent.html,
            content:docContent.content
        }
    })
}

var loadDoc = function(req,res){
    var docPath = config.doc_path + req.path.slice(4),
        docContent;

    docContent = model.getDocByPath(docPath);

    res.render('doc.html',{
        title:"内容页",
        agg:{

        },
        doc:{
            name:req.param('docName'),
            path:docPath,
            html:docContent.html,
            content:docContent.content
        }
    })
}

var updateAgg = function(req,res){

}

var updateDoc = function(req,res){

}


exports.loadAgg = loadAgg;
exports.loadDoc = loadDoc;
exports.updateAgg = updateAgg;
exports.updateDoc = updateDoc;