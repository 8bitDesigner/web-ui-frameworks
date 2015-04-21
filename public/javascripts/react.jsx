(function() {
  var Todo = Backbone.Model.extend({
    toggle: function() {
      this.set({ isDone: !this.get('isDone') })
      this.save()
    }
  })

  var Todos = Backbone.Collection.extend({
    url: '/api/todos',
    model: Todo
  })

  var TodosApp = React.createClass({
    getInitialState: function() {
      return {models: []}
    },

    componentDidMount: function() {
      this.collection = new Todos()
      this.collection.on("add remove", function() {
        this.setState({ models: this.collection.models })
      }.bind(this))

      this.collection.fetch()
    },

    render: function() {
      var todos = this.state.models.map(function(model) {
        return <TodoItemView key={model.id} model={model} />
      })

      return (
        <div>
          <header>
            <h1>Todos</h1>
            <TodosInput onCreate={this.createTodo} />
          </header>

          <section id="main">
            <ul className="todos" id="todos">{todos}</ul>
          </section>
        </div>
      )
    },

    createTodo: function(newTodo) {
      this.collection.create({ text: newTodo, isDone: false }) 
    },
  })

  var TodoItemView = React.createClass({
    componentWillMount: function() {
      var model = this.props.model
        , self = this

      this.setState({ model: model.attributes })

      model.on('change', function() {
        self.setState({ model: model.attributes })
      })
    },

    getClasses: function() {
      var classes = "todo-item"
      if (this.state.model.isDone) { classes += " todo-item-done" }
      return classes
    },

    toggle: function() {
      this.props.model.toggle()
    },

    render: function() {
      return <li onClick={this.toggle} className={this.getClasses()}>{
        this.state.model.text
      }</li>
    }
  })

  var TodosInput = React.createClass({
    createTodo: function(event) {
      event.preventDefault()

      var input = this.refs.todoInput.getDOMNode()
      this.props.onCreate(input.value)
      input.value = ""
    },
      
    render: function() {
      return (
        <form id="todoForm" onSubmit={this.createTodo}>
          <input type="text" id="textBox" ref="todoInput" />
        </form>
      )
    }
  })

  React.render(<TodosApp/>, document.getElementById('todoapp'))
})()
