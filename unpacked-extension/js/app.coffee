window.log = -> console.log.apply console, Array::slice.call(arguments) if @console and @console.log

class App extends Backbone.View
    el: 'body'
    events:
        'click .add-section': 'addSection'
        'drop': 'onDrop'
        'mouseup': 'onMouseUp'
        'dragleave': 'onMouseUp'
        'dragenter': 'onDrag'
        'dragover': 'onDrag'

    initialize: ->
        sections = new Sections(
            collection: @collection
        ).render()

    onDrop: (e) =>
        e = e.originalEvent
        if e?.dataTransfer?.files?.length > 0
            onload = (e) =>
                if file.type is 'text/csv'
                    data = d3.csv.parseRows(atob(e.target.result.slice(21)))
                    @makeTable(data)
                else if file.type?.split('\/')?[0].toLowerCase() is 'image'
                    @collection.add
                        type: 'image'
                        value: e.target.result

                @$el.removeClass('dragenter dragover')

            files = e.dataTransfer.files

            for file in files
                reader = new FileReader()
                reader.onload = onload
                reader.readAsDataURL(file)

        e.preventDefault()
        return false

    onMouseUp: (e) ->
        @$el.removeClass('dragenter dragover')

    onDrag = (e) ->
        e = e.originalEvent
        $('body').addClass('dragenter')
        e.dataTransfer.dropEffect = 'move'
        e.preventDefault()
        return false

    document.body.ondragover = (e) ->
        $('body').addClass('dragover')
        e.dataTransfer.dropEffect = 'move'
        e.preventDefault()
        return false

    addSection: (e) ->
        sectionType = $(e.target).data('type')

        if sectionType is 'text'
            @collection.add
                value: '<p>New paragraph...</p>'

        if sectionType is 'header'
            @collection.add
                type: 'header'
                value: '<h1>Headline</h1>'

    makeGraph: (columns, data) ->
        margin =
            top: 20
            right: 20
            bottom: 30
            left: 50

        width = 600 - margin.left - margin.right
        height = 300 - margin.top - margin.bottom

        yDomain = d3.extent(data, (d) -> d[1])
        if yDomain[0] < 0
            yDomain[1] = 0
        else
            yDomain[0] = 0

        x = d3.scale.linear()
            .domain(d3.extent(data, (d) -> return d[0] ))
            .range([0, width])

        y = d3.scale.linear()
            .domain(yDomain)
            .range([height, 0])

        xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        line = d3.svg.line()
            .x( (d) -> return x(d[0]) )
            .y( (d) -> return y(d[1]) )

        svg = d3.select(document.createElement("svg"))
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(#{margin.left},#{margin.top})")

        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0,#{height})")
          .call(xAxis)

        svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)

        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text(columns[1]);

        svg.append("path")
          .datum(data)
          .attr("class", "line")
          .attr("d", line)

        return "<svg width=#{width + margin.left + margin.right} height=#{height + margin.top + margin.bottom}>#{svg.html()}</svg>"

    makeTable: (data) ->
        columns = data.shift()
        rows = data
        html = "<table><thead><tr>"

        for column in columns
            html += "<th>" + column + "</th>"

        html += '</tr></thead><tbody>'

        for row in rows
            html += "<tr>";

            for column in row
                html += "<td>" + column + "</td>"

            html += "</tr>"

        html += '</tbody></table>'

        graphHtml = @makeGraph(columns, rows)

        @collection.add
            type: 'graph'
            value: "<div class='chart'>#{html + graphHtml}</div>"

class SectionModel extends Backbone.Model
    defaults:
        type: 'text'
        caption: ''
        value: ''

class SectionsCollection extends Backbone.Collection
    model: SectionModel

class Section extends Backbone.View
    className: 'section'
    events:
        'focus .section-content, .section-caption': 'addFocus'
        'blur .section-content, .section-caption': 'removeFocus'

        'click .section-delete': 'handleDelete'
        'input': 'input'

    input: (e) ->
        @model.set 'value', @$el.html()
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
            value = """<img src="#{ value }">"""

        @$el.attr('data-type', type).html("""
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

class Sections extends Backbone.View
    el: '.sections'
    initialize: ->
        @listenTo @collection, 'add', (section) ->
            @addChild(section)
            @postRender()

        @listenTo @collection, 'change', (section) ->
            localStorage.presenterSections = JSON.stringify(@collection.toJSON())

    addChild: (section) ->
        sectionView = new Section
            model: section
        @$el.append(sectionView.render().el)

    render: ->
        @collection.each (section) =>
            @addChild(section)

        @postRender()
        @

    postRender: ->
        mediumOptions =
            buttons: ['bold', 'italic', 'quote']
            firstHeader: 'h1'
            secondHeader: 'h2'
            targetBlank: true

        new MediumEditor '.section[data-type="text"] .section-content, .section[data-type="header"] .section-content', $.extend({}, mediumOptions,
            placeholder: 'Add text...'
        )

        new MediumEditor '.section .section-caption', $.extend({}, mediumOptions,
            placeholder: 'Add a caption...'
        )

        $('.sections').sortable
            handle: '.section-drag-handle'
            axis: 'y'
            start: (e, ui) ->
                ui.placeholder.height ui.helper.height()

        @

app = {}

app.init = ->
    $('body').removeClass('dragenter dragover')
    $('.page-scroll').scroll -> $('body').scroll()

    sections = []
    if localStorage['presenterSections']
        sections = JSON.parse(localStorage.presenterSections)

    appView = new App
        collection: new SectionsCollection(sections)

app.saveExport = ->
    document.body.classList.add('capturing')

    setTimeout ->
        chrome.runtime.sendMessage({type: 'screenshot'})

        setTimeout ->
            document.body.classList.remove('capturing')
        , 0
    , 300

$ ->
    app.init()
