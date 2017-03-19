/*---------------------------------функция создания структуры страницы оплаты---------------------------------*/
function createBascetPageStructure(){
	document.querySelector('body').className = "cart-body";
	
	var bodyWrapper = document.querySelector('.body__wrapper');
		bodyWrapper.innerHTML = "";
		bodyWrapper.className = bodyWrapper.className + " " + "body__wrapper_style_cart";
	
	var cartHeaderTemplate = document.querySelector('.cart-header-template');
	var clone = document.importNode(cartHeaderTemplate.content, true);
	bodyWrapper.appendChild(clone);
	createBascetTablePage();

	var cartReturnBottonsWrapper = document.querySelector('.cart1-return-bottons__wrapper');
	var cartReturnBottonsTemplate = document.querySelector('.cart1-return-bottons-template');
	clone = document.importNode(cartReturnBottonsTemplate.content, true);
	cartReturnBottonsWrapper.appendChild(clone);/*вставить кнопку - вернуться назад*/
};
/*-------------------------------------функция создания списка корзины------------------------------------------*/
function createBascetTablePage(){
	var bodyWrapper = document.querySelector('.body__wrapper');
	var cartTableShoppingTemplate = document.querySelector('.cart-table-shopping-template');
	var clone = document.importNode(cartTableShoppingTemplate.content, true);
	bodyWrapper.appendChild(clone); 

	var appCatalogData = {};
	var xhr = new XMLHttpRequest();
		xhr.open("GET","api/app_catalog_list.json", true);
		xhr.send();
	xhr.onload = function(){
		appCatalogData = JSON.parse(xhr.responseText);
		fillTableBascetData(appCatalogData);
	}
};
/*---------------------------------------функция заполнения списка корзины--------------------------------------*/
function fillTableBascetData(appCatalogData){
	/*------------------------кнопка - вернуться назад*/
	
	
	var buttonElem = document.querySelector('.cart1-next-button');/*кнопка далее или вернуться*/
	document.querySelector('.table-shopping__body').innerHTML = "";/*очищаем таблицу*/

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
			 					createHtmlElement("div","table-shopping__delet-picture","","","",[{name: "onclick",value: "outBascet("+appCatalogData[a].id+")"}])));
				}
			}
		}
		}else{
		mainBascet.totalCost = 0;
		document.querySelector('.cart1-return-bottons__wrapper').innerHTML = "";/*убираем кнопку вернуться назад*/
		buttonElem.innerHTML = "Вернуться";
		buttonElem.setAttribute("href", "#");
		buttonElem.setAttribute("onclick", "createAppPageStructure()");

	}
		/*--------------------------вывод итоговой суммы*/
		var totalCostInt = Math.trunc(mainBascet.totalCost);
		var totalCostDoit = (mainBascet.totalCost-totalCostInt).toFixed(2);
			totalCostDoit=totalCostDoit.replace("0.","");
		var totalCostIntElem = document.querySelector('.total-cost__integer');
			totalCostIntElem.innerHTML = Math.trunc(mainBascet.totalCost);
			
		insertHtmlElement("p", "total-cost__integer",
			 				createHtmlElement("span", "total-cost__doit", totalCostDoit));	
};
/*---------------------------------------функция прибавления товара в корзину------------------------------------*/
function inBascet(addIndex){
	mainBascet.addPurchase(addIndex);
	var bascetBlock  = document.querySelector('.navigation-bascet__value');
		bascetBlock.innerHTML = mainBascet.listPurchase.length;
};	
/*---------------------------------------функция изъятия товара из корзины---------------------------------------*/
function outBascet(addIndex){
	mainBascet.deletePurchase(addIndex);
	fillTableBascetData(mainBascet.listPurchaseData);
};

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
 
var Bascet = oop.cls(null, function() {
	this.__init__ = function() {
	this.listPurchase = [] ;
	this.listPurchaseData = [] ;
	this.totalCost;
	};
	this.addPurchase = function(addIndex) {
		if (this.listPurchase.length !== 0){
			var check = true;
			for(var i=0; i < this.listPurchase.length; i++){
				if (this.listPurchase[i] === addIndex){
					check = false;
					break;
				}
			}
			if (check) this.listPurchase[this.listPurchase.length] = addIndex;
		}else{
			this.listPurchase[0] = addIndex;
		}
		
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
	};
});
var mainBascet = new Bascet();
