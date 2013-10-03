var _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BI.views.App = (function(_super) {
  __extends(App, _super);

  function App() {
    _ref = App.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  App.prototype.initialize = function() {
    $("[type='text/x-handlebars-template']").each(function() {
      var name, src;
      name = $(this).attr("id");
      src = $(this).html();
      return BI.templates[name] = Handlebars.compile(src);
    });
    this.slides = new BI.collections.Slideshow;
    this.router = new BI.Router;
    return this.trigger("application:init");
  };

  return App;

})(Backbone.View);

$(function() {
  BI.application = new BI.views.App;
  return Backbone.history.start({
    pushState: false
  });
});

var _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BI.Router = (function(_super) {
  __extends(Router, _super);

  function Router() {
    _ref = Router.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Router.prototype.routes = {
    "slide/:slide": "go_to_slide"
  };

  Router.prototype.go_to_slide = function(slide) {
    var index;
    index = slide - 1;
    return BI.application.slides.view.go_to(index);
  };

  return Router;

})(Backbone.Router);

var _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BI.models.Slide = (function(_super) {
  __extends(Slide, _super);

  function Slide() {
    _ref = Slide.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Slide.prototype.initialize = function() {
    return this.view = new BI.views.Slide({
      model: this
    });
  };

  Slide.prototype.url = function() {
    return "slide/" + this.id;
  };

  return Slide;

})(Backbone.Model);

var _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BI.views.Slide = (function(_super) {
  __extends(Slide, _super);

  function Slide() {
    _ref = Slide.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Slide.prototype.el = '<div class="slide"></div>';

  Slide.prototype.initialize = function() {
    if (false) {
      this.template = BI.templates["slide-title"];
    } else {
      this.template = BI.templates["slide-default"];
    }
    return this.listenTo(this.model.collection.view, "slideshow:render", function() {
      return this.render();
    });
  };

  Slide.prototype.render = function() {
    var html;
    html = this.template(this.model.attributes);
    this.$el = $(html);
    this.$el.appendTo(this.model.collection.view.$el);
    return this.model.trigger("slide:rendered");
  };

  return Slide;

})(Backbone.View);

var _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BI.collections.Slideshow = (function(_super) {
  __extends(Slideshow, _super);

  function Slideshow() {
    _ref = Slideshow.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Slideshow.prototype.model = BI.models.Slide;

  Slideshow.prototype.url = "slides.json";

  Slideshow.prototype.initialize = function() {
    var _this = this;
    this.view = new BI.views.Slideshow({
      collection: this
    });
    this.listenTo(this, "slideshow:recalculate", function() {
      this.current_slide = this.at(this.view.curr_index);
      return BI.application.router.navigate(this.current_slide.url(), {
        silent: true
      });
    });
    return this.fetch({
      success: function() {
        return _this.view.render();
      }
    });
  };

  return Slideshow;

})(Backbone.Collection);

var _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BI.views.Slideshow = (function(_super) {
  __extends(Slideshow, _super);

  function Slideshow() {
    _ref = Slideshow.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Slideshow.prototype.curr_index = 0;

  Slideshow.prototype.initialize = function() {
    this.$el = $(".slides-container");
    return this.bind_events();
  };

  Slideshow.prototype.bind_events = function() {
    var _this = this;
    return $(window).on("keyup", function(e) {
      if (e.which === 37) {
        _this.previous_slide();
      }
      if (e.which === 39) {
        return _this.next_slide();
      }
    });
  };

  Slideshow.prototype.previous_slide = function() {
    this.curr_index--;
    if (this.curr_index < 0) {
      return this.curr_index = 0;
    } else {
      return this.recalculate();
    }
  };

  Slideshow.prototype.next_slide = function() {
    this.curr_index++;
    if (this.curr_index > this.max_index) {
      return this.curr_index = this.max_index;
    } else {
      return this.recalculate();
    }
  };

  Slideshow.prototype.go_to = function(slide) {
    this.curr_index = slide;
    return this.recalculate();
  };

  Slideshow.prototype.render = function() {
    this.trigger("slideshow:render");
    this.max_index = this.collection.models.length - 1;
    this.recalculate();
    return this.trigger("slideshow:rendered");
  };

  Slideshow.prototype.recalculate = function() {
    var i, model, _i, _len, _ref1;
    _ref1 = this.collection.models;
    for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
      model = _ref1[i];
      if (i < this.curr_index) {
        model.view.$el.addClass('passed').removeClass("current upcoming");
      }
      if (i === this.curr_index) {
        model.view.$el.addClass('current').removeClass("passed upcoming").trigger('isCurrent');
      }
      if (i > this.curr_index) {
        model.view.$el.addClass('upcoming').removeClass("passed current");
      }
    }
    return this.collection.trigger("slideshow:recalculate");
  };

  return Slideshow;

})(Backbone.View);
