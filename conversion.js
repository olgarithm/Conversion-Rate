(function() {
	
	window.addEventListener("load", init);

	function init() {
		id("convert").addEventListener("click", convertKroner);
		id("clear").addEventListener("click", function() {
			clearInput("dollar", "danish")
		});
		id("convert-second").addEventListener("click", convertKrona);
		id("clear-second").addEventListener("click", function() {
			clearInput("dollar-second", "swedish");
		})
	}

	function convertKroner() {
		if (id("danish").value) {
			id("dollar").value = parseInt(id("danish").value) / 6.60859;
		} else {
			id("danish").value = parseInt(id("dollar").value) * 6.60859;
		}
	}

	function convertKrona() {
		if (id("swedish").value) {
			id("dollar-second").value = parseInt(id("swedish").value) / 9.31384;
		} else {
			id("swedish").value = parseInt(id("dollar-second").value) * 9.31384;
		}
	}

	function id(elementId) {
		return document.getElementById(elementId);
	}

	function clearInput(firstInput, secondInput) {
		id(firstInput).value = "";
		id(secondInput).value = "";
	}
})();
