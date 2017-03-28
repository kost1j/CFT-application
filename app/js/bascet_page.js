/*------Блокировка=false и разблокировка=true ссылок навигации при ожидании загрузки с сервера-----*/
function blockedNavigationLink(switchLink){
	var navigation = document.querySelector(".cart-navigation");
		navigation.setAttribute ("data-click", switchLink);
		
};
/*---------------------------------функция создания структуры страницы оплаты---------------------------------*/
function createBascetPageStructure(){
	var linkNumber = 0; 
	var navigation = document.querySelector(".cart-navigation");
	var checkLink;
	/*--------------------присвоение  checkLink=true перед созданием навигации*/
	if (!navigation){ 
		checkLink = true;
	}else{
		checkLink = (navigation.dataset.click === "true")? true : false;
	} 
	/*-----------------------------проверка на активность навигации*/
	if(checkLink){
		document.querySelector('body').className = "cart-body";
		var bodyWrapper = document.querySelector('.body__wrapper');
			bodyWrapper.innerText = "";
			bodyWrapper.className = bodyWrapper.className + " " + "body__wrapper_style_cart";
		
		var cartHeaderTemplate = document.querySelector('.cart-header-template');
		var clone = document.importNode(cartHeaderTemplate.content, true);
		bodyWrapper.appendChild(clone);
		createBascetTablePage();

		blockedNavigationLink(true);/*навигация активна*/

		var cartReturnBottonsWrapper = document.querySelector('.cart1-return-bottons__wrapper');
		var cartReturnBottonsTemplate = document.querySelector('.cart1-return-bottons-template');
		clone = document.importNode(cartReturnBottonsTemplate.content, true);
		cartReturnBottonsWrapper.appendChild(clone);/*вставить кнопку - вернуться назад*/
	}
};
/*-------------------------------------функция создания списка корзины------------------------------------------*/
function createBascetTablePage(){
	var cartContentWrapper = createHtmlElement("div", "cart-content-wrapper");
	var cartTableShoppingTemplate = document.querySelector('.cart-table-shopping-template');
	var clone = document.importNode(cartTableShoppingTemplate.content, true);
	cartContentWrapper.appendChild(clone); 
	document.querySelector('.body__wrapper').appendChild(cartContentWrapper);

	var appCatalogData = {};

	httpGet("api/app_catalog_list.json").then(
	    function(response){
	        appCatalogData = response;
	        fillTableBascetData(appCatalogData);
	    }, 
	    
	    function(value){
	        console.log(value)
	    }
	);
};
/*---------------------------------------функция заполнения списка корзины--------------------------------------*/
function fillTableBascetData(appCatalogData){
	/*------------------------кнопка - вернуться назад*/
	
	
	var buttonElem = document.querySelector('.cart1-next-button');/*кнопка далее или вернуться*/
	textInnerHTML(document.querySelector('.table-shopping__body'),"");/*очищаем таблицу*/
	if(mainBascet.listPurchase.length !== 0){
		var bascetListIndex = 0;/*индекс для добавление данных о пакупках в объект по порядку mainBascet*/
		mainBascet.totalCost = 0;/*обнуляем общую сумму в объекте mainBascet*/
		mainBascet.listPurchaseData = [];/*обнуляем данные о покупках в объекте mainBascet*/
		for(var i=0; i < mainBascet.listPurchase.length; i++){
			for(var a = 0; a < appCatalogData.length; a++){
				if (mainBascet.listPurchase[i] == appCatalogData[a].id){

					mainBascet.listPurchaseData[bascetListIndex] = appCatalogData[a];
					bascetListIndex++;
					mainBascet.totalCost = mainBascet.totalCost + Number(appCatalogData[a].price);
					/*создаем строки таблицы*/
					insertHtmlElement("tbody", "table-shopping__body",
			 				createHtmlElement("tr", "table-shopping__line"));

			 		insertHtmlElement("tr", "table-shopping__line",
			 				createHtmlElement("td", "table-shopping__product", appCatalogData[a].title));

			 		insertHtmlElement("tr", "table-shopping__line",
			 				createHtmlElement("td", "table-shopping__cost", appCatalogData[a].price + "$"));	

			 		insertHtmlElement("tr", "table-shopping__line",
			 				createHtmlElement("td", "table-shopping__total", appCatalogData[a].price + "$"));	

			 		insertHtmlElement("tr", "table-shopping__line",
			 				createHtmlElement("td", "table-shopping__delet","","",
			 					createHtmlElement("div","table-shopping__delet-picture","","","",
			 						[{name: "onclick",value: "outBascet("+appCatalogData[a].id+")"}])));
				}
			}
		}
		}else{
		mainBascet.totalCost = 0;
		document.querySelector('.cart1-return-bottons__wrapper').innerText = "";/*убираем кнопку вернуться назад*/
		buttonElem.innerText = "Вернуться";
		buttonElem.setAttribute("href", "#");
		buttonElem.setAttribute("onclick", "createAppPageStructure()");

	}
		/*--------------------------вывод итоговой суммы*/
		var totalCostInt = Math.trunc(mainBascet.totalCost);
		var totalCostDoit = (mainBascet.totalCost-totalCostInt).toFixed(2);
			totalCostDoit=totalCostDoit.replace("0.","");
		var totalCostIntElem = document.querySelector('.total-cost__integer');
			totalCostIntElem.innerText = "$" + Math.trunc(mainBascet.totalCost);/*!!!!!!!!!!!!!!!!!!!!!*/
			
		insertHtmlElement("p", "total-cost__integer",
			 				createHtmlElement("span", "total-cost__doit", totalCostDoit));	
};
/*---------------------------------------функция прибавления товара в корзину------------------------------------*/
function inBascet(addIndex){
	mainBascet.addPurchase(addIndex);
	var bascetBlock  = document.querySelector('.navigation-bascet__value');
		bascetBlock.innerText = mainBascet.listPurchase.length;/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/

		
		console.log(localStorage);
};	
/*---------------------------------------функция изъятия товара из корзины---------------------------------------*/
function outBascet(addIndex){
	mainBascet.deletePurchase(addIndex);
	fillTableBascetData(mainBascet.listPurchaseData);
};


