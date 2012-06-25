var url=location.href;
console.log("Hello form test.js");
if(url==='http://www.douban.com/update/'){
	var items=$(".status-item .mod .hd a");
	jQuery.each(items,function(index, item){
					console.log(item.toString());
				});
}