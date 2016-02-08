var $div = $('#inStockIngredients');
var $newIngredient = $('#newIngredient');
var $inStock = $('.inStock');

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};


/* INGREDIENT PAGE */

// ADD NEW INGREDIENT
$newIngredient.submit(function (event) {
	event.preventDefault();
	var ingredient = $newIngredient.find("#ingredient").val();
	var price = $newIngredient.find("#price").val();

	$.post("ingredients", {
		ingredient: ingredient,
		price: price
	})
		.done(onSuccess)
		.error(onError);
});

// MAKE NEW INGREDIENT APPEAR
var onSuccess = function(data, status) {
	var $newForm = $inStock.first().clone();
	$newForm.find('div#in').text(data.ingredient + ', $ '+ data.price);
	$newForm.attr("id",data.id);
	$div.append($newForm.clone().wrap('<p>').parent().html()); //outerHTML workaround
	//update inStock so it knows that there's a new value
	$inStock = $('.inStock').unbind();
	$inStock.submit(inStockBIND);
};


// MAKING OUT OF STOCK
 function inStockBIND (event) {
	var self = this;
	event.preventDefault();
	var id = $(this).attr('id');
	console.log('id:', id);
	$.post("delete", {
		_id: id
	})
		.done(function (data, status) {
			console.log(data.message);
			$(self).remove();
		})
		.error(onError);
 };

$inStock.submit(inStockBIND);


// EDIT INGREDIENT
$('.edit-button').click(function (event) {
	$editDiv = $(this).parent().find('.edit-div');
	$editDiv.toggle();
});


// SUBMIT EDITED INGREDIENT

$('.edit-submit').click(function (event) {
	var ingr = $(this).parent().find('#edit-ingredient').val();//edit-ingredient
	var price = $(this).parent().find('#edit-price').val();//edit-ingredient

	if (ingr === "" || price === "") {
		console.log('please input values');
	} else if (isNaN(price)) {
		console.log('price must be a number');
	} else {
		$(this).parent().parent().find('div#in').text(ingr + ", $" + price);
		var id = $(this).parent().parent().attr('id');
		$.post("edit", {
			_id: id,
			ingredient: ingr,
			price: price
		})
			.done(function (data, status) {
				console.log(data.message);
			})
			.error(onError);;
	}
});


/* ORDER PAGE */

// UPDATE PRICE TOTAL
$('input.check-order').click(function (event) {
	//when checking items
	var checkbox = event.target;
	var $price = $('#price');
	var curVal = $price.html();
	var addVal = $(checkbox).is(":checked") ? checkbox.value : -checkbox.value;
	var newVal = Number(curVal) + Number(addVal);
	$price.html(newVal.toFixed(2));

	console.log('total price now:', newVal);
});


// SUBMIT ORDER
$('form#order-form').submit(function (event) {
	event.preventDefault();
	
	var allIngredients = [];
	$('#order-form input:checked').each(function() {
	    allIngredients.push($(this).attr('name'));
	})

	var $checkbox = $('.check-order');
	var curVal = $('#price').html();

	$.post("makeOrder", {
				ingr: allIngredients,
				total: curVal
	})
		.done(function (data, status) {
			console.log(data.message);
		})
		.error(onError);
});


/* KITCHEN PAGE */

$('.kitchen-order').submit(function (event) {
	event.preventDefault();
	var self = this;
	var id = $(self).attr('id');
	console.log('deleting burger id:', id);
	$.post("deleteKitchen", {
		_id: id
	})
		.done(function (data, status) {
			console.log(data.message);
			$(self).remove();
		})
		.error(onError);
});