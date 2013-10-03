class BI.collections.Slideshow extends Backbone.Collection

  model : BI.models.Slide # The model class that our collection will contain
  url : "slides.json" # Our path to the slides (GET only, obviously)

  initialize : ->

    @view = new BI.views.Slideshow
      collection : @

    @fetch()
