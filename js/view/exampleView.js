//ExampleView Object constructor
var ExampleView = function (container, model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
	this.numberOfGuests = container.find("#numberOfGuests");
	this.plusButton = container.find("#plusGuest");
	this.minusButton = container.find("#minusGuest");
	this.menuListTotal = container.find("#allTotalCost");
	this.view3 = container.find("#view3");
	this.view4 = container.find("#view4");

	model.addObserver(this);

	this.update = function(arg){
		
		if(arg==='changeGuest'){
			this.numberOfGuests.html(model.getNumberOfGuests());
			this.updateMenuList();
		} else if(arg==='menu'){
			this.updateMenuList();
		}
	}


	// VIEW 2 Sidebar
	this.numberOfGuests.html(model.getNumberOfGuests());
	this.menuList = container.find('#view2MenuList');
	// menuList.append();
	this.updateMenuList = function(){
		this.menuList.empty();
		var getMenu = model.getFullMenu();
		var menuListWrapper, costDish;
		for(i=0;i<getMenu.length;i++){
			costDish = model.getCostForDish(getMenu[i].id);
			menuListWrapper = "<li><div class='col-xs-6'>"+getMenu[i].name+"</div><div class='col-xs-6 text-right'>"+costDish+"</div></li>";
			this.menuList.append(menuListWrapper);
		}
		this.menuListTotal.empty().append(model.getTotalMenuPrice());

	}
	this.updateMenuList();
	

	// VIEW 3 display all dishes

	//get dish type from selected options
	this.dishType = $('#dishType select option:selected').val();
	this.selectDishType = container.find('#dishType select');

	this.updateDishType = function(dishType){
		var dishes = model.getSelectedDish(dishType);
		var dishWrapper, dishImg, dishName, dishDesc;
		$("#dishOptions ul").empty();
		for (i = 0; i<dishes.length;i++) {
			dishImg = dishes[i].image;
			dishName = dishes[i].name;
			dishDesc = dishes[i].description.substr(0,25)+'...';

			dishWrapper="<li class='col-sm-4'> <div id='"+dishes[i].id+"' class='thumbnail'><img src='images/"+dishImg+"'> <div class='caption'><h4>"+dishName+"</h4><p>"+dishDesc+"</p></div> </div></li>";

			$("#dishOptions ul").append(dishWrapper);
		}
	}
	this.updateDishType(this.dishType);
	

	// VIEW 4 detail page
	this.backToOptions = container.find('#backToOptions');
	this.currentID;
	// add dish button
	this.addDishButton = container.find("#addDishButton");

	// function to show view 4
	this.showView4 = function(id){
		var id = parseInt(id);
		this.currentID = id;
		this.view3.hide();
		this.view4.show();
		this.dishSummary = container.find("#dishSummary");
		this.dishPrep = container.find("#dishPreparation");
		this.dishIngr = container.find("#ingredients ul");

		this.dishSummary.empty();
		this.dishIngr.empty();

		this.oneDish = model.getDish(id);
		this.showIngredients = model.getIngredients(id);

		this.dishSummary.append("<h4>"+this.oneDish.name+"</h4> <img src='images/"+this.oneDish.image+"'> <p>"+this.oneDish.description+"</p>");

		//get complete ingredients for one dish
		var quantity, unit, name, price;
		for(i=0; i<this.showIngredients.length;i++){
			quantity = this.showIngredients[i].quantity;
			unit = this.showIngredients[i].unit;
			name = this.showIngredients[i].name;
			price = this.showIngredients[i].price;
			this.dishIngr.append("<li><span class='quantity'>"+quantity+" "+unit+"</span><span class='name'>"+name+"</span><span>SEK</span><span class='price'>"+price+"</span></li>");
		}

		this.totalDishCost = container.find("#totalDishCost");
		this.totalDishCost.empty().append("<span>Total : </span>"+model.getCostForDish(id)+" <span> SEK</span>");
	}


	//show overview page
	this.overview = container.find("#overview");
	var menu = model.getFullMenu();
	var menuBox, menuImg, menuName, menuPrice, menuPrep, menu_final;
	var total = model.getTotalMenuPrice();
	for(var i=0; i<menu.length; i++){
		menuImg = menu[i].image;
		menuName = menu[i].name;
		menuPrep = menu[i].description;
		menuPrice = model.getCostForDish(menu[i].id);

		menuBox = "<li class='col-sm-4'> <div class='thumbnail'><img src='images/"+menuImg+"'> <div class='caption'><h4>"+menuName+"</h4><p>"+menuPrice+"</p></div> </div></li>";
		menu_final = "<li class='col-xs-12'><div class='col-xs-2'><img class='thumbnail' src=images/"+menuImg+"></div><div class='col-xs-5'><h3>"+menuName+"</h3></div><div class='col-xs-5'><h4>Preparetion</h4><br>"+menuPrep+"</div></li>"
		$("#overview ul").append(menuBox);	
		$("#instruction ul").append(menu_final);	
	}
	$("#totalPrice").append(total);

	// get total price
	this.totalCost = container.find("#totalCost");
	this.totalCost.append("<span>Total : </span>"+model.getCostForDish(1)+" <span> SEK</span>");
	
	//final page

}
 
