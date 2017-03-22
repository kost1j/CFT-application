function activateNavigationLink(indexLink, funcLink){
	/*ставим галочку предыдущему элементу*/
	var navigationCircleCheck = document.getElementsByClassName("cart-navigation__circle");
		navigationCircleCheck[indexLink - 1].innerText = "";
		navigationCircleCheck[indexLink - 1].appendChild(createHtmlElement("div", "cart-navigation__check-mark"));
	/* делаем элемент активным*/
	var navigationBlock = document.getElementsByClassName("cart-navigation__block"),
		navigationCircle = document.getElementsByClassName("cart-navigation__circle"),
		navigationText = document.getElementsByClassName("cart-navigation__text"),
		navigationLine = document.getElementsByClassName("cart-navigation__line");

	if(funcLink) navigationBlock[indexLink].setAttribute("onclick", funcLink);
	navigationCircle[indexLink].className = "cart-navigation__circle cart-navigation_style_link";
	navigationText[indexLink].className = "cart-navigation__text cart-navigation__text_style_link";
	navigationLine[indexLink-1].className = "cart-navigation__line cart-navigation_style_link";
	
	/*убираем ссылки следующих элементов*/
	for(var i = indexLink + 1; i< navigationBlock.length; i++){
		navigationBlock[i].setAttribute("onclick", "");
		navigationCircle[i].className = "cart-navigation__circle";
		navigationText[i].className = "cart-navigation__text";
		navigationLine[i-1].className = "cart-navigation__line";
		navigationCircleCheck[i-1].innerText = i;
	}
};
/*------------------------------------------------------------*/
function createPaymentPage(){
	var linkNumber = 1; 
	var navigation = document.querySelector(".cart-navigation");
	var checkLink = (navigation.dataset.click === "true")? true : false;/*перевод строки в boolean*/
	/*-----------------------------проверка на активность навигации*/
	if(checkLink){
		var cartContentWrapper = document.querySelector('.cart-content-wrapper');
			cartContentWrapper.innerText = "";
		var cartPaymentTemplate = document.querySelector('.cart-payment-template');
		var clone = document.importNode(cartPaymentTemplate.content, true);
		cartContentWrapper.appendChild(clone);
		activateNavigationLink(linkNumber, "createPaymentPage()");
	}
};
/*оплата и создание страницы доставки*/
function createDeliveryPage(){

	var linkNumber = 2; 
	var navigation = document.querySelector(".cart-navigation");
	var checkLink = (navigation.dataset.click === "true")? true : false;/*перевод строки в boolean*/
	/*-----------------------------проверка на активность навигации*/
	if(checkLink){
		var cartContentWrapper = document.querySelector('.cart-content-wrapper');
			cartContentWrapper.innerText = "";
		var cartDeliveryTemplate = document.querySelector('.cart-delivery-template');
		var clone = document.importNode(cartDeliveryTemplate.content, true);
		cartContentWrapper .appendChild(clone);
		activateNavigationLink(linkNumber, "createDeliveryPage()");
	}
};
/*отправка данных заказщика и создание конечной страницы заказа*/
function createFinalPaymentPage(){
	var linkNumber = 3; 
	var navigation = document.querySelector(".cart-navigation");
	var checkLink = (navigation.dataset.click === "true")? true : false;/*перевод строки в boolean*/
	/*-----------------------------проверка на активность навигации*/
	if(checkLink){
		var cartContentWrapper = document.querySelector('.cart-content-wrapper');
			cartContentWrapper.innerText = "";
		var cartFinalTemplate = document.querySelector('.cart-final-template');
		var clone = document.importNode(cartFinalTemplate.content, true);
		cartContentWrapper .appendChild(clone);
		activateNavigationLink(linkNumber, "");
		localStorage.clear();
		mainBascet = new (createBascetObject());
	}
};

/*----------------------------------------------------------------------------------*/

