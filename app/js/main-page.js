function createMainPage(){
	var parent = document.querySelector('.middle');
			if (parent) parent.innerText = ""; /*Очистка блока*/

	(document.querySelector('.middle')).className ="middle middle_background-white";
	 /*------------------------------------------------блок слайдера---------------------------------------------*/
	insertHtmlElement("div", "middle",
		 		createHtmlElement("div", "apps-packages"));
	insertHtmlElement("div", "apps-packages",
		 		createHtmlElement("div", "apps-packages__header"));
	insertHtmlElement("div", "apps-packages__header",
		 		createHtmlElement("h3", "apps-packages__banner", "Пакет приложений"));
	/*{--------------*/
	var atributs = [
		{
			name: "type",
			value: "text"
		},
		{
			name: "placeholder",
			value: "Поиск приложений"
		}
	];
	insertHtmlElement("div", "apps-packages__header",
		 		createHtmlElement("form", "", "", "",
		 			createHtmlElement("input","apps-packages__search","","","", atributs)));
	/*--------------}*/
	insertHtmlElement("div", "apps-packages",
		 		createHtmlElement("div", "apps-packages__rewind-wrapper"));

	insertHtmlElement("div", "apps-packages__rewind-wrapper",
		 		createHtmlElement("div", "apps-packages__rewind-left", "", "", "", [{name: "onclick", value: "leftRewind()"}]));
	insertHtmlElement("div", "apps-packages__rewind-wrapper",
		 		createHtmlElement("div", "apps-packages__rewind-right",  "", "", "", [{name: "onclick", value: "rightRewind()"}]));
	
	insertHtmlElement("div", "apps-packages",
		 		createHtmlElement("div", "apps-packages__wrapper-apps-block"));

	insertHtmlElement("div", "apps-packages",
		 		createHtmlElement("ul", "apps-packages__list-nav-points"));
	/*------------------------------------------------нижний левый блок---------------------------------------------*/
   
	httpGet("api/apps-multi-threaded.json").then(
	    function(response){
	        var appsMultiTthreadedData = response;
	        insertHtmlElement("div", "middle",
				 		createHtmlElement("div", "apps-multi-threaded"));
		    insertHtmlElement("div", "apps-multi-threaded",
				 		createHtmlElement("div", "apps-threaded"));
		    insertHtmlElement("div", "apps-threaded",
				 		createHtmlElement("a", "apps-threaded__header-link", "", "#"));
		    insertHtmlElement("a", "apps-threaded__header-link",
				 		createHtmlElement("h3","apps-threaded__banner", "Многопотоковые приложения"));
		    insertHtmlElement("a", "apps-threaded__header-link",
				 		createHtmlElement("div","pointer apps-threaded__pointer"));
		    insertHtmlElement("div", "apps-threaded",
				 		createHtmlElement("div", "apps-threaded__line"));
		    insertHtmlElement("div", "apps-threaded",
				 		createHtmlElement("ul", "apps-threaded__list"));

		    for(var i=0; i < appsMultiTthreadedData.length; i++){
		    	insertHtmlElement("ul", "apps-threaded__list",
				 		createHtmlElement("li", "apps-threaded__section"));
		    	insertHtmlElement("li", "apps-threaded__section",
				 		createHtmlElement("div", "work-icon apps-threaded__work-icon"));
		    	insertHtmlElement("li", "apps-threaded__section",
				 		createHtmlElement("div", "apps-threaded__link-block"));
		    	insertHtmlElement("div", "apps-threaded__link-block",
				 		createHtmlElement("a", "apps-threaded__name-apps-link",(appsMultiTthreadedData[i]).title, "#"));
		    	insertHtmlElement("div", "apps-threaded__link-block",createHtmlElement("br"));

		    	insertHtmlElement("div", "apps-threaded__link-block",
				 		createHtmlElement("a", "apps-threaded__list-apps-link",("приложений: " + (appsMultiTthreadedData[i]).value), "#"));

		    }
	    }, 
	    
	    function(value){
	        console.log(value)
	    }
	);
   /*------------------------------------------------нижний правый блок---------------------------------------------*/
	httpGet("api/apps-single-threaded.json").then(
	    function(response){
	        var appsSingleTthreadedData = response;

		    insertHtmlElement("div", "middle",
				 		createHtmlElement("div", "apps-single-threaded"));
		    insertHtmlElement("div", "apps-single-threaded",
				 		createHtmlElement("div", "apps-threaded"));
		    insertHtmlElement("div", "apps-threaded",
				 		createHtmlElement("a", "apps-threaded__header-link", "", "#"));
		    insertHtmlElement("a", "apps-threaded__header-link",
				 		createHtmlElement("h3","apps-threaded__banner", "Однопоточные приложения"));
		    insertHtmlElement("a", "apps-threaded__header-link",
				 		createHtmlElement("div","pointer apps-threaded__pointer"));
		    insertHtmlElement("div", "apps-threaded",
				 		createHtmlElement("div", "apps-threaded__line"));
		    insertHtmlElement("div", "apps-threaded",
				 		createHtmlElement("ul", "apps-threaded__list"));

		    for(var i=0; i < appsSingleTthreadedData.length; i++){
		    	insertHtmlElement("ul", "apps-threaded__list",
				 		createHtmlElement("li", "apps-threaded__section"));
		    	insertHtmlElement("li", "apps-threaded__section",
				 		createHtmlElement("div", "education-icon apps-threaded__education-icon"));
		    	insertHtmlElement("li", "apps-threaded__section",
				 		createHtmlElement("div", "apps-threaded__link-block"));
		    	insertHtmlElement("div", "apps-threaded__link-block",
				 		createHtmlElement("a", "apps-threaded__name-apps-link",(appsSingleTthreadedData[i]).title, "#"));
		    	insertHtmlElement("div", "apps-threaded__link-block",createHtmlElement("br"));

		    	insertHtmlElement("div", "apps-threaded__link-block",
				 		createHtmlElement("a", "apps-threaded__list-apps-link",("приложений: " + (appsSingleTthreadedData[i]).value), "#"));

		    }

	    }, 
    
	    function(value){
	        console.log(value)
	    }
	);

	createMainPageSlider();/*Создаем слайдер*/
};
/*------------------------------------------Функция создания базовых блоков приложения-------------------------*/
function createAppPageStructure(){
	var body = document.querySelector('body');
		body.className = "apps-page-body";
	document.querySelector('.body__wrapper').className = "body__wrapper";
	document.querySelector('.body__wrapper').innerText = "";
	var bodyWrapper = document.querySelector('.body__wrapper');
	var appPageTemplate = document.querySelector('.cft-page');
	var clone = document.importNode(appPageTemplate.content, true);
	bodyWrapper.appendChild(clone);
	if(mainBascet.listPurchase.length !== 0){
		/*вышли из корзины не закончив операцию*/
		document.querySelector('.navigation-bascet__value').innerText = mainBascet.listPurchase.length;/*!!!!!!!!!!!!!!!!!!*/
	}
	createMainPage();

}
document.addEventListener("DOMContentLoaded", createAppPageStructure);/*запускаем постройку приложения после HTML*/