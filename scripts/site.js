$(function() {
	var quotes = [];
	$.getJSON('https://raw.githubusercontent.com/glombek/Huzzah/master/huzzah.json')
		.done(function(data){
			quotes = data;
			benerate();
		});
	
	function randElement(arr) {
		var i = Math.floor(Math.random() * arr.length);
		return arr[i];
	}
	
	function benerate() {
		var quote = randElement(quotes);
		
		var text = quote.phrase;
		
		if(quote.options) {
			//var option = randElement(quote.options);
			var options = {};
			$.each(quote.options, function( key, value ) {
				options[key] = randElement(value);
			});
			
			text = Mustache.render(quote.phrase, options);
		}
		
		$('blockquote').text(text);
	}
	
	$("[data-action=benerate]").click(benerate);
});