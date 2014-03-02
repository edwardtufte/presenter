class app.Section extends Backbone.View
    className: 'section'
    events:
        'focus .section-content, .section-caption': 'addFocus'
        'blur .section-content, .section-caption': 'removeFocus'

        'click .section-delete': 'handleDelete'
        'input': 'input'

    input: (e) ->
        value = @$('.section-content').html()
        caption = @$('.section-caption').html()
        @model.set {value, caption}
        return

    addFocus: ->
        $('body').addClass('section-focused')
        @$el.addClass('section-focused')

    removeFocus: ->
        $('body').removeClass('section-focused')
        @$el.removeClass('section-focused')

    render: ->
        {value, type, caption} = @model.toJSON()

        if type is 'image'
            if value.indexOf("<img src=") is -1
                value = """<img src="#{ value }">"""


        @$el.attr('data-type', type)
            .attr('data-cid', @model.cid)
            .html("""
                <div class="section-inner">
                    <div class="section-helpers">
                        <div class="section-drag-handle"></div>
                        <div class="section-delete"></div>
                    </div>
                    <div class="section-content">
                        #{ value }
                    </div>
                    <div class="section-caption">
                        #{ caption }
                    </div>
                </div>
            """)
        @

    handleDelete: (e) ->
        @model.destroy()
        @remove()
        e.preventDefault()
