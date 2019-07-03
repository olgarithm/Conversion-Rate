(function() {
	
	window.addEventListener("load", init);

	function init() {
		id("submit").addEventListener("click", convertCurrency);
	}

	function convertCurrency() {
		if (id("danish").value) {
			id("dollar").value = parseInt(id("danish").value) / 6.60859;
		} else {
			id("danish").value = parseInt(id("dollar").value) * 6.60859;
		}
	}

	function id(elementId) {
		return document.getElementById(elementId);
	}
})();
