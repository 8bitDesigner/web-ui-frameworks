# What's this!?

I recently gave an internal presentation at Fullscreen about the evolution of web UI frameworks, through the lense of, what else, the humble ToDo app. There were no slides, just a discussion of code and abstraction, and this repo contains all the example apps I used in the talk:

* Plain ol, 2005 era Javascript
* jQuery
* BackboneJS
* and last, but not least, React

## Setup
1. git clone this repo: `git clone https://github.com/8bitDesigner/web-ui-frameworks.git`
2. `cd web-ui-frameworks && npm install`
3. `npm start`
4. Now visit [http://localhost:3000](http://localhost:3000) and check out the examples!

## Getting aroind
```
.   index.js        # The top level web server
├── public
│   └── javascripts # All the various code examples live here
├── routes
│   ├── api.js      # The ToDo app API server is implemented here
│   └── pages.js    # All the code example routes are defined here
└── views
    ├── todos.ejs   # This template is used for all the example todos
    └── index.ejs   # And the homepage is here
```
