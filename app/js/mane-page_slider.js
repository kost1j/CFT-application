
/*---------------------------------------функция получения рандомного целого между max и min----------------------------*/
function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
/*-------------------------------функция формирования случайного порядока отображения блоков слайдера-------------------*/
/* SliderBlockQuantity - кол-во блоков в слайдере*/
function getRandomMassivInt(SliderBlockQuantity){
	var randMassName=[],
		i=0;
	while(randMassName.length < SliderBlockQuantity){
		var rand = getRandomInt(0, SliderBlockQuantity - 1);
		var chek=true;
		for(var a=0; a <= randMassName.length; a++){
			if(rand==randMassName[a]){
				chek=false;
				randMassName[a] = rand;
				break;
			}
		}
		if(chek){
			randMassName[i]=rand;
			i++;
		}
	}
	return randMassName;
};
/*------------------------------------функция формирования последовательности отображения блоков-------------------------*/
/*displayType(true) - случайное отображение*/
/*displayType(false) - отображение по порядку*/
/*sliderBlockQuantity - кол-во блоков в слайдере*/
function selectionDisplayType(displayType, sliderBlockQuantity){
	if(displayType){
		return(getRandomMassivInt(sliderBlockQuantity));
	}else{
		var massIndexGradual = [];
		for(var i=0; i < sliderBlockQuantity; i++){
			massIndexGradual[i]=i;
		}
		return(massIndexGradual);
	}
};
/*-----------------------------------------------------функция формирования блоков слайдера---------------------------------*/
/*mainParent - основной родитель*/
/*massIndex - массив индексов отображения блоков*/
/*leftRange - левая граница отображения*/
/*rightRange - правая граница отображения*/
/*sliderBlockQuantity - кол-во блоков в слайдере*/
function appsPackegConstructor(mainParent, massIndex, leftRange, rightRange, sliderBlockQuantity){
	var innerBlock = 0; 
	//console.log("---------------","\n",massIndex,"\n","---------------","Кол-во объектов", sliderBlockQuantity);
	var i = leftRange;
	while(i!==(rightRange+1)){
		if(i==(sliderBlockQuantity))i=0;
		innerBlock=appsPackages[massIndex[i]];
		insertHtmlElement("", mainParent, createHtmlElement("div","apps-block apps-packages__apps-block"));
		insertHtmlElement("", "apps-packages__apps-block", createHtmlElement("div", innerBlock.pictureClass));
		insertHtmlElement("", "apps-packages__apps-block", createHtmlElement("a", innerBlock.linkClass, innerBlock.linkText, innerBlock.linkHref));
		insertHtmlElement("", "apps-packages__apps-block", createHtmlElement("time", innerBlock.timeClass, innerBlock.timeText));
		//console.log("Порядковый номер объекта: ",massIndex[i],"\n",innerBlock=appsPackages[massIndex[i]],"\n","----------------------------");
		i++;
	}
};
/*-------------------------------------------функция формирования навигационных точек слайдера----------------------------------------*/
function createNavigationDote(sliderBlockQuantity){
	for( var i=0; i < sliderBlockQuantity; i++){
		insertHtmlElement("ul", "apps-packages__list-nav-points",
		 		createHtmlElement("li", "apps-packages__nav-points", "", "", "", [{name: "onclick", value: "pointsRewind("+i+")"}]));	
	}
};
/*-----------------------------------функция изменения фокуса слайдера при перемотке назад-------------------------------*/
function leftRewind(){
	parent.innerText="";
	navDote.className = "apps-packages__nav-points";
	if (leftFocusRange!==0){
		navDote = navDoteList[leftFocusRange];
		leftFocusRange--;
	}else{
		navDote = navDoteList[leftFocusRange];
		leftFocusRange = appsPackages.length-1;
	}
	if (rightFocusRange!==0){
		rightFocusRange--;
	}else{
		rightFocusRange = appsPackages.length-1;
	}
	//console.log("leftFocusRange:",leftFocusRange,"\n","rightFocusRange:",rightFocusRange);/*Проверка границ фокуса вывода*/
	appsPackegConstructor("apps-packages__wrapper-apps-block", massIndexDisplay, leftFocusRange, rightFocusRange, appsPackages.length);
	navDote.className = navDote.className + " " + "apps-packages__nav-points_check";
};
/*-------------------------------------функция изменения фокуса слайдера при перемотке вперед-----------------------------------*/
function rightRewind(){
	parent.innerText="";
	navDote.className = "apps-packages__nav-points";
	if (leftFocusRange!==(appsPackages.length-1)){
		leftFocusRange++;
	}else{
		leftFocusRange = 0;
	}
	if (rightFocusRange!==(appsPackages.length-1)){
		navDote = navDoteList[rightFocusRange];
		rightFocusRange++;
	}else{
		navDote = navDoteList[rightFocusRange];
		rightFocusRange = 0;
	}
	//console.log("leftFocusRange:",leftFocusRange,"\n","rightFocusRange:",rightFocusRange);/*Проверка границ фокуса вывода*/
	appsPackegConstructor("apps-packages__wrapper-apps-block", massIndexDisplay, leftFocusRange, rightFocusRange, appsPackages.length);
	navDote.className = navDote.className + " " + "apps-packages__nav-points_check";
};
/*--------------------------------функция изменения фокуса слайдера при нажатии на точку навигации-----------------------*/
/*index - номер точки навигации*/
function pointsRewind(index){
	parent.innerText="";
	navDote.className = "apps-packages__nav-points";
	navDote = navDoteList[index];
	navDote.className = navDote.className + " " + "apps-packages__nav-points_check";
	if(index==0){
		leftFocusRange=appsPackages.length-1;
		rightFocusRange=1;
	}else if(index==(appsPackages.length-1)){
		leftFocusRange=index-1;
		rightFocusRange=0;
	}else{
		leftFocusRange=index-1;
		rightFocusRange=index+1;
	}
	//console.log("leftFocusRange:",leftFocusRange,"\n","rightFocusRange:",rightFocusRange);/*Проверка границ фокуса вывода*/
	appsPackegConstructor("apps-packages__wrapper-apps-block", massIndexDisplay, leftFocusRange, rightFocusRange, appsPackages.length);
};
/*---------------------------функция создания объекта представления appsPackages из Json данных--------------------------*/
function formAppsPackegesData(packegesData){
	var resultPackegesData = [];
	for(var i=0; i < packegesData.length; i++){
		resultPackegesData[i] = { 
			id: packegesData[i].id,
			linkText: packegesData[i].title,
			timeText: convertUnixDate(packegesData[i].last),
			timeUnix: packegesData[i].last,
			pictureClass: (appsPackagesGuid[0])[packegesData[i].guid],
			linkHref: (appsPackagesGuid[1])[packegesData[i].guid],
			linkClass: appsPackagesGuid[2],
			timeClass: appsPackagesGuid[3]
		}
	}
	return (resultPackegesData);
};
function createManePageSlider(){
	httpGet("api/apps_slider_list.json").then(
	    function(response){
	        appsPackages = formAppsPackegesData(response);
	        blockAmount = 3;/*кол-во отображаемых блоков слайдера*/
	        leftFocusRange = appsPackages.length-1;/*6 - порядковый номер начального левого блока слайдера*/
	        rightFocusRange = blockAmount-2;/*1 - порядковый номер начального правого блока слайдера*/
	        massIndexDisplay = 	selectionDisplayType(false, appsPackages.length);/* выбор типа последовательности отображения*/
	        /*-------------------------------создание точек*/
			createNavigationDote(appsPackages.length);
			parent = document.querySelector('.apps-packages__wrapper-apps-block');/*основной родитель*/
			navDoteList = document.getElementsByClassName("apps-packages__nav-points");/*список элементов кнопок навигации*/
			/*--------------------обнуление классов*/
			if (parent) {
				parent.innerText="";
				for(var i=0; i < navDoteList.length; i++){
					navDoteList[i].className = "apps-packages__nav-points"
				}
			}
			navDote = navDoteList[0];/*выбор начальной-первой кнопки*/
			navDote.className = navDote.className + " " + "apps-packages__nav-points_check";/*подсеветка кнопки навигации*/

			appsPackegConstructor("apps-packages__wrapper-apps-block", massIndexDisplay, leftFocusRange, rightFocusRange, appsPackages.length);
			//console.log("leftFocusRange:",leftFocusRange,"\n","rightFocusRange:",rightFocusRange);/*Проверка границ фокуса вывода*/
	    }, 
	    
	    function(textError){
	        console.log(textError);
	    }
	);
};
var appsPackages = [];
var blockAmount;
var leftFocusRange;
var rightFocusRange;
var massIndexDisplay;
var parent;
var navDoteList;
var	navDote;
/*------------------------------значения guid*/
var appsPackagesGuid = [
	pictureClass = {
		"4303db00-07f7-11e7-93ae-92361f002671": "apps-block__picture-first",
		"4303dd8a-07f7-11e7-93ae-92361f002671": "apps-block__picture-second",
		"4303de8e-07f7-11e7-93ae-92361f002671": "apps-block__picture-third",
		"4303df60-07f7-11e7-93ae-92361f002671": "apps-block__picture-first",
		"4303e03c-07f7-11e7-93ae-92361f002671": "apps-block__picture-second",
		"4303e384-07f7-11e7-93ae-92361f002671": "apps-block__picture-third",
		"4303e46a-07f7-11e7-93ae-92361f002671": "apps-block__picture-first"
	},
	linkHref = {
		"4303db00-07f7-11e7-93ae-92361f002671": "#",
		"4303dd8a-07f7-11e7-93ae-92361f002671": "#",
		"4303de8e-07f7-11e7-93ae-92361f002671": "#",
		"4303df60-07f7-11e7-93ae-92361f002671": "#",
		"4303e03c-07f7-11e7-93ae-92361f002671": "#",
		"4303e384-07f7-11e7-93ae-92361f002671": "#",
		"4303e46a-07f7-11e7-93ae-92361f002671": "#"
	},
	linkClass = "apps-block__banner",
	timeClass = "apps-block__time"
];




