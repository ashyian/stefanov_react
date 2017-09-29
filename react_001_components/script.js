// Создание компонента
var TextAreaCounter = React.createClass({

  // Объявление списка принимаемых свойств
  propTypes: {
    initialValue: React.PropTypes.string,
  },

  // вызывается после инициализации компонента, устанавливает начальное состояние
  getInitialState: function() {
    return {
      text: this.props.initialValue,
    };
  },

  // Метод для обновления состояния
  _textChange: function(event) {
    // Устанавливается новое состояние компонента
    this.setState({
      text: event.target.value,
    });
  },
  
  componentWillReceiveProps: function(nextProps) {
    console.log("componentWillReceiveProps");
    this.setState({
      text: nextProps.initialValue,
    });
  },



  // Возврат React-компонента для отображения
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
var textComponent = ReactDOM.render(
  // Метод render принимает два аргумента: виртуальный элемент и реальный узел DOM.
  // React берёт виртуальный элемент и добавляет его в указанный узел
  React.createElement(
    TextAreaCounter,
    {
      // Передача свойства компоненту
      initialValue: "Another text...",
    }
  ),
  document.getElementById("app")
);
