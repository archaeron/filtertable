filterable = {}
rownames = []

options =
	hiddenClass: 'hidden'
	
choose_op = (params, $row) ->
	switch params.op
		when 'and' then return search_and(params.terms, $row)
		when 'or' then return search_or(params.terms, $row)
		
		
search_or = (terms, $row) ->
	$columns = $row.children()
				
	for term in terms
		if not term.op?
			column = filterable[term.row]

			$cell = $($columns[column])
			
			if term.all_rows
				return search_in_row(term.value, $row)
			else

				if search_in_cell(term.value, $cell)
					# break loop
					return true
		else
			passed_branch = choose_op(term, $row)
			if(passed_branch)
				return true;

	return false
				
				
search_and = (terms, $row) ->
	$columns = $row.children()

	for term in terms
		if not term.op?
			column = filterable[term.row]
			
			$cell = $($columns[column])
			
			
			if term.all_rows

				if not search_in_row(term.value, $row)
					return false
					
			else
				if not search_in_cell(term.value, $cell)
					return false
		
		else
			passed_branch = choose_op(term, $row)
			if not passed_branch
				return false;
	

	return true;


search_in_cell = (searchfor, $cell) ->
	filterkey = $cell.attr('data-filterkey')
	
	to_search = if filterkey then filterkey else $cell.text()

	to_search = to_search.toLowerCase();
	searchfor = searchfor.toLowerCase();
	
	return to_search.indexOf(searchfor) > -1
	
search_in_row = (searchfor, $row) ->
	to_search = $row.text().toLowerCase();
	searchfor = searchfor.toLowerCase();
	return to_search.indexOf(searchfor) > -1
	
	

class tableFilter
	@VERSION: '0.2.1'
	constructor: ($table, opt) ->
		options = $.extend(options, opt)
		
		@$rows = $table.children('tbody').find('tr')
		
		$theaders = $table.find('th')
		
		@rows = []
		
		i = 0
		for header in $theaders
			$header = $(header)
			nosort = $header.attr('data-tablefilter-nofilter')
			
			if not nosort
				name_attr = $header.attr('data-tablefilter-rowname')
				
				key = if name_attr? then name_attr else $header.text()
				# make all keys lowercase for searching
				key = key.toLowerCase()

				filterable[key] = i
				@rows.push(key)
				
			i++

		
	search: (searchparams) ->
	
		if not searchparams.terms.length?
			return
			
		for row in @$rows
			$row = $(row)
			
			passed = choose_op(searchparams, $row)
			
			if not passed
				$row.toggleClass('filtertable-hideQueue', true)
				
		@$rows.filter(':not(.filtertable-hideQueue)').toggleClass(options.hiddenClass, false)
		@$rows.filter('.filtertable-hideQueue')
				.toggleClass(options.hiddenClass, true)
				.toggleClass('filtertable-hideQueue', false)
		return

		
		
		
exports = this
exports.tableFilter = tableFilter
	
	