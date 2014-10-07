var config = require('./config/config.json'),
    fs = require('fs'),
    marked = require('marked');

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
});

var getAggs = function(){
    var aggPath = config.agg_path,
        aggFileList = fs.readdirSync(aggPath),
        aggFileListResult = [];
    for(var i = 0 ;i<aggFileList.length;i++){
        if(/(\.json)$/i.test(aggFileList[i])){
            aggFileListResult.push(aggFileList[i].replace(/(\.json)$/i,''))
        }
    }

    return aggFileListResult
}

var getNavs = function(){
    var aggPath = config.agg_path,
        aggFileList = fs.readdirSync(aggPath),
        aggFileListResult = [],
        aggContent;
    for(var i = 0 ;i<aggFileList.length;i++){
        if(/(\.json)$/i.test(aggFileList[i])){
            aggContent = fs.readFileSync(aggPath + aggFileList[i]).toString();
            if(JSON.parse(aggContent).isNav){
                aggFileListResult.push(aggFileList[i].replace(/(\.json)$/i,''))
            }
        }
    }

    return aggFileListResult
}

var hasAgg = function(aggName){

    if(aggName && fs.existsSync(config.agg_path + aggName + '.json')){

        return true;
    
    }else{
    
        return false;
    
    }
}

var isAgg = function(aggContent){
    if( aggContent 
        && aggContent.title 
        && aggContent.name 
        && aggContent.list 
        && aggContent.list[0] 
        && aggContent.list[0].title 
        && aggContent.list[0].doclist
        && aggContent.list[0].doclist[0]
        && aggContent.list[0].doclist[0].title
        && aggContent.list[0].doclist[0].doc){
        return true;
    }else{
        return false;
    }
}

var getAggByPath = function(aggPath){
    var aggFile,aggContent;

    if(aggPath && fs.existsSync(aggPath)){

        aggFile = fs.readFileSync(aggPath).toString();

        aggContent = JSON.parse(aggFile);

    }

    return aggContent;
}

var hasDoc = function(docPath){

    var fileNameREG = /(\.md)$/i;

    if(docPath && fileNameREG.test(docPath) && fs.existsSync(docPath)){

        return true;

    }else{

        return false;

    }

}

var getDocByPath = function(docPath){

    var docContent,docHTML,fileNameREG = /(\.md)$/i;

    if(docPath && fileNameREG.test(docPath) && fs.existsSync(docPath)){

        docContent = fs.readFileSync(docPath).toString();

        docHTML = marked(docContent);

    }

    return {
        content:docContent,
        html:docHTML
    };

}

var updateAggByPath = function(aggPath){

}

var updateDocByPath = function(docPath){

}

exports.getAggs = getAggs;
exports.getNavs = getNavs;
exports.hasAgg = hasAgg;
exports.isAgg = isAgg;
exports.hasDoc = hasDoc;
exports.getAggByPath = getAggByPath;
exports.getDocByPath = getDocByPath;
exports.updateDocByPath = updateDocByPath;
exports.updateAggByPath = updateAggByPath;