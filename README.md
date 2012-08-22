Popeye.js v0.1 (Alpha)
==============

WARNING: DO NOT USE! STILL IN DEVELOPMENT
==============

A Backbone Power-up Kit for Backbone.js developers. Adds some features and makes development and code easier. In the background, there is Backbone.js's power. It also designed to seperate the logics with the module definitions.

Getting Started
---------------

It makes your life simpler, easier and saves your time. You can spend your time with your family instead of coding lines of Backbone Code!

  - You can use `module` or `component` and `app` project global namespace system.
  - Module dependency control. Looks like AMD but simpler.
  - Easier `model`, `view` and `collection` definitions.
  - Model, Collection, View definition with construction.

### A Traditional Backbone Code

Here is a traditional Backbone code. Cool, but hard to read!

```js
(function (module) {
  
  var apple,
      apples,
      appleView,
      applesView;
      
  apple = this.apple = Backbone.Model.extend({
    defaults: {
      color: 'red'
    }
  });
  
  apples = this.apples = Backbone.Collection.extend({
    model: apple
  });
  
  appleView = this.appleView = Backbone.View.extend({
    template: _.template($('script#apple').html()),
    render: function () {
      this.setElement(this.template(this.model.toJSON()));
    }
  });
  
  applesView = this.applesView = Backbone.View.extend({
    el: 'ul#apples',
    initialize: function () {
      // something cool!
    }
  });
  
}).call(todo.module('module')); // If you have a todo variable and module pattern somewhere!
```

### A Popeye Version of The Same Code

```js
app ('todo');
module ('module', function () {
  
  var apple,
      apples;
  
  apple = this.apple = model ({
    defaults: {
      color: 'red'
    }
  });
  
  apples = this.apples = list (apple);
  
  this.views.apple = view (apple, $template('apple'));
  
  this.views.apples = view ('ul#apples', function () {
    // something cool!
  });
});
```

## API

### Application Namespace

```js
app ('todo'); 
```
  
You just created an application namespace. So how can you reach this namespace?

```js
todo
```

`Window` has a todo variable now! It's a global.

### Module Definition

It looks like AMD definitions. Also you can use `component` identifier to define modules.

```js
module ('list.ui', ['list.core'], function (core) {
  // something cool.
});

component ('list.ui', ['list.core'], function (core) {
  // something cool.
});
```
If module doesn't have any dependency you don't have to define dependency array.

```js
module ('list.core', function () {
  // something very core...
});
```

#### Module Events

```js
todo.on('init:list.ui', function () {
  // Do something cool when list.ui module initialized!
});
```

### Initializing Modules

You can initialize modules using `init` function.

```js
init ('list.ui');
```

This code will initialize the module with name **`list.ui`** and its dependencies.

Also you can initialize modules with `module` function:

```js
module ('list.ui');
```

It will return you the instance of created module.

```js
var listUI = module ('list.ui');
```

   
### Auto Initialize Modules

With the @fatihacet's module initialization idea, you can use the `<body>` tag's `data-module` attribute to initialize modules.

```html
<body data-module="list">
  // something very coool!!!!
</body>
```

The module named `list` will be initialized automatically.

### Model

In Backbone, defining model is simple but Popeye.js has simpler writing.

```js
this.apple = model ();
```

This is actually:

```js
this.apple = Backbone.Model.extend();
```

Writing simpler is simpler. :)

Also you can define models with a constructor. It's a need sometimes.

```js
this.apple = model (function () {
  // this is the model itself.
  this.defaults = {
    color: 'red'
  };
});
```

Also you can still define with the traditional style:

```js
this.apple = model ({
  defaults: {
    color: 'red'
  }
});
```

### Collections

"Collection" name is too long. Popeye.js has a shorter name: **`list`**. Collections are lists!

```js
this.apples = list (apple);
```

You see the trick? I gave the model with the first argument. It is actually that:

```js
this.apples = Backbone.Collection.extend({
  model: apple
});
```

Popeye.js makes things easier! :)

### Views

There are logically two kinds of views;
  
  - Views of models
  - Views of existing elements (lists)
  
Popeye.js has two types of models too. (**Every module has `views` property.**)

#### View of a Model

You can see the example below; It creates a view of a `apple` model.

```js
this.views.apple = view (apple, $template('apple'));
```

#### View of an Element (To Be Developed)
    
Also you can define a view of an element.

```js
this.views.main = view ('#main-view', function () {
  // something cool!
});
```

or

```js
this.views.main = view ('#main-view', {
  // something cool!
});
```

#### `$template()` Method

This is the in-page template finder with ID.

```js
this.views.apple = view (apple, $template('apple'));
```    
This example finds the `<script type="text/template" id="apple"></script>` and creates
the template function. Then binds to the view of apple model.

#### `template()` Method

This is the same of `$template` but you give the parameter the template itself instead of ID.

```js
this.views.apple = view (apple, template([
  '<div>',
    '<%= color %>',
  '</div>'
]));
```

As you see you can use `Array` or `String` as parameter.

## TODO

  - Nested model wrapper.
  - Documentation development.