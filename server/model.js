var config = require('../config/config.json'),
    fs = require('fs'),
    marked = require('marked');

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
});


/*
 test: test
 test1: test1
*/
var getConWithAttr = function(content){
    var contentArr = content.match(/^(\/\*[\s\S]+\*\/)([\s\S]+)/),
        attrText ,curAttr ,attrArr = {} ,contentText = content;
    if(contentArr && contentArr.length == 3){
        contentText = contentArr[2];
        attrText = contentArr[1].replace('/*','').replace('*/','');
        attrText = attrText.split('\n');
        if(attrText.length>0){
            for(var i = 0 ;i < attrText.length;i++){
                curAttr = attrText[i].replace(/\s/,'').split(': ');
                if(curAttr[0] && curAttr[1]) attrArr[curAttr[0]] = curAttr[1];
            }
        }else{
            attrText = {};
        }
    }
    return {
        attr : attrArr,
        content : contentText
    }
}

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

    var docContent,docHTML,fileNameREG = /(\.md)$/i , docConWithAttr = {};

    if(docPath && fileNameREG.test(docPath) && fs.existsSync(docPath)){

        docContent = fs.readFileSync(docPath).toString();

        docConWithAttr = getConWithAttr(docContent);

        docHTML = marked(docConWithAttr.content);

    }

    return {
        all     : docContent,
        attr    : docConWithAttr.attr,
        content : docConWithAttr.content,
        html    : docHTML
    };

}

var updateDocByPath = function(docPath){

}

var updateAggByName = function(content,callback){
    var aggName = content.name,
        aggPath = config.agg_path + aggName + '.json',
        isAggExist = hasAgg(aggName);

    if(!content || !content.name || !(content.list && content.list.length > 0) ){
        callback({
            errno:1,
            errmsg:'数据格式不正确！'
        })
        return;
    }
    
    if(content.type == 'new' && isAggExist){
        callback({
            errno:3,
            errmsg:'文件已存在，无法新增！'
        })
        return;
    }else if(content.type == 'edit' && !isAggExist){
        callback({
            errno:4,
            errmsg:'文件已不存在，无法编辑！'
        })
        return;
    }

    fs.writeFile(aggPath,JSON.stringify(content,null,4),function(err){
        if(err){
            callback({
                errno:2,
                errmsg:'写入数据出错！'
            });
            return;
        }

        callback({
            errno:0,
            errmsg:''
        })

    })

}

exports.getAggs = getAggs;
exports.getNavs = getNavs;
exports.hasAgg = hasAgg;
exports.isAgg = isAgg;
exports.hasDoc = hasDoc;
exports.getAggByPath = getAggByPath;
exports.getDocByPath = getDocByPath;
exports.updateDocByPath = updateDocByPath;
exports.updateAggByName = updateAggByName;