function sendOrder(contactsData){
	blockedNavigationLink(false);
	console.log("Данные заказщика: \n", contactsData);
	createAnimationLoader();
	/*Дальнейшие операции по отправке заказа*/
	/*Если успешно, возварщаем true*/
	return true;
};
/*----------------------------------------------------------------------------------*/
function payOrder(cartData){
	blockedNavigationLink(false);
	console.log("Данные по оплате: \n:", cartData);
	createAnimationLoader();
	/*Дальнейшие операции по оплате*/
	/*Если успешно, возварщаем true*/
	return true;
};
/*----------------------------------------------------------------------------------*/

function checkPayForm(){
	var onCheck = false;/*-----------------------------------------!!!!!!!!!!!!!!!!!!!!!!!!!!!! ----отключаем проверку*/
	if(onCheck){
		var cartMonthCheck = false,
			cartNumberCheck = false,
			cartYearCheck = false,
			cartOwnerCheck = false,
			cartCvvCheck = false,
			sendCheck = false;
		var reg;
		var cartNumber = document.querySelector(".cart-information__cart-number"),
		 	cartMonth = document.querySelector(".cart-information__month"),
		 	cartYear = document.querySelector(".cart-information__year"),
		 	cartOwnerName = document.querySelector(".cart-information__owner-name"),
		 	cartCvv = document.querySelector(".cart-information__cvv");
		var cartData = {
			owner: cartOwnerName.value,
			number: cartNumber.value,
			month: cartMonth.value,
			year: cartYear.value,
			cvv: cartCvv.value
		} 

		/*Проверка ввода имени владельца*/
		/*Имя больше 3-х букв eng, ru*/
		reg = /^(\s*[A-Za-z]{3,}\s*)|(\s*[А-Яа-я]{3,}\s*)$/;
		if(reg.test(cartData.owner)){
			cartOwnerName.className = "cart-information__owner-name";
			cartOwnerCheck = true;
		}else{
			cartOwnerName.className = cartOwnerName.className + " " + "cart-information_style_error";
		 	cartOwnerCheck = false;
		}
		/*проверка месяца*/
		/* месяц формата 1-12 и 01-12*/
		reg = /^(1[0-2]{1})$|^(0[1-9]{1})$|^([1-9]{1})$/;
		if(reg.test(cartData.month)){
			cartMonth.className = "cart-information__month";
			cartMonthCheck = true;
		}else{
			cartMonth.className = cartMonth.className + " " + "cart-information_style_error";
		 	cartMonthCheck = false;
		}
		/*проверка номера карты*/
		/* номер карты 16 и 15 символьный с пробелом, тире или без 1234-1234-1234-1234 или 1234-123456-12345*/
		reg = /(^([0-9]{4}(\s?|-?)){3}[0-9]{4}\s*$)|(^([0-9]{4}(\s?|-?))([0-9]{6}(\s?|-?))([0-9]{5}(\s?|-?))\s*$)/;
		if(reg.test(cartData.number)){
			cartNumber.className = "cart-information__cart-number";
			cartNumberCheck = true;
		}else{
			cartNumber.className = cartNumber.className + " " + "cart-information_style_error";
		 	cartNumberCheck = false;
		}
		/*проверка года*/
		/*Год от 2017 до 2025 или 17 до 25*/
		if(((cartData.year > 2016) && (cartData.year <= 2025))||((cartData.year > 16) && (cartData.year <= 25))){
			cartYear.className = "cart-information__year";
			cartYearCheck = true;
		}else{
			cartYear.className = cartYear.className + " " + "cart-information_style_error";
		 	cartYearCheck = false;
		}
		/*проверка cvv*/
		/*cvv - трехзначное число*/
		if((cartData.cvv >= 100) && (cartData.cvv <= 999)){
			cartCvv.className = "cart-information__cvv";
			cartCvvCheck = true;
		}else{
			cartCvv.className = cartCvv.className + " " + "cart-information_style_error";
		 	cartCvvCheck = false;
		}

		if(cartNumberCheck && cartMonthCheck && cartOwnerCheck && cartYearCheck && cartCvvCheck){
			if (payOrder(cartData)){
				 setTimeout(function(){
				 	blockedNavigationLink(true);/*разблокировать навигацию*/
				 	createDeliveryPage();/*построить страницу доставки*/
				 }, (getRandomInt(1, 4))*1000);
			}else{
				alert("Произошла ошибка оплаты заказа! Попробуйте снова");
			}
		}else{
			//alert("Проверте правильность ввода формы");
		}
	}else{/*ОБХОД ПРОВЕРКИ*/
		if (payOrder(cartData)){
			setTimeout(function(){
				 	blockedNavigationLink(true);/*разблокировать навигацию*/
				 	createDeliveryPage();/*построить страницу доставки*/
				 }, (getRandomInt(1, 4))*1000);
		}else{
			alert("Произошла ошибка оплаты заказа! Попробуйте снова");
		}
	}
};
/*----------------------------------------------------------------------------------*/

