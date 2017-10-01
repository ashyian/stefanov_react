// Примесь - коллекция методов и свойств
var logMixin = {
  _log: function(methodName, args) {
    console.log(this.name + "::" + methodName, args);
  },

  // Вызывается перед обновлением компонента
  componentWillUpdate: function() {
    this._log('componentWillUpdate', arguments);
  },

  // Вызывается после обновления компонента.
  // Параметры: старые значения объектов props и state.
  componentDidUpdate: function(oldProps, oldState) {
    this._log('componentDidUpdate', arguments);
    // ограничение количества набираемых символов
    if (this.state.text.length > 15) {
      this.replaceState(oldState);
    }
  },

  // Вызывается непосредственно перед рендерингом компонента
  componentWillMount: function() {
    this._log('componentWillMount', arguments);
  },

  // Вызывается после рендеринга компонента
  componentDidMount: function() {
    this._log('componentDidMount', arguments);
  },
  
  // Вызывается перед удалением компонента из DOM
  componentWillUnmount: function() {
    this._log('componentWillUnmount', arguments);
  }
};

// Создание компонента
var TextAreaCounter = React.createClass({

  // Свойство для идентификации вызывающего кода (исп. в методе _log миксина)
  name: "TextAreaCounter",

  // Включение миксина в компонент
  mixins: [logMixin],

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
      initialValue: "Some text...",
    }
  ),
  document.getElementById("app")
);
