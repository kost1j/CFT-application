var sidebarList =[
	{
		linkHref:"#",
		linkText: "Стандартный пакет"
	},
	{
		linkHref:"CFT-bank-page.html",
		linkText: "Новый ЦФТ-Банк"
	},
	{
		linkHref:"#",
		linkText: "Cash Management"
	},
	{
		linkHref:"Rent-safes-page.html",
		linkText: "Аренда сейфов"
	},
	{
		linkHref:"#",
		linkText: "Банковские гарантии"
	},
	{
		linkHref:"#",
		linkText: "Казначейство"
	},
	{
		linkHref:"#",
		linkText: "Страхование"
	},
	{
		linkHref:"#",
		linkText: "Факторинговое обслуживание"
	},
	{
		linkHref:"#",
		linkText: "Переводы средств"
	},
	{
		linkHref:"#",
		linkText: "Расчетный центр"
	},
	{
		linkHref:"#",
		linkText: "Пластиковые карты"
	},
	{
		linkHref:"#",
		linkText: "Финансовый мониторинг"
	},
	{
		linkHref:"#",
		linkText: "Депозиты и вклады"
	},
	{
		linkHref:"#",
		linkText: "Инвестиции"
	}
]
/*-------------------------------------------------создание и отображение элементов sidebar*/
for(var i=0; i < sidebarList.length;i++){
	insertHtmlElement("", "sidebar__list",
	 createHtmlElement("li", "", "", "",
	 	createHtmlElement("a", "sidebar__link", sidebarList[i].linkText, sidebarList[i].linkHref)));
}