function checkSendForm(){
	var onCheck = false;/*-----------------------------------------!!!!!!!!!!!!!!!!!!!!!!!!!!!! ----отключаем проверку*/
	if(onCheck){
		var surnameCheck = false,
			nameCheck = false,
			phoneCheck = false,
			emailCheck = false;
		var reg;
		var surname = document.querySelector(".contact-information__surname"),
		 	name = document.querySelector(".contact-information__name"),
		 	phone = document.querySelector(".contact-information__phone"),
		 	email = document.querySelector(".contact-information__email");
		 	
		var contactsData = {
			surname: surname.value,
			name: name.value,
			phone: phone.value,
			email: email.value,
			idPurchase: mainBascet.listPurchaseData,
			totalCoast: mainBascet.totalCost
		} 
		
		/*Проверка ввода фамилии заказщика*/
		/*Фамилия больше 3-х букв eng, ru*/
		reg = /^(\s*[A-Za-z]{3,}\s*)|(\s*[А-Яа-я]{3,}\s*)$/;
		if(reg.test(contactsData.surname)){
			surname.className = "contact-information__surname";
			surnameCheck = true;
		}else{
			surname.className = surname.className + " " + "contact-information_style_error";
		 	surnameCheck = false;
		}
		/*Проверка ввода имени заказщика*/
		/*Фамилия больше 3-х букв eng, ru*/
		reg = /^(\s*[A-Za-z]{3,}\s*)|(\s*[А-Яа-я]{3,}\s*)$/;
		if(reg.test(contactsData.name)){
			name.className = "contact-information__name";
			nameCheck = true;
		}else{
			name.className = name.className + " " + "contact-information_style_error";
		 	nameCheck = false;
		}
		/*Проверка ввода телефона заказщика*/
		reg = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
		if(reg.test(contactsData.phone)){
			phone.className = "contact-information__phone";
			phoneCheck = true;
		}else{
			phone.className = phone.className + " " + "contact-information_style_error";
		 	phoneCheck = false;
		}

		/*Простая, первичная проверка email*/
		reg = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/;
		if(reg.test(contactsData.email)){
			email.className = "contact-information__email";
			emailCheck = true;
		}else{
			email.className = email.className + " " + "contact-information_style_error";
		 	emailCheck = false;
		}

		if(surnameCheck && nameCheck && phoneCheck && emailCheck){
			if(sendOrder(contactsData)){
				 setTimeout(function(){
				 	blockedNavigationLink(true);/*разблокировать навигацию*/
				 	createFinalPaymentPage();/*построить финальную страницу*/
				 }, (getRandomInt(1, 4))*1000);
			}else{
				alert("Произошла ошибка отправки заказа! Попробуйте снова");	
			}
		}else{
			//alert("Проверте правильность ввода формы");
		}
	}else{ /*ОБХОД ПРОВЕРКИ*/
		if(sendOrder(contactsData)){
			  setTimeout(function(){
				 	blockedNavigationLink(true);/*разблокировать навигацию*/
				 	createFinalPaymentPage();/*построить финальную страницу*/
				 }, (getRandomInt(1, 4))*1000);
		}else{
			alert("Произошла ошибка отправки заказа! Попробуйте снова");	
		}
	}
};
/*----------------------------------------------------------------------------------*/

function createAnimationLoader(){
	var cartContentWrapper = document.querySelector('.cart-content-wrapper');
			cartContentWrapper.innerText = "";
			insertHtmlElement("div", "cart-content-wrapper",
			 				createHtmlElement("div", "animate-block-loader"));
}

/*----------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------*/
console.log(mainBascet);
createPaymentPage();/*запуск при создании*/
