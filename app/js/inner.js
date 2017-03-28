function textInnerHTML(element, text){ 
	text = text.replace(/\&\#62/g,"");
	text = text.replace(/\&gt/g,"");
	text = text.replace(/\>/g,"");
	text = text.replace(/\/\>/g,"");


	text = text.replace(/\&\#60/g,"");
	text = text.replace(/\&lt/g,"");
	text = text.replace(/\</g,"");

	element.innerHTML = text;
}

