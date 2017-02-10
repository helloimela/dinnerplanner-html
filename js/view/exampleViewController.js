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
		view.update();
	});

	view.plusButton.click(function(){
		var currentNum = model.getNumberOfGuests();
		model.setNumberOfGuests(currentNum+1);
		view.update();
	});

	view.selectDishType.change(function(){
		// view.dishType = $('#dishType select option:selected').val();
		view.updateDishType($('#dishType select option:selected').val());
		// console.log($('#dishType select option:selected').val());
	});

	// $('.thumbnail').each(function(){
	// 	$(this).on('click',function(){
	// 		view.showView4($(this).attr('id'));
	// 		console.log('click');
	// 	});	
	// });

	$('#dishOptions').on('click','.thumbnail', function(){
		view.showView4($(this).attr('id'));
	});

	view.backToOptions.click(function(){
		view.view4.hide();
		view.view3.show();
	});
}