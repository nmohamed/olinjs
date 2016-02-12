var $div = $('#inStockIngredients');
var $newTwot = $('#newTwot');
var $allTwots = $('#allTwots');

var onError = function(data, status) {
  console.log("status", status);;
  console.log("error", data);
};


/* INGREDIENT PAGE */

// ADD TWOT
$newTwot.submit(function (event) {
	event.preventDefault();
	var twot = $newTwot.find("#inputTwot").val();
	console.log(twot);
	$.post("add", {
		username: "the biggest twot",
		twot: twot
	})
		.done(showNewTwot)
		.error(onError);
});

var showNewTwot = function(data, status) {
	$allTwots.append(
		'<div class="twot" id="' + data.id + '"><span="tw">@' + data.username + ': ' + data.twot + '</span></div>');
	console.log('allTwots:', $allTwots)
	console.log('twot:', $('.twot').parent().html());
	//update inStock so it knows that there's a new value
	$allTwots.unbind().submit(deleteTwot);
};


// DELETE TWOT
 function deleteTwot (event) {
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