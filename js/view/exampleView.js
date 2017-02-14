//ExampleView Object constructor
var ExampleView = function (container, model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
	this.numberOfGuests = container.find("#numberOfGuests");
	this.numberOfGuests1 = container.find("#numberOfGuests1");
	this.numberOfGuests2 = container.find("#numberOfGuests2");
	this.plusButton = container.find("#plusGuest");
	this.minusButton = container.find("#minusGuest");
	this.menuListTotal = container.find("#allTotalCost");
	this.view3 = container.find("#view3");
	this.view4 = container.find("#view4");

	model.addObserver(this);

	this.update = function(arg){
		
		if(arg==='changeGuest'){
			this.numberOfGuests.html(model.getNumberOfGuests());
			this.numberOfGuests1.html(model.getNumberOfGuests());
			this.numberOfGuests2.html(model.getNumberOfGuests());
			this.updateMenuList();
			this.updateView5();
			//console.log();
			//$('numberOfGuests1').html(model.getNumberOfGuests());
			//$('numberOfGuests2').html(model.getNumberOfGuests());
		} else if(arg==='menu'){
			this.updateMenuList();
			this.updateView5();
		}
	}


	// VIEW 2 Sidebar
	this.numberOfGuests.html(model.getNumberOfGuests());
	this.numberOfGuests1.html(model.getNumberOfGuests());
	this.numberOfGuests2.html(model.getNumberOfGuests());
	this.menuList = container.find('#view2MenuList');
	// menuList.append();
	var finalMenu = [];
	this.updateMenuList = function(){
		this.menuList.empty();
		finalMenu = [];
		var getMenu = model.getFullMenu();
		var menuListWrapper, costDish;
		for(var i=0;i<getMenu.length;i++){
			costDish = model.getCostForDish(getMenu[i].id);
			menuListWrapper = "<li><div class='col-xs-8'>"+getMenu[i].name+"</div><div class='col-xs-4 text-right'>"+costDish+" <span id='"+getMenu[i].id+"' class='glyphicon glyphicon-remove'> </span></div></li>";
			this.menuList.append(menuListWrapper);
		}
		this.menuListTotal.empty().append(model.getTotalMenuPrice());
		finalMenu = model.getFullMenu();
		//console.log(finalMenu);
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
		this.totalDishCost.empty().append("<span>Total : </span>"+model.getCostOneDish(id)+" <span> SEK</span>");
	}


	//show overview page & instruction page
	this.overviewList = container.find('#overviewList');
	this.instructionList = container.find('#instructionList');
	this.totalPrice = container.find('#totalPrice');
	this.updateView5 = function(){
		//this.overview.empty();
		this.overviewList.empty();
		this.instructionList.empty();
		var menuBox, menuImg, menuName, menuPrice, menuPrep, menu_final;
		for(var i=0;i<finalMenu.length;i++){
			menuImg = finalMenu[i].image;
			menuName = finalMenu[i].name;
			menuPrep = finalMenu[i].description;
			menuPrice = model.getCostForDish(finalMenu[i].id);

			menuBox = "<li class='col-sm-3'> <div class='thumbnail'><img src='images/"+menuImg+"'> <div class='caption'><h4>"+menuName+"</h4><p>"+menuPrice+" sek</p></div> </div></li>";
			menu_final = "<li class='col-xs-12'><div class='col-xs-2'><img class='thumbnail' src=images/"+menuImg+"></div><div class='col-xs-5'><h3>"+menuName+"</h3></div><div class='col-xs-5'><h4>Preparetion</h4><br>"+menuPrep+"</div></li>"
			$("#overviewList").append(menuBox);	
			$("#instructionList").append(menu_final);
		}

		this.totalPrice.html(model.getTotalMenuPrice());
	}


}
 
