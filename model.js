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
    var aggContent;

    if(aggPath && fs.existsSync(aggPath)){

        aggContent = require(aggPath);

    }

    return aggContent;
}

var getDocByPath = function(docPath){

    var docContent,docHTML;

    if(docPath && fs.existsSync(docPath)){

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