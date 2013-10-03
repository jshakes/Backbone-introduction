class BI.Router extends Backbone.Router

  routes:
    "slide/:slide" : "go_to_slide"

  go_to_slide : (slide) ->

    index = slide - 1
    BI.application.slides.view.go_to index
