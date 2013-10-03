class BI.collections.Slideshow extends Backbone.Collection

  model : BI.models.Slide # The model class that our collection will contain
  url : "slides.json" # Our path to the slides (GET only, obviously)

  initialize : ->

    @view = new BI.views.Slideshow
      collection : @

    # When the slide changes, push the URL to the router
    @listenTo @, "slideshow:recalculate", ->

      @current_slide = @at @view.curr_index
      BI.application.router.navigate @current_slide.url(), {silent:true}

    @fetch
      success : =>
        @view.render()
      

