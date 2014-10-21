var config = require('./config/config.json'),
    model = require('./model'),
    fs = require('fs');

var loadAgg = function(req,res) {
    var allNavs = model.getNavs(),
        globalPath = req.path.slice(5).split('/'),
        aggName = globalPath[0],
        aggPath = config.agg_path + aggName + '.json',
        aggContent,
        aggTitle,
        docName = globalPath[1],
        docPath,
        docContent = {},
        title = '查看聚合页:'+aggName;

    aggContent = model.getAggByPath(aggPath);

    if(!model.isAgg(aggContent)){
        //如果不符合agg的格式则返回
        res.redirect('/update/agg?agg='+aggName)
        return;
    }else{
        if(!/(\.md)$/i.test(docName)){
            //如果不是以.md结尾的url则跳转到第一个条文档
            res.redirect(aggContent.list[0].doclist[0].doc)
            return;
        }else{
            docPath = config.doc_path + aggName + '/' + docName;
            docContent = model.getDocByPath(docPath); 
        }
    }

    res.render('agg.html',{
        title:title,
        aggs:allNavs,
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
    var allNavs = model.getNavs(),
        docPath = config.doc_path + req.path.slice(4),
        docContent;

    docContent = model.getDocByPath(docPath);

    res.render('doc.html',{
        title:"内容页",
        aggs:allNavs,
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
    var allNavs = model.getNavs(),
        aggName = req.param('agg'),
        aggPath = config.agg_path + aggName + '.json',
        aggContent = model.getAggByPath(aggPath),
        docContent,
        type = 'new',
        title = {'new':'新增聚合页','edit':'编辑聚合页'};

    if(model.hasAgg(aggName)){
/*        res.redirect('/agg/'+aggName);
        return;*/
        type = 'edit'
    }

    if(aggContent){
        aggContent = JSON.stringify(aggContent);
    }

    res.render('update_agg.html',{
        title:title[type],
        type:type,
        aggs:allNavs,
        aggContent:aggContent,
        aggName:aggName
    })
}

var updateDoc = function(req,res){
    var allNavs = model.getNavs(),
        docPath = config.doc_path + req.path.slice(4),
        docContent;
    res.render('update_doc.html',{
        title:"编辑聚合页",
        aggs:allNavs
    })
}

var editAgg = function(req,res){
    var aggList = req.body.list;
    try{
        aggList = JSON.parse(aggList);
    }catch(err){
        console.log(err)
    };

    model.updateAggByName({
        type:req.body.type,
        title:req.body.title,
        name:req.body.name,
        img:req.body.img,
        isNav:req.body.isNav,
        list:aggList
    },function(result){
        res.write(JSON.stringify(result));
        res.end();
    })
}


exports.loadAgg = loadAgg;
exports.loadDoc = loadDoc;
exports.updateAgg = updateAgg;
exports.updateDoc = updateDoc;
exports.editAgg = editAgg;