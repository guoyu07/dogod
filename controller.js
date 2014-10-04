var config = require('./config/config.json'),
    model = require('./model'),
    fs = require('fs');

var loadAgg = function(req,res) {
    var allAggs = model.getAggs(),
        globalPath = req.path.slice(5).split('/'),
        aggName = globalPath[0],
        aggPath = config.agg_path + aggName + '.json',
        aggContent,
        docName = globalPath[1],
        docPath,
        docContent = {};

    if(!/(\.md)$/i.test(globalPath[1])){
        docName = 'gettingstarted.md';
        res.redirect('/agg/'+aggName+'/'+docName)
    }

    aggContent = model.getAggByPath(aggPath);

    if(aggContent){
        docPath = config.doc_path + aggName + '/' + docName;
        docContent = model.getDocByPath(docPath);
    }

    res.render('agg.html',{
        title:'添加聚合页',
        aggs:allAggs,
        agg:{
            name:aggName,
            url:'/agg/' + aggName + '/' + docName,
            path:aggPath,
            content:aggContent
        },
        doc:{
            name:docName,
            url:'/doc/' + aggName + '/' + docName,
            path:docPath,
            html:docContent.html,
            content:docContent.content
        }
    })
}

var loadDoc = function(req,res){
    var allAggs = model.getAggs(),
        docPath = config.doc_path + req.path.slice(4),
        docContent;

    docContent = model.getDocByPath(docPath);

    res.render('doc.html',{
        title:"内容页",
        aggs:allAggs,
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
    console.log(11111)
    console.log(req.param('test'))
}

var updateDoc = function(req,res){

}


exports.loadAgg = loadAgg;
exports.loadDoc = loadDoc;
exports.updateAgg = updateAgg;
exports.updateDoc = updateDoc;