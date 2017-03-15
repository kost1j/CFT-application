function formSidebarLinkData(sidebarData){
	var resultSidebarData = [];
	for(var i=0; i <sidebarData.length; i++){
		resultSidebarData[i] = {
			id: sidebarData[i].id,
			linkHref: sidebarLinkGuid[sidebarData[i].guid],
			linkText: sidebarData[i].title,
			timeUnix: sidebarData[i].last
		}
	}
	return(resultSidebarData);
};

sidebarLinkGuid={
	"37b53ff4-0933-11e7-93ae-92361f002671" : "#",
	"37b5426a-0933-11e7-93ae-92361f002671" : "CFT-bank-page.html",
	"37b5471a-0933-11e7-93ae-92361f002671" : "#",
	"37b5481e-0933-11e7-93ae-92361f002671" : "Rent-safes-page.html",
	"37b548fa-0933-11e7-93ae-92361f002671" : "#",
	"37b549cc-0933-11e7-93ae-92361f002671" : "#",
	"37b54a8a-0933-11e7-93ae-92361f002671" : "#",
	"37b54b5c-0933-11e7-93ae-92361f002671" : "#",
	"37b54f08-0933-11e7-93ae-92361f002671" : "#",
	"37b54ff8-0933-11e7-93ae-92361f002671" : "#",
	"37b5516a-0933-11e7-93ae-92361f002671" : "#",
	"37b552b4-0933-11e7-93ae-92361f002671" : "#",
	"37b55386-0933-11e7-93ae-92361f002671" : "#",
	"37b5544e-0933-11e7-93ae-92361f002671" : "#"
}

var sidebarList =[];
var xhr = new XMLHttpRequest();
	xhr.open("GET","api/sidebar_list.json", true);
	xhr.send();
xhr.onload = function(){
	sidebarList = formSidebarLinkData(JSON.parse(xhr.responseText));
	/*-------------------------------------------------создание и отображение элементов sidebar*/
	for(var i=0; i < sidebarList.length;i++){
		insertHtmlElement("", "sidebar__list",
 			createHtmlElement("li", "", "", "",
 				createHtmlElement("a", "sidebar__link", sidebarList[i].linkText, sidebarList[i].linkHref)));
	}
};



