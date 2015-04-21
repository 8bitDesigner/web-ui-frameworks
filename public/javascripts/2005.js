var form = document.getElementById("todoForm")
var input = document.getElementById("textBox")
var todos = document.getElementById("todos")
var xhr = getXHR();

console.log(form, input, todos)

function addEvent(el, event, callback) {
  if (el.addEventListener) {
    el.addEventListener(event, callback, false);
  } else if (el.attachEvent)  {
    el.attachEvent(event, callback);
  }
}

addEvent(form, 'submit', function(event) {
  if (event.preventDefault) {
    event.preventDefault();
  } else {
    event.returnValue = false
  }

  addTodo(input.value)
  input.value = ""
})

function addTodo(todoText, isDone) {
  var li = document.createElement('li')
  var text = document.createTextNode(todoText)
  var classes = 'todo-item'

  if (isDone) classes += ' todo-item-done'

  li.setAttribute('class', classes)
  li.appendChild(text)
  todos.appendChild(li)

  addEvent(li, 'click', toggleTodo)
}

function toggleTodo(event) {
  var li = event.currentTarget
  var classNames = li.getAttribute('class').split(' ')
  var isDone = false

  for (var i = 0; i < classNames.length; i++) {
    if (classNames[i] === 'todo-item-done') {
      isDone = true
    }
  }

  if (isDone) {
    li.setAttribute('class', 'todo-item')
  } else {
    li.setAttribute('class', 'todo-item todo-item-done')
  }
}

xhr.onreadystatechange = function() {
  // Not ready yet
  if (xhr.readyState < 4) { return }

  // Uh oh... something broke
  if(xhr.status !== 200) { return }

  var todos = JSON.parse(xhr.responseText)

  for (var i = 0; i < todos.length; i++) {
    addTodo(todos[i].text, todos[i].isDone)
  }
}

xhr.open('GET', '/api/todos', true)
xhr.send('')

function getXHR() {
  var xhr;

  if (typeof XMLHttpRequest !== 'undefined') {
    xhr = new XMLHttpRequest()
  } else {
    var versions = ["MSXML2.XmlHttp.5.0",
         "MSXML2.XmlHttp.4.0",
         "MSXML2.XmlHttp.3.0",
         "MSXML2.XmlHttp.2.0",
         "Microsoft.XmlHttp"]

    for (var i = 0, len = versions.length; i < len; i++) {
    try {
      xhr = new ActiveXObject(versions[i]);
      break;
    }
      catch(e){}
    }
  }

  return xhr
}
