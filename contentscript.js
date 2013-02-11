/*
 * Copyright (c) 2010 The Chromium Authors. All rights reserved.  Use of this
 * source code is governed by a BSD-style license that can be found in the
 * LICENSE file.
 */
 
(function(){
	var urlParams = {};
	var debug=3;
	(function () {
	    var match,
	        pl     = /\+/g,  // Regex for replacing addition symbol with a space
	        search = /([^&=]+)=?([^&]*)/g,
	        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
	        query  = window.location.search.substring(1);

	    while (match = search.exec(query))
	       urlParams[decode(match[1])] = decode(match[2]);
	})();
	//console.log(urlParams);
	function dayDiffFromNow(thePast){
			var millisBetween=Date.now()-thePast;
			var millisecondsPerDay = 1000 * 60 * 60 * 24;
			return	Math.floor(millisBetween / millisecondsPerDay);
	}

	//判断是否是第一次运行
	if(debug==1){
		console.log("localStorage['douban_collpse_timeout_mark']:"+localStorage['douban_collpse_timeout_mark']);
	}
	var firstRun = (localStorage['douban_collpse_timeout_mark'] == undefined);
	if(debug==1){console.log("firstRun："+firstRun);}
		if (!firstRun) {
			//不是第一次则比较时间
			var marktime=localStorage['douban_collpse_timeout_mark'];			
    		var days = dayDiffFromNow(marktime);
			//清除所有的缓存？
			if(debug==1){console.log("运行插件的日期差："+days);}
			//这是最简单粗暴的清理原则，但说实话，的确太暴力了
			if(days>3){
				localStorage.clear();
				localStorage['douban_collpse_timeout_mark'] = Date.now();
			}
		}else{
			//是第一次，则设置标记,记录当前时间
			localStorage['douban_collpse_timeout_mark'] = Date.now();
		}


var datatypehash={3043:"推荐单曲",1025:"上传照片",1026:"相册推荐",1013:"推荐小组话题",1018:"我说",1015:"推荐/新日记",1022:"推荐网址",1012:"推荐书评",1002:"看过电影",3049:"读书笔记",1011:"活动兴趣",3065:"东西",1001:"想读/读过",1003:"想听/听过"};

	var cur_location=location.href;
	var ifupdate_url=cur_location.slice(0,29)=="http://www.douban.com/update/";
	var people=cur_location.slice(29,-1);
//====================================================================
//如果是在广播界面
if(ifupdate_url){
var ran=Math.floor((Math.random()*30)+10);
var t=setTimeout(function(){
	var number = urlParams["p"]===undefined?1:parseInt(urlParams["p"], 10);
	//console.log(number);	
	console.log("\n>>>>>>>>>>>>>>>>>>");
		console.log("Where am I? :"+location.href);	
		console.log("I will reload about :"+ran+"s after ");	
	console.log("\n>>>>>>>>>>>>>>>>>>");
	console.log("\n");
	console.log("\n");	
	location.href="http://www.douban.com/update/";			
},1000*ran);
//=========================================================================
var need_save_kind={1026:"相册推荐",1013:"推荐小组话题",1015:"推荐/新日记",1012:"推荐书评",3065:"东西",1025:"推荐相片"}
$("div.status-item").each(function(){
	var myself=$(this);
	//优先判断是否为值得存取的类型
	//【存入数据库】类型
	var data_kind=myself.attr("data-object-kind");
	//【存入数据库】数据行为
	var data_action=myself.attr("data-action");		
//============================================
if((need_save_kind.hasOwnProperty(data_kind))&&(data_action=="0"||data_action=="1")){
	//打印人性化的提示信息
	var action=datatypehash[data_kind]===undefined?data_kind:datatypehash[data_kind];
		if(debug==1){console.log("Kind:"+action);}		
	//【数据库KEY】SID
	var data_sid=myself.attr("data-sid");
		if(debug==1){console.log("ID:"+data_sid);}
	//用户地址
	var user_url=myself.find("div.bd p.text a:first").attr("href");
		if(debug==1){console.log("user_url:"+user_url);}		
	//用户的昵称
	var user_name=myself.find("div.bd p.text a:first").html();
		if(debug==1){console.log("user_name:"+user_name);}
	//用户的发言
	var user_quote=myself.find("div.bd blockquote p").html();
		if(debug==1){console.log("user_quote:"+user_quote);}
	//【存入数据库】用户的唯一ID
	var user_uid=user_url.slice(29,-1);
		if(debug==1){console.log("user_uid:"+user_uid);}
	//【存入数据库】行为对象，div.bd p.text下的第二个a连接的href一般来说就是行为
	var data_object=myself.find("div.bd p.text a:eq(1)").attr("href");
		if(debug==1){console.log("行为对象:"+data_object);}
	//【存入数据库】行为对象的描述
	var data_description=myself.find("div.bd p.text a:eq(1)").html();
		if(debug==1){console.log("行为对象:"+data_description);}
	//【存入数据库？】时间对象？
	var time=myself.find("div.actions span.created_at").attr("title");
		if(debug==1){console.log("Time:"+time);}
	//生成一个全局对象ID的URL并存入数据库
	var uid_url=user_url+"status/"+data_sid;
	//建立新的ITME对象，暂时只记录这一条的UID以及时间还有
	var newitem={};
		newitem.user_uid=user_uid;
		newitem.time=time;
		newitem.user_name=user_name;	
		newitem.uid_url=uid_url;
		newitem.data_sid=data_sid;
		newitem.user_quote=user_quote;
	var status=[];
//=============================================================
//判断是否有KEY存在？如果存在，则取出，加入最新的data，然后保存
	if(localStorage.hasOwnProperty(data_object)){
		//循环外取出对象，到内存(这里应该还有优化的余地)
		var retrievedObject = localStorage.getItem(data_object);
		status=JSON.parse(retrievedObject);
		var ifexist=false;
		//这里应该剔除同一用户的同一全局行为
		jQuery.each(status,function(index, onestatu){		
			if(onestatu.uid_url==uid_url){
				ifexist=true;
			}
		});//Endof 剔除同一全局STATUS_URL的循环
		if((!ifexist)&&(newitem.user_name!=undefined)){
			status.push(newitem);
			status.sort(function(a,b) {return (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0);} );
			//可以在这里加入时间限制，比如超过3天的东西，就不予继续缓存在本地
			localStorage.setItem(data_object, JSON.stringify(status));
		}
		//here we filter some undefined url issues...
		}else if((data_object!=undefined)){
			var newarray=new Array();
			//第一次扫描得到该条目时，ARRAY的第一条为该条目的详细信息
			var dataitem={};
				dataitem.data_description=data_description;
					dataitem.data_timestamp=Date.now();
						newarray.push(dataitem);
						newarray.push(newitem);
			localStorage.setItem(data_object, JSON.stringify(newarray));
		}//判断key/value存储当中dataobject_url是否计入存储的endif
//==============================================================================
//如果大于2则打上颜色标记，并加入展开逻辑的代码，在按钮上附加上数据
//，即所有的status的data_sid，数组，然后处理部分则更简单，读取这个数组，并展开
//这样会减少不必要的AJAX读取
//计划是，给条目加上标记，超过10次之后，每1个小时展开一次全部回复，以追踪话题
if(status.length>50){
	//定位p.text a对象，然后开始修改吧，少年
	
	var user_actions_obj=myself.find("div.actions");
	var snap=user_actions_obj.parent().parent().parent();
		snap.css("background-color","#E9F4E9");
	console.log("Lenght of status:"+status.length);
	console.log("Element before Height:"+snap.outerHeight()); 
	console.log("Status:"+JSON.stringify(status[0])); 
	//var snap=$(".mod[data-status-id='955928757']");
	//处理站展开的函数
		var u_a_o=$(this).parent();
		var user_quote_obj=u_a_o.find("div.bd blockquote");
			user_quote_obj.before("楼主说：");
		jQuery.each(status,function(index, onestatu){
		//不去管第一条META信息，以及本条目本身
		if((index!=0)&&(onestatu.data_sid!=data_sid)){	
			if(onestatu.user_quote!=null){
			//加入用户的发言信息
			var before_quote="<a href='"+onestatu.uid_url+"'>"+onestatu.user_name+"</a>&nbsp;"+onestatu.time+"&nbsp;说:"+"<blockquote><p>"+onestatu.user_quote+"</p></blockquote>";
			}else{
			var before_quote="<a href='"+onestatu.uid_url+"'>"+onestatu.user_name+"</a>&nbsp;"+onestatu.time+"<blockquote><p>什么也没说~</p></blockquote>";
			}
			//因为这里是异步的AJAX调用，所以不可能有任何的返回值，只是空而已
			var comments="";
			function getLatestComments() {
				return $.getJSON("http://www.douban.com/j/status/comments?sid="+onestatu.data_sid,
				function (data) {
				    //console.log(data.comments);
				    comments=data.comments;
				    	var o=$(comments);
				    	//split comments into a array of <p> element
				    	o.find("em").wrap("<blockquote/>");
				    	//bulect join these elements into a single jq object then append it
				    	var span=$("<span></span>").append(o);
				    	//console.log(span);
				    	u_a_o.before(before_quote+span.html());
				    //user_actions_obj.before($(comments).find("p").wrap("<blockquote/>"));
				});//End of Get json
			}
			function successFunc(){
				//console.log("success!");
				console.log("Lenght of status:"+status.length);
				console.log("Element After Height:"+snap.outerHeight());  
				console.log("Status:"+JSON.stringify(status[0])); 
			    }			 
			function failureFunc(){
			    //console.log("failure!");
			    u_a_o.before(before_quote);
			}
			$.when(
			    getLatestComments()
			).then( successFunc, failureFunc );
		}//End of 过滤META信息的if
		});//End of Each
}
//===========================================================
	}
//if((need_save_kind.hasOwnProperty(data_kind))&&(data_action=="0"||data_action=="1"))
//End of line 211 if
});//扫描每个status-item的例程结束		
}//End of if update view?
if(debug==3){
 Object.keys(localStorage)
      .forEach(function(key){
               
               var status=JSON.parse(localStorage[key]);
               if(status.length>5){
               		console.log("> "+status.length+" status....."+JSON.stringify(status[0]));
               		console.log("===========================================");
               }
       });
}
} )();