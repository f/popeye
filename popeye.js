/**
 * Popeye.js - Backbone PowerUp Wrapper
 */
(function (root, undefined) {

	"use strict";

	// Requirements
	var bb = root.Backbone //Backbone
	  , _ = root._; //Underscore

	// Bind backbone
	_.bindAll(bb.Model);
	_.bindAll(bb.Collection);
	_.bindAll(bb.View);
	_.bindAll(bb.Events);

	var popeye = function () {};

	// No need to write it again!
	_.extend(popeye.prototype, bb.Events);

	// Default namespace is root (window)
	popeye.prototype.root = root;

	// Application namespace, capsule for components.
	popeye.prototype.app = function (namespace) {
		// Namespace shouldn't hurt others.
		if (root[namespace]) {
			namespaceError();
		}
		this.namespace = namespace;

		// Create a new component namespace into root (window)
		this.root = root[this.namespace] = {};
		this.root.on = _.bind(this.on, this);

		// Never change namespace again!
		popeye.prototype.app = function () {
			namespaceError();
		};
	};

	// Module implementation
	popeye.prototype.module = popeye.prototype.component = function (name, deps, constructor) {
		// it looks like init if only name given.
		if (!deps && !constructor) {
			return this.init(name);
		}
		if (typeof deps == 'function')
			constructor = deps;

		if (!this.root[name]) {
			this.root[name] = [];
		}

		// initialize dependencies
		if (_.isArray(deps)) {
			constructor.initDeps = _.bind(function () {
				var modules = [];
				_.each(deps, function (dependency) {
					modules.push(this.init.call(this, dependency));
				}, this);
				// arguments to pass
				return modules;
			}, this);
		}

		this.root[name].push(constructor);
		return this;
	};

	popeye.prototype.init = function (module) {
		// Module should be defined
		if (!this.root[module]) {
			moduleError(module);
		}
		// When no instance found create new
		if (!this.root._instances) {
			this.root._instances = {};
		}
		// If instance created return existing, then create.
		if (!this.root._instances[module]) {
			// Views object is always a need.
			this.root._instances[module] = {views: {}};
			_.each(this.root[module], function (constructor) {
				var deps = constructor.initDeps && constructor.initDeps();
				constructor.apply(this.root._instances[module], deps);
			}, this);
			this.trigger('init:' + module);
		}

		return this.root._instances[module];
	};

	// Model implementation
	popeye.prototype.model = function (props) {
		var props = dynamicProps(props);
		return bb.Model.extend.call(this, props);
	};

	// Collection implementation
	popeye.prototype.list = popeye.prototype.collection = function (model, props) {
		var props = dynamicProps(props);
		var _structure = _.extend({model: model}, props);
		return bb.Collection.extend.call(this, _structure);
	};

	// View implementation
	popeye.prototype.view = function (model, template) {
		if (model.prototype) { // abstract
			var _view = bb.View.extend.call(this);
			return function (attributes) {
				var _model = new model(attributes);
				return new _view({model: _model});
			};
		} else { // an object
			console.log('object');
		}
		//return bb.View.extend.apply(this, arguments);
	};

	// Template
	popeye.prototype.template = function (template) {
		// convert to array if not
		if (typeof template != 'object')
			template = [template];

		// join them again
		var template = _.values(template).join('');
		return _.template(template);
	};

	// Finding module not nemo.
	popeye.prototype.findModule = function () {
		return document.body.getAttribute('data-module').split(/\s+/);
	};

	// Element based template
	popeye.prototype.$template = function (id) {
		return _.template(document.getElementById(id).innerHTML);
	};

	var _popeye = root.popeye = new popeye();

	// Popeye
	root.app = _.bind(_popeye.app, _popeye);
	root.module = root.component = _.bind(_popeye.module, _popeye);
	root.init = _.bind(_popeye.init, _popeye);

	root.model = _.bind(_popeye.model, _popeye);
	root.list = root.collection = _.bind(_popeye.list, _popeye);

	root.view = _.bind(_popeye.view, _popeye);
	root.$template = _.bind(_popeye.$template, _popeye);
	root.template = _.bind(_popeye.template, _popeye);

	function namespaceError() {
		throw "You can define the application namespace once.";
	}

	function moduleError(name) {
		throw "Module " + name + " not found.";
	}

	function dynamicProps(props) {
		return typeof props == 'function' ? new props() : props;
	}

})(window);

///SOURCE!
/*
var apple, apples;

// Module
app('myapp')
module ('basket', function () {

	var apple,
		apples;

	apple = this.apple = model (..);
	apples = this.apples = list (apple);

});

basket.apples.find({a: 1});
// Module end

// Model tanımlaması 1
apple = model (function () {
	this.validator ({
		color: function () {

		}
	});
});

// Model tanımlaması 2
apple = model ();

// Model tanımlaması 3
apple = model ({
	color: 'red'
});

// Validation
apple.validator ({
	color: function (value) {
		return value == 'red';
	}
});

// Events
apple.on('color', 'change', function (apple) {

}, this);

apple.change('color', function (apple) {

});

apple.change(function (apple) {

});

// Listeler
apples = list (apple);

apples = list (apple, function () {

});

apples = list (function () {

});

apples.model (apple);

// Events
apples.change(function () {

});

apples.on('add', function () {

});

anapple = view (apple); // new modelview
oneApple = view (apples.at(0)) // Existing view
*/
			