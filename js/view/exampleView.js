//ExampleView Object constructor
var ExampleView = function (container, model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
	this.numberOfGuests = container.find("#numberOfGuests");
	this.plusButton = container.find("#plusGuest");
	this.minusButton = container.find("#minusGuest");
	
	this.numberOfGuests.html(model.getNumberOfGuests());


	//get dish type from selected options
	this.dishType = $('#dishType select option:selected').val();

	// display all dishes
	var dishes = model.getSelectedDish(this.dishType);
	var dishWrapper, dishImg, dishName, dishDesc;
	for (i = 0; i<dishes.length;i++) {
		dishImg = dishes[i].image;
		dishName = dishes[i].name;
		dishDesc = dishes[i].description;

		dishWrapper="<li class='col-sm-4'> <div class='thumbnail'><img src='images/"+dishImg+"'> <div class='caption'><h4>"+dishName+"</h4><p>"+dishDesc+"</p></div> </div></li>";

		$("#dishOptions ul").append(dishWrapper);
	}

	//detail page
	this.dishSummary = container.find("#dishSummary");
	this.dishPrep = container.find("#dishPreparation");
	this.dishIngr = container.find("#ingredients ul");

	this.oneDish = model.getDish(1);
	this.showIngredients = model.getIngredients(1);

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


	// get total price
	this.totalCost = container.find("#totalCost");
	this.totalCost.append("<span>Total : </span>"+model.getTotalMenuPrice(1)+" <span> SEK</span>");
	
}
 