function createBascetObject(){
	var oop = {
		/*наследование*/
		inherit: function(cls, superClass) {
			cls.prototype = Object.create(superClass.prototype);
			cls.prototype.constructor = cls;
			cls.SuperClass = superClass;
		},
		cls: function (parent, fn) {
			var c = function() { this.__init__ && this.__init__.apply(this, arguments);}; 
			parent && this.inherit(c, parent);/*наследование если parent не null*/
			fn.call(c.prototype);/*прототипом (с) становится (fn)???*/
			return c;
		}
	};

	return oop.cls(null, function() {
		this.__init__ = function() {
			
			var data = localStorage["bascetElem"];
			if (data) {
				this.listPurchase = JSON.parse(data);
			}else{
		 		this.listPurchase = [];
			}
			this.listPurchaseData = [];
			this.totalCost;
		};
		this.addPurchase = function(addIndex) {
			if (this.listPurchase.length !== 0){
				var check = true;
				/*Проверка на повтор товара*/
				for(var i=0; i < this.listPurchase.length; i++){
					if (this.listPurchase[i] === addIndex){
						check = false;
						break;
					}
				}
				if (check){
					this.listPurchase[this.listPurchase.length] = addIndex;
					
				}
			}else{
				this.listPurchase[0] = addIndex;
				
			}
			localStorage.setItem("bascetElem",JSON.stringify(this.listPurchase));
			
		};
		this.deletePurchase = function(addIndex) {
			for(var i=0; i < this.listPurchase.length; i++){
				if (this.listPurchase[i] === addIndex){
					this.listPurchase.splice(i, 1);
					console.log(mainBascet.listPurchase);
					break;
				}
			}
			for(var i=0; i < this.listPurchaseData.length; i++){
				if (this.listPurchaseData[i].id === addIndex){
					this.listPurchaseData.splice(i, 1);
					console.log("!!!!!!!!!!",mainBascet.listPurchaseData);
					break;
				}
			}
			localStorage.setItem("bascetElem",JSON.stringify(this.listPurchase));
		};
	});
} 


var mainBascet = new (createBascetObject());/*----------------------создаем объект корзина*/


function createPaymentScript(){
	insertHtmlElement("head", "",
		 		createHtmlElement("script", "payment_script", "", "js/payment_page.js"));
};

