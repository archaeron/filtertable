Usage
=====

```javascript
var filter = new window.tableFilter($('#tablefilter'));
var searchoptions =
[
	{
		row: 'name',
		value: $('#searchinputname').val()
	},
	{
		row: 'brand',
		value: $('#searchinputbrand').val()
	},
	{
		row: 'description',
		value: $('#searchinputdescription').val()
	}

];
```

The rows to be hidden will get the class 'filtertable-hidden'.

You can change this class with an additional parameter.

```javascript
var filter = new window.tableFilter($('#tablefilter'), {hiddenClass : 'hiddenClass'});
```