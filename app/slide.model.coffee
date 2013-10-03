class BI.models.Slide extends Backbone.Model

  initialize : ->

    @view = new BI.views.Slide
      model : @