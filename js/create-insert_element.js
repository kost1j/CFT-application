/*----------------------------------------------функция создания элемента HTML-------------------------------------------*/
/*tagName - имя создаваемого тега*/
/*tagClassName - название класса создаваемого тега*/
/*tagContentText - текстовое содержимое*/
/*tagUrl - href ссылки ( используется при условии если(tagName == a) )*/
/*tagContentTag - содержимоев виде тега ( используется при условии если(tagContentText=="")&&(tagContentTag !== "") )*/

function createHtmlElement(tagName, tagClassName, tagContentText, tagUrl, tagContentTag){
	tagUrl=tagUrl||"#";
	tagContentText=tagContentText||"";
	tagContentTag=tagContentTag||"";
	var child = document.createElement(tagName);
	if(tagClassName!=="") child.className = tagClassName;
	if(tagContentText!=="") {
		child.innerHTML = tagContentText;
	}else if(tagContentTag!==""){
	 child.appendChild (tagContentTag);
	}
	if(tagName==="a") child.setAttribute('href', tagUrl);
	return(child);
};
/*-----------------------------------------функция вставки элемента в другой элемент HTML--------------------------------*/
/*parentTagName - имя родительского элемента*/
/*parentClassName - название класса родительского элемента*/
/*child - вставляемый элемент*/
function insertHtmlElement(parentTagName, parentClassName, child){
	var parent = document.getElementsByClassName(parentClassName);
		parent = parent[parent.length - 1];
	//	console.log(parent);
	parent.appendChild(child);
};