// Массив заголовков
var headers = [
  "Book", "Author", "Language", "Published", "Sales"
];

// Массив данных
var data = [
  ["The Lord of the Rings", "J. R. R. Tolkien", "English", "1954-1955", "150 million"],
  ["Le Petit Prince (The Little Prince)", "Antonie de Saint-Exupery", "French", "1943", "140 million"],
  ["Harry Potter and the Philosopher's stone", "J. K. Rowling", "English", "1997", "107 million"],
  ["And Then There Were None", "Agatha Christie", "English", "1939", "100 million"],
  ["Dream of the Red Chamber", "Cao Xueqin", "Chinese", "1754-1791", "100 million"],
  ["The Hobbit", "J. R. R. Tolkien", "English", "1937", "100 million"],
  ["She: A History of Adventure", "H. Rider Haggard", "English", "1887", "100 million"]
];

var Excel = React.createClass({

  displayName: "Excel",

  // keep data copy before searching
  _preSearchData: null,

  propTypes: {
    headers: React.PropTypes.arrayOf(
      React.PropTypes.string
    ),
    initialData: React.PropTypes.arrayOf(
      React.PropTypes.arrayOf(
        React.PropTypes.any
      )
    )
  },

  getInitialState: function() {
    return {
      data: this.props.initialData,
      sortby: null,
      descending: false,
      editableCell: null,
      search: false
    };
  },

  // sorting column by clicking on head
  _sort: function(event) {
    var columnNumber = event.target.cellIndex;
    var dataCopy = this.state.data.slice();
    var sortOrder = this.state.sortby === columnNumber && !this.state.descending

    dataCopy.sort(function(a, b) {
      return sortOrder 
        ? (a[columnNumber] < b[columnNumber] ? 1 : -1)
        : (a[columnNumber] > b[columnNumber] ? 1 : -1);
    });

    this.setState({
      data: dataCopy,
      sortby: columnNumber,
      descending: sortOrder
    });
  },

  _save: function(event) {
    event.preventDefault();
    var data = this.state.data.slice();
    var input = event.target.firstChild;
    data[this.state.editableCell.row][this.state.editableCell.cell] = input.value;
    this.setState({
      editableCell: null,
      data: data
    });
  },

  _showEditor: function(event) {
    this.setState({
      editableCell: {
        row: parseInt(event.target.dataset.row, 10),
        cell: event.target.cellIndex
      }
    });
  },

  _renderTable: function() {
    return (
      React.DOM.table(null,
        React.DOM.thead({onClick: this._sort},
          React.DOM.tr(null,
            this.props.headers.map(function(title, idx) {
              if (this.state.sortby === idx) {
                title += this.state.descending ? "\u2191" : "\u2193";
              }
              return React.DOM.th({key: idx}, title);
            }, this)
          )
        ),

        React.DOM.tbody({onDoubleClick: this._showEditor},
          this._renderSearch(),
          this.state.data.map(function(row, rowidx) {
            return (
              React.DOM.tr({key: rowidx},
                row.map(function(cell, idx) {
                  var content = cell;
                  var editableCell = this.state.editableCell;

                  if (editableCell && editableCell.row === rowidx && editableCell.cell === idx) {
                    content = React.DOM.form({onSubmit: this._save},
                      React.DOM.input({
                        type: "text",
                        defaultValue: content
                      })
                    );
                  }

                  return React.DOM.td(
                    {
                      key: idx,
                      "data-row": rowidx
                    },
                    content
                  );

                }, this)
              )
            );
          }, this)
        )
      )
    );
  },

  _renderToolbar: function() {
    return React.DOM.button(
      {
        onClick: this._toggleSearch,
        className: "toolbar"
      },
      "Search"
    )
  },

  // Rendering a row under the headings with search fields
  _renderSearch: function() {
    if (!this.state.search) {
      return null;
    }
    return (
      React.DOM.tr({onChange: this._search},
        this.props.headers.map(function(_ignore, idx) {
          return React.DOM.td({key: idx},
            React.DOM.input(
              {
                type: "text",
                "data-idx": idx
              }
            )
          );
        })
      )
    );
  },

  // start and stop search process
  _toggleSearch: function() {
    if (this.state.search) {
      this.setState({
        data: this._preSearchData,
        search: false
      });
      this._preSearchData = null;
    }
    else {
      this._preSearchData = this.state.data;
      this.setState({
        search: true
      });
    }
  },

  _search: function(event) {
    var needle = event.target.value.toLowerCase();
    if (!needle) {
      this.setState({data: this._preSearchData});
      return;
    }
    var idx = event.target.dataset.idx;
    var searchdata = this._preSearchData.filter(function(row) {
      return row[idx].toString().toLowerCase().indexOf(needle) > -1;
    });
    this.setState({data:searchdata});
  },

  render: function() {
    return (
      React.DOM.div(null,
        this._renderToolbar(),
        this._renderTable()
      )
    );
  }

});

ReactDOM.render(
  React.createElement(
    Excel,
    {
      headers: headers,
      initialData: data
    }
  ),
  document.getElementById("app")
);
