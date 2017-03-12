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
/*-------------------------------------функция формирования формирования блоков слайдера---------------------------------*/
/*mainParent - основной родитель*/
/*massIndex - массив индексов отображения блоков*/
/*leftRange - левая граница отображения*/
/*rightRange - правая граница отображения*/
/*sliderBlockQuantity - кол-во блоков в слайдере*/
function appsPackegConstructor(mainParent, massIndex, leftRange, rightRange, sliderBlockQuantity){
	var innerBlock = 0; 
	console.log("---------------","\n",massIndex,"\n","---------------","Кол-во объектов", sliderBlockQuantity);
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
/*-----------------------------------функция изменения фокуса слайдера при перемотке назад-------------------------------*/
function leftRewind(){
	parent.innerHTML="";
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
/*-------------------------------------функция изменения слайдера при перемотке вперед-----------------------------------*/
function rightRewind(){
	parent.innerHTML="";
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
	parent.innerHTML="";
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
var appsPackages = [
	/*0*/
	firstBlock = {
		pictureClass:"apps-block__picture-left",
		linkHref: "#",
		linkText: "Стандартный пакет",
		linkClass: "apps-block__banner",
		timeText: "08 впреля 2012",
		timeClass: "apps-block__time"
	},
	/*1*/
	secondBlock = {
		pictureClass:"apps-block__picture-middle",
		linkHref: "CFT-bank-page.html",
		linkText: "Новый ЦФТ-банк", 
		linkClass: "apps-block__banner",
		timeText: "09 сентября 2016",
		timeClass: "apps-block__time"
	},
	/*2*/
	thirdBlock = {
		pictureClass:"apps-block__picture-right",
		linkHref: "#",
		linkText: "Каталог разработок", 
		linkClass: "apps-block__banner",
		timeText: "03 марта 2015",
		timeClass: "apps-block__time"
	},
	/*3*/
	fourthBlock  = {
		pictureClass:"apps-block__picture-left",
		linkHref: "#",
		linkText: "Стандартный пакет",
		linkClass: "apps-block__banner",
		timeText: "08 впреля 2012",
		timeClass: "apps-block__time"
	},
	/*4*/
	fifthBlock  = {
		pictureClass:"apps-block__picture-middle",
		linkHref: "CFT-bank-page.html",
		linkText: "Новый ЦФТ-банк", 
		linkClass: "apps-block__banner",
		timeText: "09 сентября 2016",
		timeClass: "apps-block__time"
	},
	/*5*/
	sixthBlock = {
		pictureClass:"apps-block__picture-right",
		linkHref: "#",
		linkText: "Каталог разработок", 
		linkClass: "apps-block__banner",
		timeText: "03 марта 2015",
		timeClass: "apps-block__time"
	},
	/*6*/
	seventhBlock = {
		pictureClass:"apps-block__picture-right",
		linkHref: "#",
		linkText: "Каталог разработок", 
		linkClass: "apps-block__banner",
		timeText: "03 марта 2015",
		timeClass: "apps-block__time"
	}
]
var blockAmount = 3;/*кол-во отображаемых блоков слайдера*/
var leftFocusRange = appsPackages.length-1;/*6 - порядковый номер начального левого блока слайдера*/
var rightFocusRange = blockAmount-2;/*1 - порядковый номер начального правого блока слайдера*/
var massIndexDisplay = 	selectionDisplayType(false, appsPackages.length);/* выбор типа последовательности отображения*/
var parent = document.querySelector('.apps-packages__wrapper-apps-block');/*основной родитель*/
var navDoteList = document.getElementsByClassName("apps-packages__nav-points");/*список элементов кнопок навигации*/
	navDote = navDoteList[0];/*выбор начальной-первой кнопки*/
	navDote.className = navDote.className + " " + "apps-packages__nav-points_check";/*подсеветка кнопки навигации*/
appsPackegConstructor("apps-packages__wrapper-apps-block", massIndexDisplay, leftFocusRange, rightFocusRange, appsPackages.length);/*вызов функции формирования блока слайдера*/
//console.log("leftFocusRange:",leftFocusRange,"\n","rightFocusRange:",rightFocusRange);/*Проверка границ фокуса вывода*/
