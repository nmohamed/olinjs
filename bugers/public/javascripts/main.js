var $div = $('#inStockIngredients');
var $newIngredient = $('#newIngredient');
var $inStock = $('.inStock');
var $edit = $('.edit');

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

var onSuccess = function(data, status) {
	// MAKE NEW INGREDIENT APPEAR
	var $newForm = $inStock.first().clone();
	$newForm.find('div').text(data.ingredient + ', $ '+ data.price);
	$newForm.attr("id",data.id);
	$div.append($newForm.clone().wrap('<p>').parent().html());
	$inStock = $('.inStock').unbind(); //update inStock so it knows that there's a new value
	
	$inStock.submit(inStockBIND);
	// console.log($inStock);
	console.log($div.html());
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
$edit.click(function() {
	console.log('click!', this);
	// $('#edit-form').show();
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

	console.log(allIngredients);

	var $checkbox = $('.check-order');
	if ($checkbox.is(':checked')) {
		console.log($checkbox);
	}

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

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};