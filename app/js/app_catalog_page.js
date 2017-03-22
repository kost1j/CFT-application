function createAppCatalogElement(catalogData){
		/*----------------------*/

		insertHtmlElement("section", "main",
		 			createHtmlElement("div", "main__head-wrapper"));

		insertHtmlElement("div", "main__head-wrapper",
		 			createHtmlElement("h3", "main-banner main-banner_style_underline", catalogData.title));
		/*----------------------*/

		insertHtmlElement("section", "main",
		 			createHtmlElement("div", "main__wrapper-content"));

		insertHtmlElement("div", "main__wrapper-content",
		 			createHtmlElement("div", "product-discription"));

		insertHtmlElement("div", "product-discription",
		 			createHtmlElement("div", "product-discription__wrapper-text"));
		
		insertHtmlElement("div", "product-discription__wrapper-text",
		 			createHtmlElement("time", "product-discription__last-update", catalogData.timeText));

		insertHtmlElement("div", "product-discription__wrapper-text",
		 			createHtmlElement("p", "product__description-text",catalogData.description));

		insertHtmlElement("div", "product-discription__wrapper-text",
		 			createHtmlElement("p", "product__requirements-text",catalogData.requirements + "<br>"+"<br>" + "Стоимость приложения: " + catalogData.price + "$"));
		
		insertHtmlElement("div", "product-discription",
		 			createHtmlElement("div", "product-discription__picture-block"));

		insertHtmlElement("div", "product-discription__picture-block",
		 			createHtmlElement("div", catalogData.pictureClass));

		insertHtmlElement("div", "product-discription__picture-block",
		 			createHtmlElement("a", "product-discription__buttom product-discription__buttom_style_red-border", "В корзину","","",
		 				[{name: "onclick", value: "inBascet("+catalogData.id+")"}]));

		/*----------------------*/

		insertHtmlElement("div", "main__wrapper-content",
		 			createHtmlElement("div", "product-function", "", "", 
		 				createHtmlElement("h3","main-banner main-banner_style_underline","Основные функции")));

		insertHtmlElement("div", "product-function",
		 			createHtmlElement("ul", "product-function__list"));
		for(var i =0; i < catalogData.features.length; i++){
		insertHtmlElement("ul", "product-function__list",
		 			createHtmlElement("li", "product-function__text-wrapper","","",
		 				createHtmlElement("span","product-function__text", catalogData.features[i])));
		}
	};

/*---------------------------функция создания объекта представления  appCatalogData из Json данных--------------------------*/
	function formAppCatalogData(catalogData, i, catalogGuid){
		var resultCatalogData = {};
			resultCatalogData = {
				id: catalogData[i].id,
				title: catalogData[i].title,
				timeText: convertUnixDate(catalogData[i].lastUpdate),
				timeUnix: catalogData[i].lastUpdate,
				pictureClass: catalogGuid[catalogData[i].guid],
				description: catalogData[i].description,
				requirements: catalogData[i].requirements,
				features: catalogData[i].features,
				price: catalogData[i].price
			}
		//console.log(resultCatalogData);
		return(resultCatalogData);
	};

function createMainBlockCatalogPage(index){
	/*-------------------------------------------Очистка блока <section class="main">*/
	var parent = document.querySelector('.main');
			if (parent) {
				parent.innerText = "";
			}else{
				insertHtmlElement("div", "middle",
		 			createHtmlElement("section", "main main_background_white"));
			} 
	/*функция создания основной структуры страницы описания приложения*/
	
/*------------------------------значения guid*/
	var appCatalogGuid = {
		"4303db00-07f7-11e7-93ae-92361f002671": "product-discription__picture-standard-package",
		"4303dd8a-07f7-11e7-93ae-92361f002671": "product-discription__picture-new-cft-bank",
		"37b5471a-0933-11e7-93ae-92361f002671": "product-discription__picture-none",
		"37b5481e-0933-11e7-93ae-92361f002671": "product-discription__picture-none",
		"37b548fa-0933-11e7-93ae-92361f002671": "product-discription__picture-none",
		"37b549cc-0933-11e7-93ae-92361f002671": "product-discription__picture-none",
		"37b54a8a-0933-11e7-93ae-92361f002671": "product-discription__picture-none",
		"37b54b5c-0933-11e7-93ae-92361f002671": "product-discription__picture-none",
		"37b54f08-0933-11e7-93ae-92361f002671": "product-discription__picture-none",
		"37b54ff8-0933-11e7-93ae-92361f002671": "product-discription__picture-none",
		"37b5516a-0933-11e7-93ae-92361f002671": "product-discription__picture-none",
		"37b552b4-0933-11e7-93ae-92361f002671": "product-discription__picture-none",
		"37b55386-0933-11e7-93ae-92361f002671": "product-discription__picture-none",
		"37b5544e-0933-11e7-93ae-92361f002671": "product-discription__picture-none"
	}
	var appCatalogData = {};
	var xhr = new XMLHttpRequest();
		xhr.open("GET","api/app_catalog_list.json", true);
		xhr.send();
	xhr.onload = function(){
		appCatalogData = formAppCatalogData(JSON.parse(xhr.responseText), index, appCatalogGuid);
		createAppCatalogElement(appCatalogData);
	}
};


