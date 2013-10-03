class BI.views.Slide extends Backbone.View

  el : '<div class="slide"></div>'

  initialize : ->
    
    @template = BI.templates["slide-default"]

    @listenTo @model.collection.view, "slideshow:render", ->
      @render()

  render : ->
  
    html = @template @model.attributes
    @$el = $(html)
    @$el.appendTo @model.collection.view.$el
    @model.trigger "slide:rendered"

  
