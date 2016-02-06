var $div = $('#inStockIngredients');
var $newIngredient = $('#newIngredient');
var $inStock = $('.inStock');

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
	console.log($inStock);
	// console.log($div.html());
};

// CHANGE CURRENT INGREDIENTS

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
					console.log($div.html());
					$(self).remove();
					console.log($div.html());
				})
				.error(onError);
 };

$inStock.submit(inStockBIND);

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};