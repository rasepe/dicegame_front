var currentPlayer = JSON.parse(localStorage.getItem("currentPlayer"));
	//console.log("currentplaer:" + currentPlayer);
	
	if (currentPlayer===null) {
		window.open("http://localhost/dicegame/","_self")
 }	