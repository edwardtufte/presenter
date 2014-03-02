class app.SectionsCollection extends Backbone.Collection
    model: app.SectionModel

    save: ->
        localStorage.presenterSections = JSON.stringify(@toJSON())

    comparator: (model) ->
        model.get('order')
