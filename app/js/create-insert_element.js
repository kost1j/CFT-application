/*----------------------------------------------функция создания элемента HTML-------------------------------------------*/
/*tagName - имя создаваемого тега*/
/*tagClassName - название класса создаваемого тега*/
/*tagContentText - текстовое содержимое*/
/*tagUrl - href ссылки ( используется при условии если(tagName == a) )*/
/*tagContentTag - содержимоев виде тега ( используется при условии если(tagContentText=="")&&(tagContentTag !== "") )*/
/*atribute - список атрибутов. Элементы списка в виде {name:"", value:""}*/

function createHtmlElement(tagName, tagClassName, tagContentText, tagUrl, tagContentTag, atribute){
	tagClassName = tagClassName||"";
	tagUrl=tagUrl||"#";
	tagContentText=tagContentText||"";
	tagContentTag=tagContentTag||"";
	atribute = atribute||"";
	var child = document.createElement(tagName);
	if(tagClassName!=="") child.className = tagClassName;
	if(tagContentText!=="") {
		child.innerText = tagContentText;/------------------------------------/
	}else if(tagContentTag!==""){
	 child.appendChild (tagContentTag);
	}

	if(tagName==="a"){
		child.setAttribute('href', tagUrl);
	} else if(tagName ==="script"){
		child.setAttribute('src', tagUrl);
		child.setAttribute('type', "text/javascript");
	}
	
	if(atribute!==""){ 
		for(var i=0; i <atribute.length; i++){
			child.setAttribute(atribute[i].name, atribute[i].value);
		}
	}
	return(child);
};
/*-----------------------------------------функция вставки элемента в другой элемент HTML--------------------------------*/
/*parentTagName - имя родительского элемента*/
/*parentClassName - название класса родительского элемента*/
/*child - вставляемый элемент*/
function insertHtmlElement(parentTagName, parentClassName, child){
	parentTagName = parentTagName||"";
	var parent;
	if(parentClassName!==""){
		parent = document.getElementsByClassName(parentClassName);
	}else if (parentTagName!==""){
		parent = document.getElementsByTagName(parentTagName);
	}
	parent = parent[parent.length - 1];
	parent.appendChild(child);
};
/*----------------------------------------Преобразование Unix в текстовый вид "dd_месяц_yy"------------------------------*/
function convertUnixDate(ms){
	var dateText = "";
	var dd, mm, yy;
	ms = new Date(ms*1000);
	dd = ms.getDate();
	switch(ms.getMonth()) {
 		case 0:
 			mm = "января";
 			break;
 		case 1:
 			mm = "февраля";
 			break;
 		case 2:
 			mm = "марта";
 			break;
 		case 3:
 			mm = "апреля";
 			break;
 		case 4: 
 			mm = "мая";
 			break;
 		case 5: 
 			mm = "июня";
 			break;
 		case 6: 
 			mm = "июля";
 			break;
 		case 7: 
 			mm = "августа";
 			break;
 		case 8: 
 			mm = "сентября";
 			break;
 		case 9: 
 			mm = "октября";
 			break;
 		case 10: 
 			mm = "ноября";
 			break;
 		case 11: 
 			mm = "декабря";
 			break;
    }
    yy = ms.getFullYear();
	return(dd + " " + mm + " " + yy);

};