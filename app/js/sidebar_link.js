function formSidebarLinkData(sidebarData, sidebarGuid){
		var resultSidebarData = [];
		for(var i=0; i <sidebarData.length; i++){
			resultSidebarData[i] = {
				id: sidebarData[i].id,
				linkOnclicIndex: sidebarGuid[sidebarData[i].guid],
				linkHref: "#",
				linkText: sidebarData[i].title,
				timeUnix: sidebarData[i].last
			}
		}
		return(resultSidebarData);
};
function createCatalogPage(){
	var parent = document.querySelector('.middle');
			if (parent) parent.innerText = ""; /*Очистка блока*/
	(document.querySelector('.middle')).className ="middle";
	
	/*---------------------------------создание структуры сайдбара*/
	insertHtmlElement("div", "middle",
		 			createHtmlElement("aside", "sidebar sidebar__list_background-white"));
	insertHtmlElement("aside", "sidebar",
		 			createHtmlElement("h2", "sidebar__banner", "Каталог приложений"));
	insertHtmlElement("aside", "sidebar",
		 			createHtmlElement("ul", "sidebar__list"));

/*------------------------------значения guid*/
	var sidebarOnclicIndexGuid={
		"4303db00-07f7-11e7-93ae-92361f002671" : 0,
		"4303dd8a-07f7-11e7-93ae-92361f002671" : 1,
		"37b5471a-0933-11e7-93ae-92361f002671" : 2,
		"37b5481e-0933-11e7-93ae-92361f002671" : 3,
		"37b548fa-0933-11e7-93ae-92361f002671" : 4,
		"37b549cc-0933-11e7-93ae-92361f002671" : 5,
		"37b54a8a-0933-11e7-93ae-92361f002671" : 6,
		"37b54b5c-0933-11e7-93ae-92361f002671" : 7,
		"37b54f08-0933-11e7-93ae-92361f002671" : 8,
		"37b54ff8-0933-11e7-93ae-92361f002671" : 9,
		"37b5516a-0933-11e7-93ae-92361f002671" : 10,
		"37b552b4-0933-11e7-93ae-92361f002671" : 11,
		"37b55386-0933-11e7-93ae-92361f002671" : 12,
		"37b5544e-0933-11e7-93ae-92361f002671" : 13
	}

	var sidebarList =[];

	httpGet("api/sidebar_list.json").then(
	    function(response){
	       sidebarList = formSidebarLinkData(response, sidebarOnclicIndexGuid); 
	       /*-------------------------------------------------создание и отображение элементов sidebar*/
			for(var i=0; i < sidebarList.length;i++){
				insertHtmlElement("", "sidebar__list",
		 			createHtmlElement("li", "", "", "",
		 				createHtmlElement("a", "sidebar__link", sidebarList[i].linkText, sidebarList[i].linkHref,"",
		 					[{name: "onclick", value:"createMainBlockCatalogPage("+sidebarList[i].linkOnclicIndex+")"}])));
			}
	    }, 
	    
	    function(value){
	        console.log(value)
	    }
	);

	createMainBlockCatalogPage(1);/*страница при первом запуске*/
};

