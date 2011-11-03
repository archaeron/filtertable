(function() {
  var choose_op, exports, filterable, options, rownames, search_and, search_in_cell, search_in_row, search_or, tableFilter;
  filterable = {};
  rownames = [];
  options = {
    hiddenClass: 'hidden'
  };
  choose_op = function(params, $row) {
    switch (params.op) {
      case 'and':
        return search_and(params.terms, $row);
      case 'or':
        return search_or(params.terms, $row);
    }
  };
  search_or = function(terms, $row) {
    var $cell, $columns, column, passed_branch, term, _i, _len;
    $columns = $row.children();
    for (_i = 0, _len = terms.length; _i < _len; _i++) {
      term = terms[_i];
      if (!(term.op != null)) {
        column = filterable[term.row];
        $cell = $($columns[column]);
        if (term.all_rows) {
          return search_in_row(term.value, $row);
        } else {
          if (search_in_cell(term.value, $cell)) {
            return true;
          }
        }
      } else {
        passed_branch = choose_op(term, $row);
        if (passed_branch) {
          return true;
        }
      }
    }
    return false;
  };
  search_and = function(terms, $row) {
    var $cell, $columns, column, passed_branch, term, _i, _len;
    $columns = $row.children();
    for (_i = 0, _len = terms.length; _i < _len; _i++) {
      term = terms[_i];
      if (!(term.op != null)) {
        column = filterable[term.row];
        $cell = $($columns[column]);
        if (term.all_rows) {
          if (!search_in_row(term.value, $row)) {
            return false;
          }
        } else {
          if (!search_in_cell(term.value, $cell)) {
            return false;
          }
        }
      } else {
        passed_branch = choose_op(term, $row);
        if (!passed_branch) {
          return false;
        }
      }
    }
    return true;
  };
  search_in_cell = function(searchfor, $cell) {
    var filterkey, to_search;
    filterkey = $cell.attr('data-filterkey');
    to_search = filterkey ? filterkey : $cell.text();
    to_search = to_search.toLowerCase();
    searchfor = searchfor.toLowerCase();
    return to_search.indexOf(searchfor) > -1;
  };
  search_in_row = function(searchfor, $row) {
    var to_search;
    to_search = $row.text().toLowerCase();
    searchfor = searchfor.toLowerCase();
    return to_search.indexOf(searchfor) > -1;
  };
  tableFilter = (function() {
    tableFilter.VERSION = '0.2.1';
    function tableFilter($table, opt) {
      var $header, $theaders, header, i, key, name_attr, nosort, _i, _len;
      options = $.extend(options, opt);
      this.$rows = $table.children('tbody').find('tr');
      $theaders = $table.find('th');
      this.rows = [];
      i = 0;
      for (_i = 0, _len = $theaders.length; _i < _len; _i++) {
        header = $theaders[_i];
        $header = $(header);
        nosort = $header.attr('data-tablefilter-nofilter');
        if (!nosort) {
          name_attr = $header.attr('data-tablefilter-rowname');
          key = name_attr != null ? name_attr : $header.text();
          key = key.toLowerCase();
          filterable[key] = i;
          this.rows.push(key);
        }
        i++;
      }
    }
    tableFilter.prototype.search = function(searchparams) {
      var $row, passed, row, _i, _len, _ref;
      if (!(searchparams.terms.length != null)) {
        return;
      }
      _ref = this.$rows;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        row = _ref[_i];
        $row = $(row);
        passed = choose_op(searchparams, $row);
        if (!passed) {
          $row.toggleClass('filtertable-hideQueue', true);
        }
      }
      this.$rows.filter(':not(.filtertable-hideQueue)').toggleClass(options.hiddenClass, false);
      this.$rows.filter('.filtertable-hideQueue').toggleClass(options.hiddenClass, true).toggleClass('filtertable-hideQueue', false);
    };
    return tableFilter;
  })();
  exports = this;
  exports.tableFilter = tableFilter;
}).call(this);
