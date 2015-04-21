$(function() {
  var form = $("#todoForm")
  var input = $("#textBox")
  var todos = $("#todos")

  form.on('submit', function(event) {
    event.preventDefault()

    addTodo(input.val())
    input.val('')
  })

  function addTodo(text, isDone) {
    var li = $("<li class='todo-item'>"+text+"</li>")
    if (isDone) li.addClass('todo-item-done')
    todos.append(li)
  }

  todos.on('click', 'li', function(event) {
    toggleTodo(event.currentTarget)
  })

  function toggleTodo(item) {
    $(item).toggleClass('todo-item-done')
  }

  $.getJSON('/api/todos', function(todos) {
    for (var i = 0; i < todos.length; i++) {
      addTodo(todos[i].text, todos[i].isDone)
    }
  })
})
