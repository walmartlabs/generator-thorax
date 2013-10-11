define [
  'view'
  'templates/todo-list/index'
], (View, template) ->
  View.extend
    name: "todo-list/index"
    template: template
    events:
      "submit form": (event) ->
        event.preventDefault()
        attrs = @serialize()
        @collection.add attrs
        @$('input[name="title"]').val('')

      'change input[type="checkbox"]': (event) ->
        model = $(event.target).model()
        model.set done: event.target.checked
