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
//====================================================================
//如果是在新建日记界面
if(location.href==="http://www.douban.com/note/create"){
		console.log("\n>>>>>>>>>>>>>>>>>>");
		console.log("Where am I? :"+location.href);	
		console.log("\n>>>>>>>>>>>>>>>>>>");
		console.log("\n");
 var note_title=$("#note_title");
 var form_note=$("#form_note");
 var note_text=$("#note_text");
 	 note_title.val("今日摘要");
 var pb=$("#publish_note");
 var t=setTimeout(function(){
				//pb.click();
			},10000);
 var text=[];
 Object.keys(localStorage)
      .forEach(function(key){               
               var status=JSON.parse(localStorage[key]);
               if(status.length>4){
               		console.log("> "+status.length+" status....."+JSON.stringify(status[0]));
               		text.push(JSON.stringify(status[0]));
               		console.log("\n");
               		console.log("===========================================");
               		console.log("\n");
               }
       });
 var text_string=text.join("\n");
 note_text.val(text_string);
 console.log(text_string);
}
} )();