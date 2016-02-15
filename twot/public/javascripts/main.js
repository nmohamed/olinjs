var $div = $('#inStockIngredients');
var $newTwot = $('#newTwot');
var $allTwots = $('#allTwots');
var $twotForm = $('.twotForm');
var $loginForm = $('#loginForm');

var onError = function(data, status) {
  console.log("status", status);;
  console.log("error", data);
};


/* INGREDIENT PAGE */

// ADD TWOT
$newTwot.submit(function (event) {
	event.preventDefault();
	var twot = $newTwot.find("#inputTwot").val();
	$.post("add", {
		twot: twot
	})
		.done(showNewTwot)
		.error(onError);
});

var showNewTwot = function(data, status) {
	if (data.message === true) {
		$allTwots.prepend(
			'<form class="twotForm" id="' + data.id + '" action="delete" method="POST">' + 
			'<div class="twot"><span id="tw">@' + data.username + ': ' + data.twot + 
			'</span> <input type="submit" value="DELETE"></div></form>');
		//rebind allTwots so deleteTwot knows there is a new Twot available to delete
		$allTwots.unbind().submit(deleteTwot);
	} else if (data.message === false) {
		console.log('Please log in');
	}
};


// DELETE TWOT
 function deleteTwot (event) {
	var self = this;
	event.preventDefault();
	console.log(self);
	var id = $(self).attr('id');
	var usernameHTML = $(self).find("#tw").html();
	var username = usernameHTML.substring(1, usernameHTML.indexOf(":"));
	console.log("username:", username);
	console.log('id:', id);
	$.post("delete", {
		_id: id,
		username: username
	})
		.done(function (data, status) {
			if (data.message === true){
				console.log("Removing twot.");
				$(self).remove();
			} else if (data.message === false){
				console.log("Invalid user.");
			}
		})
		.error(onError);
 };

$twotForm.click(deleteTwot);


/* LOG IN */

$loginForm.submit(function (event) {
	event.preventDefault();
	$.post("login", {
		username:  $loginForm.find("#username").val(),
		password:  $loginForm.find("#pw").val()
	})
		.done(function (data, status) {
			console.log("Submitted user. data:", data);
			if(data.message === true){ //correct password
				var currentUser = data.username;
				console.log("Correct pw, redirecting to index page.");
				window.location.replace('/index');
			} else if(data.message === false){	//incorrect password
				console.log("Incorrect password, try again.");
				$("#incorrect").text('Incorrect username and/or password. Please try again.');
			} else if(data.message === 1){
				console.log("User added, redirecting to index page");
				window.location.replace('/index');
			}
		})
		.error(onError);
});



// // EDIT INGREDIENT
// $('.edit-button').click(function (event) {
// 	$editDiv = $(this).parent().find('.edit-div');
// 	$editDiv.toggle();
// });


// // SUBMIT EDITED INGREDIENT

// $('.edit-submit').click(function (event) {
// 	var ingr = $(this).parent().find('#edit-ingredient').val();//edit-ingredient
// 	var price = $(this).parent().find('#edit-price').val();//edit-ingredient

// 	if (ingr === "" || price === "") {
// 		console.log('please input values');
// 	} else if (isNaN(price)) {
// 		console.log('price must be a number');
// 	} else {
// 		$(this).parent().parent().find('div#in').text(ingr + ", $" + price);
// 		var id = $(this).parent().parent().attr('id');
// 		$.post("edit", {
// 			_id: id,
// 			ingredient: ingr,
// 			price: price
// 		})
// 			.done(function (data, status) {
// 				console.log(data.message);
// 			})
// 			.error(onError);;
// 	}
// });