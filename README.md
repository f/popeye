Popeye.js v0.1 (Alpha)
==============

A Backbone Power-up Kit for Backbone.js developers. Adds some features and makes development and code easier. In the background, there is Backbone.js's power. It also designed to seperate the logics with the module definitions.

  - You can use `module` or `component` and `app` project global namespace system.
  - Module dependency control. Looks like AMD but simpler.
  - Easier `model`, `view` and `collection` definitions.
  - Model, Collection, View definition with construction.
  
API
---
### Application Namespace


    app ('todo'); 

  
You just created a application namespace. So how can you reach this namespace?

    todo

`Window` has a todo variable now! It's a global.

### Module Definition

It looks like AMD definitions. Also you can use `component` identifier to define modules.

    module ('list.ui', ['list.core'], function (core) {
      // something cool.
    });
    
    component ('list.ui', ['list.core'], function (core) {
      // something cool.
    });

If module doesn't have any dependency you don't have to define dependency array.

    module ('list.core', function () {
      // something very core...
    });

#### Module Events

    todo.on('init:list.ui', function () {
      // Do something cool when list.ui module initialized!
    });

### Initializing Modules

You can initialize modules using `init` function.

    init ('list.ui');
    
This code will initialize the module with name **`list.ui`** and its dependencies.

Also you can initialize modules with `module` function:

    module ('list.ui');
    
It will return you the instance of created module.

    var listUI = module ('list.ui');
    
   
### Auto Initialize Modules

With the @fatihacet's module initialization idea, you can use the `<body>` tag's `data-module` attribute to initialize modules.

    <body data-module="list">
      // something very coool!!!!
    </body>
    
The module named `list` will be initialized automatically.

### Model

In Backbone, defining model is simple but Popeye.js has simpler writing.

    this.apple = model ();
    
This is actually:

    this.apple = Backbone.Model.extend();
    
Writing simpler is simpler. :)

Also you can define models with a constructor. It's a need sometimes.

    this.apple = model (function () {
      // this is the model itself.
      this.defaults = {
        color: 'red'
      };
    });
    
Also you can still define with the traditional style:

    this.apple = model ({
      defaults: {
        color: 'red'
      }
    });

### Collections

"Collection" name is too long. Popeye.js has a shorter name: **`list`**. Collections are lists!

    this.apples = list (apple);
    
You see the trick? I gave the model with the first argument. It is actually that:

    this.apples = Backbone.Collection.extend({
      model: apple
    });
    
Popeye.js makes things easier! :)

### Views

There are logically two kinds of views;
  
  - Views of models
  - Views of existing elements (lists)
  
Popeye.js has two types of models too. (**Every module has `views` property.**)

#### View of a Model

You can see the example below; It creates a view of a `apple` model.

    this.views.apple = view (apple, $template('apple'));
    
#### View of an Element (To Be Developed)
    
Also you can define a view of an element.
    
    this.views.main = view ('#main-view', function () {
      // something cool!
    });
    
or
    
    this.views.main = view ('#main-view', {
      // something cool!
    });
    
#### `$template()` Method

This is the in-page template finder with ID.

    this.views.apple = view (apple, $template('apple'));
    
This example finds the `<script type="text/template" id="apple"></script>` and creates
the template function. Then binds to the view of apple model.

#### `template()` Method

This is the same of `$template` but you give the parameter the template itself instead of ID.

    this.views.apple = view (apple, template([
      '<div>',
        '<%= color %>',
      '</div>'
    ]));
    
As you see you can use `Array` or `String` as parameter.

## TODO

  - Nested model wrapper.
  - Documentation development.

