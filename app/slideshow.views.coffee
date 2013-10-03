class BI.views.Slideshow extends Backbone.View

  index : 0 # A counter for keeping track of which slide we're on

  initialize : ->

    @$el = $(".slides-container")
    @max_index = @collection.models.length - 1
    @render()
  
  bind_events : ->

    $(window).on "keyup", (e) =>

      if e.which is 37 # Left key

        @previous_slide()

      if e.which is 39 # Right key

        @next_slide()

  previous_slide : ->

    @index--
    if @index < @max_index
      @index = 0
    else
      @render()

  next_slide : ->

    @index++
    if @index > @max_index
      @index = @max_index
    else
      @render()

  render : ->

    # Thanks to Jeff for this beautifully simple gallery functionality!

    _.each  @$items, ($el, i) =>
      if i < @curr_index
        $el.addClass('passed').removeClass "current upcoming"
      if i == @curr_index
        $el.addClass('current').removeClass("passed upcoming").trigger('isCurrent')
      if i > @curr_index
        $el.addClass('upcoming').removeClass "passed current"