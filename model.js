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

var getAggByPath = function(aggPath){
    var aggFile,aggContent;

    if(aggPath && fs.existsSync(aggPath)){

        aggFile = fs.readFileSync(aggPath).toString();

        aggContent = JSON.parse(aggFile);

    }

    return aggContent;
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

exports.getAggByPath = getAggByPath;
exports.getDocByPath = getDocByPath;