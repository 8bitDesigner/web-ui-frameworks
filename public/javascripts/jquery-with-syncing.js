$(function() {
  var form = $("#todoForm")
  var input = $("#textBox")
  var todos = $("#todos")

  form.on('submit', function(event) {
    event.preventDefault()

    addTodo(input.val())
    input.val('')
  })

  function addTodo(text) {
    $.ajax({
      method: 'POST',
      url: '/api/todos',
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify({text: text, isDone: false}),
      success: function(items) {
        appendTodo(items[items.length -1])
      }
    })
  }

  function appendTodo(item) {
    var li = $("<li class='todo-item'>"+item.text+"</li>")
    if (item.isDone) li.addClass('todo-item-done')
    todos.append(li)
  }

  todos.on('click', 'li', function(event) {
    toggleTodo(event.currentTarget)
  })

  function toggleTodo(li) {
    var isDone = $(li).hasClass('todo-item-done')
      , idx = -1

    todos.find('li').each(function(i, todo) {
      if (todo == li) idx = i
    })

    $.ajax({
      method: 'PUT',
      url: '/api/todos/' + idx,
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify({text: $(li).text(), isDone: !isDone}),
      success: function(todo) {
        $(li).toggleClass('todo-item-done', todo.isDone)
      }
    })
  }

  $.getJSON('/api/todos', function(todos) {
    for (var i = 0; i < todos.length; i++) {
      appendTodo(todos[i])
    }
  })
})

