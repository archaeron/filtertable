FilterTable
===========

Usage
-----

```javascript
var filter = new window.tableFilter($('#tablefilter')),
	opt =
	{
		op: 'or',
		terms:
		[
			{
				row: 'kw',
				value: '515'
			},
			{
				row: 'kw',
				value: '588'
			},
			{
				op: 'and',
				terms:
				[
					{
						row: 'brand',
						value: 'ferrari'
					},
					{
						row: 'name',
						value: '599'
					}
				]
			}
		]
	};
	
filter.search(opt);
```

The rows to be hidden will get the class 'filtertable-hidden'.

You can change this class with an additional parameter.

```javascript
var filter = new window.tableFilter($('#tablefilter'), {hiddenClass : 'hiddenClass'});
```

Dependencies
------------

- (jquery)[http://jquery.com/]
- Array.indexOf ( (Augment.js)[http://augmentjs.com/] )