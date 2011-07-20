// page: https://github.com/archaeron/filtertable
// license: MIT (http://www.opensource.org/licenses/mit-license.php)
(function(window, _)
{	
	var queryparser = function(query)
	{
		this.operators = { or: 'OR', and: 'AND', not: 'NOT'};
		
		var opt = {},
			is_expr,
			ltrim,
			operator_regex = new RegExp('(\\s+)('+operators.or+'\|'+operators.and+')(\\s+)', 'g');
			
		
		
			
		console.log(query);
		
		
		var parse = function(query)
		{
			var separated_query = separate_query(query);
			var query_arr = objectify(separated_query);
			console.log(separated_query);
			console.log(query_arr);
		};
		
		var separate_query = function(string)
		{
			// escape value-key-pairs -> 'key':'value'
			string = string.replace(/'?([a-zA-Z0-9]*)'?\s*:\s*'?([a-zA-Z0-9]*)'?/g, "'$1':'$2'");
			string = string.replace(operator_regex, ' $2 ');
			string = string.replace(/\s*([(\()|(\()])\s*/g, ' $1 ');
			string = _.words(_.trim(string));
			console.log(string);
			return string;
		};
		
		var objectify = function(query)
		{
			var str_len = query.length,
				query_obj = { what: 'expression', expr: []},
				pos = 0,
				;
				
			for(; pos < str_len; pos++)
			{
				switch(query[pos])
				{
					case operators.or:
						query_obj.expr.push({what: 'or'});
						break;
					case operators.and:
						query_obj.expr.push({what: 'and'});
						break;
					case '(':
						console.log('(');
						for(var i = pos+1; query[i] !== ')'; i++)
						{
							console.log(i);
						}
						console.log(i);
						console.log(query.slice(pos+1, i));
						query_obj.expr.push(query.slice(pos, i));
						query.splice(pos, i-pos);
						console.log(query);
						break;

					default:
						break;
				}
			}
			
			console.log(query_obj);
			return query_obj;
		};
		
		var is_or = function(string)
		{			
			for(var i = 0; i < operators.or.length; i++)
			{
				if(string.charAt(i) !== operators.or.charAt(i))
				{
					return false;
				}
			}
			
			return true;
		};
		
		var is_operator = function(string)
		{
			string = ltrim(string);
			console.log(string);
			console.log(string.substring(0,2));
			switch(string.substring(0,2))
			{
				case 'OR':
					return true;
				case 'AN':
					return string.substring(2,3) === 'D' ? true : false;
				default:
					return false;
			}
		};
		
		var is_key_value = function(string)
		{
			for(var i = 0; i < string.length; i++)
			{
				
			}
		};
		
		var is_parens = function(string)
		{
			if(string.substring)
			{
			}
		};
		
		is_expr = function(string)
		{
			// start with parens or key_value
		};
		
		ltrim = function(string)
		{
			return string.replace(/^\s+/, '');
		}
		
		console.log(is_operator(query));
		opt = parse(query);
		
		return opt;
	};

	window.queryparser = queryparser;

}(window, _));