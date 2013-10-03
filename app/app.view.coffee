class BI.views.App extends Backbone.View

  initialize : ->

    # Build Handlebars templates

    $("[type='text/x-handlebars-template']").each ->

      name = $(this).attr("id")
      src = $(this).html()
      BI.templates[name] = Handlebars.compile(src)

    # Create the slides collection 

    @slides = new BI.collections.Slideshow

    @router = new BI.Router

    @trigger "application:init"

$ ->

  BI.application = new BI.views.App

  Backbone.history.start
    pushState: false
