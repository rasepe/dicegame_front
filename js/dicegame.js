var arrayPlayers = new Array();

function addNewPlayer() {

	var newPlayerName = document.getElementById("name").value;

	//var newShopMaxPictures = document.getElementById("maxPictures").value;



	var newPlayer = {
			"name": newPlayerName,
	}


	console.log(newPlayer);
	cleanFieldsNewPlayer();

	$.ajax({
		type: "POST",
		contentType: "application/json",
		url: "http://localhost:8080/players",
		data: JSON.stringify(newPlayer),    
		success: function(data) {
			console.log("success");
		},
		error: function(){
			alert("json not found");
		}
	});

}


function cleanFieldsNewPlayer() {
	document.getElementById("name").value="";
	//document.getElementById("maxPictures").value="";

}



function loadIds(playerId) {
	var constructedUrl = "http://localhost:8080/players/";


	$.ajax({
		type: "GET",
		url: constructedUrl,
		success: function(data) {

			manage(data,playerId);

		},
		error: function(){
			alert("json not found");
		}
	});


}


function manage(objects,playerId) {
	var options;
	for (var i=0; i<objects.content.length; i++) {
		options += '<option value="'+objects.content[i].id+'">'+objects.content[i].id+'</option>';	
		arrayPlayers.push(objects.content[i]);
	}
	document.getElementById(playerId).innerHTML = options;
}


function playNewGame() {

	
	//var newPictureAuthor = document.getElementById("pictureAuthor").value;
	//var newPictureName = document.getElementById("pictureName").value;
	//var newPicturePrice = parseFloat(document.getElementById("picturePrice").value);
    var currentPlayerId = document.getElementById("playerId")[document.getElementById("playerId").selectedIndex].value;
    var currentPlayer;
    for (var i=0; i<arrayPlayers.length; i++) {
    	if (currentPlayerId==arrayPlayers[i].id) {
    		currentPlayer = arrayPlayers[i];
    	}
    }

    console.log(currentPlayer);
  //  console.log(currentShop.maxPictures);
   // console.log(currentShop.numPictures);
   // cleanFieldsNewPlayer();

    
  //  if (currentShop.numPictures < currentShop.maxPictures) {
    	   var newGame = {
    				player: currentPlayer
    		}

    	    var constructedURL = "http://localhost:8080/players/" + currentPlayerId + "/games";
    		console.log(constructedURL);

    		$.ajax({
    			type: "POST",
    			contentType: "application/json",
    			url: constructedURL,
    			data: JSON.stringify(newGame),  
    			success: function(data) {
    				console.log("success");
    				location.reload();
    			},
    			error: function(){
    				alert("json not found");
    			}
    		});
  //  } else {
   // 	document.getElementById("pictureLimit").innerHTML = "Maximum number of pictures for this shop is: " + currentShop.maxPictures;
    //}
    


}


function seeAllPlayers() {

	var constructedUrl = "http://localhost:8080/players/";


	$.ajax({
		type: "GET",
		url: constructedUrl,
		success: function(data) {

			print(data, "listPlayers");

		},
		error: function(){
			alert("json not found");
		}
	});


}


function print(objects, id) {

	var result = "";
	if (objects.content.length>0) {
		for (var i=0; i<objects.content.length; i++) {
			if (objects.content[i].name == null) {
				objects.content[i].name = "ANONYMOUS";
			};
			result += JSON.stringify(objects.content[i])+"<br>";
		}

	}
	else {
		result = "NO RESULTS";
	}
	document.getElementById(id).innerHTML = result;
}

function seeGamesByPlayer() {

		
		var currentPlayerId = document.getElementById("playerId")[document.getElementById("playerId").selectedIndex].value;

		var constructedUrl = "http://localhost:8080/players/" + currentPlayerId + "/games";

		console.log(constructedUrl);

		$.ajax({
			type: "GET",
			url: constructedUrl,
			success: function(data) {

				print(data, "gameList");

			},
			error: function(){
				alert("json not found");
			}
		});



}

function updatePlayer() {
	
	var editId = document.getElementById("playerId")[document.getElementById("playerId").selectedIndex].value;
	var editName = document.getElementById("editName").value;
	//var editRole = document.getElementById("editRole")[document.getElementById("editRole").selectedIndex].value;
	//var auth = "Basic " + btoa({usname} + ":" + {password});

	var editPlayer = {
			"name": editName
	}

	editPlayer = JSON.stringify(editPlayer); //'{"id":'+editId+'}';

	var constructedURL = "http://localhost:8080/players/" + editId; //

	$.ajax({
		type: "PUT",
		contentType: "application/json",
		url: constructedURL,
		data: editPlayer, 
		success: function(data) {

		},
		error: function(){
			alert("json not found");
		}
	});
}



function deleteGames() {
	
	
	var currentPlayerId = document.getElementById("playerId")[document.getElementById("playerId").selectedIndex].value;
	var constructedUrl = "http://localhost:8080/players/" + currentPlayerId + "/games";
		
		$.ajax({
			type: "DELETE",
			contentType: "application/json",
			url: constructedUrl,
			data: currentPlayerId, 
			success: function(data) {
			

			},
			error: function(){
				alert("json not found");
			}
		});
		

}



function seeAverage() {

	var constructedUrl = "http://localhost:8080/players/ranking";


	$.ajax({
		type: "GET",
		url: constructedUrl,
		success: function(data) {

			printAverage(data, "listPlayers");

		},
		error: function(){
			alert("json not found");
		}
	});


}

function printAverage(average, id) {


			var result = JSON.stringify(average);

	document.getElementById(id).innerHTML = result;
}

function seeLoser() {

	var constructedUrl = "http://localhost:8080/players/ranking/loser";


	$.ajax({
		type: "GET",
		url: constructedUrl,
		success: function(data) {

			printSingleObject(data, "listPlayers");

		},
		error: function(){
			alert("json not found");
		}
	});


}

function printSingleObject(object, id) {


	var result = JSON.stringify(object);

document.getElementById(id).innerHTML = result;
}


function seeWinner() {

	var constructedUrl = "http://localhost:8080/players/ranking/winner";


	$.ajax({
		type: "GET",
		url: constructedUrl,
		success: function(data) {

			printSingleObject(data, "listPlayers");

		},
		error: function(){
			alert("json not found");
		}
	});


}
