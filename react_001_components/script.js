var TextAreaCounter = React.createClass({
  propTypes: {
    text: React.PropTypes.string,
  },

  getDefaultProps: function() {
    return {
      text: '',
    };
  },

  _textChange: function(event) {
    this.setState({
      text: event.target.value,
    });
  },
  
  // вызывается после инициализации компонента, устанавливает начальное состояние
  getInitialState: function() {
    return {
      text: this.props.text,
    };
  },

  render: function() {
    return React.DOM.div(
      null,
      React.DOM.textarea(
        {
          value: this.state.text,
          onChange: this._textChange,
          cols: 50,
          rows: 10,
        }
      ),
      React.DOM.h3(
        null,
        "Letters count: " + this.state.text.length
      )
    );
  }
});

// Пока виртуальный элемент содержится только в памяти JavaScript.
// Мы должны явно сообщить React отрисовать его в браузере с помощью метода render()
ReactDOM.render(
  // Метод render принимает два аргумента: виртуальный элемент и реальный узел DOM.
  // React берёт виртуальный элемент и добавляет его в указанный узел
  React.createElement(
    TextAreaCounter,
    {
      text: "Input some text",
    }
  ),
  document.getElementById("app")
);