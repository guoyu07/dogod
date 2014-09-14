var config = require('./config/config.json'),
    fs = require('fs');

var getAggByPath = function(aggPath){
    var aggContent;

    if(aggPath && fs.existsSync(aggPath)){

        aggContent = require(aggPath);

    }

    return aggContent;
}

var getDocByPath = function(){

}