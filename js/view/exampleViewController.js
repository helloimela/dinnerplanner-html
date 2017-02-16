function ExampleViewController(view,model){
	$('#view2').hide();
	$('#view3').hide();
	$('#view4').hide();
	$('#view5').hide();
	$('#view6').hide();

	$('#toView2').click(function(){
		$('#view1').hide();
		$('#view2').show();
		$('#view3').show();
	});

	view.minusButton.click(function(){
		var currentNum = model.getNumberOfGuests();
		model.setNumberOfGuests(currentNum-1);
	});

	view.plusButton.click(function(){
		var currentNum = model.getNumberOfGuests();
		model.setNumberOfGuests(currentNum+1);
	});

	view.selectDishType.change(function(){
		view.updateDishType($('#dishType select option:selected').val());
	});

	view.btnSearch.click(function(e){
		view.updateDishType($('#dishType select option:selected').val(),view.keywords.val());
		e.preventDefault();
	});

	$('#dishOptions').on('click','#displayAll', function(){
		view.updateDishType($('#dishType select option:selected').val());
	});


	$('#dishOptions').on('click','.thumbnail', function(){
		view.showView4($(this).attr('id'));
	});

	view.backToOptions.click(function(){
		view.view4.hide();
		view.view3.show();
	});

	$('#ingredients').on('click','#addDishButton',function(){
		model.addDishToMenu(view.currentID);
	})

	$('#confirmStep').click(function(){
		$('#view2').hide();
		$('#view3').hide();
		$('#view4').hide();
		$('#view5').show();
	})

	$('#goBack').click(function(){
		$('#view5').hide();
		$('#view2').show();
		$('#view3').show();
	})

	$('#printRecipe').click(function(){
		$('#view5').hide();
		$('#view6').show();		
	})

	$('#goBack2').click(function(){
		$('#view6').hide();
		$('#view2').show();
		$('#view3').show();
	})

	// Remove menu from list
	$('#view2MenuList').on('click','.glyphicon.glyphicon-remove', function(e){
		model.removeDishFromMenu(e.currentTarget.id);
		//console.log(e.currentTarget.id);
	});

}