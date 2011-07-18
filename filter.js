// page: https://github.com/archaeron/filtertable
// license: MIT (http://www.opensource.org/licenses/mit-license.php)
(function(window, $)
{
	'use strict';
	var filterable = {},
		rownames = [],
		$table,
		$rows,
		// set standard options
		options = 
		{
			// this class will be added to the elements to be hidden
			hiddenClass : 'filtertable-hidden'
		};
		
	
	var tableFilter = function($element, opt)
	{
		// initialize the variables at the beginning of the function
		var init,
			choose_op,
			search_and,
			search_or,
			search_in_cell;
		
		this.VERSION = '0.2.0';
		
		$table = $element; 
		options = $.extend(options, opt);
		
		
		init = function()
		{
			$rows = $table.children('tbody').find('tr');

			var $theaders = $table.find('th');
			$theaders.each(function(i)
			{
				var $elem = $(this);
				var nosort = $elem.attr('data-tablefilter-nofilter');
				if(!nosort)
				{
					var name_attr = $elem.attr('data-tablefilter-rowname');
					var key = name_attr !== void 0 ? name_attr : $elem.text();
					key = key.toLowerCase();
					filterable[key] = i;
				}
				
			});
		};
		
		this.rows = function()
		{
			if(! rownames.length)
			{
				var length = filterable.length;
				for(var name in filterable)
				{
					if(filterable.hasOwnProperty(name))
					{
						rownames.push(name);
					}
				}
			}
			
			return rownames;
		};
		
		
		this.search = function(searchparams)
		{			
			if(!searchparams.terms.length)
			{
				return;
			}
				
			$rows.each(function ()
			{
				var $this = $(this),
					passed = choose_op(searchparams, $this);
					
				if(!passed)
				{
					$this.toggleClass('filtertable-hideQueue', true);
				}
			});
			
			$rows.filter(':not(.filtertable-hideQueue)').toggleClass(options.hiddenClass, false);
			$rows.filter('.filtertable-hideQueue')
					.toggleClass(options.hiddenClass, true)
					.toggleClass('filtertable-hideQueue', false);
			
		};
		
		choose_op = function(params, $row)
		{
			switch(params.op)
			{
				case 'and':
					return search_and(params.terms, $row);
				case 'or':
					return search_or(params.terms, $row);
			}
		};
		
		search_or = function(terms, $row)
		{
			var $columns = $row.children();
			var passed = false;
			
			var length = terms.length;
			for(var i = 0; i < length; i++)
			{
				var term = terms[i];

				if(!term.op)
				{
					var column = filterable[term.row];
					var $cell = $($columns[column]);
	
					if(search_in_cell(term.value ,$cell))
					{
						/* break loop */
						passed = true;
						break;
					}
				}
				else
				{
					var passed_branch = choose_op(term, $row);
					if(passed_branch)
					{
						passed = true;
						break;
					}
				}
			}
			
			if(!passed)
			{
				return false;
			}
			else
			{
				return true;
			}

		};
		
		search_and = function(terms, $row)
		{
			var $columns = $row.children();
			
			var length = terms.length;
			for(var i = 0; i < length; i++)
			{
				var term = terms[i];

				if(!term.op)
				{
					var column = filterable[term.row];
					var $cell = $($columns[column]);
	
					if(!search_in_cell(term.value ,$cell))
					{
						return false;
					}
				}
				else
				{
					var passed_branch = choose_op(term, $row);
					if(!passed_branch)
					{
						return false;
					}
				}
			}
			
			return true;
		};
		
		search_in_cell = function(searchfor, $cell)
		{
			var filterkey = $cell.attr('data-filterkey'),
				to_search;
			if(filterkey)
			{
				to_search = filterkey;
			}
			else
			{
				to_search = $cell.text();
			}
			to_search = to_search.toLowerCase();
			searchfor = searchfor.toLowerCase();
			
			if(to_search.indexOf(searchfor) === -1)
			{
				return false;
			}
			else
			{
				return true;
			}
		};
		
		
		init();
		
	};
	
	window.tableFilter = tableFilter;

}(window, $));