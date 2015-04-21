var router = require('express').Router();

var todos = [
  {text: "Gripe about ancient bugs in DOM", isDone: true},
  {text: "Get milk on way home from work", isDone: false},
  {text: "Write talk about Javascript UI Frameworks", isDone: false}
]

function withId(obj, idx) {
  obj.id = idx
  return obj
}

router.get('/todos', function(req, res) {
  res.send(todos.map(withId))
})

router.post('/todos', function(req, res) {
  todos.push(req.body)
  res.send(todos.map(withId))
})

router.put('/todos/:id', function(req, res) {
  todos[req.params.id] = req.body
  res.send(todos.map(withId))
})

router.delete('/todos/:id', function(req, res) {
  todos.splice(req.params.id, 1)
  res.send(todos.map(withId))
})

module.exports = router;
