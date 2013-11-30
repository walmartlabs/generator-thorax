describe "A simple adding machine", ->
  it "should add 1 to the sum every time the button is clicked", ->
    Handlebars.registerViewHelper "on", (eventName, helperView) ->
      helperView.parent.on eventName, ->
        helperView.render()

    view = new Thorax.View
      template: hbsFixture("adding-machine.hbs")
      events:
        incremented: ->
          ++@i

      initialize: ->
        @i = 0

    view.render()
    expect(view.$("[data-view-helper=on]").text()).to.eq "0"
    view.$("button [data-trigger-event=incremented]").trigger "click", ->
      expect(view.$("[data-view-helper]").text()).to.eq "1"