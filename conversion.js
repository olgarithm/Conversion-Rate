(function() {
	
	window.addEventListener("load", init);

	function init() {
		id("convert").addEventListener("click", convertKroner);
		id("clear").addEventListener("click", function() {
			clearInput("dollar", "danish", "disclaimer-danish");
		});
		id("convert-second").addEventListener("click", convertKrona);
		id("clear-second").addEventListener("click", function() {
			clearInput("dollar-second", "swedish", "disclaimer-swedish");
		})
		id("convert-third").addEventListener("click", convertEuro);
		id("clear-third").addEventListener("click", function() {
			clearInput("dollar-third", "euro", "disclaimer-euro");
		})
	}

	function convertKroner() {
		fetch("https://api.exchangeratesapi.io/latest?base=USD&symbols=DKK")
			.then(checkStatus)
			.then(JSON.parse)
			.then(convertKronerHelper)
			.catch(function(response) {
				convertMoneyHelper("danish", "dollar", 6.60859);
				id("disclaimer-danish").innerText = "1 UDS = 6.608 DKK " + 
				"(Note this is an approximation)";
				id("disclaimer-danish").classList.remove("hidden");
			});
	}

	function convertKronerHelper(response) {
		let rate = response.rates.DKK;
		convertMoneyHelper("danish", "dollar", rate);
		id("disclaimer-danish").innerText = "1 USD = " + rate.toFixed(3) + " DKK " + 
			"on " + response.date;
		id("disclaimer-danish").classList.remove("hidden");
	}

	function convertMoneyHelper(firstCurrency, secondCurrency, rate) {
		if (id(firstCurrency).value) {
			id(secondCurrency).value = parseFloat(id(firstCurrency).value) / rate;
		} else {
			id(firstCurrency).value = parseFloat(id(secondCurrency).value) * rate;
		}
	}

	function convertKrona() {
		fetch("https://api.exchangeratesapi.io/latest?base=USD&symbols=SEK")
			.then(checkStatus)
			.then(JSON.parse)
			.then(convertKronaHelper)
			.catch(function() {
				convertMoneyHelper("swedish", "dollar-second", 9.31384);
				id("disclaimer-swedish").innerText = "1 USD = 9.31384 SEK " + 
				"(Note this is an approximation)";
				id("disclaimer-swedish").classList.remove("hidden");
			});
	}

	function convertKronaHelper(response) {
		let rate = response.rates.SEK;
		convertMoneyHelper("swedish", "dollar-second", rate);
		id("disclaimer-swedish").innerText = "1 USD = " + rate.toFixed(3) + " SEK " + 
			"on " + response.date;
		id("disclaimer-swedish").classList.remove("hidden");
	}

	function convertEuro() {
		fetch("https://api.exchangeratesapi.io/latest?base=USD&symbols=EUR")
			.then(checkStatus)
			.then(JSON.parse)
			.then(convertEuroHelper)
			.catch(function(response) {
				convertMoneyHelper("euro", "dollar", 0.888);
				id("disclaimer-euro").innerText = "1 UDS = 0.888 EUR " + 
				"(Note this is an approximation)";
				id("disclaimer-euro").classList.remove("hidden");
			});
	}

	function convertEuroHelper(response) {
		let rate = parseFloat(response.rates.EUR);
		convertMoneyHelper("euro", "dollar-third", rate);
		id("disclaimer-euro").innerText = "1 USD = " + rate.toFixed(3) + " EUR " + 
			"on " + response.date;
		id("disclaimer-euro").classList.remove("hidden");
	}

	function id(elementId) {
		return document.getElementById(elementId);
	}

	function clearInput(firstInput, secondInput, disclaimer) {
		id(firstInput).value = "";
		id(secondInput).value = "";
		id(disclaimer).innerText = "";
		id(disclaimer).classList.add("hidden");
	}

	function checkStatus(response) {
     if (response.status >= 200 && response.status < 300 || response.status == 0) {
       return response.text();
     } else {
       return Promise.reject(new Error(response.status + ": " + response.statusText));
     }
   }
})();
