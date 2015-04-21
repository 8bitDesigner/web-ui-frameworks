var router = require('express').Router();

function render(opts) {
  var locals = {
    title: opts.title || "",
    scripts: opts.scripts || {}
  }

  return function(req, res) {
    res.render('todos', locals)
  }
}

router.get('/javascript', render({
  title: "Back in 2005...",
  scripts: [
    "/javascripts/2005.js"
  ]
}))

router.get('/jquery', render({
  title: "OMG $$$",
  scripts: [
    "/jquery/dist/jquery.js",
    "/javascripts/jquery.js"
  ]
}))

router.get('/jquery-with-syncing', render({
  title: "This is basically all of FSUI",
  scripts: [
    "/jquery/dist/jquery.js",
    "/javascripts/jquery-with-syncing.js"
  ]
}))

router.get('/backbone', render({
  title: "OMG DATAZ!",
  scripts: [
    "/jquery/dist/jquery.js",
    "/backbone/node_modules/underscore/underscore.js",
    "/backbone/backbone.js",
    "/javascripts/backbone.js"
  ]
}))

router.get('/react', render({
  title: "Now with a real view layer!",
  scripts: [
    "/jquery/dist/jquery.js",
    "/backbone/node_modules/underscore/underscore.js",
    "/backbone/backbone.js",
    "/react/dist/react.js",
    "/react/dist/JSXTransformer.js",
    {src: "/javascripts/react.jsx", type: "text/jsx"}
  ]
}))

module.exports = router
