class app.Sections extends Backbone.View
    el: '.sections'
    events:
        'sortupdate': 'changeOrder'

    changeOrder: (e) =>
        @$('.section').each (i, section) =>
            $section = $(section)
            cid = $section.attr('data-cid')
            model = @collection.get(cid)
            if model
                model.set 'order', i

        @collection.sort()

    initialize: ->
        @listenTo @collection, 'add', (section) ->
            @collection.save()
            @addChild(section)
            @postRender()

        @listenTo @collection, 'change remove sort', (section) =>
            @collection.save()

    addChild: (section) ->
        sectionView = new app.Section
            model: section
        @$el.append(sectionView.render().el)

    render: ->
        @collection.each (section) =>
            @addChild(section)

        @postRender()
        @

    postRender: ->
        mediumOptions =
            buttons: [
                'header1'
                'header2'
                'bold'
                'italic'
                'unorderedlist'
                # 'pre'
                # 'orderedlist'
                # 'superscript'
                # 'subscript'
                # 'image'
                # 'strikethrough'
                # 'underline'
                # 'anchor'
                # 'quote'
            ]
            firstHeader: 'h1'
            secondHeader: 'h2'
            targetBlank: true

        new MediumEditor '.section[data-type="text"] .section-content, .section[data-type="header"] .section-content', $.extend({}, mediumOptions,
            placeholder: 'Add text...'
        )

        new MediumEditor '.section .section-caption', $.extend({}, mediumOptions,
            placeholder: 'Add a caption...'
        )

        $('[contenteditable]').each ->
            @spellcheck = false
            return true

        $('.sections').sortable
            handle: '.section-drag-handle'
            axis: 'y'
            start: (e, ui) ->
                ui.placeholder.height ui.helper.height()

        @
