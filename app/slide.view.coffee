class BI.views.Slide extends Backbone.View

  el : '<div class="slide"></div>'

  initialize : ->
    
    if false
      # If it's the first slide, use the title slide template
      @template = BI.templates["slide-title"]
    else
      # Otherwise just use the default slide
      @template = BI.templates["slide-default"]

    @listenTo @model.collection.view, "slideshow:render", ->
      @render()

  render : ->
  
    html = @template @model.attributes
    @$el = $(html)
    @$el.appendTo @model.collection.view.$el
    @model.trigger "slide:rendered"

  