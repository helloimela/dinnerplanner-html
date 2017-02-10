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

	$('#dishOptions').on('click','.thumbnail', function(){
		view.showView4($(this).attr('id'));
	});

	view.backToOptions.click(function(){
		view.view4.hide();
		view.view3.show();
	});

	$('#ingredients').on('click','#addDishButton',function(){
		model.addDishToMenu(view.currentID);
		console.log(view.currentID);
	})
}