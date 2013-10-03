class BI.views.Slideshow extends Backbone.View

  curr_index : 0 # A counter for keeping track of which slide we're on

  initialize : ->

    @$el = $(".slides-container")
    @bind_events()
  
  bind_events : ->

    $(window).on "keyup", (e) =>

      if e.which is 37 # Left key

        @previous_slide()

      if e.which is 39 # Right key

        @next_slide()

  previous_slide : ->

    @curr_index--
    if @curr_index < 0
      @curr_index = 0
    else
      @recalculate()

  next_slide : ->

    @curr_index++
    if @curr_index > @max_index
      @curr_index = @max_index
    else
      @recalculate()

  render : ->

    @trigger "slideshow:render"
    @max_index = @collection.models.length - 1
    @recalculate()

  recalculate : ->

    # Thanks to Jeff for this beautifully simple gallery functionality!

    for model, i in @collection.models
      if i < @curr_index
        model.view.$el.addClass('passed').removeClass "current upcoming"
      if i == @curr_index
        model.view.$el.addClass('current').removeClass("passed upcoming").trigger('isCurrent')
      if i > @curr_index
        model.view.$el.addClass('upcoming').removeClass "passed current"