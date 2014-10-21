(function(W,$){
	CONSTANT = CONSTANT || {};

	var editor;

	var init = function(){
		setDefault();
		eventBind();
	}

	var setDefault = function(){
        var defaultData = CONSTANT.defaultData || {
                "title" : "hello world!",
                "name" : CONSTANT.name,
                "img" : "",
                "isNav" : false,
                "list" : [ 
                    {
                        "title" : "getting started",
                        "doclist" : [ 
                            {
                                "title" : "what is toolkit",
                                "doc" : "/agg/"+CONSTANT.name+"/whatistoolkit.md"
                            }, 
                            {
                                "title" : "install",
                                "doc" : "/agg/"+CONSTANT.name+"/install.md"
                            }
                        ]
                    }, 
                    {
                        "title" : "configuration",
                        "doclist" : [ 
                            {
                                "title" : "test",
                                "doc" : "/agg/"+CONSTANT.name+"/test.md"
                            }, 
                            {
                                "title" : "what is toolkit",
                                "doc" : "/agg/"+CONSTANT.name+"/test2.md"
                            }, 
                            {
                                "title" : "what is toolkit",
                                "doc" : "/agg/"+CONSTANT.name+"/test2.md"
                            }
                        ]
                    }
                ]
        }

        defaultData.time = undefined;

        $('#aggContent').html(JSON.stringify(defaultData))
	}

    var validate = function(data,callbacks){
        callbacks = callbacks || {};
        callbacks.success = callbacks.success || function(){};
        callbacks.failed = callbacks.failed || function(){};

        if(!(data.title 
            && (typeof data.title).toLowerCase() == 'string'
            && data.title != '')
           ){
            callbacks.failed(data,'请输入title,且为字符串类型');
            return;
        }
        if(!(data.name 
            && (typeof data.name).toLowerCase() == 'string'
            && data.name != ''
            && /^[a-zA-Z\d\_]+$/.test(data.name)
           )){
            callbacks.failed(data,'请输入name,且为字符串类型，且只能是英文，数字，下划线');
            return;
        }
        if(!(data.list 
            && data.list[0] 
            && data.list[0] 
            && data.list[0].doclist 
            && data.list[0].doclist.length>0
            && data.list[0].doclist[0]
            && data.list[0].doclist[0].doc)
           ){
            callbacks.failed(data,'请输入list,且至少有一篇文档配置');
            return; 
        }

        callbacks.success(data);
    }

	var eventBind = function(){
	    editor = $("#aggContent").jsonEdit({
	        //debug:true
	        //,dynamic:true
	        height:'auto'
            ,errorAlert:true
	        ,buttonSelector:'#editSubmit'
            ,onSubmit:function(){
                var thisValue = $('.jsonEdit').text().replace(/(\r|\n)/g,'');

                thisValue  = JSON.parse(thisValue);
                thisValue.type = CONSTANT.type || 'new';

                validate(thisValue,{
                    success:function(thisVal){
                        thisValue.list = JSON.stringify(thisVal.list);
                        $('#editForm').submit();
                        $.post('/agg/edit',thisValue,function(res){
                            if(res.errno == "0"){
                                window.location.href = '/agg/'+thisValue.name;
                            }else{
                                alert(res.errmsg)
                            }
                        },"JSON")
                    },
                    failed:function(thisVal,errmsg){
                        alert(errmsg)
                    }
                })
            }
	    });

	    $('#editForm').on('submit',function(evt){
	    	evt.preventDefault();
	    })
	}

	init();
})(window,jQuery)