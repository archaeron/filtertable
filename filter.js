/**
* page: https://github.com/archaeron/filtertable
* license: MIT (http://www.opensource.org/licenses/mit-license.php)
*/
(function(window, $)
{
	'use strict';
	var filterable = {},
		rownames = [],
		$table,
		$rows,
		options = 
		{
			hiddenClass : 'filtertable-hidden'
		};
		
	
	var tableFilter = function($element, opt)
	{
		this.VERSION = '0.1.2';
		
		$table = $element; 
		options = $.extend(options, opt);
		
		var init = function()
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
		
		
		/**
		*	searchparameters =
			[
				{
					row: 'title',
					value: 'titletosearchfor'
				}
			]
		*/
		this.search = function(searchparameters)
		{			
			var optimised_searchparams = {};
			for(var i = 0; i < searchparameters.length; i++)
			{
				if(filterable[searchparameters[i].row] !== void 0)
				{
					var row = filterable[searchparameters[i].row];
					optimised_searchparams[row] = searchparameters[i].value.toLowerCase();
				}
				
			}
			
			$rows.each(function (i)
			{
				var $this = $(this),
					$columns = $this.children();
				
				$.each(optimised_searchparams, function (key, elem)
				{
					var $column = $($columns[key]),
						to_search,
						filterkey = $column.attr('data-filterkey');
					if(filterkey)
					{
						to_search = filterkey;
					}
					else
					{
						to_search = $column.html();
					}
					to_search = to_search.toLowerCase();
					
					if(to_search.indexOf(elem) === -1)
					{
						$column.parent().toggleClass('filtertable-hideQueue', true);
						return false;
					}
				});
				
			});
			
			$rows.filter(':not(.filtertable-hideQueue)').toggleClass(options.hiddenClass, false);
			$rows.filter('.filtertable-hideQueue')
					.toggleClass(options.hiddenClass, true)
					.toggleClass('filtertable-hideQueue', false);
			
		};
		
		init();
	};
	
	window.tableFilter = tableFilter;

}(window, $));