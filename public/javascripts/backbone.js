$(function() {
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

  var TodoView = Backbone.View.extend({
    initialize: function(mountNode) {
      this.$el = mountNode
      this.$todos = mountNode.find('#todos')
      this.$textBox = mountNode.find('#textBox')

      this.collection = new Todos()
      this.collection.on('add', this.appendTodo, this)
      this.collection.fetch()
    },

    events: {
      "submit form": "createTodo"
    },

    createTodo: function(event) {
      event.preventDefault()
      this.collection.create({ text: this.$textBox.val(), isDone: false })
    },

    appendTodo: function(model) {
      var view = new TodoItemView(model)
      view.render()
      this.$todos.append(view.el)
    }
  })

  var TodoItemView = Backbone.View.extend({
    tagName: "li",
    className: "todo-item",

    initialize: function(model) {
      this.model = model
      this.model.on("change", this.render, this)
    },

    events: {
      "click": "toggleTodo"
    },

    toggleTodo: function() {
      this.model.toggle()
      this.render()
    },

    render: function() {
      this.$el.toggleClass('todo-item-done', this.model.get('isDone'))
      this.$el.text(this.model.get('text'))
      return this
    }
  })

  new TodoView($('#todoapp'))
})
