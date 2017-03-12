function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
function getRandomMassivInt(lengParentMass){
	var randMassName=[],
		i=0;
	while(randMassName.length < lengParentMass){
		var rand = getRandomInt(0, lengParentMass - 1);
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
function createElement(perentClassName, childTag, childClassName, childContent, childUrl){
	childUrl=childUrl||"#";
	childContent=childContent||"";
	/*console.log( "В функцию createElement передано:",
				 "\n" + "-родительский класс:", perentClassName,"\n" + "-тег потомка:", "<", childTag, ">", "\n" + "-класс потомка:", childClassName,
				 "\n" + "-содержимое потомка:", childContent,"\n" + "-url ссылки:", childUrl);*/
	var perent = document.getElementsByClassName(perentClassName);
		perent = perent[perent.length - 1];
	var child = document.createElement(childTag);
	child.className = childClassName;
	if(childContent!=="") child.innerHTML = childContent;
	if(childTag==="a") child.setAttribute('href', childUrl);
	perent.appendChild(child);
};

function appsPackegConstructor(mainPerent, innerBlock){
	createElement(mainPerent, "div", "apps-block apps-packages__apps-block");
	createElement("apps-packages__apps-block", "div", innerBlock.pictureClass);
	createElement("apps-packages__apps-block", "a", innerBlock.linkClass, innerBlock.linkText, innerBlock.linkHref);
	createElement("apps-packages__apps-block", "time", innerBlock.timeClass, innerBlock.timeText);
};

var appsPackages = [

	firstBlock = {
		pictureClass:"apps-block__picture-left",
		linkHref: "#",
		linkText: "Стандартный пакет",
		linkClass: "apps-block__banner",
		timeText: "08 впреля 2012",
		timeClass: "apps-block__time"
	},
	secondBlock = {
		pictureClass:"apps-block__picture-middle",
		linkHref: "CFT-bank-page.html",
		linkText: "Новый ЦФТ-банк", 
		linkClass: "apps-block__banner",
		timeText: "09 сентября 2016",
		timeClass: "apps-block__time"
	},
	thirdBlock = {
		pictureClass:"apps-block__picture-right",
		linkHref: "#",
		linkText: "Каталог разработок", 
		linkClass: "apps-block__banner",
		timeText: "03 марта 2015",
		timeClass: "apps-block__time"
	}
]

/*----------------------вывод объектов appsPackages по значениям массива рандомных значений---*/

var mass = getRandomMassivInt(appsPackages.length);
for(var i=0; i < mass.length; i++){
		appsPackegConstructor("apps-packages__wrapper-apps-block", appsPackages[mass[i]]);
	}

setInterval(function(){
	var perent = document.querySelector('.apps-packages__wrapper-apps-block');
	var mass = getRandomMassivInt(appsPackages.length);
	perent.innerHTML="";
	for(var i=0; i < mass.length; i++){
		appsPackegConstructor("apps-packages__wrapper-apps-block", appsPackages[mass[i]]);
	}
}, 1000);
console.log(mass);