/* global marked */
/* global $ */
/* global Mustache */
$(function() {
	var quotes = [];
	$.getJSON('https://raw.githubusercontent.com/glombek/Huzzah/master/huzzah.json')
		.done(function(data){
			quotes = data;
			var state = getUrlVars();
			//setUrlVars(state, true);
			benerate(state, true);
		});
	
	function getUrlVars()
	{
		var vars = {}, hash;
		var qMark = window.location.href.indexOf('?');
		if(qMark>-1) {
			var hashes = window.location.href.slice(qMark + 1).split('&');
			for(var i = 0; i < hashes.length; i++)
			{
				hash = hashes[i].split('=');
				//vars.push(hash[0]);
				if(hash[0]) {
					vars[hash[0]] = hash[1];
				}
			}
		}
		return vars;
	}
	
	function setUrlVars(params, replace) {
		var root = [window.location.protocol, '//', window.location.host, window.location.pathname].join('');
		//var root = ['/', window.location.pathname].join('');
		var paramKVPs = [];
		$.each(params, function(key, value) {
			paramKVPs.push([key, value].join('='));
		});
		var query = paramKVPs.join('&');
		var url = [root, '?', query].join('');
		if(replace) {
			window.history.replaceState(params, null, url);
		} else {
			window.history.pushState(params, null, url);
		}
	}
	
	function randIndex(arr) {
		var i = Math.floor(Math.random() * arr.length);
		return i;
	}
	
	function benerate(state, firstLoad, back) {
		
		if(!state) {
			state = {};
		}
		
		var qI = state['quote']
		if(qI == null) {
			qI = randIndex(quotes);
			state['quote'] = qI;
		}
		var quote = quotes[qI];
		
		var text = quote.phrase;
		if(quote.options) {
			//var option = randElement(quote.options);
			var options = {};
				$.each(quote.options, function( key, value ) {
					var i = state[key];
					if(i == null) {
						i = randIndex(value);
						state[key] = i;
					}
					options[key] = value[i];
				});
			
			
			text = Mustache.render(quote.phrase, options);
		}
	if(!back) {
		setUrlVars(state, firstLoad);
	}
		$('blockquote').html(marked(text));
	}
	
	$("[data-action=benerate]").click(function() { benerate(); });
	$(window).on('popstate', function(e) {
		benerate(e.originalEvent.state, false, true);
	});
});