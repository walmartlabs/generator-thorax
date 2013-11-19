define [
  'cs!view'
  'hbs!templates/todo-list/index'
], (View, template) ->
  View.extend
    name: "todo-list/index"
    template: template
    events:
      "submit form": (ev) ->
        ev.preventDefault()
        attrs = @serialize()
        @collection.add attrs
        @$('input[name="title"]').val('')

      'change input[type="checkbox"]': (ev) ->
        model = $(ev.target).model()
        model.set done: ev.target.checked
